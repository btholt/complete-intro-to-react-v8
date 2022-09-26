---
description: "Brian quickly converts Pet.tsx"
---

Let's do Pet.tsx

```tsx
// import
import { FunctionComponent } from "react";

interface IProps {
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
  id: number;
}

const Pet: FunctionComponent<IProps> = props => { … }

```

- Here we're telling TS that Pet is a Function Component for React and that it fits all the shapes of a React component.
