---
title: Markdown in Gatsby
prev: /docs/gatsby/manual-setup
next: /docs/gatsby/json
---

Gatsby allows you to build sites from many different data sources. Currently Tina has plugins for editing content in [markdown](/docs/gatsby/content-editing#editing-markdown-in-gatsby) & [JSON](/docs/gatsby/content-editing#editing-json-in-gatsby) files, with plans to support many more data sources.

<!-- callout -->

Have an idea for a Tina content editing plugin? [Consider contributing](/docs/contributing/guidelines)! Check out how to create your own [form](/docs/using-tina/creating-forms) or [field plugin](/docs/using-tina/creating-fields).

## Editing Markdown in Gatsby

The [`gatsby-transformer-remark`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark) plugin lets us use markdown in our Gatsby sites. Two other plugins let us edit markdown with Tina:

- `gatsby-tinacms-remark`: Provides hooks and components for creating Remark forms.
- `gatsby-tinacms-git`: Extends the gatsby development server to write changes to the local filesystem.

### Install the Git & Markdown Packages

    npm install --save gatsby-tinacms-remark gatsby-tinacms-git

or

    yarn add gatsby-tinacms-remark gatsby-tinacms-git

### Adding the Git Plugin

Open the `gatsby-config.js` file and add both plugins:

```JavaScript
module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        plugins: [
          "gatsby-tinacms-git",
          "gatsby-tinacms-remark",
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
3. Add `...TinaRemark` to the GraphQL query

<tip>Required fields used to be queried individually: `id`, `fileRelativePath`, `rawFrontmatter`, & `rawMarkdownBody`. The same fields are now being queried via `TinaRemark`</tip>

**Example: src/templates/blog-post.js**

```jsx
// 1. Import the `remarkForm` HOC
import { remarkForm } from 'gatsby-tinacms-remark'

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
      ...TinaRemark
    }
  }
`
```

You should now see text inputs for each of your frontmatter fields and for the markdown body. Try changing the tile and see what happens!

### Queries aliasing 'markdownRemark'

NOTE: If your query uses an alias for 'markdownRemark', then you will have to use the 'queryName' option to specify the alias name.

**Example: src/templates/blog-post.js**

```jsx
/// ...

// Use 'queryName' to specify where markdownRemark is found.
export default remarkForm(BlogPostTemplate, { queryName: 'myContent' })

// Aliasing markdownRemark as 'myContent'
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    myContent: markdownRemark(fields: { slug: { eq: $slug } }) {
      // ...
    }
  }
`
```

### Editing Markdown Content

With the Remark Form created, you can now edit your markdown file in the Tina sidebar. The `markdown` component is [commonmark](https://commonmark.org/help/) compatible. Content changes are written to the markdown files in real time. Hitting `Save` will commit those changes to your repository.

**Why write to disk "on change"?**

This allows any `gatsby-remark-*` plugins to properly transform the data in to a remark node and
provide a true-fidelity preview of the changes.

### Customizing Remark Forms

The `remarkForm` HOC creates the form based on the shape of your data. This is convenient for getting started but you will want to customize the form eventually.

**Why customize the form?**

1. The default `label` for a field is it's `name`.
2. Every field is made a `text` component.
3. The order of fields might not be consistent.

**How to customize the form**

The `remarkForm` function accepts an optional `config` object for overriding the default configuration of a `RemarkForm`. The following properties are accepted:

- `fields`: A list of field definitions
  - `name`: The path to some value in the data being edited. (e.g. `frontmatter.title`)
  - `component`: The name of the React component that should be used to edit this field.
    The default options are: `"text"`, `"textarea"`, `"color"`.
  - `label`: A human readable label for the field.
  - `description`: An optional description that expands on the purpose of the field or prompts a specific action.

#### Example: src/templates/blog-post.js

```jsx
import { remarkForm } from 'gatsby-tinacms-remark'

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
      name: 'frontmatter.title',
      description: 'Enter the title of the post here',
      component: 'text',
    },
    {
      label: 'Description',
      name: 'frontmatter.description',
      description: 'Enter the post description',
      component: 'textarea',
    },
  ],
}

// 2. Pass it as a the second argument to `remarkForm`
export default remarkForm(BlogPostTemplate, BlogPostForm)
```
