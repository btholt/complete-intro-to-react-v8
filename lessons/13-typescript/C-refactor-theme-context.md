---
title: "ThemeContext"
path: "/ts-theme-context"
order: "13C"
section: "TypeScript"
description: "Brian quickly converts ThemeContext.tsx"
---

Let's quickly do ThemeContext.tsx

```tsx
// replace
const ThemeContext = createContext<[string, (theme: string) => void]>([
  "green",
  () => {},
]);
```

- Here we just have to tell TS that we have a strict ordering of string and function. This will make other files easier to type.
- We're telling it that this function will accept a string which TypeScript will enforce for us later.
