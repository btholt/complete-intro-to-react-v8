---
description: "Tailwind CSS works differently than you may expect for styling your page. Brian starts to dig into it with you."
---

I'm going to need you to suspend everything you know about CSS best practices for this section. At the start this going to feel gross and weird. But stick with me. I initially had similar feelings towards React too.

We are not going to be writing _any_ CSS (well, one little bit but THAT'S IT.) Tailwind is all about just using tiny utility classes and then having that be all the CSS you ever need. Let's see something _super basic_.

> There are old class names from the previous CSS styling we had. Feel free to delete them or leave them. It doesn't matter. I haphazardly deleted them as I overwrote them with new class names.

In App.jsx, put this:

```javascript
// the outer div that wraps <BrowserRouter>
<div
  className="p-0 m-0"
  style={{
    background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
  }}
>
  […]
</div>
```

- The `p-0` and `m-0` is what Tailwind is a lot of: putting a lot of tiny utility classes on HTML elements. In this case: we're making it so the encapsulating div has zero padding and zero margin. If we wanted it to have a little of either, it'd `m-1` or `p-1`. There's \*-1 through 12 and then there it's more a random increase with 12, 14, 16, 20, 24, 28, 32, 36, 40, etc. all the way up to 96. There's also `-m-1` for _negative_ margins. There's also mt, ml, mr, mb for top, left, right, bottom and mx for left and right and my for top and bottom (these all apply to p as well.)
- We do have to apply the background image via styles. You'll find you'll occasionally need to do it for things that Tailwind doesn't do (like URLs) but for the most part you shouldn't need to.

Let's do the whole header now.

```javascript
<header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500">
  <Link className="text-6xl text-white hover:text-gray-200" to="/">
    Adopt Me!
  </Link>
</header>
```

- That's more what you'll see! Long class strings. I imagine some of you are upset looking at this. To be honest it's still strange to me. But we're also skinning a whole app with _zero_ CSS so it's a pretty compelling experience.
- Like p and m, we have w and h. `w-1` would have a tiny width. `w-full` is width: 100%.
- `bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500` is a gradient just using classes. `bg-gradient-to-b` says it goes from the top to bottom (you can do -to-l, -to-r, or -to-t as well.) The from is the start. The via is a middle stop, and the to is the end.
- The yellow-400 is a yellow color and the 400 is the _lightness_ of it. 50 is nearly white, 900 is as dark as the color gets.
- You can set your own colors via the theme but the default ones are really good.
- `text-6xl` is a really big text size. They use the sizes sm, md, lg, xl, 2xl, etc. up to 9xl.
- `text-center` will do `text-align: center`.
- `hover:<stuff>` is how we do hover, focus, disabled, etc. It takes whatever is on the right and only applies it only when that state is true. (note: disabled doesn't work without some magic in our PostCSS 7 compat layer. We'll do that in a bit.)
- Note: `<Link>` from react-router-dom will pass styles and classes down to the resulting `<a>` for you.

Let's hop over to SearchResults.jsx (we're only doing SearchParams, I'll leave it to you to fix Details)

```javascript
<div className="my-0 mx-auto w-11/12">
  <form
    className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
    onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const obj = {
        animal: formData.get("animal") ?? "",
        breed: formData.get("breed") ?? "",
        location: formData.get("location") ?? "",
      };
      setRequestParams(obj);
    }}
  >
    […]
  </form>
</div>
```

- `rounded-lg` is a "large" rounding of the corners i.e. border-radius.
- `shadow-lg` is a "large" box shadow.
- `flex` makes the display mode flex. `flex-col` makes it columns. `justify-center` makes it justify-content center. `items-center` makes it `align-items: center`. Net result is that you have centered horizontally and vertically items in a vertical direction.
