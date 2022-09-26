---
title: "useImperativeHandle"
description: ""
---

[Component][imperative-handle]

Here's one you will likely never directly use but you may use libraries that use it for you. We're going to use it in conjunction with another feature called `forwardRef` that again, you probably won't use but libraries will use on your behalf. Let's explain first what it does using the example and then we'll explain the moving parts.

In the example above, whenever you have an _invalid_ form, it will immediately focus the the first field that's invalid. If you look at the code, `ElaborateInput` is a child element so the parent component shouldn't have any access to the input contained inside the component. Those components are black boxes to their parents. All they can do is pass in props. So how do we accomplish it then?

The first thing we use is `useImperativeHandle`. This allows us to customize methods on an object that is made available to the parents via the `useRef` API. Inside `ElaborateInput` we have two refs: one thate is the one that will be provided by the parent, forwarded through by wrapping the `ElaborateInput` component in a `forwardRef` call which will ten provide that second `ref` parameter in the function call, and then the `inputRef` which is being used to directly access the DOM so we can call `focus` on the DOM node directly.

From the parent, we assign via `useRef` a ref to each of the `ElaborateInput`s which is then forwarded on each on via the `forwardRef`. Now, on these refs inside the parent component we have those methods that we made inside the child so we can call them when we need to. In this case, we'll calling the focus when the parent knows that the child has an error.

Again, you probably use this directly but it's good to know it exists. Normally it's better to not use this hook and try to accomplish the same thing via props but sometimes it may be useful to break this one out.

[imperative-handle]: https://codesandbox.io/s/github/btholt/react-hooks-examples-v4/tree/main?file=/src/ImperativeHandle.js
