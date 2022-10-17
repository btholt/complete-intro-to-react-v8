---
description: "One of the most thrilling parts of Tailwind CSS is doing layouts and breakpoints. What would take you fifteen minutes can be done in seconds. See Brian use Tailwind to quickly throw together a responsive grid layout"
---

This is probably what most sold me on Tailwind CSS. Let's say we want to make a nice sort of tiled layout for our search results for our pets. Tailwind makes this so easy. Head to Results.jsx and let's see this.

```javascript
// replace outermost div
<div className="grid gap-4 grid-cols-2">[…]</div>
```

lol what

That just feels like it's cheating, right? Wow.

- `grid` puts you into `display: grid`.
- `gap-4` gives you the gutters between with the number representing how big.
- `grid-cols-2` says how many you want per row.

But we're not done here. Let's make it _responsive_ too.

```javascript
<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">[…]</div>
```

🤯

- The `sm:` is the small breakpoint which is larger than 640px apply this style (these can be adjusted and renamed)
- The `lg:` is the large breakpoint is larger than 1024px. There's also md, xl, and 2xl too.

We just did a fully responsive grid layout with no work. My much younger self is very upset by how much work I had to put into doing this right. This is so much easier than it used to be.
