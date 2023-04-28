---
description: "useEffect is a critical hook for React, allowing developers to do asynchronous actions like making HTTP requests"
---

We have enough to start making some requests now. We want the app to request an initial set of pets on initial load of the page. So let's make that happen using a special hook called `useEffect`. `useEffect` allows you to say do a render of this component first so the user can see _something_ then as soon as the render is done, _then_ do something (the something here being an effect). In our case, we want the user to see our UI first then we want to make a request to the API so we can initialize a list of pets.

Add this to SearchParams.jsx:

```javascript
// change import at top
import { useEffect, useState } from "react";
import Pet from "./Pet";

// add to the other useStates inside component at top
const [pets, setPets] = useState([]);

// add inside component, beneath all the `useState` setup
useEffect(() => {
  requestPets();
}, []); // eslint-disable-line react-hooks/exhaustive-deps

async function requestPets() {
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );
  const json = await res.json();

  setPets(json.pets);
}

// in jsx, under form, inside the larger div
{
  pets.map((pet) => (
    <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id} />
  ))
}
```

- We're taking advantage of closures here that if we define the requestPets function _inside_ of the render that it will have access to that scope and can use all the hooks there.
- We could have actually put requestPets inside of the effect but we're going to use it again here in a sec with the submit button.
- the `[]` at the end of the useEffect is where you declare your data dependencies. React wants to know _when_ to run that effect again. You don't give it data dependencies, it assumes any time any hook changes that you should run the effect again. This is bad because that would mean any time setPets gets called it'd re-run render and all the hooks again. See a problem there? It'd run infinitely since requestPets calls setPets.
- You can instead provide which hooks to watch for changes for. In our case, we actually only want it to run once, on creation of the component, and then to not run that effect again. (we'll do searching later via clicking the submit button) You can accomplish this only-run-on-creation by providing an empty array.
- The `// eslint-disable-line react-hooks/exhaustive-deps` tells eslint to shut up about this one run on this one line. Why? Because eslint tries to help you with you the data dependencies rule by watching for anything that _could_ change. In this case, in theory the function could change but we know it's not important. You'll end up silencing this rule a fair bit.
- We could solve this by moving the requestPets function inside the effect and rely on React to call the fetch upon effect. This strategy would mean any time a user types in the location (and thus calls setState on the location) it'd request from the API. This could work for you but for now we'll retain more control and just do it on submit events. It's all about managing when those effects go off. For now we just want this effect run once at the beginning and then not again.
- At the end, we gather take the pets we got back from the API and create Pet components out of each of them.

> 🏁 [Click here to see the state of the project up until now: 05-useeffect][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/05-useeffect
