---
description: "Brian refactors from JavaScript to TypeScript all of the fetching"
---

For fetchPet.ts

```javascript
import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponse } from "./APIResponsesTypes";

const fetchPet: QueryFunction<PetAPIResponse, ["details", string]> = async ({
  queryKey,
}) => { … }
```

- QueryFunction is a nice type we can use to not have to type ourselves
- This forces the return type to be a PetAPIResponse
- This makes sure that our fetchPet is only used with the 'details' key and that the second part of the query key is a string (otherwise it could be `unknown`)

Next let's do fetchSearch.ts

```javascript
import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponse } from "./APIResponsesTypes";

const fetchSearch: QueryFunction<
  PetAPIResponse,
  [
    "search",
    {
      location: string;
      animal: string;
      breed: string;
    }
  ]
> = async function ({ queryKey }) { … }
```

Same thing. We refactored to an assignment of a function because it types more easily that way.

Next let's do fetchBreedList.ts. First we need to add a new API response type to our APIResponseTypes.ts

```javascript
export interface BreedListAPIResponse {
  animal: Animal;
  breeds: string[];
}
```

Now go back to fetchBreedList.ts

```javascript
import { QueryFunction } from "@tanstack/react-query";
import { BreedListAPIResponse, Animal } from "./APIResponsesTypes";

const fetchBreedList: QueryFunction<
  BreedListAPIResponse,
  ["breeds", Animal]
> = async ({ queryKey }) => { … }
```

Here we're explicitly making sure our string key is an Animal type and therefore we cannot have an invalid string. A little extra type defense that's pretty cheap. I'm a fan!

> 🏁 [Click here to see the state of the project up until now: typescript-3][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/typescript-3
