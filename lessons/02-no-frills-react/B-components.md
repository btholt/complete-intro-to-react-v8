---
description: "Brian teaches React without any frills: just you, some JavaScript, and the browser. No build step."
---

Now that we've done that, let's separate this out from a script tag on the DOM to its own script file (best practice.) Make a new file in your `src` directory called `App.js` and cut and paste your code into it.

Modify your code so it looks like:

```javascript
const Pet = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Luna"),
    React.createElement("h2", {}, "Dog"),
    React.createElement("h2", {}, "Havanese"),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet),
    React.createElement(Pet),
    React.createElement(Pet),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
```

> 🚨 You will be seeing a console warning `Warning: Each child in a list should have a unique "key" prop.` in your browser console. React's dev warnings are trying to help your code run faster. Basically React tries to keep track of components are swapped in order in a list and it does that by you giving it a unique key it can track. If it sees two things have swapped, it'll just move the components instead of re-rendering.

Replace your `script` tag in your index.html that has all your code in it with `<script src="./App.js"></script>`. Leave the two React scripts.

- To make an element have multiple children, just pass it an array of elements.
- We created a second new component, the `Pet` component. This component represents one pet. When you have distinct ideas represented as markup, that's a good idea to separate that it into a component like we did here.
- Since we have a new `Pet` component, we can use it multiple times! We just use multiple calls to `React.createElement`.
- In `createElement`, the last two parameters are optional. Since Pet has no props or children (it could, we just didn't make it use them yet) we can just leave them off.

Okay so we can have multiple pets but it's not a useful component yet since not all pets will be Havanese dogs named Luna (even though _I_ have a Havanese dog named Luna.) Let's make it a bit more complicated.

```javascript
const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, {
      name: "Luna",
      animal: "Dog",
      breed: "Havanese",
    }),
    React.createElement(Pet, {
      name: "Pepper",
      animal: "Bird",
      breed: "Cockatiel",
    }),
    React.createElement(Pet, { name: "Doink", animal: "Cat", breed: "Mix" }),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
```

Now we have a more flexible component that accepts props from its parent. Props are variables that a parent (App) passes to its children (the instances of Pet.) Now each one can be different! Now that is far more useful than it was since this Pet component can represent not just Luna, but any Pet. This is the power of React! We can make multiple, re-usable components. We can then use these components to build larger components, which in turn make up yet-larger components. This is how React apps are made!

> 🏁 [Click here to see the state of the project up until now: 01-no-frills-react][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/01-no-frills-react
