---
id: /gatsby/content-creation
title: Content Creation
prev: /gatsby/content-editing
next: /gatsby/custom-fields
---

Editing content is rad, but we need a way to add or create new content. This guide will go through the process of creating new markdown files. Have an idea for a new content-type that you would like to 'create' with a button in the Tina sidebar? [Consider contributing!](/contributing/guidelines)

##Prerequisites
- A Gatsby site [configured with Tina](/gatsby/manual-setup)
- [Editing markdown](/gatsby/content-editing#1-editing-markdown-in-gatsby) with Tina setup

## Creating Markdown in Gatsby

Creating new Markdown files is made possible by two plugins:

- `gatsby-tinacms-remark`: Provides hooks and components for creating Remark forms.
- `gatsby-tinacms-git`: Extends the gatsby development server to writes changes to the local filesystem;
  and registers [CMS Backend](../concepts/backends.md) for saving changes to that backend.

###1. Creating Content-Button Plugins

Tina uses `content-button` plugins to render buttons at the top of the Tina sidebar. These buttons are used for creating new content in the CMS. The `createRemarkButton` function helps us constructs `content-button` plugins for creating markdown files.

```javascript
import { createRemarkButton } from '@tinacms/react-tinacms-remark'

const CreatePostButton = createRemarkButton({ label: 'Create Post' })
```

###2. Adding the Button

Now that we've created the button, we need to add it to the sidebar. There's many places you could add this button. You'll need to think about where you want this button to show-up. You could add it to a blog index page, where all blogs or posts are listed. Or you could add it to a layout component so it is always available when that layout is used. This button should not be added to the templates where you set-up tina to edit content. For example, a blog template where you added a remarkForm.

**Option: only show on the Blog index**

In this example, we use the `withPlugin` higher order component from `@tinacms/react-tinacms` to add the button
to the Tina when visiting the blog index page.

**Example: src/pages/index.js**

```jsx
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

// Create the button plugin
const CreatePostButton = createRemarkButton({
  label: 'Create Post',
  filename: name => {
    let slug = name.replace(/\s+/, '-').toLowerCase()

    return `content/blog/${slug}/index.md`
  },
  frontmatter: title => ({
    title,
    date: new Date(),
  }),
})

export default withPlugin(BlogIndex, CreatePostButton)
```
This will add a button with the text `Create Post` to the sidebar. Clicking the button will reveal a text input that accepts the path of the markdown file to be created.

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


