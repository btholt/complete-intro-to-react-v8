---
title: "useRef"
description: ""
---

> We're going to do this in StackBlitz but this code runs locally too. It's using Vite.js as well. Link to [the GitHub repo is here][gh] and [the StackBlitz is here][sb]. One big note: the examples _only work_ in the embed version in Chromium-based browsers (e.g. Chrome, Edge, Vivaldi, etc.). It does work in Firefox but only if you go to the whole site and not rely on the embed version.

### [Link directly to StackBlitz][ref]

<iframe src="https://stackblitz.com/edit/ir5?embed=1&view=both&file=src/routes/UseRef.jsx&hideExplorer=1&initialPath=/useRef"></iframe>

Refs can be used for a variety of purposes. One particular use for them is if you need to interact with _the actual DOM_ (as opposed to the React virtualization of it) directly. This is pretty rare and really only when you need to derive measurements from the DOM (like width) or you're using an external library and it needs a real DOM node to interact with.

In our example, let's integrate [Three.js][three] with React. Three.js is a library that allows you to do 3D graphics in the browser and has its own runtime outside of React. React never guarantees that a DOM node isn't going to re-render at any given time and in general this is a good thing: we don't have to care about actually updating the DOM: React does it for us. However it's a problem with Three.js: we need to insert a DOM node directly into a DOM element (which React would control.) That's where the `ref` is useful: it allows to get an actual hold on the DOM node underneath so we can interact with it.

## Why memo?

React is very fast at re-rendering and 99.999% of the time you never have to worry when React re-renders, just that your view is a function of your state.

The .001% of times you care is when you have something that is either very performance sensitive and you want to have a tighter grip on the performance or something like our Three.js app running in it where re-rendering it will destroy and re-create a pretty expensive thing to re-render. It also looks bad because it'll reset the animation.

`React.memo` tells React "as long as the parameters being passed into this component don't change, _do not re-render it ever_. You might be tempted to do this on every component but believe me, _don't_. Things will no re-render when you expect them to and you will forget you memoized them. Only use memo where you need to.

[three]: https://threejs.org/
[sb]: https://stackblitz.com/edit/ir5
[gh]: https://github.com/btholt/react-hooks-examples-v5
[ref]: https://stackblitz.com/edit/ir5?&view=both&file=src/routes/UseRef.jsx&hideExplorer=1&initialPath=/useRef
