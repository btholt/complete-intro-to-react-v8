---
description: ""
---

> Please start with a fresh copy of this app: [Adopt Me!][app]

TypeScript is a thin layer on top of JavaScript that adds the power of a static checker to your code base. This means you'll have another layer of protection helping protect you against dumb bugs like `var x = 5; x.toUpperCase()`: things that a normal linter can't find but a type system can.

This is going to be a brief intro: how to set it up and get going with it. If you want more TypeScript goodness, check out [Mike North's course][mike]. If you want further depth on specifically React and TypeScript, check out [Steve Kinney's course][steve]. Both are phenomenal teachers.

1. First thing, `npm install -D typescript@4.8.4`.
1. Then run `npx tsc --init`. `npx` will run the TypeScript tool directly from your node_modules and init your project for you. You'll see now a tsconfig.json. We don't need to set up anything else since Vite already knows how to handle TypeScript files.
1. Open your new `tsconfig.json` file and uncomment the `jsx` field. This lets TypeScript that you're writing React.
1. Then update the target to be `ES2022` so that you can use async / await and promises and all that.
1. Uncomment the `"module"` line line and make it `"module": "ES2022"`.
1. Uncomment the `"moduleResolution": "node"` line

You'll end up with something like this:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "jsx": "react-jsx",
    "module": "ES2022",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

Next we need to install the types for our project. Not all projects are written in TypeScript so another project, DefinitelyTyped, provides third party types for your library. In order to install these types, run `npm install -D @types/react@18.0.21 @types/react-dom@18.0.6`. This will grab all these type definitions.

This is a migration: we're going to migrate one file at a time to being a TypeScript file. As we migrate each file, we'll change it from being a `.js` or `.jsx` file to a `.ts` or a `.tsx` file. Let's start with Modal.tsx (make sure you rename it to `.tsx`).

```typescript
import { useEffect, useRef, MutableRefObject, ReactElement } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: ReactElement }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild(elRef.current);
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
```

Fairly similar. We could have made it so the ref could never potentially be null by instantiating it inside the ref. Yes, this will create a new DOM node every time you render, and no that's probably not a big deal for the most part, but it would bother me and so let's do it the same way we did it before. Now we have do null checks anywhere we access `elRef.current`.

Then we have to do a null check on modalRoot inside the effect because that could be null too. TypeScript will force you to do this a lot, but it will save you run time errors. Notice we didn't write many types down (just children and the ref type): TypeScript is smart enough to figure out types on its own most of the time.

Notice we're importing the `ReactElement` and `MutableRefObject` type from React. Types can be exported from libraries and modules.

We're also using a generic here. Refs can be one of many things. In this case our generic for the `MutableRefObject` is either `null` or `HTMLDivElement`. This is basically a parameter to the `MutableRefObject` to tell it how to structure itself.

[mike]: https://frontendmasters.com/courses/typescript-v3/
[steve]: https://frontendmasters.com/courses/react-typescript-v2/
[dt]: https://www.definitelytyped.org
[app]: https://github.com/btholt/citr-v8-project/tree/master/14-context
