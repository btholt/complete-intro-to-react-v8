---
title: "useId"
description: "useId allows you to generate consistent IDs across renders"
---

[Component][id]

A new hook for version 18 of React is `useId`. Frequently in React you need unique identifiers to associate two objects together. Two examples of this would be making sure a label and an input are associated together by the `htmlFor` attribute as well as when you're doing a loop in React and you need a unique `key` for each item.

Previously you could maintain some sort of unique counter that was tracked across renders. With concurrent React and batching in version 18 that's no longer possible. `useId` will give you a consistent via a hook so that they can always be the same.

To be clear, you will almost never need to use this. However, some day, when you need a consitent unique identifier, this can do the trick. Normally you can just use some sort of object ID like a name or a database identifier. This is for when that doesn't work.

[id]: https://codesandbox.io/s/github/btholt/react-hooks-examples-v4/tree/main?file=/src/Id.js
