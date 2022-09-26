---
title: "useMemo"
description: "useMemo memoizes expensive function calls so they only are re-evaluated when needed."
---

[Component][memo]

`useMemo` and `useCallback` are performance optimizations. Use them only when you already have a performance problem instead of pre-emptively. It adds unnecessary complexity otherwise.

`useMemo` memoizes expensive function calls so they only are re-evaluated when needed. I put in the [fibonacci sequence][fibonacci] in its recursive style to simulate this. All you need to know is that once you're calling `fibonacci` with 30+ it gets quite computationally expensive and not something you want to do unnecessarily as it will cause pauses and jank. It will now only call `fibonacci` if count changes and will just the previous, memoized answer if it hasn't changed.

If we didn't have the `useMemo` call, everytime I clicked on the title to cause the color to change from red to green or vice versa it'd unnecessarily recalculate the answer of `fibonacci` but because we did use `useMemo` it will only calculate it when `num` has changed.

Feel try to remove `useMemo`, get `num` to 40 or so, and then click the h1. It'll be slow.

[memo]: https://codesandbox.io/s/github/btholt/react-hooks-examples-v4/tree/main?file=/src/Memo.js
