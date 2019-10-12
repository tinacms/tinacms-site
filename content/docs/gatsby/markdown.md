---
title: Markdown in Gatsby
---

Gatsby allows you to build sites from many different data sources. Currently Tina has plugins for editing content in [markdown](/docs/gatsby/content-editing#editing-markdown-in-gatsby) & [JSON](/docs/gatsby/content-editing#editing-json-in-gatsby) files, with plans to suppor many more data sources.

<!-- callout -->

Have an idea for a Tina content editing plugin? [Consider contributing](/docs/contributing/guidelines)! Check out how to create your own [form](/docs/using-tina/creating-forms) or [field plugin](/docs/using-tina/creating-fields).

## Editing Markdown in Gatsby

The [`gatsby-transformer-remark`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark) plugin lets us use markdown in our Gatsby sites. Two other plugins let us edit markdown with Tina:

- `gatsby-tinacms-remark`: Provides hooks and components for creating Remark forms.
- `gatsby-tinacms-git`: Extends the gatsby development server to writes changes to the local filesystem.

### Install the Git & Markdown Packages

```
npm install --save @tinacms/gatsby-tinacms-remark @tinacms/gatsby-tinacms-git
```

or

```
yarn add @tinacms/gatsby-tinacms-remark @tinacms/gatsby-tinacms-git
```

### Adding the Git Plugin

Open the `gatsby-config.js` file and add both plugin:

```JavaScript
module.exports = {
  // ...
  plugins: [
    {
      resolve: '@tinacms/gatsby-plugin-tinacms',
      options: {
        plugins: [
          "@tinacms/gatsby-tinacms-git",
          "@tinacms/gatsby-tinacms-remark",
        ],
      },
    },
    // ...
  ],
}
```

### Creating Remark Forms

The `remarkForm` [higher-order component](https://reactjs.org/docs/higher-order-components.html) (HOC) let's us register forms with `Tina`. In order for it to work with your template, 3 fields must be included in the `markdownRemark` query:

There are 3 steps to making a markdown file editable:

1. Import the `remarkForm` HOC
2. Wrap your template with `remarkForm`
3. Add the required fields to the GraphQL query:
   - `id`
   - `fileRelativePath`
   - `rawFrontmatter`
   - `rawMarkdownBody`

**Example: src/templates/blog-post.js**

```jsx
// 1. Import the `remarkForm` HOC
import { remarkForm } from '@tinacms/gatsby-tinacms-remark'

function BlogPostTemplate(props) {
  return <h1>{props.data.markdownRemark.frontmatter.title}</h1>
}

// 2. Wrap your template with `remarkForm`
export default remarkForm(BlogPostTemplate)

// 3. Add the required fields to the GraphQL query
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        description
      }

      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
  }
`
```

You hould now text inputs for each of your frontmatter fields and for the markdown body. Try changing the tile and see what happens!

### Editing Markdown Content

With the Remark Form created, you can now edit your markdown file in the Tina sidebar. Content changes are written to the markdown files in real time. Hitting `Save` will commit those changes to your repository.

**Why write to disk "on change"?**

This allows any `gatsby-remark-*` plugins to properly transform the data in to a remark node and
provide a true-fidelity preview of the changes.

### Customizing Remark Forms

The `remarkForm` HOC creates the form based on the shape of your data. This is convenient for getting started but you will want to customize the form eventually.

**Why customize the form?**

1. The default `label` for a field is it's `name`.
1. Every field is made a `text` component.
1. The order of fields might not be consistent.

**How to customize the form**

The `remarkForm` function accepts an optional `config` object for overriding the default configuration of a `RemarkForm`. The following properties are accepted:

- `fields`: A list of field definitions
  - `name`: The path to some value in the data being edited. (e.g. `rawFrontmatter.title`)
  - `component`: The name of the React component that should be used to edit this field.
    The default options are: `"text"`, `"textarea"`, `"color"`.
  - `label`: A human readable label for the field.
  - `description`: An optional description that expands on the purpose of the field or prompts a specific action.

_NOTE: the name of your fields should be prefixed with `"rawFrontmatter"` rather than `"frontmatter"`. The later is the fully transformed data._

#### Example: src/templates/blog-post.js

```jsx
import { remarkForm } from '@tinacms/gatsby-tinacms-remark'

function BlogPostTemplate(props) {
  return (
    <>
      <h1>{props.markdownRemark.frontmatter.title}</h1>
      <p>{props.markdownRemark.frontmatter.description}</p>
    </>
  )
}

// 1. Define the form
let BlogPostForm = {
  fields: [
    {
      label: 'Title',
      name: 'rawFrontmatter.title',
      description: 'Enter the title of the post here',
      component: 'text',
    },
    {
      label: 'Description',
      name: 'rawFrontmatter.description',
      description: 'Enter the post description',
      component: 'textarea',
    },
  ],
}

// 2. Pass it as a the second argument to `remarkForm`
export default remarkForm(BlogPostTemplate, BlogPostForm)
```

## Creating New Markdown Files

Editing content is rad, but we need a way to add or create new content. This guide will go through the process of creating new markdown files. Have an idea for a new content-type that you would like to 'create' with a button in the Tina sidebar? [Consider contributing!](/docs/contributing/guidelines)

##Prerequisites

- A Gatsby site [configured with Tina](/docs/gatsby/manual-setup)
- [Editing markdown](/docs/gatsby/content-editing#1-editing-markdown-in-gatsby) with Tina setup

## Creating Markdown in Gatsby

In this guide you'll learn to:

1. Create a `content-button` plugin
2. Register the plugin with Tina
3. Configure how content is created by:
   - Formatting the filename & path
   - Providing default front matter
   - Providing a default body

### 1. Creating Content-Button Plugins

Tina uses `content-button` plugins to make creating content possible. These buttons are accessible from the sidebar menu. The `createRemarkButton` function helps us constructs `content-button` plugins for creating markdown files.

**Example**

```javascript
import { createRemarkButton } from '@tinacms/gatsby-tinacms-remark'

const CreatePostButton = createRemarkButton({
  label: 'Create Post',
  fields: [
    {
      name: 'filename',
      component: 'text',
      label: 'Filename',
      placeholder: 'content/blog/hello-world/index.md',
      description: 'The full path to the new markdown file, relative to the repository root.',
    },
  ],
  filename: form => {
    return form.filename
  },
})
```

### 2. Adding the Button

Now that we've created the button, we need to add it to the sidebar. The button only shoes up, when the component that registers it is rendered. There's many places you could add this button. You'll need to think about where you want this button to show-up.

<!-- TIP -->

Here are some places you may want to add the plugin:

1. The Root component: it will always be available
1. A Layout component: it will always available when that Layout is used.
1. A Blog Index component: it will only be available when looking at the list of blog posts.

**Adding the Button to the Blog Index**

In this example, we will add the button to the Tina sidebar when visiting the blog index page. There are 3 steps involved:

1. Import `createRemarkButton` and `withPlugin`
2. Create the `content-button` plugin
3. Add the plugin to the component

_NOTE: No changes need to be made to the `BlogIndex` component itself._

**Example: src/pages/index.js**

```jsx
// 1. Import `createRemarkButton` and `withPlugin`
import { withPlugin } from '@tinacms/react-tinacms'
import { createRemarkButton } from '@tinacms/gatsby-tinacms-remark'

// Note: this is just an example index component.
function BlogIndex(props) {
  const { data } = props
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={props.location}>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <h3>
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small>{node.frontmatter.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </div>
        )
      })}
    </Layout>
  )
}

