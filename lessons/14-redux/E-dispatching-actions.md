---
description: ""
---

We're not quite done here. We got the reading part of Redux done but not the writing. Let's go do that too in SearchParams.js

```javascript
import { useSelector, useDispatch } from "react-redux";
import changeLocation from "./actionCreators/changeLocation";
import changeTheme from "./actionCreators/changeTheme";
import changeAnimal from "./actionCreators/changeAnimal";
import changeBreed from "./actionCreators/changeBreed";

// up with other hooks
const dispatch = useDispatch();

// change inputs

<input
  id="location"
  value={location}
  placeholder="Location"
  onChange={(e) => dispatch(changeLocation(e.target.value))}
/>

<select
  id="animal"
  value={animal}
  onChange={(e) => dispatch(changeAnimal(e.target.value))}
  onBlur={(e) => dispatch(changeAnimal(e.target.value))}
></select>

<select
  disabled={!breeds.length}
  id="breed"
  value={breed}
  onChange={(e) => dispatch(changeBreed(e.target.value))}
  onBlur={(e) => dispatch(changeBreed(e.target.value))}
></select>

<select
  value={theme}
  onChange={(e) => dispatch(changeTheme(e.target.value))}
  onBlur={(e) => dispatch(changeTheme(e.target.value))}
></select>
```

- This dispatching is so much nicer than it is with other API
- The `useDispatch` hook gives you back a dispatching function so you can dispatch actions
- That's really it!

Now we're also using mapDispatchToState which lets us write functions to dispatch actions to Redux. Let's quickly add it to Details.js

```javascript
// replace ThemeContext import
import { connect } from "react-redux";

// remove all the ThemeContext stuff and the interior function
// replace `context.theme` with just `this.props.theme` for the backgroundColor

// bottom
const mapStateToProps = ({ theme }) => ({ theme });

const WrappedDetails = connect(mapStateToProps)(Details);

// replace DetailsWithRouter
const ReduxWrappedDetails = connect(mapStateToProps)(Details);

const DetailsWithRouter = withRouter(ReduxWrappedDetails);
```

Now it should work! Redux is a great piece of technology that adds a lot of complexity to your app. Don't add it lightly. I'd say you'd rarely want to start a new project using Redux: hit the problems first and then refactor it in. You just saw how.
