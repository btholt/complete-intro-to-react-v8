---
section: "Code Splitting"
---

> Please start with a fresh copy of this app: [Adopt Me!][app]

Code splitting is _essential_ to having small application sizes, particularly with React. [React is already forty-ish kilobytes][bundle] just for the framework. This isn't huge but it's enough that it will slow down your initial page loads (by up to a second and a half on 2G speeds.) If you have a lot third party libraries on top of that, you've sunk yourself before they've even started loading your page.

Enter code splitting. This allows us to identify spots where our code could be split and let Vite do its magic in splitting things out to be loaded later. An easy place to do this would be at the route level. So let's try that first.

Add this to App.jsx

```javascript
// import from React
import { useState, lazy, Suspense } from "react";
// delete Details & Search params imports

// above const App =
const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

// inside QueryClientProvider
<Suspense
  fallback={
    <div className="loading-pane">
      <h2 className="loader">🌀</h2>
    </div>
  }
>
  […]
</Suspense>;
```

That's it! Now Vite will handle the rest of the glueing together for you!! Your initial bundle will load, then after that it will resolve that you want to load another piece, show the loading component (we show a dumb spinner but this could be fancy loading screen.) This Details page isn't too big but imagine if it had libraries like Moment or Lodash on it! It could be a big savings.

Now our whole app loads async. What's great is that we can show the user _something_ (in this case just the header and the loading h1 but you should do better UX than that) and then load the rest of the content. You get to make your page fast.

One more trick. Let's go make the Modal code load async!

Refactor Details.jsx to be.

```javascript
// import lazy
import { useContext, useState, lazy } from "react";

// delete Modal import

// below imports
const Modal = lazy(() => import("./Modal"));
```

- That's it! Now we're not just splitting on route, we're splitting other places! You can split content _anywhere_! Load one component async while the other ones load sync. Use your imagination to achieve the best UX.
- This cut out like 1KB, but the point to understand here is you can split places other than routes. Anywhere you're not using code upfront you can split and load later.
- Notice we didn't have to use `<Suspense>` again. We already have a suspense component at the top of the app and so that still works!

> 🏁 [Click here to see the state of the project up until now: code-splitting][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/code-splitting
[app]: https://github.com/btholt/citr-v8-project/tree/master/14-context
[bundle]: https://bundlephobia.com/package/react-dom@18.2.0
