---
title: "useReducer"
description: ""
---

[Component][reducer]

I'm going to assume you're familiar with Redux. If not, there's a brief section on it [here](redux-getting-started). `useReducer` allows us to do Redux-style reducers but inside a hook. Here, instead of having a bunch of functions to update our various properties, we have one reducer that handles all the updates based on an action type. This is a preferable approach if you have complex state updates or if you have a situation like this: all of the state updates are very similar so it makes sense to contain all of them in one function.

[reducer]: https://codesandbox.io/s/github/btholt/react-hooks-examples-v4/tree/main?file=/src/Reducer.js
