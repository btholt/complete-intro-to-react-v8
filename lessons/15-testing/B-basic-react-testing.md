---
description: ""
---

Let's write our first test for Pet.js. In general, here's my methodology for testing React:

- Try to test functionality, not implementation. Make your tests interact with components as a user would, not as a developer would. This means you're trying to do more think of things like "what would a user see" or "if a user clicks a button a modal comes up" rather than "make sure this state is correct" or "ensure this library is called". This isn't a rule; sometimes you need to test those things too for assurance the app is working correctly. Use your best judgment.
- Every UI I've ever worked on changes a lot. Try to not unnecessarily spin your wheels on things that aren't important and are likely to change.
- In general when I encounter a bug that is important for me to go back and fix, I'll write a test that would have caught that bug. Actually what I'll do is _before_ I fix it, I'll write the test that fails. That way I fix it I'll know I won't regress back there.
- Ask yourself what's important about your app and spend your time testing that. Ask yourself "if a user couldn't do X then the app is worthless" sort of questions and test those more thoroughly. If a user can't change themes then it's probably not the end of the world (a11y is important) so you can spend less time testing that but if a user can't log in then the app is worthless. Test that.

Okay, create a new file called `Pet.test.js`. This naming convention is just habit. `Pet.spec.js` is common too. But as long as it's in the `__tests__` directory it doesn't much matter what you call it.

```javascript
import { expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import Pet from "../Pet.js";

test("displays a default thumbnail", async () => {
  const pet = render(<Pet />);

  const petThumbnail = await pet.findByTestId("thumbnail");
  expect(petThumbnail.src).toContain("none.jpg");
});
```

> 🚨 This doesn't work yet. That's intentional.

This doesn't work!? Why? Well, turns out react-router-dom gets upset if you try to render its components without a Router above it. We could either go mock the APIs it's expecting (gross) or we could just give it a router. Let's do that.

```javascript
// at top
import { StaticRouter } from "react-router-dom";

// replace render
const pet = render(
  <StaticRouter>
    <Pet />
  </StaticRouter>
);
```

> 🚨 This doesn't work yet. That's intentional.

The test doesn't pass? Oh, that's because it caught a bug! If you don't give it an images array, it just breaks. That defeats the purpose of having a default image! Let's go fix it in Pet.js.

```javascript
if (images && images.length) {
  hero = images[0];
}
```

Now it should pass!

Let's add one more test case for good measure to test the non-default use case.

```javascript
test("displays a non-default thumbnail", async () => {
  const pet = render(
    <StaticRouter>
      <Pet images={["1.jpg", "2.jpg", "3.jpg"]} />
    </StaticRouter>
  );

  const petThumbnail = await pet.findByTestId("thumbnail");
  expect(petThumbnail.src).toContain("1.jpg");
});
```

Bam! Some easy React testing there for you.
