---
description: "React 18's latest and hottest feature is suspense, a feature which allows you to fetch data from async sources with simple and readable code."
---

React 18's latest and hottest feature is suspense, a feature which allows you to fetch data from async sources with simple and readable code.

Here's the problem with `useEffect`: you do the first render (so users can see some UI), _then_ you request the API data, then you wait for it to come, then when it comes back you re-render again with complete data. Two problems here: the sooner you can request the API the sooner a user sees data and secondly this involves a lot of conditional rendering and makes your code kinda ugly.

Enter Suspense and data loaders. Suspense is a component that its entire job is to be able to be paused while rendering. If something inside of a Suspense signals to it (via a thrown promise, it's a weird API, we'll see it in a sec) that it's not finished loading its data, Suspense will stop loading and will instead show a spinner. Once all data is loader, then the Suspense will show its children components. It's abstract but should make sense in a sec.

We have our Details page. On this page, we call the API to get one pet's specific info. We want the order of things to go is:

- User clicks on /details/1
- Begin API request for pet 1
- Show loading screen
- Finish loading API request
- Re-render with complete data

Let's do it. Go to details and write the following:

```javascript
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import getPet from "./getPet";

function DetailsParent() {
  const { id } = useParams();
  const resource = getPet(id);

  return (
    <Suspense fallback={<h2>loading …</h2>}>
      <Details resource={resource} />
    </Suspense>
  );
}

const Details = ({ resource }) => {
  const pet = resource.readData();

  return (
    <div className="details">
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
    </div>
  );
};

export default DetailsParent;
```

- Okay, we have two components, why? The Parent component is where the stable state of requesting the state and suspense live. Suspense has to live outside (i.e. as a parent) to a componet that is going to suspend. In our case, Details is going to suspend so we need a component above it to contain the Suspense. We _could_ stick this at the App level, but we also need something that can read the params and make the API request and this is the best place to do that. It's a weird pattern but just know it's to maintain a steady component while requests are being made.
- getPet is a function we're about to write. It's going to make a request and do one of three things: give a result, throw a promise because it's pending, or throw an error.
- Now our Details component is super simple. You get to write code as if all the data was already there. All of the gross async stuff is hidden away.

Okay, let's write getPet.js

```javascript
export default function getPet(id) {
  let apiResult;
  let status = "pending";
  const suspensePromise = fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`)
    .then((res) => res.json())
    .then((res) => {
      apiResult = res.pets[0];
      status = "success";
    })
    .catch((err) => {
      apiResult = err;
      status = "error";
    });
  return {
    readData() {
      if (status === "pending") {
        throw suspensePromise; // data isn't ready, throw promise
      } else if (status === "success") {
        return apiResult; // data is ready, return it synchronously
      } else if (status === "error") {
        throw apiResult; // data had an errow, throw the error from the API
      }
    },
  };
}
```

Bear with me. The way Suspense works is when a component is working on something async and wants React to pause its rendering, it **throws a promise**. Typically throw is reserved for errors, but in this case it's being bent a bit for the property that a thrown value can be caught (via try/catch) higher up in a execution stack. Basically, you can throw a promise, escape out of your current app and React can catch it and handle it for you. It's a novel and clever way of doing it but definitely not a standard one.

Okay, so we make a request, keep track of the status and then we return an object with a function called readData. The important part is it's an object that's either throwing a promise (to pause rendering), the result (to continue the current render), or throw an error. This way we're only ever making one request to the API because the closure is holding onto the current API requests. In other words, if we didn't do this little song-and-dance to of returning a function with an object, we'd be making a new API request every render of Details which would be bad because it'd never finish. We want to only make one request and hold onto the same result.

Notice we're not doing any caching here of the result. We could totally cache the results so if I navigated to pet 2 and then back to pet 1 it'd pull from the cache instead of requesting a fresh copy. This is the most basic implementation of data fetching in with Suspense.

Notice as well that both DetailsParent and the getPet function could definitely be made into generic functions. I could have a SuspenseRoute component that flexibly does that for any route. Likewise, I could have wrapPromise function that does that API suspense functionality for any promise. We're just doing the simplest thing here.

That's it! That's the intro to suspense for data fetching. We'll see it again in a bit for server side rendering and code splitting, but now this is good!

<!--
This class has been showing you the latest APIs for React: hooks. Going forward, these sorts of components will be the default way of writing React. However, the class API still has its uses and isn't going anywhere anytime soon. In this section we're going to go through and learn the basics of it since there's still a lot class code out in the wild and the new API can't do _everything_ the old one can, so it's still useful in some cases.

Let's go make Details.js as a class.

```javascript
// replace Details.js
import { Component } from "react";
import { withRouter } from "react-router-dom";

class Details extends Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  render() {
    console.log(this.state);

    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, description, name } = this.state;

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
```

- Every class component extends `React.Component`. Every class component must have a render method that returns some sort of JSX / markup / call to `React.createElement`.
- Not every component needs to have a constructor. Many don't. I'll show you momentarily how you nearly never need to have one. In this case we need it to instantiate the state object (which we'll use instead of `useState`.) If you have a constructor, you _have_ to do the `super(props)` to make sure that the props are passed up to React so React can keep track of them.
- `componentDidMount` is a function that's called after the first rendering is completed. This pretty similar to a `useEffect` call that only calls the first time. This is typically where you want to do data fetching. It doesn't have to be async; we just made it async here to make the data fetching easy.
- Notice instead of getting props via parameters and state via `useState` we're getting it from the instance variables `this.state` and `this.props`. This is how it works with class components. Neither one will you mutate directly.
  - `this.state` is the mutable state of the component (like useState). You'll use `this.setState` to mutate it (don't modify it directly.)
  - `this.props` comes from the parent component, similar to parameter given to the render functions that we pull props out of.
- `withRouter()` is called a higher order component and is a bit of an advance concept. Basically we're composing functionality into our component via react-router. Think of `useParams`: it mixes in functionality from react-router by calling a hook. This is how you get that custom hook behavior of mixing in library functionality with class components. Redux does this too, but otherwise it's not overly common.

## Other lifecycle methods

This class doesn't cover all the lifecycle methods but you can imagine having different timings for different capabilities of a component can be useful. For example, if you have a set of props that come in and you need to filter those props before you display them, you can use `getDerivedStateFromProps`. Or if you need to react to your component being removed from the DOM (like if you're subscribing to an API and you need to dispose of the subscription) you can use `componentWillUnmount`.

There are lots more you can check out in [the React docs here][docs].

-->

> 🏁 [Click here to see the state of the project up until now: 09-managing-state-in-class-components][step]

[docs]: https://reactjs.org/docs/react-component.html
[step]: https://github.com/btholt/citr-v8-project/tree/master/09-managing-state-in-class-components
