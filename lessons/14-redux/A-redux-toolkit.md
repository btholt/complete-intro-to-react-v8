---
description: ""
---

> Please start with a fresh copy of this app: [Adopt Me!][app]

Redux is a well-known library that does state management for you, very similarly to how we used context. With context, you use the provider and consumer as a sort of portal to skip passing parameters through every component. With Redux, we're taking the state management _out_ of React entirely and moving it to a separate store.

Why do we have Redux?

1. Context used to be a lot worse to use and less useful. This made Redux (or Redux-like) management tools the only option
1. Redux code is _extremely testable_. This is probably the most compelling reason to use it. Having your state mutation be broken up in such a way to make it easy to test is fantastic. This is also mitigated because we have `useReducer` now.
1. The debugging story is very good.

So given that we do now have the next context API, how often will I use Redux? That answer was previously "never" but now it's probably "sometimes" because of how good a project called Redux Toolkit is (which I will call RTK from now on, as does everyone else.) RTK took the hard parts of Redux and made them much more simple.

Okay, let's get started. React state management is pretty simple: call setState and let React re-render. That's it! With plain Redux without RTK it used to be:

1. User types in input box
1. Call action creator to get an action
1. Dispatch action to Redux
1. Redux inserts the action into the root reducer
1. The root reducer delegates that action to the correct reducer
1. The reducer returns a new state given the old state and the action object
1. That new state becomes the store's state
1. React is then called by Redux and told to update

So what was one step became several. But each step of this is testable, and that's great. And it's explicit and verbose. It's long to follow, but it's an easy breadcrumb trailer to follow when things go awry.

But now it's much easier. RTK cuts out a lot of that boiler plate and made it much easier to write and not have to write all that boilerplate.

So let's get started. Run

```bash
npm install @reduxjs/toolkit@1.8.6 react-redux@8.0.4
```

Create store.js and put in it:

```javascript
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

export default store;
```

In App.jsx

```javascript
// delete AdoptedPetContext import
// delete useState import from React

// add import at top
import { Provider } from "react-redux";
import store from "./store";

// delete useState call in function
// delete <AdoptedPetContext.Provder> component

// first component inside BrowserRouter
<Provider store={store}>[…]</Provider>;
```

This is the base store. The store is a centralized repo of data for your app. Think of it almost like a local database you can send queries and mutations too. It doesn't totally eclipse the need of local `useState` in React but it does in _some_ of the cases. Typically it's going to be for app state sort of things. A general good rule of thumb is "if this component unmounts, do I want to keep the state?" If yes, might be app state and belongs in Redux. If no, probably not.

So let's go make our existing context adopted pet in Redux instead of React context.

- Delete AdoptedPetContext.js
- Create adoptedPetSlice.js

In there put:

```javascript
import { createSlice } from "@reduxjs/toolkit";

export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState: {
    value: null,
  },
  reducers: {
    adopt: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { adopt } = adoptedPetSlice.actions;

export default adoptedPetSlice.reducer;
```

- Here you name your slice (what we're calling a bundle of reducers, state, and action creators)
- You give it an initial state
- You give it any reducers we need in our case, we just want a simple action that sets whatever the payload is to be what's stored. This common. Sometimes you may want to do some processing or math or something like that.
- RTK takes the liberty of making action creators and the actual reducers for you. This was something you used to have to code by hand.
- We export the reducer to use in the store.js file.

Okay let's go _use this_. Go back to store.js

```javascript
import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adoptedPetSlice";

const store = configureStore({
  reducer: {
    adoptedPet,
  },
});

export default store;
```

Add the reducer from the slice we created.

Okay, now in Details.jsx

```javascript
// add at top
// delete import AdoptedPetContext from "./AdoptedPetContext";
import { useState } from "react"; // drop useContext
import { useDispatch } from "react-redux";
import { adopt } from "./adoptedPetSlice";

// delete the next two lines
// eslint-disable-next-line no-unused-vars
// const [_, setAdoptedPet] = useContext(AdoptedPetContext);

// add with the hooks at the top
const dispatch = useDispatch();

// replace setAdoptedPet
<button
  onClick={() => {
    dispatch(adopt(pet));
    navigate("/");
  }}
>
  […]
</button>;
```

This is how to use Redux from a write perspective (we'll look at read in a sec.) You use `dispatch` functions to dispatch an action (which `adopt` does for us). That payload will eventually be passed to the reducer we made which will update our store. Redux handles all of the informing React of when to re-render. If this feels a lot like context is because it works much the same way. They both inspired each others' design.

Okay, let's go do writing. Hop on over to SearchParams.js

```jsx
// delete import AdoptedPetContext from "./AdoptedPetContext";

import { useState } from "react"; // drop useContext
import { useSelector } from "react-redux";

// delete const [adoptedPet] = useContext(AdoptedPetContext);
const adoptedPet = useSelector((state) => state.adoptedPet.value);
```

That's it! You give `useSelector` a function that takes in the entire state tree and gives back just what you need. Keep in mind this is a subscription function: it will use this function to judge whether or not it needs to re-render your component. So don't just give it `state => state` or else it'll re-render on _every state change ever_ which is likely not what you want.

Again, this is all fairly similar to Context but it definitely has its upsides. Slices are easy to test. And it externalize React's app state management from React itself. This means you can treat state mutation separately from UI which is generally a good thing. RTK made this much more palatable.

[app]: https://github.com/btholt/citr-v8-project/tree/master/14-context