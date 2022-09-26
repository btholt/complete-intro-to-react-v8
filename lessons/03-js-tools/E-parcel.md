---
description: "Setting up a build process has historically been a big barrier to entry for most developers. Brian shows you how to set up Parcel which makes the whole process a breeze."
---

[Parcel][parcel] is a great bundler for JavaScript projects. The first three revisions of this workshop all teach Webpack and end up spending a decent amount of time covering how to set it up. Webpack is a fantastic piece of technology and you should definitely consider using it for your large applications; it's been around a long time and has a lot of support.

That being said, Parcel is an amazing tool with zero-config. It works with everything we want to do out of the box. Since this is a class on React and not build processes, this allows us to focus more on React. Let's go see what it can do for us.

Parcel is going to accept an entry point, crawl through all of its dependencies, and output a single, complete file with all of our code in it. This means we can have large applications with many files and many dependencies. It would be an unmanageable mess. Already our React app has two components in one file: App and Pet. It'd be better if these were in separate files so it'd be easier to keep track of what was where. This is where Parcel can help us.

Install Parcel by doing `npm install -D parcel@2.2.1`

> Parcel has renamed the npm package from `parcel-bundler` to just `parcel`.

Now inside of your `package.json` put:

```json
"scripts" {
  "dev": "parcel src/index.html"
}
```

Now open http://localhost:1234. You should see your site come up. The difference here is now it's being run through Parcel which means we can leverage all the features that Parcel allows us which we will explore shortly.

So how does it work? We gave the entry point, which is index.html. It then reads that index.html file and finds its dependencies, which are the two React files and the one App.js file that we linked to. It's smart enough to detect that those two React files are remote so it doesn't do anything with those, but it sees that App.js is local and so it reads it and compiles its dependencies. Right now it has no dependencies so let's fix that.

First let's fix the React and ReactDOM dependencies. Right now these are coming from unpkg.com. Unpkg isn't meant to serve production traffic, nor do we want the burden of loading _all_ of our future dependencies this way. Believe me, it would get messy quickly and we'd have to make a million requests to get all of them by the end (we'll install more later as we go.) Instead, it'd be better if we could pull our dependencies down from npm and include it in our bundle. Let's do that now.

Run `npm install react@18.0.0-rc.0 react-dom@18.0.0-rc.0`. This will pull React and ReactDOM down from npm and put it in your node_modules directory. Now instead of loading them from unpkg, we can tell Parcel to include them in your main bundle. Let's do that now.

> As of writing, only the release candidate of React v18 is out. You may check to see if the actual release out (nothing should have changed between the rc and the actual release.)

Delete the two unpkg script tags in index.html. Replace the App.js import with `<script type="module" src="./App.js"></script>`. This is how Parcel knows that we're using the latest JS.

> Having to add `type="module"` is new to Parcel 2.

Refresh the page and it still works! Now our React and ReactDOM is loading directly from our bundle instead of separate JavaScript files! Let's take this a step further. Create a new file called Pet.js and put this in there:

```javascript
import React from "react";

export default function Pet({ name, animal, breed }) {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, name),
    React.createElement("h2", {}, animal),
    React.createElement("h2", {}, breed),
  ]);
}
```

Go to App.js

```javascript
// at the top, under React imports
import React from "react";
import ReactDOM from "react-dom";
import Pet from "./Pet";

// remove Pet component
```

Load the page again. Still works! Now we can separate components into separate files. Parcel does more than just this but we'll get to that in future sections.

> Please close the `file:///` browser tabs you have open and only use the `localhost:1234` ones. Now that we're using Parcel the former won't work anymore!

## Alternatives

- [Webpack][webpack]
- [Browserify][browserify]
- [esbuild][esbuild]
- [Rollup][rollup]

[browserify]: http://browserify.org/
[webpack]: https://webpack.js.org/
[parcel]: https://parceljs.org/
[rollup]: https://www.rollupjs.org/
[esbuild]: https://esbuild.github.io/
