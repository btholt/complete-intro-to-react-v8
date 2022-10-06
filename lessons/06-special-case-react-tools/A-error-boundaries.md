---
description: "Error boundaries allow you to catch errors coming out of a component and be able to react to that. This is great for areas where unexpected errors could arise like API calls or user generated content."
---

Frequently there's errors with APIs with malformatted or otherwise weird data. Let's be defensive about this because we still want to use this API but we can't control when we get errors. We're going to use a feature called `componentDidCatch` to handle this. This is something you can't do with hooks so if you needed this sort of functionality you'd have to use a class component.

This will also catch 404s on our API if someone give it an invalid ID!

A component can only catch errors in its children, so that's important to keep in mind. It cannot catch its own errors. Let's go make a wrapper to use on Details.js. Make a new file called ErrorBoundary.jsx

```javascript
// mostly code from reactjs.org/docs/error-boundaries.html
import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

- Now anything that is a child of this component will have errors caught here. Think of this like a catch block from try/catch.
- A static method is one that can be called on the constructor. You'd call this method like this: `ErrorBoundary.getDerivedStateFromError(error)`. This method must be static.
- If you want to call an error logging service, `componentDidCatch` would be an amazing place to do that. I can recommend [Sentry][sentry] and [TrackJS][trackjs].

Let's go make Details use it. Go to Details.jsx

```javascript
// add import
import ErrorBoundary from "./ErrorBoundary";

// replace export
export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
```

- Now this is totally self contained. No one rendering Details has to know that it has its own error boundary. I'll let you decide if you like this pattern or if you would have preferred doing this in App.js at the Router level. Differing opinions exist.
- We totally could have made ErrorBoundary a bit more flexible and made it able to accept a component to display in cases of errors. In general I recommend the "WET" code rule (as opposed to [DRY][dry], lol): Write Everything Twice (or I even prefer Write Everything Thrice). In this case, we have one use case for this component, so I won't spend the extra time to make it flexible. If I used it again, I'd make it work for both of those use cases, but not _every_ use case. On the third or fourth time, I'd then go back and invest the time to make it flexible.

> 🏁 [Click here to see the state of the project up until now: 12-error-boundaries][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/12-error-boundaries
[sentry]: https://sentry.io/
[trackjs]: https://trackjs.com/
[dry]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
