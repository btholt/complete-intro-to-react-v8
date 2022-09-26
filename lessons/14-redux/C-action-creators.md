---
description: ""
---

Let's go make the action creators. These are the functions that the UI gives to the store to effect change: actions. These functions create actions.

Create a new folder called actionCreators and put in changeTheme.js

```javascript
export default function changeTheme(theme) {
  return { type: "CHANGE_THEME", payload: theme };
}
```

That's it! This one is the simplest form: create an object and return it. Some people will inline these action shapes in their React components. I prefer this because it makes refactors simple. Let's make the other two:

changeLocation.js

```javascript
export default function changeLocation(location) {
  return { type: "CHANGE_LOCATION", payload: location };
}
```

changeAnimal.js

```javascript
export default function changeAnimal(location) {
  return { type: "CHANGE_ANIMAL", payload: location };
}
```

changeLocation.js

```javascript
export default function changeBreed(location) {
  return { type: "CHANGE_BREED", payload: location };
}
```

That's it for action creators. In previous versions of this course, I taught how to do async actions so [check this out if you want to see that][v4-async]. there are a thousand flavors of how to do async with Redux. The most popular are [redux-observable][ro], [redux-saga][rs], [redux-promise][rp], and [redux-thunk][rt]. I showed how to use redux-thunk because it's simplest: the others are more powerful but more complex.

[fsa]: https://github.com/redux-utilities/flux-standard-action
[ro]: https://github.com/redux-observable/redux-observable
[rs]: https://redux-saga.js.org/
[rp]: https://docs.psb.codes/redux-promise-middleware/
[rt]: https://github.com/reduxjs/redux-thunk
