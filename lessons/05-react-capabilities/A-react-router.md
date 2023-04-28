---
description: "react-router is phenomenal tool is that allows you to manage browser navigation state in a very React way."
---

> In previous versions of this course, I've taught various versions of [React Router][rr] as well as [Reach Router][reach]. It's all written by the same folks (same great people behind [Remix][remix]) but suffice to say it's a bit of a moving target. It's great software and you'll be well served by any of them. This course uses React Router v6.

React Router is by far the most popular client side router in the React community. It is mature, being used by big companies, and battle tested at large scales. It also has a lot of really cool capabilities, some of which we'll examine here.

What we want to do now is to add a second page to our application: a Details page where you can out more about each animal.

Let's quickly make a second page so we can switch between the two. Make a file called Details.jsx.

```javascript
const Details = () => {
  return <h2>hi!</h2>;
};

export default Details;
```

Now the Results page is its own component. This makes it easy to bring in the router to be able to switch pages. Run `npm install react-router-dom@6.4.1`.

Now we have two pages and the router available. Let's go make it ready to switch between the two. In `App.jsx`:

```javascript
// at top
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./Details";

// replace <SearchParams /> and <h1>Adopt Me!</h1>
<BrowserRouter>
  <h1>Adopt Me!</h1>
  <Routes>
    <Route path="/details/:id" element={<Details />} />
    <Route path="/" element={<SearchParams />} />
  </Routes>
</BrowserRouter>
```

> If you're upset about the element prop vs children, [read their rationale here][element]

Now we have the router working (but still have an issue)! Try navigating to [http://localhost:5173/]() and then to [http://localhost:5173/details/1](). Both should work … sort of!

- React Router has a ton of features that we're not going to explain here. The docs do a great job.
- The `:id` part is a variable. In [http://localhost:5173/details/1](), `1` would be the variable.
- The killer feature of React Router is that it's really accessible. It manages things like focus so you don't have to. Pretty great.
- If you're familiar with previous versions of React Router, quite a bit changed here. Gone is Switch, exact, and a load of other things. They broke a lot of things to bring in the best of Reach Router. It can be a slog to keep up with react-router's changes, but at the end of the day it's hard to argue they aren't improving quite a bit.
- Previously this would have rendered both pages on the Details page because technically both pages match on a regex level. This changed with v6. Now it uses the same scoring system as Reach Router to pick the best route for each path. It's so much easier. I have yet to have any issue with it.

So now let's make the two pages link to each other. Go to Pet.jsx.

```javascript
// at top
import { Link } from "react-router-dom";

// change wrapping <a>
<Link to={`/details/${id}`} className="pet">
  […]
</Link>
```

Why did we change this? Didn't the `<a>` work? It did but with a flaw: every link you clicked would end up in the browser navigating to a whole new page which means React would totally reload your entire app all over again. With `<Link>` it can intercept this and just handle that all client-side. Much faster and a better user experience.

Now each result is a link to a details page! And that id is being passed as a prop to Details. Try replacing the return of Details with:

```javascript
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  return <h2>{id}</h2>;
};

export default Details;
```

The `useParams` hook is how you get params from React Router. It used to be through the props but now they prefer this API.

Let's make the Adopt Me! header clickable too in App.jsx:

```javascript
// import Link too
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// replace h1
<header>
  <Link to="/">Adopt Me!</Link>
</header>
```

> If you're getting a useHref error, make sure your `header` is _inside_ `<BrowserRouter>`

Now if you click the header, it'll take you back to the Results page. Cool. Now let's round out the Details page.

> 🏁 [Click here to see the state of the project up until now: 08-react-router][step]

[rr]: https://reacttraining.com/react-router/
[reach]: https://reach.tech/router/
[rf]: https://twitter.com/ryanflorence
[step]: https://github.com/btholt/citr-v8-project/tree/master/08-react-router
[remix]: https://remix.run
[element]: https://reactrouter.com/en/6.6.1/upgrading/v5#advantages-of-route-element
