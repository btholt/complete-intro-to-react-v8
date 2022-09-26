---
description: ""
---

Let's take the time now to fix our ESLint. In previous versions of this course we used the project TSLint but that project has since been deprecated in favor of converging on ESLint. There's a project called `typescript-eslint` that bridges the gap between the two projects.

1. Run `npm uninstall @babel/eslint-parser`
1. Run `npm install -D eslint-import-resolver-typescript@2.4.0 @typescript-eslint/eslint-plugin@4.16.1 @typescript-eslint/parser@4.16.1`
1. Change your package.json lint entry to `"lint": "eslint \"src/**/*.{js,jsx,ts,tsx}\" --quiet",`
1. Add the following to .eslintrc.json

```json
// inside extends, above prettier rules
"plugin:@typescript-eslint/recommended",

// inside rules, generally a good rule but we're going to disable it for now
"@typescript-eslint/no-empty-function": 0

// inside plugins
"@typescript-eslint"

// replace parser
"parser": "@typescript-eslint/parser",

// add to settings array
"import/parsers": {
  "@typescript-eslint/parser": [".ts", ".tsx"]
},
"import/resolver": {
  "typescript": {
    "alwaysTryTypes": true
  }
}
```

Now you're linting as well as type checking! This added a few new TypeScript-specific rules as well. [Check those out here.][rules].

Now if you run `npm run lint` you shouldn't see any type errors. But let's take this a step further: let's _enforce_ type checking. This means we won't unchecked TypeScript in our codebase. This is something you'd turn on once _everything_ is converted to TypeScript, otherwise it'll be very noisy. Since we're doing all the conversion now, let's add it now.

```json
// under plugin:@typescript-eslint/recommended
"plugin:@typescript-eslint/recommended-requiring-type-checking",
```

Now run `npm run lint` and marvel at all the stuff we get to fix!

> 🏁 [Click here to see the state of the project up until now: typescript-1][step]

[step]: https://github.com/btholt/citr-v7-project/tree/master/typescript-1
[rules]: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
