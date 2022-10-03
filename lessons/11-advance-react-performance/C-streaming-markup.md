---
section: "Server Side Rendering"
---

This is all cool, but we can make it _better_.

With HTTP requests, you can actually send responses in chunks. This is called _streaming_ your request. When you stream a request, you send partially rendered bits to your client so that the browser can immediately start processing the HTML rather than getting one big payload at the end. Really, the biggest win is that browser can immediately start downloading CSS while you're still rendering your app.

Let's see how to do this:

```javascript
// change react-dom import
import { renderToNodeStream } from "react-dom/server";

// replace app.use call
app.use((req, res) => {
  res.write(parts[0]);
  const staticContext = {};
  const reactMarkup = (
    <StaticRouter url={req.url} context={staticContext}>
      <App />
    </StaticRouter>
  );

  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  stream.on("end", () => {
    res.status(staticContext.statusCode || 200);
    res.write(parts[1]);
    res.end();
  });
});
```

- Node has a native type called a stream. A stream, similar to a bash stream, is a stream of data that can be piped into something else. In this case, we have a Node stream of React markup being rendered. As each thing is rendered, React fires off a chunk that then can be sent to the user more quickly.
- First thing we do is _immediately_ write the head to the user. This way they can grab the `<head>` which the CSS `<link>` tag in it, meaning they can start the CSS download ASAP.
- From there we start streaming the React markup to the user.
- After we finish with that stream, we write the end of the index.html page and close the connection.

> 🏁 [Click here to see the state of the project up until now: server-side-rendering-2][step]

[step]: https://github.com/btholt/citr-v8-project/tree/master/server-side-rendering-2
