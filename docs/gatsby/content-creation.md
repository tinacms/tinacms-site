---
title: Content Creation
id: /gatsby/content-creation
prev: /gatsby/content-editing
next: /gatsby/custom-fields
---

Editing content is rad, but we need a way to add or create new content. This guide will go through the process of creating new markdown files. Have an idea for a new content-type that you would like to 'create' with a button in the Tina sidebar? [Consider contributing!](/contributing/guidelines)

##Prerequisites

- A Gatsby site [configured with Tina](/gatsby/manual-setup)
- [Editing markdown](/gatsby/content-editing#1-editing-markdown-in-gatsby) with Tina setup

## Creating Markdown in Gatsby

In this guide you'll learn to:

1. Create a `content-button` plugin
2. Register the plugin with Tina
3. Configure how content is created by:
   - Formatting the filename & path
   - Providing default frontmatter
   - Providing a default body

###1. Creating Content-Button Plugins

Tina uses `content-button` plugins to make creating content possible. These buttons are accessible from the sidebar menu. The `createRemarkButton` function helps us constructs `content-button` plugins for creating markdown files.

**Example**

```javascript
import { createRemarkButton } from '@tinacms/react-tinacms-remark'

const CreatePostButton = createRemarkButton({ label: 'Create Post' })
```

###2. Adding the Button

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
import { createRemarkButton } from '@tinacms/react-tinacms-remark'

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
const CreatePostPlugin = createRemarkButton({ label: 'Create Post' })

// 3. Add the plugin to the component
export default withPlugin(BlogIndex, CreatePostPlugin)
```

This will add a button with the text `Create Post` to the sidebar. Clicking the button will reveal a text input that accepts the path of the markdown file to be created.

**Creating Content**

With the plugin in place, **open TinaCMS and click the menu button** in the top-left corner. The menu panel will slide into view with the button at the top.

Click the "Create Post" button and a modal will pop up. Enter the path to a new file relative to your repository root (e.g. `content/blog/my-new-post.md`) and then click "create". A moment later the new post will be added to your Blog Index.

###3. Formatting the filename & path

To simplify file creation for content writers, the `createRemarkButton` can be given a `filename` function that calculates the path.

**Example 1: Hardcoded Content Directory**

```javascript
const CreatePostButton = createRemarkButton({
  label: 'Create Post',
  filename: name => `content/blog/${name}.md`,
})
```

**Example 2: Content as index files**

```javascript
const CreatePostButton = createRemarkButton({
  label: 'Create Post',
  filename: name => `content/blog/${name}/index.md`,
})
```

**Example 3: Slugify Name**

```javascript
const CreatePostButton = createRemarkButton({
  label: 'Create Post',
  filename: name => {
    let slug = name.replace(/\s+/, '-').toLowerCase()

    return `content/blog/${slug}/index.md`
  },
})
```

###4. Providing Default Frontmatter

The `createRemarkButton` function can be given a `frontmatter` function that returns the default frontmatter.

**Example: Title + Date**

```javascript
const CreatePostButton = createRemarkButton({
  label: 'Create Post',
  frontmatter: title => ({
    title,
    date: new Date(),
  }),
})
```

###5. Providing a Default Body

The `createRemarkButton` function can be given a `frontmatter` function tht returns the default frontmatter.

**Example: Title + Date**

```javascript
const CreatePostButton = createRemarkButton({
  label: 'Create Post',
  body: () => `This is a new blog post. Please write some content.`,
})
```
