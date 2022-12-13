---
description: ""
---

We have seen how to defer lesser important updates but let's talk specifically about transition states. More often than not this is a loading state e.g. a user clicked a submit button and now we need to hit the API and wait for the API to say "here is the results". What we would have done previously (and did do in the Intro) is have a `useState` piece of state that keeps track of a `isLoading` flag.

What's wrong with this? These would be all "high priority" transitions for React and therefore it will try to do it as fast and as soon as it can. However it ends up being not a big deal: we can defer showing a loading state until everything else is done in the name of keeping the UI responsive. This is what `useTransition` is good for.

> We _happen_ to be using both useTransition and useDeferredValue at the same time in the same file. That's not always true or even frequently true. Just know they are independently useable and don't need to be used together.

Okay, so let's make our SearchParams.jsx use transitions now. Whenever the user clicks the "Submit" button we are going to show a loading spinner before switching back to the submit button.

```javascript
// replace react import
import {
  useContext,
  useDeferredValue,
  useMemo,
  useState,
  useTransition,
} from "react";

// add after 'useBreedList'
const [isPending, startTransition] = useTransition();

// replace <form>
<form
  onSubmit={(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = {
      animal: formData.get("animal") ?? "",
      breed: formData.get("breed") ?? "",
      location: formData.get("location") ?? "",
    };
    startTransition(() => {
      setRequestParams(obj);
    });
  }}
>
  […]
</form>;

// replace <button></button>
{
  isPending ? (
    <div className="mini loading-pane">
      <h2 className="loader">🌀</h2>
    </div>
  ) : (
    <button>Submit</button>
  );
}
```

This will now make sure React marks this as a low priority transition and prevent it from causing jank to the user. Pretty neat, huh? This is 100% overkill and I would recommend only using this in places you observe causing jank in your app. But in general it's a pretty decent way to handle loading states and other sorts of transitions.

> A good way to keep useTransition straight versus useDeferredValue and when to use either. For useTransition, you are telling React "hey, I have a new thing to give you but it's low priority". It's proactive. You are starting that process explicitly with the startTransition function. useDeferredValue is more reactive. It's saying to React "hey, when you get a new value here, it's low priority so you can take your time."

> 🏁 [Click here to see the state of the project up until now: transitions][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/transitions
