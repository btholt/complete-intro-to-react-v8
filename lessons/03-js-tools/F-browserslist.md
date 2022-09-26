---
description: "Babel transforms your JS code from futuristic code to code that is understandable by older browsers. Via a package called browserslist (which Parcel installed for you) you can Babel what browsers to target."
---

Babel transforms your JS code from futuristic code to code that is understandable by older browsers. Via a package called browserslist (which Parcel installed for you) you can Babel what browsers to target.

Head to [browserslist.dev][dev].

Here you can see what sorts of queries you can provide to browsers and which browsers those will provide. By default Parcel uses `> .25%` which targets all browsers that have more than .25% usage. When I ran as of writing this, this would cover 92% of all Internet users. That's a pretty okay range to target depending on who your audience is. If you're targeting old government computers this won't work but if you're Airbnb and targeting mostly modern browsers you're probably okay.

Since we're targeting ourselves and this is just a dev project, let's just target ourselves. Put `last 2 Chrome versions`, `last 2 Firefox versions`, `last 2 Edge versions`, `last 2 Safari versions`, or whatever you want. For the course notes I'll put `last 2 Chrome versions` since I've observed many of my students use Chrome.

In your package.json, add a new top level field called `browserslist` (notice the `s`, browser**s**list):

```json
{
  …
  "browserslist": [
    "last 2 Chrome versions"
  ]
}
```

> 🏁 [Click here to see the state of the project up until now: 02-js-tools][step]

[step]: https://github.com/btholt/citr-v7-project/tree/master/02-js-tools
[dev]: https://browserslist.dev
