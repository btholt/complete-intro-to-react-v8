---
description: "You can even make your own hooks! Brian shows how to extract logic out of a component to share a hook across components!"
---

For now, we're going to make a custom hook of our own. Just like `useState` is a hook, there are a few others like `useEffect` (which we'll use in this lesson), `useReducer` (for doing Redux-like reducers), `useRefs` (for when you need to have programmatic access to a DOM node), and `useContext` (for using React's context which we'll do shortly as well.) But like React hooks, we can use these hooks to make our re-usable hooks.

We need a list of breeds based on which animal is selected. In general this would be nice to request _once_ and if a user returns later to the same animal, that we would have some cache of that. We could implement in the component (and in general I probably would, this is overengineering it for just one use) but let's make a custom hook for it.

Make a new file called `useBreedList.js` in src and put this in it.

> .js or .jsx here, doesn't matter. It doesn't technically need JSX but I'm also fine with the "I don't want to think about it" approach to it as well.

```javascript
import { useState, useEffect } from "react";

const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
```

- We're using hooks inside of our custom hook. I can't think of a custom hook you would make that wouldn't make use of other hooks.
- We're returning two things back to the consumer of this custom hook: a list of breeds (including an empty list when it doesn't have anything in it) and an enumerated type of the status of the hook: unloaded, loading, or loaded. We won't be using the enum today but this is how I'd design it later if I wanted to throw up a nice loading graphic while breeds were being loaded.
- We're tossing in `localCache` so if it loads once, it won't have to reload the same API call in the same session. You could take this further by sticking it in local storage or we could be more intelligent about ETags.

Head over to SearchParams.jsx and put this in there.

```javascript
import useBreedList from "./useBreedList";

// replace `const breeds = [];`
const [breeds] = useBreedList(animal);
```

That should be enough! Now you should have breeds being populated everything you change animal! (Do note we haven't implemented the submit button yet though.)

> 🏁 [Click here to see the state of the project up until now: 06-custom-hooks][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/06-custom-hooks
