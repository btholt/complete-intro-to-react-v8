---
description: "An essential tool in any React developer's toolbox is the official React Dev Tools extension. Brian shows you how to install and use them."
---

React has some really great tools to enhance your developer experience. We'll go over a few of them here.

## `NODE_ENV=development`

React already has a lot of developer conveniences built into it out of the box. What's better is that they automatically strip it out when you compile your code for production.

So how do you get the debugging conveniences then? Well, if you're using Vite.js, it will compile your development server with an environment variable of `NODE_ENV=development` and then when you run `vite build` it will automatically change that to `NODE_ENV=production` which is how all the extra weight gets stripped out.

Why is it important that we strip the debug stuff out? The dev bundle of React is quite a bit bigger and quite a bit slower than the production build. Make sure you're compiling with the correct environmental variables or your users will suffer.

## Strict Mode

React has a new strict mode. If you wrap your app in `<React.StrictMode></React.StrictMode>` it will give you additional warnings about things you shouldn't be doing. I'm not teaching you anything that would trip warnings from `React.StrictMode` but it's good to keep your team in line and not using legacy features or things that will be soon be deprecated.

We are not going to add StrictMode to our app. One thing that StrictMode does with React 18 is run twice the initialization functions of your apps to check to see if they are indeed truly stateless. While in theory this is a good thing to assure, it's wasteful to ongoing continually do as it will double invoke your APIs while you're in development which is not something we want do now. Feel free to add to your app but we are not going to today.

## Dev Tools

React has wonderful dev tools that the core team maintains. They're available for both Chromium-based browsers and Firefox. They let you do several things like explore your React app like a DOM tree, modify state and props on the fly to test things out, tease out performance problems, and programtically manipulate components. Definitely worth downloading now. [See here][dev-tools] for links.

[dev-tools]: https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-devtools-profiler
