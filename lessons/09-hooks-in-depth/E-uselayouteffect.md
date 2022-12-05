---
title: "useLayoutEffect"
description: ""
---

### [Link directly to StackBlitz][ref]

<iframe src="https://stackblitz.com/edit/ir5?embed=1&view=both&file=src/routes/UseLayoutEffect.jsx&hideExplorer=1&initialPath=/useLayoutEffect"></iframe>

`useLayoutEffect` is almost the same as `useEffect` except that it's synchronous to render as opposed to scheduled like `useEffect` is. If you're migrating from a class component to a hooks-using function component, this can be helpful too because `useLayoutEffect` runs at the same time as `componentDidMount` and `componentDidUpdate` whereas `useEffect` is scheduled after. This should be a temporary fix.

The only time you _should_ be using `useLayoutEffect` is to measure DOM nodes for things like animations. In the example, I measure the textarea after every time you click on it (the onClick is to force a re-render.) This means you're running render twice but it's also necessary to be able to capture the correct measurments.

If you make the `useLayoutEffect` into a `useEffect` it will have a janky re-render where it'll flash before it renders correctly. This is exactly why we need `useLayoutEffect`.

> Note if you drag "off" the textarea and let go of the mouse it won't measure the textarea. This is because when you click and hold something and then drag off of it, it doesn't trigger a click event. That makes sense, right? When you click something by mistake, what do you do? You drag off of it and let go. Same princple here.

[ref]: https://stackblitz.com/edit/ir5?view=both&file=src/routes/UseLayoutEffect.jsx&hideExplorer=1&initialPath=/useLayoutEffect
