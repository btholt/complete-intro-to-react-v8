---
description: ""
---

Redux is a well-known library that does state management for you, very similarly to how we used context. With context, you use the provider and consumer as a sort of portal to skip passing parameters through every component. With Redux, we're taking the state management _out_ of React entirely and moving it to a separate store.

Why do we have Redux?

1. Context used to be a lot worse to use and less useful. This made Redux (or Redux-like) management tools the only option
1. Redux code is _extremely testable_. This is probably the most compelling reason to use it. Having your state mutation be broken up in such a way to make it easy to test is fantastic. This is also mitigated because we have `useReducer` now.
1. The debugging story is pretty good.

So given that we do now have the next context API, how often will I use Redux? Never, I anticipate. I rarely had problems that Redux solved (they exist; I just didn't have them) and the few cases now where I would see myself using Redux I think React's context would cover it. But if Redux speaks to you, do it! Don't let me stop you. It's a great library. Just be cautious. And there are reasons to use it: if you have complex orchestrations of async data, Redux can be immensely useful and I _would_ use it for that.

Okay, let's get started. React state management is pretty simple: call setState and let React re-render. That's it! Now there's a few steps involved.

1. User types in input box
1. Call action creator to get an action
1. Dispatch action to Redux
1. Redux inserts the action into the root reducer
1. The root reducer delegates that action to the correct reducer
1. The reducer returns a new state given the old state and the action object
1. That new state becomes the store's state
1. React is then called by Redux and told to update

So what was one step became several. But each step of this is testable, and that's great. And it's explicit and verbose. It's long to follow, but it's an easy breadcrumb trailer to follow when things go awry. So let's start writing it:

Run `npm install redux@4.0.5 react-redux@7.2.2`. Create store.js and put in it:

```javascript
import { createStore } from "redux";
import reducer from "./reducers";

const store = createStore(
  reducer,
  typeof window === "object" &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

export default store;
```

We're including the dev tools middleware (I'll show you at the end.) This is the base of a store: a reducer. A store is just basically a big object with prescribed ways of changing it. So let's go make our first reducer.
