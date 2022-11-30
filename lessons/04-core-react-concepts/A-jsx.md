---
title: "JSX"
description: "JSX is an essential part of writing React. Brian teaches you to leverage your newfound React knowledge and make it much easier to read with JSX"
---

So far we've been writing React without JSX, something that I don't know anyone that actually does with their apps. _Everyone_ uses JSX. I show you this way so what JSX is actually doing is demystified to you. It doesn't do hardly anything. It just makes your code a bit more readable.

If I write `React.createElement("h1", { id: "main-title" }, "My Website");`, what am I actually trying to have rendered out? `<h1 id="main-title">My Website</h1>`, right? What JSX tries to do is to shortcut this translation layer in your brain so you can just write what you mean.

Make a new file called Pet.jsx.

> Make sure you call it `.jsx` and not `.js`. Vite won't do JSX transpilation if it's not named with a JSX file extension.

```javascript
const Pet = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.animal}</h2>
      <h2>{props.breed}</h2>
    </div>
  );
};

export default Pet;
```

> 🚨 ESLint may be currently failing. We'll fix it at the end.

I don't know about you, but I find this far more readable. And if it feels uncomfortable to you to introduce HTML into your JavaScript, I invite you to give it a shot until the end of the workshop. By then it should feel a bit more comfortable. And you can always go back to the old way.

However, now you know _what_ JSX is doing for you. It's just translating those HTML tags into `React.createElement` calls. _That's it._ Really. No more magic here. JSX does nothing else. Many people who learn React don't learn this.

Notice the strange `{props.name}` syntax: this is how you output JavaScript expressions in JSX. An expression is anything that can be the right side of an assignment operator in JavaScript, e.g. `const x = <anything that can go here>`. If you take away the `{}` it will literally output `props.name` to the DOM.

> Notice we don't have to do `import React from 'react'` here like we used to. The latest version of JSX handles that for you so you only need to explicitly import the React package when you need to use something from it; otherwise feel free to do JSX without having to import React!

So now JSX is demystified a bit, let's go convert App.js.

```javascript
// rename the file App.jsx
// delete the React import
import { createRoot } from "react-dom/client";
import Pet from "./Pet";

// delete the Pet component

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Pet name="Luna" animal="dog" breed="Havanese" />
      <Pet name="Pepper" animal="bird" breed="Cockatiel" />
      <Pet name="Doink" animal="cat" breed="Mix" />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
```

> 🚨 ESLint is currently failing. We'll fix it at the end.

Also head over to index.html and change the script tag

```html
<script type="module" src="./App.jsx"></script>
```

Notice we have Pet as a component. Notice that the `P` in `Pet` is capitalized. It _must_ be. If you make it lowercase, it will try to have `pet` as a web component and not a React component.

We now pass props down as we add attributes to an HTML tag. Pretty cool.

## ESLint + React

We need to give ESLint a hand to get it to recognize React and not yell about React not being used. Right now it thinks we're importing React and not using because it doesn't know what to do with React. Let's help it.

Run this: `npm install -D eslint-plugin-import@2.26.0 eslint-plugin-jsx-a11y@6.6.1 eslint-plugin-react@7.31.8`

Update your .eslintrc.json to:

```javascript
{
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  "rules": {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0
  },
  "plugins": ["react", "import", "jsx-a11y"],
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx"]
      }
    }
  }
}
```

> In previous versions of this course, we had to extend `prettier/react` as well as `prettier`. [As of version 8 of this plugin][prettier-react] it's all rolled into the `prettier` config.

This is a little more complicated config than I used in previous versions of the workshop but this is what I use in my personal projects and what I'd recommend to you. In previous versions of this workshop, I used [airbnb][airbnb] and [standard][standard]. Feel free to check those out; I now find both of them a bit too prescriptive. Linting is a very opinionated subject, so feel free to explore what you like.

This particular configuration has a lot of rules to help you quickly catch common bugs but otherwise leaves you to write code how you want.

- The import plugin helps ESLint catch commons bugs around imports, exports, and modules in general
- jsx-a11y catches many bugs around accessibility that can accidentally arise using React, like not having an `alt` attribute on an `img` tag.
- react is mostly common React bugs like not calling one of your props children.
- `eslint-plugin-react` now requires you to inform of it what version of React you're using. We're telling it here to look at the package.json to figure it out.
- `"react/react-in-jsx-scope": 0` is new since you used to have to import React everywhere but now with the recent revision of React you don't need to.
- Prop types allow you to add types to a component's props at runtime. In general if you're interested in doing that just use TypeScript.
- We need to set the import plugin to look for both js and jsx extensions or else it won't resolve imports for us.

Now your project should pass lint.

> 🏁 [Click here to see the state of the project up until now: 03-jsx][step]

[airbnb]: https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
[standard]: https://standardjs.com/
[step]: https://github.com/btholt/citr-v8-project/tree/master/03-jsx
[prettier-react]: https://github.com/prettier/eslint-config-prettier#installation
