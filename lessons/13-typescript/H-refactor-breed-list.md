---
description: "Brian quickly converts useBreedList.tsx"
---

Now let's go do useBreedList.tsx. Before that, add this to APIResponseTypes.ts

```ts
export interface BreedListAPIResponse {
  animal: Animal;
  breeds: string[];
}
```

Now onto useBreedList.tsx

```tsx
// import at top
import { Animal, BreedListAPIResponse } from "./APIResponsesTypes";


const localCache: {
  [index: string]: string[];
} = {};

type Status = "unloaded" | "loading" | "loaded";

// change function signature

export default function useBreedList(animal: Animal): [string[], Status] {
  const [breedList, setBreedList] = useState([] as string[]);
  const [status, setStatus] = useState("unloaded" as Status);

  …
}

// TypeScript wants to explicitly say that you don't care about returned promises
void requestBreedList();

// cast API response
const json = (await res.json()) as BreedListAPIResponse;
```

- localCache can have anything as a key so we need to let TypeScript know that. We have a generic "index" key that could be anything, and we're letting TypeScript know that only string arrays can be set as values.
- Like Animal, we can only have one of three possible strings for our Status so we can make that explicit and TypeScript can keep track of that.
- Since `[]` and `"unloaded"` aren't explcit enough for TypeScript know that those are a `string[]` or a `Status`, we can cast them to TypeScript definitely knows what they are.
- Our linting rules make us explicitly ignore promises returned if we're not going to use them, hence the `void`.
- Again we have to cast our API response into the type we know it's going to be.
