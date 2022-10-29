---
description: "Setting up a build process has historically been a big barrier to entry for most developers. Brian shows you how to set up Vite which makes the whole process a breeze."
---

The build tool we are going to be using today is called [Vite][vite]. Vite (pronounced "veet", meaning quick in French) is a tool put out by the Vue team that ultimately ends up wrapping [Rollup][rollup] which does the actual bundling. The end result is a tool that is both easy to use and produces a great end result.

Our end result that we want from a build tool is that

- We can separate files out for code organization and have a tool stitch them together for us
- We can include external, third-party libraries from npm (like React!)
- The tool will optimize the code for us by minifying and other optimizing techniques

Previous versions of this course used [Parcel][parcel], another tool near-and-dear to my heart. It is still an amazing tool and one I recommend you check out. We ended up moving to Vite because the React community has selected it as the tool-of-choice for the moment and this courses aims to give you the community norms of React. Even older versions of this course previously taught [Webpack][webpack].

First, let's install the things we need for Vite.

```bash
npm install -D vite@3.1.4 @vitejs/plugin-react@2.1.0
```

The former is the tool itself and the latter is all the React specific features we will need. Now that we have those installed, we need to modify our index.html just a little bit.

```html
<!-- delete the two unpkg script lines -->
<script type="module" src="./App.js"></script>
```

We need to add module to the script tag so that the browser knows it's working with modern browser technology that allows you in development mode to use modules directly. Instead of having to reload the whole bundle every time, your browser can just reload the JS that has changed. It allows the browser to crawl the dependency graph itself which means Vite can run lightning fast in dev mode. It will still package it up for production so we can support a range of browsers.

Next, let's make our config file. Make a file in the root of your proejct called `vite.config.js` and stick this in there:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src",
});
```

We add the `react` plugin to Vite and we set our `root` directory to be our `src` directory. Generally your root is going to be where-ever you keep your index.html. Many projects will just keep the index.html file in the root of the project for this reason. I consider it a source file, so I keep it in src.

By default, Vite will find the index.html file in where-ever the root is and treat it as the head of a source graph. It'll crawl all your HTML, CSS, and JavaScript you link to from there and create your project for you. We don't have to do any more configuration than that. Vite will take care of the rest.

Okay, let's _actually_ install React to our project

```bash
npm install react@18.2.0 react-dom@18.2.0
```

- We did not include the `-D` because React is not a development tool, it's a production dependency
- React and ReactDOM are versioned together so you can assume those versions will always be the same

Finally, head to App.js and modify the following

```javascript
// add to the top
import React from "react";
import { createRoot } from "react-dom/client";

// modify the createRoot call, delete "ReactDOM"
const root = createRoot(container);
```

Now let's set up our scripts to start Vite. In package.json, put:

```json
// inside scripts
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
```

`dev` will start the devlopment server, typically on [http://localhost:5173/](). `build` will prepare static files to be deployed (to somewhere like GitHub Pages, Vercel, Netlify, AWS S3, etc.) `preview` lets you preview your production build locally.

> Please close the `file:///` browser tabs you have open and only use the `localhost:1234` ones. Now that we're using Vite the former won't work anymore! If you see something about `CORS` errors in your console it's because you're probably still looking at the file:/// version and not the local dev server

## Alternatives

There are a myriad of fantastic developer tools out there available. We chose Vite because the industry has been using it for a while but I have zero problem with you selecting other tools. Just trying to expose everyone to great tools.

> 🏁 [Click here to see the state of the project up until now: 02-js-tools][step].

[step]: https://github.com/btholt/citr-v8-project/tree/master/02-js-tools
[webpack]: https://webpack.js.org/
[parcel]: https://parceljs.org/
[rollup]: https://www.rollupjs.org/
[vite]: https://vitejs.dev/
