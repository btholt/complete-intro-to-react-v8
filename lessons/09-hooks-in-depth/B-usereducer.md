---
title: "useReducer"
description: ""
---

### [Link directly to StackBlitz][ref]

<iframe src="https://stackblitz.com/edit/ir5?embed=1&view=both&file=src/routes/UseReducer.jsx&hideExplorer=1&initialPath=/useReducer"></iframe>

I'm going to assume you're familiar with Redux. If not, there's a brief section on it [here](https://redux.js.org/introduction/getting-started/). `useReducer` allows us to do Redux-style reducers but inside a hook. Here, instead of having a bunch of functions to update our various properties, we have one reducer that handles all the updates based on an action type. This is a preferable approach if you have complex state updates or if you have a situation like this: all of the state updates are very similar so it makes sense to contain all of them in one function.

In this one, we are using [hsl color][hsl] to make it so we have text that is always _somewhat_ readable against its background. I use a very rudimentary algorithm to do and [there an algorithm that is better at it][lab], but I wanted to keep it simple. We basically just make sure one color is 180º away in hues and 50% different in lightness (no need to modify saturation). It produces decent but not perfect results.

[ref]: https://stackblitz.com/edit/ir5?view=both&file=src/routes/UseReducer.jsx&hideExplorer=1&initialPath=/useReducer
[lab]: https://en.wikipedia.org/wiki/CIELAB_color_space
[hsl]: https://en.wikipedia.org/wiki/HSL_and_HSV
