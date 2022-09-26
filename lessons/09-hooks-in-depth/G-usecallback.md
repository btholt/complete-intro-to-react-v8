---
title: "useCallback"
description: "useCallback is quite similar and indeed it's implemented with the same mechanisms as useMemo except it's a callback instead of a value"
---

[Component][callback]

`useCallback` is quite similar and indeed it's implemented with the same mechanisms as `useMemo`. Our goal is that `ExpensiveComputationComponent` only re-renders whenever it absolutely must. Typically whenever React detects a change higher-up in an app, it re-renders everything underneath it. This normally isn't a big deal because React is quite fast at normal things. However you can run into performance issues sometimes where some components are bad to re-render without reason.

In this case, we're using a new feature of React called `React.memo`. This is similar to `PureComponent` where a component will do a simple check on its props to see if they've changed and if not it will not re-render this component (or its children, which can bite you.) `React.memo` provides this functionality for function components. Given that, we need to make sure that the function itself given to `ExpensiveComputationComponent` is the _same_ function every time. We can use `useCallback` to make sure that React is handing _the same fibonacci_ to `ExpensiveComputationComponent` every time so it passes its `React.memo` check every single time. Now it's only if `count` changes will it actually re-render (as evidenced by the time.)

Try removing the useCallback call and see if you get the the count to 40+ that the page crawls as it updates every second.

[callback]: https://codesandbox.io/s/github/btholt/react-hooks-examples-v4/tree/main?file=/src/Callback.js
