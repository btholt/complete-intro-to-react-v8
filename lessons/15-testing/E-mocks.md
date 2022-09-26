---
description: ""
---

Let's write a second test for actually making a request with our custom hook, useBreedList. But we have a problem: we don't actually want to `fetch` from our API. This can be slow and cause unnecessary load on a server or unnecessary complexity of spinning up a testing API. We can instead mock the call. A mock is a fake implementation. We _could_ write our own fake fetch but a good one already exists for Jest called jest-fetch-mock so let's install that. Run `npm install -D jest-fetch-mock@3.0.3`.

We now need to make it so Jest implements this mock before we run our tests. We can make it run a set up script by putting this in our package.json:

```json
{
  "jest": {
    "automock": false,
    "setupFiles": ["./src/setupJest.js"]
  }
}
```

Then let's make a file in src called setupJest.js.

```javascript
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();
```

Easy, right? Now it will fake all calls to fetch and we can provide fake API responses. We could provide a whole fake implementation here but let's do it in the testing code itself. If I was doing a lot of fake API calls, I might generate an [OpenAPI][openapi] spec and use that to generate a fake API but that's pretty advance. Start small and grow when you hit barriers.

Okay, now go back to our useBreedList.test.js and add:

```javascript
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
  const { result, waitForNextUpdate } = renderHook(() => useBreedList("dog"));

  await waitForNextUpdate();

  const [breedList, status] = result.current;
  expect(status).toBe("loaded");
  expect(breedList).toEqual(breeds);
});
```

The `waitForNextUpdate` allows us to sit back and wait for all of React's machinery to churn through the updates, effects, etc. until our data is ready for us to check on. And that's it! In general you should mock API calls. It will make tests run much faster and save unnecessary load on an API.

[openapi]: https://swagger.io/