// 2. Create the `content-button` plugin
const CreatePostButton = createRemarkButton({
  label: 'Create Post',
  fields: [
    {
      name: 'filename',
      component: 'text',
      label: 'Filename',
      placeholder: 'content/blog/hello-world/index.md',
      description: 'The full path to the new markdown file, relative to the repository root.',
    },
  ],
  filename: form => {
    return form.filename
  },
})

// 3. Add the plugin to the component
export default withPlugin(BlogIndex, CreatePostPlugin)
```

**Creating Content**

With the plugin in place, **open TinaCMS and click the menu button** in the top-left corner. The menu panel will slide into view with the button at the top.

Click the "Create Post" button and a modal will pop up. Enter the path to a new file relative to your repository root (e.g. `content/blog/my-new-post.md`) and then click "create". A moment later the new post will be added to your Blog Index.

### 3. Customizing the Create Form

`createRemarkButton` accepts a `fields` option, just like [Creating Forms](../using-tina/creating-forms.md) does. When using a custom create form, all callback functions will receive an object containing all form data.

**Example: Create Posts in Subdirectories**

```javascript
const CreatePostButton = createRemarkButton({
  label: 'Create Post',
  fields: [
    { name: 'section', label: 'Section', component: 'text', required: true },
    { name: 'title', label: 'Title', component: 'text', required: true },
  ],
  filename: form => {
    return `content/blog/${form.section}/${form.title}/index.md`
  },
})
```

### 4. Formatting the filename & path

The `createRemarkButton` must be given a `filename` function that calculates the path of the new file from the form data.

**Example 1: Hardcoded Content Directory**

```javascript
const CreatePostButton = createRemarkButton({
  label: 'Create Post',
  fields: [{ name: 'title', label: 'Title', component: 'text', required: true }],
  filename: form => `content/blog/${form.title}.md`,
})
```

**Example 2: Content as index files**

```javascript
const CreatePostButton = createRemarkButton({
  label: 'Create Post',
  fields: [{ name: 'title', label: 'Title', component: 'text', required: true }],
  filename: form => `content/blog/${form.title}/index.md`,
})
```

**Example 3: Slugify Name**

```javascript
const CreatePostButton = createRemarkButton({
  label: 'Create Post',
  fields: [{ name: 'title', label: 'Title', component: 'text', required: true }],
  filename: form => {
    let slug = form.title.replace(/\s+/, '-').toLowerCase()

    return `content/blog/${slug}/index.md`
  },
})
```

### 5. Providing Default Front Matter

The `createRemarkButton` function can be given a `frontmatter` function that returns the default front matter. Like the `filename` function, `frontmatter` receives the state of the form.

**Example: Title + Date**

```javascript
const CreatePostButton = createRemarkButton({
  label: 'Create Post',
  fields: [{ name: 'title', label: 'Title', component: 'text', required: true }],
  filename: form => {
    let slug = form.title.replace(/\s+/, '-').toLowerCase()

    return `content/blog/${slug}/index.md`
  },
  frontmatter: form => ({
    title: form.title,
    date: new Date(),
  }),
})
```

### 6. Providing a Default Body

The `createRemarkButton` function can be given a `body` function that returns the default markdown body. Like the previous two functions, `body` receives the state of the form.

**Example: Title + Date**

```javascript
const CreatePostButton = createRemarkButton({
  label: 'Create Post',
  fields: [{ name: 'title', label: 'Title', component: 'text', required: true }],
  filename: form => {
    let slug = form.title.replace(/\s+/, '-').toLowerCase()

    return `content/blog/${slug}/index.md`
  },
  body: form => `This is a new blog post. Please write some content.`,
})
```
