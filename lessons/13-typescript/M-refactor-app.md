---
description: "Brian quickly converts App.tsx and wraps up"
---

Lastly, let's do App.tsx.

First, we'll need to import our Pet interface:

```tsx
import { Pet } from "./APIResponsesTypes";
```

Then we can use it to check our App component's state:

```tsx
// replace useState
const adoptedPet = useState(null as Pet | null);

// under container DOM query at the end
if (!container) {
  throw new Error("no container to render to");
}
```

Make the last change to `AdoptedPetContext.ts`:

```tsx
// replace with
const AdoptedPetContext = createContext<[Pet | null, (adoptedPet: Pet) => void]>([
```

Just a few changes to 1. let TS know that null could be a Pet. and 2. to defend against a DOM without a container to render to.

Last thing: open `index.html` and change the link from `App.js` to `App.tsx` and then you should be good to go!

This probably felt burdensome to do. In fact, it is. I had a difficult time writing this! Converting existing JS codebasees to TypeScript necessitates a certain amount of writing and rewriting to get all the type signatures in a place that the compiler can verify everything. Be cautious before you call for your team to rewrite.

However, now that we're playing TypeScript land, this code would be joyous to work on. Visual Studio Code will autocomplete for you. TypeScript will _instantly_ let you know when you've made a mistake. You can launch new code with higher certainty that you haven't created run time errors. This all comes at the cost of taking longer to write. Ask yourself if that's a trade-off you're willing to make: if you're a tiny startup that may not happen. If you're as large as Microsoft, maybe! It's a trade-off like all things are. It is a question you should answer before you start a new code base: should we type check?

Last thing, let's add a type check to our package.json just in case someone isn't using a type checking editor. Add `"typecheck": "tsc --noEmit"` to your package.json. This is also useful CI scenarios.

Congrats! You finished TypeScript.

> 🏁 [Click here to see the state of the project up until now: typescript-4][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/typescript-4
