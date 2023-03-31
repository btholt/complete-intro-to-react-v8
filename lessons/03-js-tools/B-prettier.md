---
description: "Brian talks about his favorite JS tool, Prettier, a tool that that helps you maintain consistent code style with no work on the dev's part."
---

## Code Quality

It's important to keep quality high when writing code. Or at least that's how I sell ESLint and Prettier to my co-workers. In reality I'm super lazy and want the machine to do as much work as possible so I can focus more on architecture and problem-solving and less on syntax and style. While there are many tools that can help you keep code quality high, these two I consider core to my workflow.

[Prettier][prettier] is an amazing tool from the brain of [James Long][jlongster]. James, like many of us, was sick of having to constantly worry about the style of his code: where to stick indents, how many, when to break lines, etc etc. Coming from languages like Go, Reason, or Elm where all that is just taken care of by the tooling for the language, this quickly wears. James did something about it and made a tool to take care of it: Prettier.

Prettier is a really fancy pretty printer. It takes the code you write, breaks it down in to an abstract syntax tree (AST) which is just a representation of your code. It then takes that AST, throws away all of your code style you made and prints it back out using a predefined style. While this sounds a little scary, it's actually really cool. Since you no longer have control of the style of your code, you no longer have to think about it at all. Your code is always consistent, as is the code from the rest of your team. No more bikeshedding!! As I like to put it: if your brain is a processor, you get to free up the thread of your brain that worries about code styles and readability: it just happens for you. Don't like semicolons? Don't write them! It puts them in for you. I _love_ Prettier.

Need to tool around a bit with it before you trust it? [Go here][prettier-playground]. You can see how it works.

Let's go integrate this into our project. It's _pretty_ easy (since I'm a dad now, I'm legally obligated to make this joke.)

Either install Prettier globally `npm install --global prettier` or replace when I run `prettier` with (from the root of your project) `npx prettier`. From there, run `prettier src/App.js`. This will output the formatted version of your file. If you want to actually write the file, run `prettier --write src/App.js`. Go check src/App.js and see it has been reformatted a bit. I will say for non-JSX React, prettier makes your code less readable. Luckily Prettier supports JSX! We'll get to that shortly.

Prettier has a few configurations but it's mostly meant to be a tool everyone uses and doesn't argue/bikeshed about the various code style rules. [Here they are][prettier-options]. I just use it as is since I'm lazy. Prettier can also understand [flow][flow] and [TypeScript][ts].

Prettier is great to use with [Visual Studio Code][vscode]. Just download [this extension][vscode-prettier]. Pro tip: set it to only run Prettier when it detects a Prettier config file. Makes it so you never have to turn it off. In order to do that, set `prettier.requireConfig` to `true` and `editor.formatOnSave` to true.

So that our tool can know this is a Prettier project, we're going to create a file called `.prettierrc` and put `{}` in it. This lets everyone know this is a Prettier project that uses the default configuration. You can put other configs here if you hold strong formatting opinions.

## npm/Yarn scripts

So it can be painful to try to remember the various CLI commands to run on your project. You can put CLI commands into it and then run the name of the tag and it'll run that script. Let's go see how that works. Put the following into your package.json.

First run `npm install -D prettier@2.7.1` `-D` means it's for development only.

```json
"scripts": {
	"format": "prettier --write \"src/**/*.{js,jsx}\""
},
```

Now you can run `yarn format` or `npm run format` and it will run that command. This means we don't have to remember that mess of a command and just have to remember format. Nice, right? We'll be leaning on this a lot during this course.

> Note the `@2.7.1` portion. For the purposes of making this course not break in the future, I have you install the _exact_ version of packages I used when I made this course. As is natural, packages change and progress over time and I can't anticipate how that will happen. So I'd suggest you use the same packages I do as you do this course (even if npm yells at you for security vulnerabilites). As soon as you're done with the course, feel free to go update the versions to the latest and see if anything breaks.

[jlongster]: https://twitter.com/jlongster
[prettier]: https://github.com/prettier/prettier
[prettier-playground]: https://prettier.io/playground/
[prettier-options]: https://prettier.io/docs/en/options.html
[flow]: https://flow.org/
[prettier-ide]: https://github.com/prettier/prettier#editor-integration
[ts]: https://www.typescriptlang.org/
[vscode]: https://code.visualstudio.com/?WT.mc_id=reactintro-github-brholt
[vscode-prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode&WT.mc_id=reactintro-github-brholt
