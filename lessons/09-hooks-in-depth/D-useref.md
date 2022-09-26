---
title: "useRef"
description: ""
---

[Component][ref]

Refs are useful for several things, we'll explore two of the main reasons in these examples. I want to show you the first use case: how to emulate instance variables from React.

In order to understand why refs are useful, you need to understand [how closures work][closures]. In our component, when a user clicks, it sets a timeout to log both the state and the ref's number after a second. One thing to keep in mind that **the state and the ref's number are always the same**. They are never out of lockstep since they're updated at the same time. _However_, since we delay the logging for a second, when it alerts the new values, it will capture what the state was when we first called the timeout (since it's held on to by the closure) but it will always log the current value since that ref is on an object that React consistently gives the same object back to you. Because it's the same object and the number is a property on the object, it will always be up to date and not subject to the closure's scope.

Why is this useful? It can be useful for things like holding on to `setInterval` and `setTimeout` IDs so they can be cleared later. Or any bit of statefulness that _could_ change but you don't want it to cause a re-render when it does.

It's also useful for referencing DOM nodes directly and we'll see that a bit later in this section.

[ref]: https://codesandbox.io/s/github/btholt/react-hooks-examples-v4/tree/main?file=/src/Ref.js
