---
description: ""
title: "c8"
---

One last very cool trick that Vitest has built into it: [c8][c8]. c8 is a tool which tells you _how much_ of your code that you're covering with tests. Via an interactive viewer you can see what lines are and aren't covered. This used to be annoying to set up by Vitest just does it for you.

Add the following command to your npm scripts: `"test:coverage": "vitest --coverage"` and go ahead run `npm run test:coverage` and open the following file in your browser: `open src/coverage/index.html`.

> It will likely ask you to install a module to do this. Say yes.

Here you can see the four files we've written tests for. One file, `fetchBreedList` is missing a line of coverage (click on the file name to see that): it's the line of reading back from the cache. That actually is a pretty important thing to cover as it could be a source of bugs (cache might as well be the French word for software bug). This can help identify gaps in your testing coverage.

Lastly, add `coverage/` to your `.gitignore` since this shouldn't be checked in.

## Istanbul

c8 use Node.js's built-in code coverage capabilities to run your tests which makes it significantly faster and outputs it in a way that all of [Istanbul][istanbul] / nyc's tools work with it. You can tell Vitest to use Istanbul but unless you have a very specific reason to, just use c8.

> 🏁 [Click here to see the state of the project up until now: testing][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/testing
[istanbul]: https://istanbul.js.org/
[c8]: https://github.com/bcoe/c8
