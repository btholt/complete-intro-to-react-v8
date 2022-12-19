---
description: "Brian quickly converts SearchParams.tsx"
---

Let's go do SearchParams.tsx

```tsx
// import Animal type
import { Animal } from "./APIResponsesTypes";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

// replace useState calls
const [animal, updateAnimal] = useState("" as Animal);

<form
  onSubmit={(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const obj = {
      animal: formData.get("animal")?.toString() ?? "",
      breed: formData.get("breed")?.toString() ?? "",
      location: formData.get("location")?.toString() ?? "",
    };
    setRequestParams(obj);
  }}
>
 […]
</form>

// add as to select for animal
<select
  id="animal"
  name="animal"
  onChange={(e) => {
    setAnimal(e.target.value as Animal);
  }}
  onBlur={(e) => {
    setAnimal(e.target.value as Animal);
  }}
>
  […]
</select>
```

- We had to switch from `e.target` to `e.currentTarget` because I guess while target works it's not technically guaranteed to be on a submit event even though it always is 🤷‍♂️
- Working with the DOM with TypeScript can get annoying because there's a lot of legacy pseudo types that we never had to care about. Technically `formData.get` gives us back a `FormDataEntryValue` type and not a string but when you use it like we were it implicitly called `toString`. Now we have to do it explictly.
- We need to type values as they come out of the DOM. There's no way for TypeScript to understand what goes into the DOM and what comes back out so we have to be explicit as it goes in and out.
