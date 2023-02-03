---
description: "One component should do one thing. Brian shows you how to break down bigger components into smaller components."
---

Our SearchParams component is getting pretty big and doing a lot of heavy lifting. This is against the React way: in general we want small-ish (use your best judgment but lean towards smaller when you have a choice) components that do one thing. When we start having a ballooning component like we do here, take your larger component and break it down into smaller components.

In general I find two reasons to break a component into smaller components: reusability and organization. When you want to use the same component in multiple places (e.g. a button, a tool tip, etc.) then it's helpful to have one component to maintain, test, use, etc.

Other times it can be useful to break concepts down into smaller concepts to make a component read better. For example, if we put all the logic for this entire page into one component, it would become pretty hard to read and manage. By breaking it down we can make each component easier to understand when you read it and thus maintain.

Let's make a better display for our Pets components. Make a new file called Results.jsx.

```javascript
import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
              id={pet.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
```

Now go back to SearchParams.jsx and put this:

```javascript
// at top, replace import from Pet.jsx
import Results from "./Results";

// under </form>, still inside the div, replace { pets.map ... }
<Results pets={pets} />;
```

Now you should be able to make request and see those propagated to the DOM! Pretty great!

Let's go make Pet.jsx look decent:

```javascript
const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <a href={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </a>
  );
};

export default Pet;
```

Looks much better! The links don't go anywhere yet but we'll get there. We don't have a good loading experience yet though. Right now we just seem unresponsive. Using a new tool to React called Suspense we can make the DOM rendering wait until we finish loading our data, show a loader, and then once it finishes we can resume rendering it.

The previous way you would have done this is just keep track of a boolean loading state as a hook and then conditionally shown UI based about that boolean. _Now_, with suspense, you throw a promise from within that component and React will catch that promise and _suspend_ that rendering and show a fallback while it waits for that rendering to complete. We'll see that in a bit.

> 🏁 [Click here to see the state of the project up until now: 07-component-composition][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/07-component-composition
