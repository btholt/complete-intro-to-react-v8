---
title: "Testing UI Interactions"
description: ""
---

Now we want to test some UI interaction. If a user does X then we want to verify that Y happens. We're going to dig into the Carousel. If a user clicks an thumbnail it should make the hero image change to be that image.

In general I do like these kinds of tests. They tell a user story: if a user clicks a thumbnail they expect to see the hero image change to that. It's not a technical implementation but a reflection of what a user expects from you app.

Go create in your `__tests__` directory a file called Carousel.test.jsx. In there put:

```javascript
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Carousel from "../Carousel";

test("lets users click on thumbnails to make them the hero", async () => {
  const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Carousel images={images} />);

  const hero = await carousel.findByTestId("hero");
  expect(hero.src).toContain(images[0]);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    const thumb = await carousel.findByTestId(`thumbnail${i}`);
    await thumb.click();

    expect(hero.src).toContain(image);
    expect(Array.from(thumb.classList)).toContain("active");
  }
});
```

In Carousel.js add the following `data-testid`s.

```javascript
// to the hero image
data-testid="hero"

// to the thumbnail
data-testid={`thumbnail${index}`}
```

This is going to check first to see if you set the first image to correctly be the hero, and then check by clicking each of the thumbnails to make them the hero. The first one is intentionally "wasted" because we want to make sure that if a user clicks the active thumbnail that nothing changes. We also check to make sure that the thumbnail gets an active class so we can style it differently.

This isn't a thoroughly exhaustive test but I'm fine with it here. The point to instill confidence that it mostly works. We could definitely go further (check to see if other thumbnails don't have active for example) but I think this is a good starting point.
