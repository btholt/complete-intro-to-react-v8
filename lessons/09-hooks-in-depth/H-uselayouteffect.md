---
title: "useLayoutEffect"
description: ""
---

[Component][layout-effect]

`useLayoutEffect` is almost the same as `useEffect` except that it's synchronous to render as opposed to scheduled like `useEffect` is. If you're migrating from a class component to a hooks-using function component, this can be helpful too because `useLayout` runs at the same time as `componentDidMount` and `componentDidUpdate` whereas `useEffect` is scheduled after. This should be a temporary fix.

The only time you _should_ be using `useLayoutEffect` is to measure DOM nodes for things like animations. In the example, I measure the textarea after every time you click on it (the onClick is to force a re-render.) This means you're running render twice but it's also necessary to be able to capture the correct measurments.

[layout-effect]: https://codesandbox.io/s/github/btholt/react-hooks-examples-v4/tree/main?file=/src/LayoutEffect.js
