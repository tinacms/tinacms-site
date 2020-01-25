---
title: Creating Forms
id: /docs/nextjs/creating-forms
prev: /docs/nextjs/adding-backends
next: /docs/contributing/inline-editing
consumes:
  - file: /packages/next-tinacms-json/src/use-json-form.ts
    details: Demonstrates using useLocalJsonForm on a Next.js site
  - file: /packages/next-tinacms-json/src/use-local-json-form.ts
    details: Demonstrates using useLocalJsonForm on a Next.js site
  - file: /packages/next-tinacms-json/src/use-global-json-form.ts
    details: Demonstrates using useGlobalJsonForm on a Next.js site
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

### Global Forms

There is another hook, `useGlobalJsonForm`, that registers a [Global Form](https://tinacms.org/docs/concepts/forms#local--global-forms) with the sidebar.

Using this hook looks almost exactly the same as the example for `useLocalJsonForm`. This hook expects an object with the properties, `fileRelativePath` and `data`. The value of `data` should be the contents of the JSON file. The [Global Form](https://tinacms.org/docs/concepts/forms#local--global-forms) can be customized by passing in an _options_ object as the second argument.

## Editing Markdown

The `next-tinacms-markdown` package provides a similar set of methods for editing content sourced from Markdown files.

- `useLocalMarkdownForm( markdownFile, options? ):[values, form]`
- `useGlobalMarkdownForm( markdownFile, options? ):[values, form]`

These hooks work similarly, the biggest difference being whether they register [local or global](https://tinacms.org/docs/concepts/forms#local--global-forms) forms wih the CMS. They can only be used with [function components](https://reactjs.org/docs/components-and-props.html#function-and-class-components).

**Arguments**

- `markdownFile`: Both hooks expect an object as the first argument that matches the following interface:

```typescript
// A datastructure representing a MarkdownFile file stored in Git
export interface MarkdownFile {
  fileRelativePath: string
  frontmatter: any
  markdownBody: string
}
```

- `options`: The second argument is an _optional configuration object_ that can include [options](https://tinacms.org/docs/gatsby/markdown/#customizing-remark-forms) to customize the form.

**Return Values**

- `values`: An object containing the current values from `frontmatter` and `markdownBody`. You can use these values to render content.
- `form`: A reference to the `Form` registered to the CMS. Most of the time you won't need to work directly with the `Form`, so you won't see it used in the example.

### _useLocalMarkdownForm_ In Use

The `useLocalMarkdownForm` hook will connect the return data from `getInitialProps` with Tina, then return the `frontmatter` and `markdownBody` values to be rendered.

```jsx
/*
** 1. Import `useLocalMarkdownForm`
*/
import { useLocalMarkdownForm } from 'next-tinacms-markdown'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout'

export default function Info(props) {

  /*
  ** Optional — define an options object
  ** to customize the form
  */
  const formOptions = {
    label: 'Home Page',
    fields: [
      { label: 'Name', name: 'frontmatter.name', component: 'text' },
      {
        name: 'markdownBody',
        label: 'Home Page Content',
        component: 'markdown',
      },
    ],
  }
  /*
  ** 2. Call `useLocalMarkdownForm` and pass in the
  **    `data` object returned from `getInitialProps`,
  **    along with any form options.
  */
  const [data] = useLocalMarkdownForm(props.data, formOptions)

  /*
  **  3. Render content from your Markdown source file
  **     with the returned `data` object.
  */
  return (
    <Layout>
      <section>
        <h1>{data.frontmatter.name}<h2>
        <ReactMarkdown>{data.markdownBody}</ReactMarkdown>
      </section>
    </Layout>
  )
}

Info.getInitialProps = async function() {
  const infoData = await import(`../data/info.md`)
  const data = matter(infoData.default)

  return {
    /*
    ** 4. Make sure your return data matches this shape
    */
    data: {
      fileRelativePath: `data/info.md`,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}
```

<tip>You can use [`gray-matter`](https://github.com/jonschlinkert/gray-matter) to parse the YAML frontmatter when importing a raw Markdown file.</tip>

[More info: creating custom forms](/docs/concepts/forms#creating-custom-forms)
