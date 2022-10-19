---
title: "ErrorBoundary"
path: "/ts-error-boundary"
order: "13E"
section: "TypeScript"
description: "Brian quickly converts ErrorBoundary.tsx"
---

Let's go do ErrorBoundary.tsx now

```tsx
// import at top
import { Component, ErrorInfo, ReactElement } from "react";

// add return type of children
class ErrorBoundary extends Component<{children: ReactElement}> { … }

// add types to parameters
componentDidCatch(error: Error, info: ErrorInfo) {}
```

- We didn't have to change from a constructor to a public class property but it makes typing so much easier because TS knows how to handle it implicitly if you use public class properties.
- We had to type the parameters and return types. We have TS in strict mode and a pretty strict set of linting rules which means it doesn't like anything to be an `any` type.
