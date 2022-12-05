---
description: ""
---

It may have annoyed you to copy and paste the same `w-60 mb-5 block` to three different inputs. If we were doing CSS directly this would be a clear case where making a reusable class would be applied. It becomes easier to read the code and now we can modify one thing and have it affect everywhere that class is used.

This is not the pattern that Tailwind leans into. Tailwind basically says that for the most part "reusable" styles turn into "fragile" and "finicky" styles. I personally have had to deal with horrendous stylesheets where you're afraid to change anything because if you try to modify one thing it breaks a dozen other places. It's hard to argue with that logic.

So, for the most part, what you just did is what you'll do with Tailwind: copy and paste. Then if we need to change it we just change the bare minimum we need to. It makes the upkeep a bit more annoying but it also makes it way less of a house of cards that will fall over later.

Okay, all that said, what if you do truly have a case where you need a reusable style? In our example we have the three inputs. What if that was the input style for our entire app? We can make a reusable class for that using `@layer` and `@apply`.

Head to your style.css. Add to the end:

```css
@layer components {
  .search-input {
    @apply w-60 mb-5 block;
  }
}

@layer utilities {
  .grayed-out-disabled {
    @apply disabled:opacity-50;
  }
}
```

- We're using two of three available layers for Tailwind (the other being `base`). This is so you can intelligently have one layer be more "important" than another. The `base` layer is for base level styles for your app: what font you use by default, your general `h1` default styles, your CSS reset, etc. The `component` layer is for what components you are building, what you'd typically use a CSS class for, and then the `utilities` layer is for things like `enabled`, `disabled`, `focused`, etc. They're modifier classes.
- We used `@apply` so we could use Tailwind classes inside of our CSS class. You can write CSS here too, I just prefer if I'm in Tailwind to stay in Tailwind.
- We can use these two CSS classes as if they were normal CSS classes in our app.

Head back to SearchParams.jsx and put:

```javascript
// for the location and animal select:
className = "search-input";

// for the breed select:
className = "search-input grayed-out-disabled";
```

Again, we probably wouldn't do this for this particular case because it's a slippery slope that can lead to basically just recreating CSS in Tailwind which is definitely not the point. But it does have its uses and it's good for you to know.
