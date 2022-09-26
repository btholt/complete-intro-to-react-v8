---
section: "Server Side Rendering"
---

> Please start with a fresh copy of this app: [Adopt Me!][app]

Performance is a central concern for front end developers. We should always be striving to serve the leanest web apps that perform faster than humans can think. This is as much a game of psychology as it is a a technological challenge. It's a challenge of loading the correct content first so a user can see a site and begin to make a decision of what they want to do (scroll down, click a button, log in, etc.) and then be prepared for that action before they make that decision.

Enter server-side rendering. This is a technique where you run React on your Node.js server _before_ you serve the request to the user and send down the first rendering of your website already done. This saves precious milliseconds+ on your site because otherwise the user has to download the HTML, then download the JavaScript, then execute the JS to get the app. In this case, they'll just download the HTML and see the first rendered page while React is loading in the background.

While the total time to when the page is actually interactive is comparable, if a bit slower, the time to when the user _sees_ something for the first time should be much faster, hence why this is a popular technique. So let's give it a shot.

First, we need to remove all references to `window` or anything browser related from a path that _could_ be called in Node. That means whenever we reference `window`, it'll have to be inside componentDidMount since componentDidMount doesn't get called in Node.

We'll also have change where our app gets rendered. Make a new file called ClientApp.js. Put in there:

```javascript
import { hydrate } from "react-dom";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import App from "./App";

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

This code will only get run in the browser, so any sort of browser related stuff can safely be done here (like analytics.) We're also using `React.hydrate` instead of `React.render` because this will hydrate existing markup with React magic ✨ rather than render it from scratch.

Because ClientApp.js will now be the entry point to the app, not App.js, we'll need to fix that in the script tag in index.html. Change it from App.js to ClientApp.js

Let's go fix App.js now:

```javascript
// remove react-dom import
// remove BrowserRouter as Router from react-router-dom import

// move <StrictMode> to wrapping the <App /> render

// remove Router from <App />

// replace render at bottom
export default App;
```

The Modal makes reference to window in its modular scope, let's move that reference inside the render function:

```javascript
// replace modalRoot assignment
let modalRoot;

// in function
modalRoot = modalRoot ? modalRoot : document.getElementById("modal");
```

Now Modal doesn't reference window in the modular scope but it _does_ in the render function. This means you can't render a modal on initial page load. Since it's using the DOM to attach the portal, that sort of makes sense. Be careful of that. We're using a ternary to only look it up on the first render.

We need a few more modules. Run `npm install express@4.17.1` to get the framework we need for Node.

Go change your index.html to use ClientApp.js instead of App.js

```html
<script src="ClientApp.js"></script>
```

Now in your package.json, add the following to your `"scripts"`

```json
"build:client": "parcel build --public-url ./dist/ src/index.html",
"build:server": "parcel build -d dist-server --target node server/index.js",
"build": "npm run build:client && npm run build:server",
"start": "npm -s run build && node dist-server/index.js"
```

This will allow us to build the app into static (pre-compiled, non-dev) assets and then start our server. This will then let us run Parcel on our Node.js code too so we can use our React code directly in our App as well.

Let's finally go write our Node.js server:

```javascript
import express from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/index.html").toString();

const parts = html.split("not rendered");

const app = express();

app.use("/dist", express.static("dist"));
app.use((req, res) => {
  const staticContext = {};
  const reactMarkup = (
    <StaticRouter url={req.url} context={staticContext}>
      <App />
    </StaticRouter>
  );

  res.status(staticContext.statusCode || 200);
  res.send(`${parts[0]}${renderToString(reactMarkup)}${parts[1]}`);
  res.end();
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
```

- [Express.js][ex] is a Node.js web server framework. It's the most common one and a simple one to learn.
- We'll be listening on port 3000 (http://locahost:**3000**) unless a environment variable is passed in saying otherwise. We do this because if you try to deploy this, you'll need to watch for PORT.
- We'll statically serve what Parcel built.
- Anything that Parcel _doesn't_ serve, will be given our index.html. This lets the client-side app handle all the routing.
- We read the compiled HTML doc and split it around our `not rendered` statement. Then we can slot in our markup in between the divs, right where it should be.
- We use renderToString to take our app and render it to a string we can serve as HTML, sandwiched inside our outer HTML.
- The `staticContext` object allows us to see what status code came back from React Router so we can appropriately 404 on pages that don't exist.

Run `npm run start` and then open http://localhost:3000 to see your server side rendered app. Notice it displays markup almost instantly.

## .gitignore

Make sure you add `dist-server/` to your .gitignore here. We don't want to commit built code.

> 🏁 [Click here to see the state of the project up until now: server-side-rendering-1][step]

[step]: https://github.com/btholt/citr-v7-project/tree/master/server-side-rendering-1
[app]: https://github.com/btholt/citr-v7-project/tree/master/12-portals-and-refs
