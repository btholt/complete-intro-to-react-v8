---
description: ""
---

Make a new folder in src called `reducers`. Create a file called `index.js` in reducers and put:

```javascript
import { combineReducers } from "redux";
import location from "./location";

export default combineReducers({
  location,
});
```

combineReducers is a convenience function from Redux so you don't have to write your own root reducer. You can if you want to; this is just a bit easier. So now we have a root reducer that will delegate all changed to the `location` key to this reducer. So let's go make it. Make a file called `location.js` and put in it:

```javascript
export default function location(state = "Seattle, WA", action) {
  switch (action.type) {
    case "CHANGE_LOCATION":
      return action.payload;
    default:
      return state;
  }
}
```

Not very difficult. A reducer takes an old state, an action, and combines those things to make a state. In this case, if the state is `San Francisco, CA` and some calls it with the action `{type: 'CHANGE_LOCATION': payload: 'Salt Lake City, UT' }` then the _new_ state location would be Salt Lake City, UT.

A reducer must have a default state. In our case, using ES6 default params, we made Seattle, WA our default state. This is how Redux will initialize your store, by calling each of your reducers once to get a default state.

The shape of the action object is up to you but there is a thing called [Flux Standard Action][fsa] that some people adhere to to make building tools on top of actions easier. I've not used any of those tools but I also don't have a good reason _not_ to use this shape so I do. In sum, make your action shapes be `{ type: <[String, Number], required>, payload: <any?>, error: <any?>, meta: <any?> }`. The type could in theory be a Symbol too but it messes up the dev tools.

Reducers are synchronous: they cannot be async. They also must be pure with no side-effects. If you call a reducer 10,000,000 times with the same state and action, you should get the same answer on the 10,000,001st time.

Okay, so now we understand how, once given a state and an action, we can make a reducer. We haven't made nor dispatched those actions yet but we're getting there. Let's make the other reducers.

theme.js

```javascript
export default function theme(state = "darkblue", action) {
  switch (action.type) {
    case "CHANGE_THEME":
      return action.payload;
    default:
      return state;
  }
}
```

animal.js

```javascript
export default function animal(state = "", action) {
  switch (action.type) {
    case "CHANGE_ANIMAL":
      return action.payload;
    default:
      return state;
  }
}
```

breed.js

```javascript
export default function breed(state = "", action) {
  switch (action.type) {
    case "CHANGE_BREED":
      return action.payload;
    default:
      return state;
  }
}
```

index.js

```javascript
import { combineReducers } from "redux";
import location from "./location";
import theme from "./theme";

export default combineReducers({
  location,
  theme,
  animal,
  breed,
});
```
