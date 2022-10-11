---
description: ""
---

We didn't cover quite everything that React offers in terms of hooks. I tried to keep it to things that I think you will use on a regular basis and leave the extra-special cased ones for you learn on a need-to-know basis. These ones I have _never had to use professionally_ and I imagine many of you will be in my boat. However I am going to list them out here for you.

## useImperativeHandle

Imagine you make a super fancy input component as part of your design system. Imagine that a _parent element_ (i.e. the component that renders the fancy input) that needs to call `focus()` on the fancy input because of a validation error.

This is what `useImperativeHandle` is for. It allows a child component to expose a method (I used focus as an example but could be anything). You pass in a ref from `useRef` to the child component, it uses that ref to pass back methods to the parent. If you make libraries or design systems, this is useful. Otherwise there are easier ways to do this.

## useDebugValue

This is useful for people make custom hooks (like [we did in the Complete Intro to React][citr]). If you want your hook to expose a custom debugging value to the React Dev Tools, useDebugValue allows you to do this. I still haven't a good reason to do this so I don't teach it anymore.

## useDeferredValue

This one and `useTransition` center around low priority updates. A good example of these is type-ahead suggestions. Type-ahead is not super important, and often a user is typing fast enough that lots of suggestions are getting thrown away as they type. It therefore is a low priority UI update and we should not lock up the entire UI trying to render low priority work.

This is what `useDeferredValue` allows you to do. It allows you identify data which would cause a re-render as "this can be interrupted, if you have something else happen while this is trying to compute, do that other stuff first and then come back to this."

This requires a lot of cognitive burden to wrap your mind around the "what" and "when" of your app and so I never find myself reaching for it.

## useTransition

Likewise to `useDeferredValue`, it allows you to set up "low priority" updates. `useTransition` gives you back a function to start a transition that can be interrupted if something higher priority comes up, like a user clicking somewhere. After you start that transition, it will give you back a boolean `isCurrentlyTransitioning` flag that will allow you to show a spinner while this transition is being delayed. Once React has cleared everything out and gotten to the low priority transition, everything will settle into a normal state.

Like above, this creates some indirection in how your app renders and I don't choose to use this very frequently. If you have some low priority things to render at the bottom of your page that are expensive to render (think like a comment section at the bottom of an article) then this would be a good case to use that. But for now I'd advise not using these until you really, truly have a problem that these tools are a fit for. These were built for Facebook problems and most of us don't have Facebook problems.

## useSyncExternalStore

This hook was made to sync with external libraries (like Redux, Mobx, etc.) Even the React docs say this isn't really made for app devs but mostly for library devs.

## useInsertionEffect

Like above, this hook was made for use with libraries. In this case, an insertion effect occurs _before_ rendering (as opposed to effect and layout effect which both happen _just after_ rendering.) Because of this, it's more limited in what it can access (e.g. it can't use refs.)

Mostly insertion effects are for CSS-in-JS libraries like Emotion and styled-components. You as an app dev should not really have a use for it.

[citr]: /lessons/core-react-concepts/custom-hooks
