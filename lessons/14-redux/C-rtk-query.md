---
description: ""
title: "RTK Query"
---

Very similar to @tanstack/react-query that we saw in Complete Intro, there is a Redux Toolkit Query (always abbreviated as RTK Query). It works extremely similarly to react-query but with a Redux twist on it. If you're using Redux, I recommend you use RTK Query instead of react-query. Likewise I wouldn't introduce RTK to your app _just_ to use RTK Query. Just know both are similar and are wonderful to work with.

So we're going to replace all of our uses of react-query with RTK Query.

Make a file called petApiService.js. In there put:

```javascript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  endpoints: (builder) => ({
    getPet: builder.query({
      query: (id) => ({ url: "pets", params: { id } }),
      transformResponse: (response) => response.pets[0],
    }),
  }),
});

export const { useGetPetQuery } = petApi;
```

- With RTK query you build these services around base URLs. In our case, our API is all on the same path so it all works out well. You then build endpoints which have their own sort of URL builders.
- We built a getPet endpoint. It takes in an ID and then uses that as a URL query parameter. So with that with an ID of 4 the URL built would be the `baseUrl` + the endpoint `url` + the params so http://pets-v2.dev-apis.com/pets?id=4
- `transformResponse` is so you can extract the actual part of the response you want to keep. We just want the first pet in the pets array so we nab that.
- Finally `createApi` will create a hook for you to use in your app so we're going to export that.

Okay, let's go put it in store.js now

```javascript
import { petApi } from "./petApiService"; // import service

const store = configureStore({
  reducer: {
    adoptedPet,
    searchParams,
    [petApi.reducerPath]: petApi.reducer, // add reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petApi.middleware), // add middleware
});

export default store;
```

- We need to add our reducer to our store. RTK query will cache our responses directly in our Redux store for us with its generated reducers but we do need to add it to our store
- The middleware isn't strictly necessary but it does allow for additional feature like caching, invalidation, refetching, etc. I just always add it. But your app with basic caching does work without the middleware.

Okay! Now we're ready to use this in React! Let's head to Details.jsx

```javascript
// remove useQuery import
// remove fetchPet import
import { useGetPetQuery } from "./petApiService";

// delete const results = useQuery(["details", id], fetchPet);

const { isLoading, data: pet } = useGetPetQuery(id);

if (isLoading) { // remove results.
  […]
}
```

And now it should work!! As you can see, very similar to react-query. Let's quickly do the other requests.

Back in petApiService.js

```javascript
// add two endpoints
endpoints: (builder) => ({
  […]
  getBreeds: builder.query({
    query: (animal) => ({ url: "breeds", params: { animal } }),
    transformResponse: (response) => response.breeds,
  }),
  search: builder.query({
    query: ({ animal, location, breed }) => ({
      url: "pets",
      params: { animal, location, breed },
    }),
    transformResponse: (response) => response.pets,
  }),
}),

export const { useGetBreedsQuery, useGetPetQuery, useSearchQuery } = petApi; // add exports
```

Now to useBreedList.js

```javascript
import { useGetBreedsQuery } from "./petApiService";

// delete these two
// import { useQuery } from "@tanstack/react-query";
// import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal) {
  // delete this line
  // const results = useQuery(["breeds", animal], fetchBreedList);

  const { data: breeds, isLoading } = useGetBreedsQuery(animal, {
    skip: !animal,
  });

  if (!animal) {
    return [[], "loaded"];
  }

  return [breeds ?? [], isLoading ? "loading" : "loaded"];
}
```

- Very close to what we had.
- We're telling the hook "hey, if there's no animal, don't fetch. Give the user back an empty array"
- I'm being lazy with the isLoaded status. You could look at `isLoaded`, `isFetching`, `isError`, `isSuccess`, etc. and come up with a better system. We're not using it so I'm not working too hard on it.

Last one. Head to SearchParam.jsx

```javascript
// remove imports for fetchSearch and useQuery
import { useSearchQuery } from "./petApiService";

// replace useQuery call
const { data: pets } = useSearchQuery(searchParams);
pets = pets ?? [];
```

That's it! Congrats! You're now using RTK query. Again, this is awesome if you're already in Redux land but I end up mostly using react-query because I don't use Redux as much these days.
