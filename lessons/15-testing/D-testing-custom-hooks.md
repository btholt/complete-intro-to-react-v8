---
description: ""
---

Let's say we needs tests for our custom hook, useBreedList. Testing custom hooks is a bit of a trick because they are inherently tied to the internal workings of React: they can't be called outside of a component. So how we do we get around that? We fake a component! Make a file called useBreedList.test.js in our `__tests__` directory.

```javascript
import { expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import useBreedList from "../useBreedList.js";

function getBreedList(animal) {
  let list;

  function TestComponent() {
    list = useBreedList(animal);
    return null;
  }

  render(<TestComponent />);

  return list;
}

test("gives an empty list with no animal", async () => {
  const [breedList, status] = getBreedList();

  const [breedList, status] = result.current;

  expect(breedList).toHaveLength(0);
  expect(status).toBe("unloaded");
});
```

It's a little weird to implement a fake component to test something (we're dangerously close to the line of testing implementation details) but this is essentially library code and we want to assure ourselves this code works if we use it frequently in our code base.

We can make this better though. There's a library called `@testing-library/react-hooks` that hides some of these details from us. Let's run `npm install -D @testing-library/react-hooks@5.1.0` and rewrite our test to look like this.

```javascript
import { expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useBreedList from "../useBreedList.js";

test("gives an empty list with no animal", async () => {
  const { result } = renderHook(() => useBreedList(""));

  const [breedList, status] = result.current;

  expect(breedList).toHaveLength(0);
  expect(status).toBe("unloaded");
});
```

Here the helper `renderHook` abstracts away that oddity we had to do to get that hook tested. But rest assured it's doing essentially the same thing: creating a component under the hood that's running the hook lifecycle methods appropriately for you.
