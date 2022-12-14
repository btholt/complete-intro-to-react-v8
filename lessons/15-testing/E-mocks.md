---
description: ""
---

Let's write a second test for actually making a request with our custom hook, useBreedList. But we have a problem: we don't actually want to `fetch` from our API. This can be slow and cause unnecessary load on a server or unnecessary complexity of spinning up a testing API. We can instead mock the call. A mock is a fake implementation. We _could_ write our own fake fetch but a good one already exists for Vitest called vitest-fetch-mock so let's install that. Run

```bash
npm install -D vitest-fetch-mock@0.2.1
```

We now need to make it so Vitest implements this mock before we run our tests. We can make it run a set up script by putting this in our vite.config.js:

```javascript
// inside "test"
setupFiles: ["./setupVitest.js"],
```

Then let's make a file in src called setupVitest.js.

```javascript
import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();
```

Easy, right? Now it will fake all calls to fetch and we can provide fake API responses. We could provide a whole fake implementation here but let's do it in the testing code itself. If I was doing a lot of fake API calls, I might generate an [OpenAPI][openapi] spec and use that to generate a fake API but that's pretty advance. Start small and grow when you hit barriers.

Okay, now go back to our useBreedList.test.js and add:

```javascript
// grab waitFor
import { renderHook, waitFor } from "@testing-library/react";

// add at bottom
test("gives back breeds with an animal", async () => {
  const breeds = [
    "Havanese",
    "Bichon Frise",
    "Poodle",
    "Maltese",
    "Golden Retriever",
    "Labrador",
    "Husky",
  ];
  fetch.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    })
  );
  const { result } = renderHook(() => useBreedList("dog"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  await waitFor(() => expect(result.current[1]).toBe("success"));

  const [breedList] = result.current;
  expect(breedList).toEqual(breeds);
});
```

The `waitFor` allows us to sit back and wait for all of React's machinery to churn through the updates, effects, etc. until our data is ready for us to check on. And that's it! In general you should mock API calls. It will make tests run much faster and save unnecessary load on an API.

[openapi]: https://swagger.io/
