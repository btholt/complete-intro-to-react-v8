---
title: "useCallback"
description: "useCallback is quite similar and indeed it's implemented with the same mechanisms as useMemo except it's a callback instead of a value"
---

### [Link directly to StackBlitz][ref]

<iframe src="https://stackblitz.com/edit/ir5?embed=1&view=both&file=src/routes/UseCallback.jsx&hideExplorer=1&initialPath=/useCallback"></iframe>

`useCallback` is quite similar and indeed it's implemented with the same mechanisms as `useMemo`. Our goal is that `UseRefComponent` (which is the same Three.js component from the useRef example) only re-renders whenever it absolutely must. Typically whenever React detects a change higher-up in an app, it re-renders everything underneath it. This normally isn't a big deal because React is quite fast at normal things. However you can run into performance issues sometimes where some components are bad to re-render without reason.

In this case, we're using the feature of React called `React.memo`. This is similar to `PureComponent` where a component will do a simple check on its props to see if they've changed and if not it will not re-render this component (or its children, which can bite you.) `React.memo` provides this functionality for function components. Given that, we need to make sure that the function itself given to `UseRefComponent` is the _same_ function every time. We can use `useCallback` to make sure that React is handing the exact same (i.e. `===` and not just `==`) to `UseRefComponent` every time so it passes its `React.memo` check every single time. Now it'll only re-render if we give it a different parameter.

Try removing the useCallback call and see the Three.js app crash.

[ref]: https://stackblitz.com/edit/ir5?view=both&file=src/routes/UseCallback.jsx&hideExplorer=1&initialPath=/useCallback
