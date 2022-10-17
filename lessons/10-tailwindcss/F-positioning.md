---
description: "Lastly, Brian helps you redo the Pet component with Tailwind CSS to show how you can do easy reposition of elements."
---

Let's make Pet.jsx look great with a nice little overlay of their name, animal, breed, and location. Replace the returned markup with:

```javascript
<Link to={`/details/${id}`} className="relative block">
  <div>
    <img src={hero} alt={name} />
  </div>
  <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent pr-2 pt-2">
    <h1>{name}</h1>
    <h2>{`${animal} — ${breed} — ${location}`}</h2>
  </div>
</Link>
```

- We need to set the containing anchor link as both display block and relative positioning so we can reposition inside of it.
- The `absolute` will make the name tag be absolutey positioned within the relatively positioned parent anchor link.
- `bottom-0` and `left-0` will put our little name tag in the bottom left of the div.
- The `bg-gradient-to-tr from-white to-transparent` gives us a fun little white-to-transparent gradient so it makes it easier to read the name tag.
- `pr-2 pt-2` is a little right and top padding to extend the gradient.

> 🚨 We did not do Details.jsx. I leave this as an exercise to you!

> 🏁 [Click here to see the state of the project up until now: tailwindcss][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/tailwindcss
