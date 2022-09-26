---
title: "useState"
description: ""
---

[Open this CodeSandbox.][codesandbox] All of the examples are in there. We will not be using the code in project for this section, just this CodeSandbox.

In the preceding course, we went over `useState`, `useEffect`, `useContext`, and `useRef`. These are the most common hooks and likely 99% of what you're going to use. However it's good to know what other tools are in your toolbox for the 1% of problems. We'll go through, example-by-example, and work out what all these hooks can do for you. (we'll review the ones we've talked about already too.)

[Component][state].

`useState` allows us to make our components stateful. Whereas this previously required using a class component, hooks give us the ability to write it using just functions. It allows us to have more flexible components. In our example component, everytime you click on the h1 (bad a11y, by the way) it'll change colors. It's doing this by keeping that bit of state in a hook which is being fed in anew every render so it always has the latest state.

[codesandbox]: https://codesandbox.io/s/github/btholt/react-hooks-examples-v4/tree/master/
[state]: https://codesandbox.io/s/github/btholt/react-hooks-examples-v4/tree/main?file=/src/State.js
[closures]: https://frontendmasters.com/courses/javascript-foundations/closure-introduction/
[fibonacci]: https://en.wikipedia.org/wiki/Fibonacci_number
