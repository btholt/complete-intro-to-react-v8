---
description: ""
---

Okay, let's make another page use Redux, our SearchParams.jsx

This is a bit of a contrived example so stick with me here. Let's say we have the following product requirements:

- When a user searches for something, then clicks on a pet, then clicks back, we want to show the same search results
- We still want to leave our search params form as uncontrolled components

So how would we do that? We need something that's going to have survive state changes between page loads. Redux is perfect for that sort of app state. Let's see how we'd do that.

Start with a searchParamsSlice.js

```javascript
import { createSlice } from "@reduxjs/toolkit";

export const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState: {
    value: {
      location: "",
      breed: "",
      animal: "",
    },
  },
  reducers: {
    all: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { all } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
```

You could have an individual reducer for each of location, breed, and animal but we don't need that now. Right now the only place we set those (the form submit) we do it all at once. So this is good as is.

In store.js

```javascript
// at top
import searchParams from "./searchParamsSlice";

// inside reducers
searchParams,
```

In SearchParams.jsx

```javascript
// at top
import { useSelector, useDispatch } from "react-redux"; // add dispatch
import { all } from "./searchParamsSlice";

// with other hooks
const dispatch = useDispatch();
const adoptedPet = useSelector((state) => state.adoptedPet.value);
const searchParams = useSelector((state) => state.searchParams.value);
const results = useQuery(["search", searchParams], fetchSearch); // replace requestParams

// replace setRequestParams in form submit
dispatch(all(obj));
```

Not too bad, right? Now if you back and forth the app state is preserved between page loads. The form isn't reflecting it because we left the form uncontrolled. As an exercise you could go back and make it a controlled form so that would change too.
