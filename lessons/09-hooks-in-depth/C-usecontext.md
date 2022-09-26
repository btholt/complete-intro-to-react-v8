---
title: "useContext"
description: ""
---

[Component][context]

An early problem with the React problem is called "data tunneling" or "prop drilling". This is when you have a top level component (in our case the parent component) and a child component way down in the hierarchy that need the same data (like the user object.) We could pass that data down, parent-to-child, for each of the intermediary components but that sucks because now each of `LevelTwo`, `LevelThree`, and `LevelFour` all have to know about the user object even when they themselves don't need it, just their children. This is prop drilling: passing down this data in unnecessary intermediaries.

Enter context. Context allows you to create a wormhole where stuff goes in and a wormhole in a child component where that same data comes out and the stuff in the middle doesn't know it's there. Now that data is available anywhere inside of the `UserContext.Provider`. `useContext` just pulls that data out when given a Context object as a parameter. You don't have to use `useState` and `useContext` together (the data can be any shape, not just `useState`-shaped) but I find it convenient when child components need to be able to update the context as well.

In general, context adds a decent amount of complexity to an app. A bit of prop drilling is fine. Only put things in context that are truly application-wide state like user information or auth keys and then use local state for the rest.

Often you'll use context instead of Redux or another state store. You could get fancy and use `useReducer` and `useContext` together to get a pretty great approximation of Redux-like features.

[context]: https://codesandbox.io/s/github/btholt/react-hooks-examples-v4/tree/main?file=/src/Context.js
