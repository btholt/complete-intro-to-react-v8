---
description: "Brian teaches you to set up the latest hotness in CSS for large scale projects, Tailwind CSS."
title: "CSS and React"
---

There are many ways to do CSS with React. Even just in this course I've done several ways with [style-components][sc] and [emotion][emotion]. Both of those are fantastic pieces of software and could definitely still be used today. As is the case when I teach this course I try to cover the latest material and what I think is the current state-of-the-art of the industry and today I think that is [TailwindCSS][tailwind].

Both style-components and emotion are libraries that execute in the JavaScript layer. They bring your CSS into your JavaScript. This allows you all the power of JavaScript to manipulate styles using JavaScript.

Tailwind however is a different approach to this. And it bears mentioning that Tailwind isn't tied to React at all (whereas styled-components is and emotion mostly is.) Everything I'm showing you here is just incidentally using React (though Tailwind is particularly popular amongst React devs.)

Let's get it set up. Run this:

```bash
npm i -D tailwindcss@3.1.8 postcss@8.4.18 autoprefixer@10.4.12
```

- Under the hood, Vite processes all your CSS with PostCSS with the autoprefixer plugin. This works like Babel: it means you can write modern code and it'll make it backwards compatible with older browsers. Since we're modifying the PostCSS config (like we did with Babel earlier in this project in the Intro part) we have to give it the whole config now.

Okay, now let's get our Tailwind project going.

```bash
npx tailwindcss init -p
```

Like `tsc init` for TypeScript, this will spit out a basic starting config in tailwind.config.js. Should look like

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Now, let's go and replace contents of our `style.css` file with the following:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

> If you're seeing Visual Studio Code give you a warning about unknown at rules in your style.css and it bothers you, open settings, search for `css.lint.unknownAtRules` and set that to ignore.

This is how we include all the things we need from Tailwind. This is what allows Tailwind to bootstrap and only include the CSS you need to make your app run.

> There's a great Visual Studio Code extension you should install here: [Tailwind CSS IntelliSense][tw].

Lastly, the `-p` of the bash command we ran earlier created a PostCSS config, `postcss.config.js`, for us and it should already look like this:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Now if you run your app you should the React app (and all the functionality should work) but it won't have any style. We're going to quickly restyle this whole app to show you how great Tailwind is and how quickly it lets you go.

[tw]: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
[sc]: https://btholt.github.io/complete-intro-to-react/
[emotion]: https://btholt.github.io/complete-intro-to-react-v5/emotion
[tailwind]: https://tailwindcss.com/docs
