---
id: /docs/nextjs/adding-backends
title: Adding a Backend
prev: /docs/nextjs/bootstrapping
next: /docs/nextjs/creating-forms
---

The `<Tina>` component makes it possible to attach [forms](../concepts/forms.md) to the Tina sidebar, but we need to wire up a [backend](../concepts/backends.md) in order for content changes to be persisted anywhere. Let's set up the default git backend.

The git backend consists of two parts:

1. The server-side application that handles file manipulation and interaction with the git protocol, and
2. The client-side adapter that allows forms registered with Tina to send data to the server-side app.

The server-side application can be run a as a standalone express app. In this example, we'll use [concurrently](https://www.npmjs.com/package/concurrently) to run both the git API and the NextJS development server in a single NPM script.

## Installation

For the time being, you will want to use the `canary` channel of `@tinacms/api-git` in order to run it as a standalone application. Run the following installation command:

```
npm install concurrently @tinacms/api-git@canary @tinacms/git-client
```

## Running the Server-Side API

`@tinacms/api-git` exposes the `tina-git-server` command that you can run in an NPM script. Update the `scripts` section in your `package.json` file to run both Next and the git API via `concurrently`:

```json
  "scripts": {
    "develop": "concurrently \"next dev\" \"tina-git-server 3001\"",
    "start": "next start"
  }
```

The first argument passed to `tina-git-server` is the port you want to run the server on.

## Hooking up the Frontend

All that's left is to configiure the CMS to consume the git API that now runs on the backend. We can do this easily with the `GitClient` class from the `@tinacms/git-client` package. To get started, install the package:

```
npm install @tinacms/git-client
```

When creating an instance of `GitClient`, we need to pass it the URL where the API endpoints can be reached. By default, `tina-git-server`'s API routes are scoped within the `/___tina` path. Since we're running the server locally on port 3001, the full URL to our git backend is `http"//localhost:3001/___tina`. We could then instantiate the git client as follows:

```javascript
const client = new GitClient('http://localhost:30001/___tina')
```

We'll need to amend our `_app.js` application wrapper to register this with the CMS. We can attach APIs to our CMS using the `registerApi` method.

The `_app.js` file should now look something like this:

```javascript
import React from 'react'
import App from 'next/app'
import { Tina, TinaCMS } from 'tinacms'
import { GitClient } from '@tinacms/git-client'

class MyApp extends App {
  constructor() {
    super()
    this.cms = new TinaCMS()
    const client = new GitClient('http://localhost:30001/___tina')
    this.cms.registerApi('git', client)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Tina cms={this.cms}>
        <Component {...pageProps} />
      </Tina>
    )
  }
}

export default MyApp
```
