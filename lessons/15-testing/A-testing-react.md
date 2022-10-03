---
description: ""
---

> Please start with a fresh copy of this app: [Adopt Me!][app]

This is meant to be a very brief treatise on how to do testing on React applications. This will be a brief intro on how to set up Jest tests for the application we just created.

## Testing with Jest

First we'll start with [Jest][jest]. Jest is the testing framework that Facebook puts out. It is not at all tied to React despite both being maintained by Facebook. It's useful for other frameworks and I use it frequently with Node.js applications.

It's useful to know that Jest is built on top of [Jasmine][jasmine]. Jasmine does the underlying testing part while Jest is the high level runner of the tests. Sometimes it's useful to consult the Jasmine docs too.

Run `npm install -D jest@26.6.3 @testing-library/react@11.2.5`.

`@testing-library/react`, formerly called `react-testing-library`, is a tool that has a bunch of convenience features that make testing React significantly easier and is now the recommended way of testing React, supplanting [Enzyme][enzyme]. Previous versions of this course teach Enzyme if you'd like to see that.

Next go into your src directory and create a folder called `__tests__`. Notice that's double underscores on both sides. Why double? They borrowed it from Python where double underscores ("dunders" as I've heard them called) mean something magic happens (in essence it means the name itself has significance and something is looking for that path name exactly.) In this case, Jest assumes all JS files in here are tests.

We also need to set up Babel to work well on the server (we did something similar for server-side rendering.) Replace your .babelrc with this:

```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ],
    "@babel/preset-env"
  ],
  "plugins": ["@babel/plugin-proposal-class-properties"],
  "env": {
    "test": {
      "presets": [
        [
          "@babel/preset-env",
          {
            "targets": {
              "node": "current"
            }
          }
        ]
      ]
    }
  }
}
```

This is just saying when we run Jest (it runs with `NODE_ENV` in `test` mode by default, hence the env name) to transform the code to work for Node.js instead of the browser.

Let's go add an npm script. In your package.json.

```json
"test": "jest",
"test:watch": "jest --watch"
```

Fun trick: if you call it test, npm lets you run that command as just `npm t`.

We also added `test:watch`. This let's you run Jest in an interactive mode where it will re-run tests selectively as you save them. This lets you get instant feedback if your test is working or not. This is probably my favorite feature of Jest.

Now that we've got that going, let's go write a test.

[jest]: https://jestjs.io
[jasmine]: https://jasmine.github.io/
[enzyme]: http://airbnb.io/enzyme/
[istanbul]: https://istanbul.js.org
[res]: https://raw.githubusercontent.com/btholt/complete-intro-to-react-v5/testing/__mocks__/@frontendmasters/res.json
[app]: https://github.com/btholt/citr-v8-project/tree/master/12-portals-and-refs
