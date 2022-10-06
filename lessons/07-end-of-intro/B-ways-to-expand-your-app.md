---
description: "If you want to improve this app and have some more practice with React, here are some ideas for you!"
---

If you want to improve this app and have some more practice with React, here are some ideas for you!

## Take the Intermediate React Course

Take the Intermediate course! You'll learn great things like Tailwind, how to write tests for React, TypeScript, how to use React with Node.js, code splitting, and a whole slew of other things.

## Paginate the Results

Our home page doesn't paginate doesn't results. With some nice buttons, you could paginate through the various results so a user isn't stuck looking at the top ten results. `http://pets-v2.dev-apis.com/pets?animal=dog&page=1` will give you the second page of dogs (pages for this API start at 0).

## Use a Real API

[Use the Petfinder API!][pf] In previous versions of this course we did actually use the Petfinder API but it was occasionally unreliable so I made the fake API you're using to make sure you could always work through the code okay.

[They even have a JavaScript library!][pf-sdk] You'll have to sign up for API credentials (secret and key) on their website, install the library, and then use the library everywhere we were using `fetch(<url>)` you need to change it to `pf.animal.search()` or whatever calls. This API returns different shpae of data. Last time I checked it looks like this:

```json
{
  "id": 44895949,
  "organization_id": "NOTREAL",
  "url": "https://www.url.to.the.animal/",
  "type": "Rabbit",
  "species": "Rabbit",
  "breeds": {
    "primary": "Mini Rex",
    "secondary": null,
    "mixed": true,
    "unknown": false
  },
  "colors": {
    "primary": "Brown / Chocolate",
    "secondary": "Tan",
    "tertiary": null
  },
  "age": "Adult",
  "gender": "Female",
  "size": "Small",
  "coat": "Short",
  "attributes": {
    "spayed_neutered": true,
    "house_trained": false,
    "declawed": null,
    "special_needs": false,
    "shots_current": false
  },
  "environment": {
    "children": null,
    "dogs": null,
    "cats": null
  },
  "tags": [],
  "name": "Betty",
  "description": "Hi my name is Betty and I am 1 year old.",
  "photos": [
    {
      "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44895949/1/?bust=1559843027&width=100",
      "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44895949/1/?bust=1559843027&width=300",
      "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44895949/1/?bust=1559843027&width=600",
      "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44895949/1/?bust=1559843027"
    }
  ],
  "status": "adoptable",
  "published_at": "2019-06-06T17:44:29+0000",
  "contact": {
    "email": "fake@example.com",
    "phone": "(555) 555-5555",
    "address": {
      "address1": "Not Real SPCA",
      "address2": "Fake Place",
      "city": "Fake City",
      "state": "FS",
      "postcode": "00000",
      "country": "US"
    }
  },
  "_links": {
    "self": {
      "href": "/v2/animals/44895949"
    },
    "type": {
      "href": "/v2/types/rabbit"
    },
    "organization": {
      "href": "/v2/organizations/NOTREAL"
    }
  }
}
```

Once you've done all this, your code will actually be populated with real animals!!

## Deploy your Code

You should deploy your code to the cloud and tweet it at me! Great options for places for you to deploy include:

- [Netlify][netlify]
- [Vercel][vercel]
- [Azure Static Web Apps][swa]
- [Google Firebase][gcp]
- [AWS Amplify][aws]

## Make your app themeable via context

Make a dark mode! Make a party mode! Add animiations! This would be great when paired with the Tailwind section from Intermediate React.

## Add a Navigation Bar

Right now we don't have a great navigation story for our little pet finding app. Add a navigation bar at the top so users can easily navigate our site.

## Play with other tools

I showed you how to use Vite but consider trying one of the newer build systems like [Parcel], [Snowpack], [ESBuild], or any of the others. You could also use one of the popular mainstays like [Webpack][webpack] or [Rollup][rollup].

## Let me know

Please! Let's share all the great apps we make here so we can provide inspirations for others and get some high fives on the cool work we do. Tweet it out and let me know.

[pf]: https://www.petfinder.com/developers/
[pf-sdk]: https://github.com/petfinder-com/petfinder-js-sdk
[swa]: https://azure.microsoft.com/en-us/services/app-service/static/
[gcp]: https://firebase.google.com/
[aws]: https://aws.amazon.com/amplify/
[netlify]: https://www.netlify.com/
[vercel]: https://vercel.com/
[parcel]: https://parceljs.org/
[snowpack]: https://www.snowpack.dev/
[esbuild]: https://esbuild.github.io/
[webpack]: https://webpack.js.org/
[rollup]: https://www.rollupjs.org/guide/en/
