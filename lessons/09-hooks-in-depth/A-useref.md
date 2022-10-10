---
title: "useRef"
description: ""
---

> We're going to do this in StackBlitz but this code runs locally too. It's using Vite.js as well. Link to [the GitHub repo is here][gh] and [the StackBlitz is here][sb].

### [Link directly to StackBlitz][ref]

<iframe src="https://stackblitz.com/edit/ir5?embed=1&view=both&file=src/routes/UseRef.jsx&hideExplorer=1&initialPath=/useRef"></iframe>

Refs can be used for a variety of purposes. One particular use for them is if you need to interact with _the actual DOM_ (as opposed to the React virtualization of it) directly. This is pretty rare and really only when you need to derive measurements from the DOM (like width) or you're using an external library and it needs a real DOM node to interact with.

In our example, let's integrate [Three.js][three] with React. Three.js is a library that allows you to do 3D graphics in the browser and has its own runtime outside of React. React never guarantees that a DOM node isn't going to re-render at any given time and in general this is a good thing: we don't have to care about actually updating the DOM: React does it for us. However it's a problem with Three.js: we need to insert a DOM node directly into a DOM element (which React would control.) That's where the `ref` is useful

## Why memo?

[three]: https://threejs.org/
[sb]: https://stackblitz.com/edit/ir5
[gh]: https://github.com/btholt/react-hooks-examples-v5
[ref]: https://stackblitz.com/edit/ir5?&view=both&file=src/routes/UseRef.jsx&hideExplorer=1&initialPath=/useRef
