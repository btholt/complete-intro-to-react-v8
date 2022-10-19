---
title: "Refactor Adopted Pet Context"
path: "/ts-adopted-pet-context"
order: "13C"
section: "TypeScript"
description: "Brian quickly converts AdoptedPetContext.ts"
---

Let's quickly do AdoptedPetContext.ts

```tsx
import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

const AdoptedPetContext = createContext<[Pet, (adoptedPet: Pet) => void]>([
  {
    id: 1337,
    name: "Fido",
    animal: "dog",
    description: "Lorem ipsum",
    breed: "Beagle",
    images: [],
    city: "Seattle",
    state: "WA",
  },
  () => {},
]);

export default AdoptedPetContext;
```

- Here we just have to tell TS that we have a strict ordering of string and function. This will make other files easier to type.
- We're telling it that this function will accept a Pet which TypeScript will enforce for us later.
- You have to give it a default value so we gave it a `useState` shaped response with a default Pet object. This would be useful if you wanted to run unit tests with context.
- Not all type errors are fixed yet since some of the imports are broken. That's expected.

> 🏁 [Click here to see the state of the project up until now: typescript-1][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/typescript-1
