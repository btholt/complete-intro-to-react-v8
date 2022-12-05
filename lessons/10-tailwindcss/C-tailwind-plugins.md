---
description: "Tailwind CSS has the ability to add plugins to augment its functionality. Brian helps you add the most common plugin, the one for forms."
---

Our inputs look really gross. We could write our own components (basically reusable CSS classes, what a novel idea) but we're just going to use the good ones that Tailwind provides out of the box.

Run `npm install -D @tailwindcss/forms@0.5.3`.

Put this into your tailwind.config.js

```javascript
// replace plugins
plugins: [require("@tailwindcss/forms")],
```

This will apply a bunch of default styles for all of our basic form elements. Tailwind has a pretty great plugin ecosystem. One of my favorites is the aspect-ratio one. CSS doesn't currently have a backwards compatible way of doing aspect ratios (e.g. keep this image in a square ratio) and this plugin makes a primitive that you can use like that. Super cool.

Notice our location input still looks bad. With this plugin they (probably wisely) require you to add `type="text"` to the the input so they can have a good selector for it. So please go add that now to your text input.

Let's finish making SearchParams looks nice.

To each of the selects and inputs, add `className="w-60 mb-5 block"` so they have a nice uniform look.

To the breed selector, we want it to be grayed out when it's not available to use.

Now add `className="w-60 mb-5 block disabled:opacity-50"` to the breed `<select>`.

Replace the button with:

```javascript
<button className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500">
  Submit
</button>
```

Nothing surprising there.
