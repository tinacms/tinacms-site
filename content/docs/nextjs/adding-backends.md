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
