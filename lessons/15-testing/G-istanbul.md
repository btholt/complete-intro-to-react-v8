---
description: ""
---

One last very cool trick that Jest has built into it: [Istanbul][istanbul]. Istanbul (which is not [Constantinople][they-might-be-giants]) is a tool which tells you _how much_ of your code that you're covering with tests. Via an interactive viewer you can see what lines are and aren't covered. This used to be annoying to set up by Jest just does it for you.

Add the following command to your npm scripts: `"test:coverage": "jest --coverage"` and go ahead run `npm run test:coverage` and open the following file in your browser: `open coverage/lcov-report/index.html`.

Here you can see the four files we've written tests for. One file, `useBreedList` is missing a line of coverage (click on the file name to see that): it's the line of reading back from the cache. That actually is a pretty important thing to cover as it could be a source of bugs (cache might as well be French for software bug). This can help identify gaps in your testing coverage.

Lastly, add `coverage/` to your `.gitignore` since this shouldn't be checked in.

[istanbul]: https://istanbul.js.org/
[they-might-be-giants]: https://youtu.be/vsQrKZcYtqg
