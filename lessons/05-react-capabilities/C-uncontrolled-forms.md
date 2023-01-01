---
description: ""
---

We also want to move SearchParms to use react-query but we have a problem: if we just plug `location` directly into the cache key as-is we will make a new request on _every_ keystroke of the user. That may be what you want but it's not the behavior we had before and for now we want to stay with that.

But what about animal and breed? We _do_ want to react to animal changing on the breed drop down. So how we do handle that too?

We're going to mix an uncontrolled form in with tracking _just_ animal as a controlled input.

Before we get too far, let's split out requestPets into a file called fetchSearch.js

```javascript
async function fetchSearch({ queryKey }) {
  const { animal, location, breed } = queryKey[1];
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!res.ok)
    throw new Error(`pet search not okay: ${animal}, ${location}, ${breed}`);

  return res.json();
}

export default fetchSearch;
```

From there let's go modify SearchParams.jsx

```javascript
// at top
// remove useEffect import from 'react' import
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";

// inside render, at top
// delete location and breed useState calls
const [requestParams, setRequestParams] = useState({
  location: "",
  animal: "",
  breed: "",
});

const results = useQuery(["search", requestParams], fetchSearch);
const pets = results?.data?.pets ?? [];

// delete useEffect

// delete requestPets

// replace the form submit function body
e.preventDefault();
const formData = new FormData(e.target);
const obj = {
  animal: formData.get("animal") ?? "",
  breed: formData.get("breed") ?? "",
  location: formData.get("location") ?? "",
};
setRequestParams(obj);

// remove onChange and onBlur functions for breed and location select and input
// remove value={location} / value={animal} / value={breed} from three input / selects
// add name="animal" / name="location" / name="breed" to the three input / selects
```

- Notice how much faster it is going back-and-forth from one search query and back to another. The cache for this is fast and easy to use
- We no longer have _any_ useEffect calls in our code. This won't always be the case but it's a nice thing to have. useEffect calls are a lot more difficult to get your head around. Where you have alternatives (like react-query) I suggest avoiding useEffect calls and offload that async code to a smart library like react-query
- We're now doing an uncontrolled form with React (which unless you have specific validation needs or dependencies like we do with animal, I suggest you always do). We don't have to have verbose two-way data binding code to control the form, we can just wait until a users submits, gather the data, and ship it off to the API
- We do have a controlled input on animal to properly have it determine the useBreedList animal. But we're not using the controlled input to submit the form, we're just using the form event anyway

There you go! Now our app is totally powered by react-query and no more effects in the App. I showed you how to write useEffect because it is a critical tool to know how to use with React and central to it, but I wanted to show you how to write it and then refactor it out later.

> 🏁 [Click here to see the state of the project up until now: 10-uncontrolled-forms][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/10-uncontrolled-forms
