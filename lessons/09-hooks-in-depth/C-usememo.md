---
title: "useMemo"
description: "useMemo memoizes expensive function calls so they only are re-evaluated when needed."
---

### [Link directly to StackBlitz][ref]

<iframe src="https://stackblitz.com/edit/ir5?embed=1&view=both&file=src/routes/UseMemo.jsx&hideExplorer=1&initialPath=/useMemo"></iframe>

`useMemo` and `useCallback` are performance optimizations. Use them only when you already have a performance problem instead of pre-emptively. It adds unnecessary complexity otherwise.

`useMemo` memoizes expensive function calls so they only are re-evaluated when needed. I put in the [fibonacci sequence][fibonacci] in its recursive style to simulate this. All you need to know is that once you're calling `fibonacci` with 30+ it gets quite computationally expensive and not something you want to do unnecessarily as it will cause pauses and jank. It will now only call `fibonacci` if count changes and will just the previous, memoized answer if it hasn't changed.

If we didn't have the `useMemo` call, everytime the ball moved it'd unnecessarily recalculate the answer of `fibonacci` but because we did use `useMemo` it will only calculate it when `count` has changed.

Feel try to remove `useMemo` and see what happens. It'll cause the ball animation to be pretty janky.

[ref]: https://stackblitz.com/edit/ir5?view=both&file=src/routes/UseMemo.jsx&hideExplorer=1&initialPath=/useMemo
