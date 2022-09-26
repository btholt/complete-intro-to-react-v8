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
// imports
import { withRouter, RouteComponentProps } from "react-router-dom";
import { PetAPIResponse, Animal } from "./APIResponsesTypes";

class Details extends Component<RouteComponentProps<{ id: string }>> { … }

// add public to methods

// replace state
state = {
  loading: true,
  showModal: false,
  animal: "" as Animal,
  breed: "",
  city: "",
  state: "",
  description: "",
  name: "",
  images: [] as string[],
};

// inside componentDidMount
const json = (await res.json()) as PetAPIResponse;

// add href to toggleModal
adopt = () => (window.location.href = "http://bit.ly/pet-adopt");

// error boundary
const DetailsErrorBoundary: FunctionComponent = function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
};

export default DetailsErrorBoundary;
```

- We need to tell TypeScript what props each component expects. Now when you import that component elsewhere, TS will make sure the consumer passes all the right props in.
- We need to use React Router's RouteComponentProps params because the ID param will come from the router, not directly from the consumer.
- We have to give all state a default setting. This prevents errors on the initial render and it gives TypeScript the ability to infer all your types.
- It can't tell what type photos is so we tell it's an array of strings from the pet library.
- We had to add `.href` to the end of location. Technically that API expect a Location object but it just works with a string. With TS we need to be a bit more adherent to the spec so we'll do it the correct by setting `.href`.
- TS still won't be happy because our other pages haven't been typed yet. We're getting there.
- We changed up the export a bit so we could just use FunctionComponent. This will ease using it in other places because TypeScript knows for a fact this is a FunctionComponent.

> 🏁 [Click here to see the state of the project up until now: typescript-2][step]

[step]: https://github.com/btholt/citr-v7-project/tree/master/typescript-2
