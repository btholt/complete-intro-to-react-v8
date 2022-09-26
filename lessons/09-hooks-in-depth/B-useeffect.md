---
title: "useEffect"
description: ""
---

[Component][effect]

Effects are how you recreate `componentDidMount`, `componentDidUpdate`, and `componentDidUnmount` from React. Inside `useEffect`, you can do any sort of sidd-effect type action that you would have previously done in one of React's lifecycle method. You can do things like fire AJAX requests, integrate with third party libraries (like a jQuery plugin), fire off some telemetry, or anything else that need to happen on the side for your component.

In our case, we want our component to continually update to show the time so we use setTimeout inside our effect. After the timeout calls the callback, it updates the state. After that render happens, it schedules another effect to happen, hence why it continues to update. You could provide a second parameter of `[]` to `useEffect` (after the function) which would make it only update once. This second array is a list of dependencies: only re-run this effect if one of these parameters changed. In our case, we want to run after every render so we don't give it this second parameter.

[effect]: https://codesandbox.io/s/github/btholt/react-hooks-examples-v4/tree/main?file=/src/Effect.js
