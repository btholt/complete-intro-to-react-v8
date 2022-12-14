---
description: "Brian quickly converts useBreedList.ts"
---

Now let's go do useBreedList.ts.

```javascript
import { QueryStatus, useQuery } from "@tanstack/react-query";
import { Animal } from "./APIResponsesTypes";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal: Animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);

  return [results?.data?.breeds ?? [], results.status] as [
    string[],
    QueryStatus
  ];
}
```

- We need to type the parameter as an Animal. If we're going to assert it's an animal we have to have that type follow it around.
- We need to use `as` here to tell TypeScript we explictly expect it to be a length 2 array with the first item being a string array (which could be empty) and the second item being a loading status. Otherwise TypeScript thinks it's a heterogenous array where any item could be any of those types.
