---
title: "ESLint"
description: "An essential part of maintaining a project a long time is discipline in coding standards and avoiding antipatterns. ESLint is a great tool that helps you do just that."
---

On top of Prettier which takes of all the formatting, you may want to enforce some code styles which pertain more to usage: for example you may want to force people to never use `with` which is valid JS but ill advised to use. [ESLint][eslint] comes into play here. It will lint for this problems.

First of all, run `npm install -D eslint@8.24.0 eslint-config-prettier@8.5.0` to install eslint in your project development dependencies. Then you may configure its functionalities.

There are dozens of preset configs for ESLint and you're welcome to use any one of them. The [Airbnb config][airbnb] is very popular, as is the standard config (both of which I taught in previous versions of this class). I'm going to use a looser one for this class: `eslint:recommended`. Let's create an `.eslintrc.json` file to start linting our project.

Create this file called `.eslintrc.json`.

```json
{
  "extends": ["eslint:recommended", "prettier"],
  "plugins": [],
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
  }
}
```

This is a combination of the recommended configs of ESLint and Prettier. This will lint for both normal JS stuff as well as JSX stuff. Run `npx eslint src/App.js` now and you should see we have a few errors. Run it again with the `--fix` flag and see it will fix some of it for us! Go fix the rest of your errors and come back. Let's go add this to our npm scripts.

```json
"lint": "eslint \"src/**/*.{js,jsx}\" --quiet",
```

> 🚨 ESLint will have a bunch of errors right now. Ignore them; we'll fix them in a sec.

Worth adding three things here:

- With npm scripts, you can pass additional parameters to the command if you want. Just add a `--` and then put whatever else you want to tack on after that. For example, if I wanted to get the debug output from ESLint, I could run `npm run lint -- --debug` which would translate to `eslint **/*.js --debug`.
- We can use our fix trick this way: `npm run lint -- --fix`.
- We're going to both JS and JSX.

ESLint is a cinch to get working with [Visual Studio Code][vscode]. Just download [the extension][vscode-eslint].

## Alternatives

- [jshint][jshint]

[eslint]: https://eslint.org
[vscode-eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[airbnb]: https://github.com/airbnb/javascript
[jshint]: http://jshint.com/
[vscode]: https://code.visualstudio.com/
