---
title: "useId"
description: "useId allows you to generate consistent IDs across renders"
---

### [Link directly to StackBlitz][ref]

<iframe src="https://stackblitz.com/edit/ir5?embed=1&view=both&file=src/routes/UseId.jsx&hideExplorer=1&initialPath=/useId"></iframe>

A new hook for version 18 of React is `useId`. Frequently in React you need unique identifiers to associate two objects together. An example of this would be making sure a label and an input are associated together by the `htmlFor` attribute.

Previously you could maintain some sort of unique counter that was tracked across renders. With concurrent React and batching in version 18 that's no longer possible. `useId` will give you a consistent via a hook so that they can always be the same.

This is useful for the thing we see above: we have a label which needs a `for` attribute that corresponds to an input. We would either need to use some piece of data/parameter that we'd pass into the component that would serve as the key or we can use this hook to give it a unique ID.

If you need multiple IDs in the same component just do `{id}-name`, `{id}-address`, ``{id}-number`, etc. No need to call `useId` multiple times.

This is safe across server-side renders and client-side.

[ref]: https://stackblitz.com/edit/ir5?view=both&file=src/routes/UseId.jsx&hideExplorer=1&initialPath=/useId
