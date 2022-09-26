---
description: ""
---

Okay, let's go integrate this now where context was being used before. Go to App.js:

```javascript
// delete ThemeContext, useState import

// import
import { Provider } from "react-redux";
import store from "./store";

// delete useState call
// delete ThemeContext

// wrap app with
<Provider store={store}>[…]</Provider>;
```

Feels nice deleting a lot of code, right?

Just like context makes your store available anywhere in your app, so does Provider.

Now that Redux is available everywhere, let's go add it to SearchParams.js

```javascript
// replace ThemeContext import
// delete useContext import
import { useSelector } from "react-redux";

// replace context and some usestate references
const animal = useSelector((state) => state.animal);
const location = useSelector((state) => state.location);
const breed = useSelector((state) => state.breed);
const theme = useSelector((state) => state.theme);
```

This is the newer, hooks-based API for react-redux. This allows you to provide it a selector function that will pluck the bit of state you need from Redux. Very clean, I quite like it. We'll see the older, connect-based one here in a bit.
