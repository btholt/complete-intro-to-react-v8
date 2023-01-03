---
section: "Server Side Rendering"
---

> Please start with a fresh copy of this app: [Adopt Me!][app]

Performance is a central concern for front end developers. We should always be striving to serve the leanest web apps that perform faster than humans can think. This is as much a game of psychology as it is a a technological challenge. It's a challenge of loading the correct content first so a user can see a site and begin to make a decision of what they want to do (scroll down, click a button, log in, etc.) and then be prepared for that action before they make that decision.

Enter server-side rendering. This is a technique where you run React on your Node.js server _before_ you serve the request to the user and send down the first rendering of your website already done. This saves precious milliseconds+ on your site because otherwise the user has to download the HTML, then download the JavaScript, then execute the JS to get the app. In this case, they'll just download the HTML and see the first rendered page while React is loading in the background.

While the total time to when the page is actually interactive is comparable, if a bit slower, the time to when the user _sees_ something for the first time should be much faster, hence why this is a popular technique. So let's give it a shot.

First, we need to remove all references to `window` or anything browser related from a path that _could_ be called in Node. That means whenever we reference `window`, it'll have to be inside `hydrateRoot` since `hydrateRoot` doesn't get called in Node.

We'll also have to change where our app gets rendered. Make a new file called ClientApp.jsx. Put in there:

```javascript
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

This code will only get run in the browser, so any sort of browser related stuff can safely be done here (like analytics.) We're also using `React.hydrate` instead of `React.render` because this will hydrate existing markup with React magic ✨ rather than render it from scratch.

Because ClientApp.jsx will now be the entry point to the app, not App.js, we'll need to fix that in the script tag in index.html. Change it from App.js to ClientApp.js

```html
<script type="module" src="./ClientApp.jsx"></script>
```

Let's go fix App.jsx now:

```javascript
// remove react-dom import

// remove BrowserRouter from <App /> and remove import

// replace render at bottom
export default App;
```

Now let's make a ServerApp.jsx. We need this file to run through Vite so Node.js can render our app.

```javascript
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export default function render(url, opts) {
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    opts
  );
  return stream;
}
```

This is code that will run in Node.js once we've told Vite to transpile it. This will create a server-readable stream of React markup that we can send to the user.

We need a few more modules. Run `npm install express@4.18.2` to get the framework we need for Node.

Now in your package.json, add the following to your `"scripts"`

```json
// inside scripts
"build:client": "vite build --outDir ../dist/client",
"build:server": "vite build --outDir ../dist/server --ssr ServerApp.jsx",
"build": "npm run build:client && npm run build:server",
"start": "node server.js",

// outside scripts
"type": "module",
```

This will allow us to build the app into static (pre-compiled, non-dev) assets and then start our server. This will also allow us to compile our app a second time so that Node.js can run it.

We also have to identify to Node.js that we're using modules, not CommonJS which is where the type=module comes in.

Let's create `"server.js"` in our project root and finally go write our Node.js server:

```javascript
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import renderApp from "./dist/server/ServerApp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;

const html = fs
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
  .toString();

const parts = html.split("not rendered");

const app = express();

app.use(
  "/assets",
  express.static(path.resolve(__dirname, "./dist/client/assets"))
);
app.use((req, res) => {
  res.write(parts[0]);
  const stream = renderApp(req.url, {
    onShellReady() {
      stream.pipe(res);
    },
    onShellError() {
      // do error handling
    },
    onAllReady() {
      // last thing to write
      res.write(parts[1]);
      res.end();
    },
    onError(err) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
```

- [Express.js](https://expressjs.com) is a Node.js web server framework. It's the most common one and a simple one to learn.
- We'll be listening on port 3001 ([http://locahost:**3001**]()) unless an environment variable is passed in saying otherwise. We do this because if you try to deploy this, you'll need to watch for PORT.
- We'll statically serve what Vite built.
- Anything that Vite _doesn't_ serve, will be given our index.html. This lets the client-side app handle all the routing.
- We read the compiled HTML doc and split it around our `not rendered` statement. Then we can slot in our markup in between the divs, right where it should be.
- For crawlers (like Google), _don't_ pipe onShellReady, and just hold the whole thing back until onAllReady. Then it looks like a whole complete request to a crawler.

Run `npm run start` and then open [http://localhost:3001]() to see your server side rendered app. Notice it displays markup almost instantly.

This is rendering the whole app to a Node.js stream. As parts are finished, it streams markup to the user. There are other options to do with just as a static stream but what's cool about this one is that it works just out of the box with Suspense and React.lazy so it'll server-side render those components and not force a user to wait for them.

## react-query and experimental fetch

This still only builds the front page of the app and it does not actually fetch the data for our React app. What if we could send the user a totally complete page. I can give you a little preview of how easy it's going to be soon to do that.

If you're on Node.js 18, skip this step. If you're on Node.js 16, you need to add this to your npm run start command in your package.json

```json
"start": "node --experimental-fetch server.js",
```

Node.js just shipped fetch as a feature. In Node.js 16 you need a flag to use it.

Now head to App.jsx and modify where you create the react-query query client.

```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      suspense: true,
    },
  },
});
```

That `suspense` line will make react-query work with React's Suspense component which we were already using for React.lazy. This is experimental and very well could change in the future so don't ship this quite yet. But I wanted to show you how close we are!

You can still accomplish this today but with a bit more code. A good way to do that would be:

1. Fetch the API response first and cache it. Re-fetch it every so often (depending on how frequently that cache might get stale)
1. Make `<App />` accept a prop that it then passes into react-query's initialData option. [See docs here for initialData][data]
1. In `ServerApp.jsx`, pass your cached data into `<App />`
1. Render a separate `<script>` tag to your page with a JS object containing that object. Make sure it loads before React.js bootstraps
1. In `ClientApp.jsx` pass that into `<App />`.

A lot of code, but it'd work too! As an exercise, this would be great for you to explore how all these pieces fit together.

## .gitignore

Make sure you add `dist/` to your .gitignore here. We don't want to commit built code.

> 🏁 [Click here to see the state of the project up until now: server-side-rendering][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/server-side-rendering
[app]: https://github.com/btholt/citr-v8-project/tree/master/14-context
[data]: https://tanstack.com/query/v4/docs/guides/ssr#using-initialdata
