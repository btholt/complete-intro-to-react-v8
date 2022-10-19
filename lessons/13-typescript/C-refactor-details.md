---
description: "Brian quickly converts Details.tsx"
---

Let's go fix another file. Details.tsx. Before we get into the file, make a new file called `APIResponsesTypes.ts`. In there put

```typescript
export type Animal = "dog" | "cat" | "bird" | "reptile" | "rabbit";

export interface Pet {
  id: number;
  name: string;
  animal: Animal;
  description: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
}

export interface PetAPIResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: Pet[];
}
```

- This allows us to resuse these response types anywhere we reference the API responses and have an enforceable shape that TypeScript knows what to do with.
- We made `Animal` a type instead of an interface. This confuses people a lot and the sum of the answer is it frequently doesn't matter which you choose. The general advice is "use interfaces unless you need type aliases". Here we wanted to have a type alias that just allows a few different strings, something an interface can't do but a type can.

Onto Details. Rename it Details.tsx

```tsx
// grab the type
import { PetAPIResponse } from "./APIResponsesTypes";

// replace at top of render function
if (!id) {
  throw new Error("no id provided to details");
}
const results = useQuery<PetAPIResponse>(["details", id], fetchPet);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [_, setAdoptedPet] = useContext(AdoptedPetContext);

// replace pet declaration
const pet = results?.data?.pets[0];
if (!pet) {
  throw new Error("pet not found");
}

// remove {...props} and props parameter from the DetailsErrorBoundary component
```

- We need to type our query response with a generic.
- If ID comes back as undefined we have to exit this route. We can use the error boundary to help us out here.
- The unused-var rule is augmented in the TypeScript version so we have to update our ignore.
- Since we can come back as undefined or something else, we do have to account for "what if it loads but it's not a pet?" In this case we're just going to lean into our error boundary.
- We either need to type props or get rid of them. While I liked the seamless pass through, TypeScript requires you to be explicit all the time.
