---
description: ""
---

Let's say we needs tests for our custom hook, useBreedList. Testing custom hooks is a bit of a trick because they are inherently tied to the internal workings of React: they can't be called outside of a component. So how we do we get around that? We fake a component! Make a file called useBreedList.test.jsx in our `__tests__` directory.

```javascript
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../useBreedList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    },
  },
});

function getBreedList(animal) {
  let list;

  function TestComponent() {
    list = useBreedList(animal);
    return null;
  }

  render(
    <QueryClientProvider client={queryClient}>
      <TestComponent />
    </QueryClientProvider>
  );

  return list;
}

test("gives an empty list with no animal", async () => {
  const [breedList, status] = getBreedList();
  expect(breedList).toHaveLength(0);
  expect(status).toBe("loading");
});
```

It's a little weird to implement a fake component to test something (we're dangerously close to the line of testing implementation details) but this is essentially library code and we want to assure ourselves this code works if we use it frequently in our code base. We also have to provide for the query provider because it relies on it being there. We're giving it a `retry: false` key-value pair because we want it to fail fast instead of retrying.

We can make this better though. Let's rewrite our test to look like this:

```javascript
import { expect, test } from "vitest";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../useBreedList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    },
  },
});

test("gives an empty list with no animal", async () => {
  const { result } = renderHook(() => useBreedList(""), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  const [breedList, status] = result.current;

  expect(breedList).toHaveLength(0);
  expect(status).toBe("loading");
});
```

Here the helper `renderHook` abstracts away that oddity we had to do to get that hook tested. But rest assured it's doing essentially the same thing: creating a component under the hood that's running the hook lifecycle methods appropriately for you. We do still have to give it a wrapper to appropriately give it the context it needs for react-query but that's it.
