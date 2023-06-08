---
description: "Git is a critical part of any JS project and Brian makes sure you have it set up."
---

Git is a critical part of any project and probably something many of you are already familiar with. If you haven't, be sure to initialize your project as a git repo with `git init` in the root of your project (VSCode and any other number of tools can do this as well.)

If you haven't already, create a .gitignore at the root of your project to ignore the stuff we don't want to commit. Go ahead and put this in there:

```
node_modules
dist/
.env
.DS_Store
coverage/
.vscode/
```

This will make it so these things won't get added to our repo. If you want more Git instruction, please check out [Nina Zakharenko's course on Frontend Masters][nina]

[nina]: https://frontendmasters.com/courses/git-in-depth/
