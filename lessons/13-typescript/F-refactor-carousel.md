---
description: "Brian quickly converts Carousel.tsx"
---

Now that that is done, let's go do Carousel.tsx

```tsx
import { Component, MouseEvent } from "react";

// above Carousel
interface IProps {
  images: string[];
}

// add types to class
class Carousel extends Component<IProps> { … }

// modify handleIndexClick
handleIndexClick = (event: MouseEvent<HTMLElement>) => {
  if (!(event.target instanceof HTMLElement)) {
    return;
  }

  if (event.target.dataset.index) {
    this.setState({
      active: +event.target.dataset.index,
    });
  }
};
```

- React.Component is a generic, in that it can accept other types. Here we're telling it what its state and props will look like. We start the interfaces off with a capital I because this signifies that this is an interface. This is a common pattern and one TSLint enforced but ESLint doesn't by deafult. I'm showing you so you can make your own call.
- We could specify an `IState` as well as a second parameter to the `Component` generic but since we have the `state = {}` it can infer that without us doing that.
- We need to type the event type coming back from the DOM. We know it'll come from an HTML element, and we have to make sure it's not a generic window event. TypeScript forces a lot of this defensive programming.

Carousel is done.

> 🏁 [Click here to see the state of the project up until now: typescript-2][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/typescript-2
