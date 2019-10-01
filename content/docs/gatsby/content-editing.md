---
title: Content Editing Test
id: /docs/gatsby/content-editing
prev: /docs/gatsby/manual-setup
next: /docs/gatsby/content-creation
---

Gatsby allows you to build sites from many different data sources. Currently Tina has plugins for editing content in [markdown](/gatsby/content-editing#editing-markdown-in-gatsby) & [JSON](/gatsby/content-editing#editing-json-in-gatsby) files, with plans to suppor many more data sources.

<!-- callout -->

Have an idea for a Tina content editing plugin? [Consider contributing](/contributing/guidelines)! Check out how to create your own [form](/using-tina/creating-forms) or [field plugin](/using-tina/creating-fields).

## Editing Markdown in Gatsby

The [`gatsby-transformer-remark`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark) plugin lets us use markdown in our Gatsby sites. Two other packages let us edit markdown with Tina:

- `react-tinacms-remark`: Provides hooks and components for creating Remark forms.
- `gatsby-tinacms-git`: Extends the gatsby development server to writes changes to the local filesystem.

### Install the Git & Markdown Packages

```
npm install --save @tinacms/react-tinacms-remark @tinacms/gatsby-tinacms-git
```

or

```
yarn add @tinacms/react-tinacms-remark @tinacms/gatsby-tinacms-git
```

### Adding the Git Plugin

Open the `gatsby-config.js` file and add the `"@tinacms/gastby-tinacms-git"` plugin:

```JavaScript
module.exports = {
  // ...
  plugins: [
    {
      resolve: '@tinacms/gatsby-plugin-tinacms',
      options: {
        plugins: [
          "@tinacms/gatsby-tinacms-git",
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
import { remarkForm } from '@tinacms/react-tinacms-remark'

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
import { remarkForm } from '@tinacms/react-tinacms-remark'

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

## Editing JSON in Gatsby

Creating forms for content provided by the [`gatsby-transformer-json`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-json) plugin is made possible by three plugins:

- `gatsby-tinacms-json`: Provides hooks and components for creating Remark forms.
- `gatsby-tinacms-git`: Extends the gatsby dev server to writes changes to the local filesystem;
  and registers [CMS Backend](../concepts/backends.md) for saving changes to that backend.

### Installation

```
npm install --save gatsby-source-filesystem gatsby-transformer-json @tinacms/gatsby-tinacms-git @tinacms/react-tinacms-json
```

or

```
yarn add gatsby-source-filesystem gatsby-transformer-json @tinacms/gatsby-tinacms-git @tinacms/react-tinacms-json
```

### Configuring Gatsby

**gastby-config.js**

```javascript
module.exports = {
  plugins: [
    // ...
    '@tinacms/react-tinacms-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: 'data',
      },
    },
    'gatsby-transformer-json',
  ],
}
```

This will create a node for each json file in the `src/data` directory. You can then query that data like so:

```graphql
query MyQuery {
  dataJson(firstName: { eq: "Nolan" }) {
    lastName
    firstName
  }
}
```

### Creating JSON Forms

In order to edit a json file, you must register a form with the CMS. There are two approaches to registering Json Forms with the Tina. The approach you choose depends on whether the React template is class or function.

1. [`useJsonForm`](#useJsonForm): A [Hook](https://reactjs.org/docs/hooks-intro.html) used when the template is a function.
1. [`JsonForm`](#JsonForm): A [Render Props](https://reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns) component to use when the template is a class component.

### Note: required query data

In order for the Json forms to work, you must include the following fields in your `dataJson` query:

- `fields.fileRelativePath`

An example `dataQuery` in your template might look like this:

```
query DataQuery($slug: String!) {
  dataJson(fields: { slug: { eq: $slug } }) {
    fields {
      fileRelativePath
    }
    firstName
    lastName
  }
}
```

Additionally, any fields that are **not** queried will be deleted when saving content via the CMS.

### useJsonForm

This is a [React Hook](https://reactjs.org/docs/hooks-intro.html) for registering Json Forms with the CMS.
This is the recommended approach if your template is a Function Component.

**Interface**

```typescript
useJsonForm(data): [values, form]
```

**Arguments**

- `data`: The data returned from a Gatsby `dataJson` query.

**Return**

- `[values, form]`
  - `values`: The current values to be displayed. This has the same shape as the `data` argument.
  - `form`: A reference to the [CMS Form](../concepts/forms.md) object. The `form` is rarely needed in the template.

**src/templates/blog-post.js**

```jsx
import { useJsonForm } from '@tinacms/react-tinacms-json'

function DataTemplate(props) {
  const [data] = useJsonForm(props.data.dataJson)

  return <h1>{data.firstName}</h1>
}
```

### JsonForm

`JsonForm` is a [Render Props](https://reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns)
based component for accessing [CMS Forms](../concepts/forms.md).

This Component is a thin wrapper of `useJsonForm`. Since React[Hooks](https://reactjs.org/docs/hooks-intro.html) are
only available within Function Components you will wneed to use `JsonForm` if your template is Class Component.

**Props**

- `data`: The data returned from a Gatsby `dataJson` query.
- `render({ data, form }): JSX.Element`: A function that returns JSX elements
  - `data`: The current values to be displayed. This has the same shape as the data in the `Json` prop.
  - `form`: A reference to the [CMS Form](../concepts/forms.md) object. The `form` is rarely needed in the template.

**src/templates/blog-post.js**

```jsx
import { JsonForm } from '@tinacms/react-tinacms-json'

class DataTemplate extends React.Component {
  render() {
    return (
      <JsonForm
        data={this.props.data.dataJson}
        render={({ data }) => {
          return <h1>{data.firstName}</h1>
        }}
      />
    )
  }
}
```

#### Next Steps

- [Editing Markdown](/gatsby/content-editing/#1-editing-markdown-in-gatsby)

#### References

- [Creating Forms](../using-tina/creating-forms.md)
- [Custom Field Plugins](./custom-field-plugins.md)
