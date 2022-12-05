---
description: "Context allows you to share state across an entire app. While a powerful feature it has drawbacks which Brian discusses here."
---

What is context? Context is like state, but instead of being confined to a component, it's global to your application. It's application-level state. This is dangerous. Avoid using context until you _have_ to use it. One of React's primary benefit is it makes the flow of data obvious by being explicit. This can make it cumbersome at times but it's worth it because your code stays legible and understandable. Things like context obscure it.

Context (mostly) replaces Redux. Well, typically. It fills the same need as Redux. I really can't see why you would need to use both. Use one or the other.

Again, this is a contrived example. What we're doing here is overkill and should be accomplished via React's normal patterns. A better example would be something like a user's logged-in information. But let's check out what this looks like with theme.

Imagine if a user adopts an animal that we want to show that user that pet as they navigate around the site. A sort of shopping cart experience of sorts. In our case, we're going to make it if a user clicks "Yes" on the modal to adopt a pet, it's going to show that pet's picture at the top of the search facets as a shopping cart of sorts. A shopping cart would be a valid use case for context.

Make a new file called AdoptedPetContext.js:

```javascript
import { createContext } from "react";

const AdoptedPetContext = createContext();

export default AdoptedPetContext;
```

`createContext` is a function that returns an object with two React components in it: a Provider and a Consumer. A Provider is how you scope where a context goes. A context will only be available inside of the Provider. You only need to do this once.

A Consumer is how you consume from the above provider. A Consumer accepts a function as a child and gives it the context which you can use. We won't be using the Consumer directly: a function called `useContext` will do that for us.

The object provided to context is the default state it uses when it can find no Provider above it, useful if there's a chance no provider will be there and for testing. It's also useful for TypeScript because TypeScript will enforce these types. We'll look more at this in Intermediate React when looking at TypeScript.

You do not have to use context with hooks; [see v4 of this course][v4] if you want to see how to do it without hooks.

Let's go to App.jsx

```javascript
// import useState and AdoptedPetContext
import { useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";

// top of App function body
const adoptedPet = useState(null);

// wrap the rest of the app inside of BrowserRouter
<AdoptedPetContext.Provider value={adoptedPet}>[…]</AdoptedPetContext.Provider>;
```

- We're going to use the `useState` hook because the adopted pet is actually going to be kept track of like any other piece of state: it's not any different. You can think of context like a wormhole: whatever you chuck in one side of the wormhole is going to come out the other side.
- You have to wrap your app in a `Provider`. This is the mechanism by which React will notify the higher components to re-render whenever our context changes. Then whatever you pass into the value prop (we passed in the complete hook, the value and updater pair) will exit on the other side whenever we ask for it.
- Note that the adopted pet will only be available _inside_ of this provider. So if we only wrapped the `<Details>` route with the Provider, that context would not be available inside of `<SearchParams />`.
- Side note: if your context is _read only_ (meaning it will _never change_) you actually can skip wrapping your app in a Provider.

Next let's go to Details.jsx:

```javascript
// import at top
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdoptedPetContext from "./AdoptedPetContext";

// top of Details function body
const navigate = useNavigate();
const [, setAdoptedPet] = useContext(AdoptedPetContext);

// replace Yes button
<button
  onClick={() => {
    setAdoptedPet(pet);
    navigate("/");
  }}
>
  Yes
</button>;
```

- Here we are setting the "adopted" pet to using the setter of the hook when the user clicks yes
- Upon clicking yes we want to set the adopted pet via the context and then navigate the user to the home page so they can see what they did. The `useNavigate` hook gives back a `navigate` function from react-router-dom that allows you to navigate to a different page
- We don't have to set the modal to hide. The whole page is about to unmount so no need to

Let's go do this in SearchParams.jsx

```javascript
// import
import { useContext, useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";

// add at top of SearchParams render function
const [adoptedPet] = useContext(AdoptedPetContext);

// just inside <form>
{
  adoptedPet ? (
    <div className="pet image-container">
      <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
    </div>
  ) : null; // you have to remove this semi-colon, my auto-formatter adds it back if I delete it
}
```

- We're consuming the state from SearchParams. But you can imagine doing this in several places in the app. You could head off to a "finalize adoption" page and have all that data ready.
- Consuming context from a class component is more verbose. [See v7 of this course][v7] to see that if you're interested. Instead of doing a pet to adopt, we did theming.

That's it for context! Something like shopping carts, theming, or logged-in user data would be perfect for context. It's for app-level data. Everything else should be boring-ol' state.

> 🏁 [Click here to see the state of the project up until now: 14-context][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/14-context
[v4]: https://btholt.github.io/complete-intro-to-react-v4/context
[v7]: https://btholt.github.io/complete-intro-to-react-v7/lessons/special-case-react-tools/context
