---
description: ""
---

I'm not a fan of seeking 100% test coverage. I think it's a fool's errand and a waste of time. I'd rather you write five tests that cover the most important five lines of your code than see you write one test for five less-important pieces of UI code.

But let's show you an easy way to cheat and get there! Let's talk about snapshot testing.

Snapshot tests are low confidence, low cost ways of writing tests. With more-or-less a single line of code you can assert: this code doesn't break, and it isn't changing over time.

Let's test Results.jsx. It's a pretty stable component that doesn't do a lot. A low cost, low confidence test could fit here. Make a file called Results.test.jsx

```javascript
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Results from "../Results";

test("renders correctly with no pets", () => {
  const { asFragment } = render(<Results pets={[]} />);
  expect(asFragment()).toMatchSnapshot();
});
```

Run this to see Vitest say it created a snapshot. Go look now at Results.test.jsx.snap to see what it created. You can see it's just rendering out what it would look like. Now if you modify Results.jsx it will fail the test. As you can see, it's a quick gut check to make sure your changes don't have cascading problems. If I modify App.jsx and it causes this to fail it means I can catch it and validate quickly. Some people don't find it useful. I'm not entirely sold on it to be honest; at most these should be used very sparingly. This could be useful if you have a component that expect to _never_ change and it would be a problem if it did. Maybe a footer? I don't know. I never write these.

Let's add some pets and see how it does.

```javascript
// import
import { StaticRouter } from "react-router-dom/server";

// sample
const pets = [
  {
    id: 1,
    name: "Luna",
    animal: "dog",
    city: "Seattle",
    state: "WA",
    description:
      "Luna is actually the most adorable dog in the world. Her hobbies include yelling at squirrels, aggressively napping on her owners' laps, and asking to be fed two hours before IT'S DAMN WELL TIME LUNA. Luna is beloved by her puppy parents and lazily resides currently in Seattle, Washington.",
    breed: "Havanese",
    images: [
      "http://pets-images.dev-apis.com/pets/dog25.jpg",
      "http://pets-images.dev-apis.com/pets/dog26.jpg",
      "http://pets-images.dev-apis.com/pets/dog27.jpg",
      "http://pets-images.dev-apis.com/pets/dog28.jpg",
      "http://pets-images.dev-apis.com/pets/dog29.jpg",
    ],
  },
  {
    id: 2,
    name: "Charisse",
    animal: "rabbit",
    city: "Lexington",
    state: "KY",
    description:
      "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    breed: "Havanese",
    images: ["http://pets-images.dev-apis.com/pets/rabbit0.jpg"],
  },
  {
    id: 3,
    name: "Maitilde",
    animal: "rabbit",
    city: "Dallas",
    state: "TX",
    description:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    breed: "Lab",
    images: ["http://pets-images.dev-apis.com/pets/rabbit1.jpg"],
  },
  {
    id: 4,
    name: "Natalina",
    animal: "rabbit",
    city: "Tampa",
    state: "FL",
    description:
      "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
    breed: "Lab",
    images: ["http://pets-images.dev-apis.com/pets/rabbit2.jpg"],
  },
  {
    id: 5,
    name: "Michail",
    animal: "reptile",
    city: "Tuscaloosa",
    state: "AL",
    description:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    breed: "Havanese",
    images: ["http://pets-images.dev-apis.com/pets/reptile1.jpg"],
  },
  {
    id: 6,
    name: "Gizela",
    animal: "bird",
    city: "Carol Stream",
    state: "IL",
    description:
      "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
    breed: "Havanese",
    images: ["http://pets-images.dev-apis.com/pets/bird2.jpg"],
  },
  {
    id: 7,
    name: "Laughton",
    animal: "reptile",
    city: "Bridgeport",
    state: "CT",
    description:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    breed: "Havanese",
    images: ["http://pets-images.dev-apis.com/pets/reptile2.jpg"],
  },
  {
    id: 8,
    name: "Si",
    animal: "dog",
    city: "Charlotte",
    state: "NC",
    description:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    breed: "Lab",
    images: ["http://pets-images.dev-apis.com/pets/dog0.jpg"],
  },
  {
    id: 9,
    name: "Lyda",
    animal: "rabbit",
    city: "Springfield",
    state: "IL",
    description:
      "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    breed: "Lab",
    images: ["http://pets-images.dev-apis.com/pets/rabbit3.jpg"],
  },
  {
    id: 10,
    name: "Jackquelin",
    animal: "dog",
    city: "Tucson",
    state: "AZ",
    description:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    breed: "Lab",
    images: ["http://pets-images.dev-apis.com/pets/dog1.jpg"],
  },
];

// under other test
test("renders correctly with some pets", () => {
  const { asFragment } = render(
    <StaticRouter>
      <Results pets={pets} />
    </StaticRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
```

This works, and now you can stick with this, but here's a problem. If you look at your snapshot, it's rendering Pet components as well. Now if you modify Pet.jsx (that has its own tests already) your _Results.jsx_ test is going to fail. This is misleading, nothing is wrong or different with Results.jsx. In previous version of this class I show you how to accomplish this with react-test-renderer. However the folks at @testing-lib think shallow rendering is more harmful than helpful (I like, 75% agree) so we'll leave it out. [Click here][fem] to see me teach this previously. It's 95% the same, just uses Jest instead of Vitest.

Update your snapshots by either running `npm run test -- -u` or you can use the watcher to do it with either `u` to update all at once or do `i` one-by-one.

You should commit snapshot files to git.

I'll let it up to you how much you value these tests. I think they have a very limited place in UI testing but it's pretty low level of help. Frequently they become more noise than help. In any case, keep them in your toolbox, some times they can be helpful.

[fem]: https://frontendmasters.com/courses/intermediate-react-v4/snapshots/
