---
description: "React manages view state through a mechanism called hooks. Brian teaches you how to use them as you build components."
---

Now we want to make it so you can modify what your search parameters are. Let's make a new route called SearchParams.jsx and have it accept these search parameters.

```javascript
const SearchParams = () => {
  const location = "Seattle, WA";
  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input id="location" value={location} placeholder="Location" />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
```

Now add it to your routes:

```javascript
// delete Pet import, and add SearchParams
import SearchParams from "./SearchParams";

// in App.jsx, replace all the Pets
<SearchParams />;
```

> 🚨 You'll have some errors in the console, that's okay.

Now navigate to [http://localhost:5173/]() and see that you have one input box that says "Seattle, WA". Try and type in it. You'll see that you can't modify it. Why? Let's think about how React works: when you type in the input, React detects that a DOM event happens. When that happens, React thinks _something_ may have changed so it runs a re-render. Providing your render functions are fast, this is a very quick operation. It then diffs what's currently there and what its render pass came up with. It then updates the minimum amount of DOM necessary.

Notice we're using `className` instead of `class` on the HTML element for CSS classes. This is because `class` is a reserved word in JS and JSX is still just JS. So instead they opted to use `className` which is the [name of the JS API][js-api] for interacting with class names.

Like `className`, `htmlFor` is used because `for` is a reserved word in JS.

So if we type in our input and it re-renders, what gets out in the `input` tag? Well, its value is tied to `location` and nothing changed that, so it remains the same. In other words, two way data binding is _not_ free in React. I say this is a feature because it makes you explicit on how you handle your data. Let's go make it work.

```javascript
// in SearchParams.jsx
import { useState } from "react";

// replace location
const [location, updateLocation] = useState("");

// replace input
<input
  id="location"
  value={location}
  placeholder="Location"
  onChange={(e) => updateLocation(e.target.value)}
/>
```

- This is called a hook. Other frameworks like Vue have started adopting it as well.
- A hook called such (in my head) because it's a hook that gets caught every time the render function gets called. Because the hooks get called in the same order every single time, they'll always point to the same piece of state. Because of that they can be stateful: you can keep pieces of mutable state using hooks and then modify them later using their provided updater functions.
- An _absolutely key_ concept for you to grasp is hooks rely on this strict ordering. As such, **do not put hooks inside if statements or loops**. If you do, you'll have insane bugs that involve `useState` returning _the wrong state_. If you see `useState` returning the wrong piece of state, this is likely what you did.
- Because the previous point is so absolutely critical, the React team has provided us with a lint rule that help us not fall into that trap. That lint rule relies on us, the developers, to follow the convention of calling our hooks `useXxxxxx`. If you're willing to do that, the lint rules will guard you from calling the hooks out of order.
- The argument given to `useState` is the default value. In our case, we could give it `"Seattle, WA"` as our default value but let's give it a default empty string value.
- `useState` returns to us an array with two things in it: the current value of that state and a function to update that state. We're using a feature of JavaScript called destructuring to get both of those things out of the array.
- We use the `updateLocation` function in the `onChange` attribute of the input. Every time the input is typed into, it's going to call that function which calls `updateLocation` with what has been typed into the input. When `updateLocation` is called, React knows that its state has been modified and kicks off a re-render.
- You can make your own custom hooks; `useState` is just one of many.
- Historically, React has been written using `class`es with state being on the instance of the component. This is still a supported pattern in React. We'll see how to do it later.

> I'm showing you how to do a "controlled form" in that we're using hooks to control each part of the form. In reality, it'd be better to leave these _uncontrolled_ (aka don't set the value) and wrap the whole thing in a form. Then we can listen for submit events and use that event to gather info off the form. This is less code and less burdensome to write. If you have a standard form sort of thing to write, do that an uncontrolled form. If you need to do dynamic validation, react to a user typing a la typeahead, or something of the ilk, then a controlled input is perfect, otherwise stick to uncontrolled.

Let's add the ESLint rule. Run `npm install -D eslint-plugin-react-hooks@4.6.0`. Add this to ESLint:

```json
{
  "extends": [
    …
    "plugin:react-hooks/recommended",
    …
  ]
}
```

> The order of extends isn't particularly important to us _except_ the Prettier one _must_ be last. That one serves to turn off rules the others ones enable.

Let's next make the animal drop down.

```javascript
// under the imports
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

// under location
const [animal, updateAnimal] = useState("");

// under the location label
<label htmlFor="animal">
  Animal
  <select
    id="animal"
    value={animal}
    onChange={(e) => {
      updateAnimal(e.target.value);
      updateBreed("");
    }}
    onBlur={(e) => {
      updateAnimal(e.target.value);
      updateBreed("");
    }}
  >
    <option />
    {ANIMALS.map((animal) => (
      <option key={animal} value={animal}>
        {animal}
      </option>
    ))}
  </select>
</label>
```

- You can use `useState` as many times as you need for various pieces of state! Again, this is why ordering is important because React relies on `useState` to be called in strictly the same order every time so it can give you the same piece of state.
- Similar to above. We're using `onChange` and `onBlur` because it makes it more accessible.
- Whenever you set the animal to be a new animal, you have to clear out the breed. If you select a dog, then select a poodle, then select cat, it wouldn't make sense for you to search for a poodle cat. Hence you need to clear out breed when you select a new animal.

Let's make a second dropdown so you can select a breed as well as an animal.

```javascript
// under your other state inside the component
  const [breed, setBreed] = useState("");
  const breeds = [];

// under the animal label
 <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
```

So now we have a breed dropdown. The only really new thing we did was use the `disabled` property to disable the dropdown when you don't have any breeds. We're going to use the API to request breeds based on the animal selected. If you select `dog`, you want to see poodles, labradors, and chihuahuas and parrots, tabbies, and Maine coons. The API has and endpoint that if you give it a valid animal. We'll show you how to do that in the next lesson with effects.

> 🏁 [Click here to see the state of the project up until now: 04-hooks][step]

[babel]: https://babeljs.io/
[step]: https://github.com/btholt/citr-v8-project/tree/master/04-hooks
[js-api]: https://developer.mozilla.org/en-US/docs/Web/API/Element/className
