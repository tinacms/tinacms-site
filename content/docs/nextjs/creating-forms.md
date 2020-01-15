---
title: Creating Forms
id: /docs/nextjs/bootstrapping
prev: /docs/nextjs/adding-backends
next: /docs/contributing/guidelines
consumes:
  - file: /packages/@tinacms/react-core/src/use-form.ts
    details: Demonstrates using useLocalForm on a Next.js site
  - file: /packages/@tinacms/react-core/src/use-watch-form-values.ts
    details: Demonstrates usage of useWatchFormValues
  - file: /packages/react-tinacms/src/index.ts
    details: Imports useLocalForm and useWatchFormValues from react-tinacms metapackage
---

Let's imagine we have a Page component in our NextJS app using the dynamic route of `pages/[slug].js`. This page will get its content from a corresponding JSON file located at `posts/[slug].json`. Thus, when you visit `/hello-world`, it will display the contents of `/posts/hello-world.json`. We can set up a very simple version of this with the following code:

```jsx
// /pages/[slug].js

import * as React from 'react'

export default function Page({ post }) {
  return (
    <>
      <h1>{post.data.title}</h1>
    </>
  )
}

Page.getInitialProps = function(ctx) {
  const { slug } = ctx.query
  let content = require(`../posts/${slug}.json`)

  return {
    post: {
      fileRelativePath: `/posts/${slug}.json`,
      data: content,
    },
  }
}
```

The `getInitialProps` function is run by Next when the page is requested to load the data, and the return value is passed to our component as its initial props. Take note of `fileRelativePath`; we'll need that when we set up the form.

## Adding a Form for JSON With _useLocalJsonForm_

The `next-tinacms-json` package provides a hook to help us make JSON content editable. `useLocalJsonForm` receives an object matching the following interface:

```typescript
// A datastructure representing a JSON file stored in Git
interface JsonFile<T = any> {
  fileRelativePath: string
  data: T
}
```

and returns the contents of `data` after it's been exposed to the editor.

To use this hook, install `next-tinacms-json`:

```
npm install next-tinacms-json
```

Since the object we're returning from `getInitialProps` already matches the `JsonFile` interface, all that's required is to pass this object into `useLocalJsonForm`, and replace the `post` object in our render with the hook's return value:

```diff
 // /pages/[slug].js

 import * as React from 'react'

 export default function Page({ post }) {
+  const [postData] = useLocalJsonForm(post)
   return (
     <>
+      <h1>{postData.title}</h1>
     </>
   )
 }

 Page.getInitialProps = function(ctx) {
   const { slug } = ctx.query
   let content = require(`../posts/${slug}.json`)

   return {
     post: {
       fileRelativePath: `/posts/${slug}.json`,
       data: content,
     },
   }
 }
```

By default, `useLocalJsonForm` creates a text field for each value in `data`. It's possible to customize the form by passing a second argument into `useLocalJsonForm`:

```jsx
export default function Page({ post }) {
  const [postData] = useLocalJsonForm(post, {
    fields: [
      {
        name: 'title',
        label: 'Post Title',
        component: 'text',
      },
    ],
  })

  return (
    <>
      <h1>{postData.title}</h1>
    </>
  )
}
```

[More info: creating custom forms](/docs/concepts/forms#creating-custom-forms)
