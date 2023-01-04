---
description: ""
---

> Please start with a fresh copy of this app: [Adopt Me!][app]

Like I have said before in this class, many of React's newest features are for _Facebook's_ problems, not yours. When you are rendering a page like the feed of facebook.com you have a myriad of issues that normal people don't have.

- There many teams working on that page. Whole teams are dedicated to little widgets
- They have data coming from everywhere.
- There _a lot_ of DOM nodes on that page. Even fast computer would struggle with a lot of trash on that page.
- The faster the page is the more money they make. A half second of page load is literally millions of dollars to them.

Most of us are not in the above bucket. But when you are, certain problems arise and Facebook needs to solve those for themselves. Transitions are one of these solutions to one of these classes of problems.

Imagine you're doing a re-render of a large newsfeed of information and a user clicks on one of the side widgets that opens the top menu. What would you expect to happen. If a user caught the exact moment that the big newsfeed was re-rendering, it could cause a moment of jank: two big things are happening at the exact same. For most of us that is an acceptable risk and one we wouldn't pursue to solve any further unless it was a massive issue. For Facebook, it is a big issue. Lots of stuff is rendering and users can cause their site to feel janky with their clicking. So Facebook made transitions.

The idea behind transitions is some of your renders are low priority: if they need to be interrupted they can be. What you don't want is to interrupt user intent: if a user clicks on a thing then you want drop everything to make sure that click felt responsive. We are going to use a hook called `useDeferredValue` to accomplish exactly this.

> We're going to code this and it's going to feel like it does nothing. Because it's essentially going to do nothing for us. `useDeferredValue` is useful when a lot of things are happening. This is a performance trick and should only be used when you actually have a performance issue.

Right now the biggest re-render in app is when our app gets a new batch of pets to render. Imagine if we had three hundred pets to render: that actually could take a while. And if in the mean time a user clicked a button to adopt a pet or re-search for something else, we'd want to drop rendering other pets and focus on what the user asked for. So let's see that.

Open SearchParams.jsx.

```javascript
// replace react import
import { useContext, useDeferredValue, useMemo, useState } from "react";

// under pets declaration
const deferredPets = useDeferredValue(pets);
const renderedPets = useMemo(
  () => <Results pets={deferredPets} />,
  [deferredPets]
);

// replace <Results /> line
{
  renderedPets;
}
```

- useDeferredValue takes in a value and gives you a cached version of it: that cached version may be current or it may a stale one as it works through a re-render. Evenutally it will be the current one
- We then need to _use_ that cached version. So we use `useMemo` to make a version of the component that can be used and won't change until the deferredPets value changes (otherwise it'll just re-render every time anyway)

That's really it. The idea here is you have some part of your app that when it re-renders it causes jank in other parts of your app and it can be slowed down a bit without issue. `useDeferredValue` is exactly for that.

[app]: https://github.com/btholt/citr-v8-project/tree/master/14-context
