---
description: "Brian quickly converts Pet.tsx"
---

Let's do Pet.tsx

```tsx
interface IProps {
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
  id: number;
}

const Pet = (props: IProps) => { … }

```

- We're just typing the props here.
- Previously we used FunctionComponent (aka FC) but in this version we're not going to. It works just as well without it and it is [not necessarily recommended anymore][cra] (it also not _not_ recommended, it's up to you.)

[cra]: https://github.com/facebook/create-react-app/pull/8177
