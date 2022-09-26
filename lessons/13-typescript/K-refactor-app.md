---
description: "Brian quickly converts App.tsx and wraps up"
---

Lastly, let's do App.tsx.

```tsx
// Nothing!
```

Because of the rest of the work we did, App needs no changes! Hooray! 🎉

Last thing: open `index.html` and change the link from `App.js` to `App.tsx` and then you should be good to go!

This probably felt burdensome to do. In fact, it is. I had a difficult time writing this! Converting existing JS codebasees to TypeScript necessitates a certain amount of writing and rewriting to get all the type signatures in a place that the compiler can verify everything. Be cautious before you call for your team to rewrite.

However, now that we're playing TypeScript land, this code would be joyous to work on. Visual Studio Code will autocomplete for you. TypeScript will _instantly_ let you know when you've made a mistake. You can launch new code with higher certainty that you haven't created run time errors. This all comes at the cost of taking longer to write. Ask yourself if that's a trade-off you're willing to make: if you're a tiny startup that may not happen. If you're as large as Microsoft, maybe! It's a trade-off like all things are. It is a question you should answer before you start a new code base: should we type check?

Last thing, let's add a type check to our package.json just in case someone isn't using a type checking editor. Add `"typecheck": "tsc --noEmit"` to your package.json. This is also useful CI scenarios.

Congrats! You finished TypeScript.

> 🏁 [Click here to see the state of the project up until now: typescript-5][step]

[step]: https://github.com/btholt/citr-v7-project/tree/master/typescript-5
