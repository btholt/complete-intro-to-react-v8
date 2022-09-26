---
title: "useDebugValue"
description: ""
---

[Component][debug-value]

Here's another hook that's baked into React that I don't foresee many of you using but I still want you to know it's there. It, like useImperativeHandle, is more built for library authors.

useDebugValue allows you to surface information from your custom hook into the dev tools. This allows the developer who is consuming your hook (possibly you, possibly your coworker) to have whatever debugging information you choose to surfaced to them. If you're doing a little custom hook for your app (like the breed one we did in the Intro course) this probably isn't necessary. However if you're consuming a library that has hooks (like how react-router-dom has hooks) these can be useful hints to developers.

Normally you'd just use the developer tools built into the browser but CodeSandbox has the dev tools built directly into it. Just know that normally you'd use the browser extension.

[debug-value]: https://codesandbox.io/s/github/btholt/react-hooks-examples-v4/tree/main?file=/src/DebugValue.js
