---
description: "Class components work a little different from hooks in terms of marshalling state. Brian teaches you how to manage your state using setState and life cycle methods."
---

Let's make a nice photo carousel of the pictures for the animal now. We're going to do this using class components which is the "older" way of doing React. It's still fairly common to write components this way and still supported (i.e. not deprecated) so it's useful for you to know how to do it.

Make a new file called Carousel.jsx:

```javascript
import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
```

- Every class component extends `React.Component`. Every class component must have a render method that returns some sort of JSX / markup / call to `React.createElement`.
- We used to have a `constructor` function to set initial state. Now with class properties we can skip that. If you want to see how that looked, [check out v7 of this course][v7]
- Notice instead of getting props via parameters and state via `useState` we're getting it from the instance variables `this.state` and `this.props`. This is how it works with class components. Neither one will you mutate directly.
  - `this.state` is the mutable state of the component (like useState). You'll use `this.setState` to mutate it (don't modify it directly.)
  - `this.props` comes from the parent component, similar to parameter given to the render functions that we pull props out of.
- We also set `defaultProps` in the case that someone uses this component without providing it with props. This allows us to always assume that the photos prop is going to be an array instead of having to do a bunch of "if this thing exists" logic.

## Lifecycle methods

Class components have lifecycle methods. These for the most part are what `useEffect` does for function components. They're for doing things like making API calls, starting and ending transitions/animations, debugging, and other things like that. We don't need to use any here, but let's look at a few of the most common ones

- `constructor` isn't necessarily a _React_ lifecylce method but we use it like one. It's where you do things that need to happen before the first render. Generally it's where you set the initial state.
- `componentDidMount` is a function that's called after the first rendering is completed. This pretty similar to a `useEffect` call that only calls the first time. This is typically where you want to do data fetching. It doesn't have to be async; we just made it async here to make the data fetching easy.
- `componentDidUpdate` is called after your state is updated. If you're doing something like Typeahead where you're making reactive requests to an API based on user input, this would be an ideal place to do it.
- `componentWillUnmount` is typically a place for cleanup. Let's say you had to write a component to integrate with jQuery (I've had to write this, multiple times), this is where you'd clean up those references (like unattaching from DOM nodes and deleting them) so you don't leak memory. This method is invoked whenever a component is about to be destroyed.

This class doesn't cover all the lifecycle methods but you can imagine having different timings for different capabilities of a component can be useful. For example, if you have a set of props that come in and you need to filter those props before you display them, you can use `getDerivedStateFromProps`. Or if you need to react to your component being removed from the DOM (like if you're subscribing to an API and you need to dispose of the subscription) you can use `componentWillUnmount`.

There are lots more you can check out in [the React docs here][docs].

Add the Carousel component to the Detail page.

```javascript
// import at top
import Carousel from "./Carousel";

// first component inside div.details
<Carousel images={pet.images} />;
```

Let's make it so we can react to someone changing the photo on the carousel.

```javascript
// add event listener
handleIndexClick = event => {
  this.setState({
    active: +event.target.dataset.index
  });
};

// above smaller img
// eslint-disable-next-line

// add to img
onClick={this.handleIndexClick}
data-index={index}
```

- This is how you handle events in React class components. If it was keyboard handler, you'd do an onChange or onKeyUp, etc. handler.
- Notice that the handleIndexClick function is an arrow function. This is because we need the `this` in `handleIndexClick` to be the correct `this`. An arrow function assures that because it will be the scope of where it was defined. This is common with how to deal with event handlers with class components.
- The data attribute comes back as a string. We want it to be a number, hence the `+`.
- We're doing bad accessibility stuff. But this makes it a lot simpler for learning for now. But don't do this in production.

> 🏁 [Click here to see the state of the project up until now: 11-class-components][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/11-class-components
[babel]: https://babeljs.io/
[docs]: https://reactjs.org/docs/react-component.html
[v7]: https://btholt.github.io/complete-intro-to-react-v7/lessons/react-capabilities/class-components
