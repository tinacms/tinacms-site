---
title: Bootstrapping
id: /docs/nextjs/bootstrapping
prev: /docs/nextjs/overview
next: /docs/nextjs/adding-backends
---

## Adding the Tina Provider

We need to wrap every page in the `<Tina>` component. This component will provide the CMS to all of our pages, allowing us to create an editor for our content. We can do this in NextJS by creating a file at `pages/_app.js` and extending the default NextJS `App` class. Next will then use our custom app component to render the page. A basic boilerplate for extending the default `App` class looks like this:

```javascript
import React from 'react'
import App from 'next/app'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp
```

From here, install `tinacms`:

```bash
npm install tinacms
```

After installing `tinacms`, we need to create an instance of the CMS and pass it through to our pages via the `Tina` component. Our new App class will look like this:

```javascript
import React from 'react'
import App from 'next/app'
import { Tina, TinaCMS } from 'tinacms'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    const cms = new TinaCMS()
    return (
      <Tina cms={cms}>
        <Component {...pageProps} />
      </Tina>
    )
  }
}

export default MyApp
```
