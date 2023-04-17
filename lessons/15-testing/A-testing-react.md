---
description: ""
---

> Please start with a fresh copy of this app: [Adopt Me!][app]

This is meant to be a very brief treatise on how to do testing on React applications. This will be a brief intro on how to set up Vitest tests for the application we just created.

## Testing with Vitest

[Vitest][vitest] is a test runner made by the fine folks who make Vite (as well as Vue.) The idea behind Vitest is that you already have a complete build pipeline for making an app, why should that pipeline be any different for test? It shouldn't; you want your testing environment to look as much like your app environment as possible.

They designed it to be a drop-in replacement for [Jest][jest] which is what I have taught for this course since the beginning. Jest is great and still a very viable tool to use for testing, even with Vite. We're just going to use Vitest because 1. we don't have to do any more configuration and 2. 100% of what you will learn in here is going to be useful if you use Jest. Win-win. If you want to learn Jest specifically, [take a look at Intermediate React v4's testing section.][v4]

Also, fun side note: [Jest is now an OpenJS project and no longer directly under Facebook][fb]. Good news for everyone.

While Vitest is not using Jasmine directly, its APIs mimic Jasmine APIs (just like Jest.)

Let's get going Run `npm install -D vitest@0.24.3 @testing-library/react@13.4.0 happy-dom@7.6.0`.

`@testing-library/react`, formerly called `react-testing-library`, is a tool that has a bunch of convenience features that make testing React significantly easier and is now the recommended way of testing React, supplanting [Enzyme][enzyme]. Previous versions of this course teach Enzyme if you'd like to see that (though I wouldn't recommend it unless you have to.)

We need to tell Vitest that we need a browser-like environment which it will fulfill via the [happy-dom][hd] package. happy-dom is a lot like jsdom but smaller, doesn't do 100% of what the browser does, and is much, much faster.

Next go into your src directory and create a folder called `__tests__`. Notice that's double underscores on both sides. Why double? They borrowed it from Python where double underscores ("dunders" as I've heard them called) mean something magic happens (in essence it means the name itself has significance and something is looking for that path name exactly.) In this case, Vitest assumes all JS files in here are tests.

Let's go add an npm script. In your package.json.

```json
"test": "vitest"
```

> Fun trick: if you call it test, npm lets you run that command as just `npm t`.

This command let's you run Jest in an interactive mode where it will re-run tests selectively as you save them. This lets you get instant feedback if your test is working or not. This is probably my favorite feature of Vitest.

Okay, one little configuration to add to your vite.config.js

```javascript
  // add this to the config object
test: {
  environment: "happy-dom",
},
```

Now that we've got that going, let's go write a test.

[jest]: https://jestjs.io
[jasmine]: https://jasmine.github.io/
[enzyme]: http://airbnb.io/enzyme/
[istanbul]: https://istanbul.js.org
[res]: https://raw.githubusercontent.com/btholt/complete-intro-to-react-v5/testing/__mocks__/@frontendmasters/res.json
[app]: https://github.com/btholt/citr-v8-project/tree/master/14-context
[fb]: https://twitter.com/cpojer/status/1524419433938046977
[hd]: https://github.com/capricorn86/happy-dom
[vitest]: https://vitest.dev/
[v4]: https://frontendmasters.com/courses/intermediate-react-v4/setup-jest-testing-library/
