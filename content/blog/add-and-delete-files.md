---
title: How to Add and Delete Files with Tina
date: '2019-12-09T07:00:00.000Z'
author: Kendall Strautman
draft: true
consumes:
  - file: /packages/@tinacms/api-git/src/server.ts
    details: Uses tina-git-server
---

Creating and deleting content — two fundamental sides to the coin of content management. This article will cover how to set up this functionality with Tina.

To create a new file, we will use a `content-creator` plugin. To delete files, we will use a `form action`.

### Tina Overview: sidebar 🦁, forms 🐯, plugins 🐻 — oh my

When you install Tina, you should immediately get access to a ‘sidebar’. This sidebar is the main interface for using Tina to edit and manage content.

To make content editable on your site, you need to register a form to Tina. Forms appear in the sidebar, displaying fields where you can edit content on the page.

Plugins allow for extending the functionality of the core CMS. Behind the scenes, plugins do some big work with Tina. They register forms, create new screen views, and allow us to create new content. If you're interested to learn more, read this post on our dynamic plugin system.

<tip>Jump to [deleting files](https://tinacms.org//blog/add-and-delete-files/#deleting-files). Or see an example of a `content-creator` plugin set up here.</tip>

## Creating New Files

### The Steps 🚶‍♀️

These steps will be our journey-map for setting up content-creation functionality.
1. Set-up a `content-creator` plugin
2. Register the plugin with Tina
3. Customize the ‘create form’
4. Configure default data for the new file

### One more thing to consider

Before we get into the steps, we need to zoom out to consider the editing process in our site. Tina doesn’t prescribe ‘a way’ of how creating content should show up for editor. As a developer, you get to decide when this ‘creation’ capacity is available.

To be more specific, you can register the `content-creator` plugin on any component in your site. When that component renders, you'll be able to create new content.

You may want create a new blog post only when you're on the blog list page. To do this, you'll register the plugin on the list component. If you always want to be able to create new blog posts, you'll register the plugin on a component that is always rendered. Examples of this could be a `Layout` or `Root` component.

**Consider the experience before you dig into code.** One of the incredible things about Tina is that you have this finite control, so use it.

## Step 1: Set-up a content-creator plugin

Okay, let’s get into it. In this step we are going to creatively create a `content-creator` plugin 👩‍🎨. There are different plugins creating markdown or JSON files. We’ll go with markdown in this example. Feel free to read more on using the `JsonCreatorPlugin` in the documentation.

Head to the component file where you want to add this plugin. This example will use the `Layout` component. This way, the ability to create new posts is always available to the editor.

``` javascript

/*
** Layout.js
*/

// import RemarkCreatorPlugin to construct a `content-creator` plugin
import { RemarkCreatorPlugin } from 'gatsby-tinacms-remark'

// instantiate RemarkCreatorPlugin
const CreatePostPlugin = new RemarkCreatorPlugin({

  /*
  ** A simple action label displayed when editors
  ** interact with the + button in the sidebar.
  */
  label: 'New Blog Post',

  // A function whose return value should be the path to the new file.
  filename: form => {
    return form.filename
  },

  /*
  ** An array of field objects defining the shape
  ** of the form to fill out when creating a new file
  */
  fields: [
    {
      name: 'filename',
      component: 'text',
      label: 'Filename',
      placeholder: 'content/blog/hello-world/index.md',
      description: 'The full path to the new markdown file, relative to the repository root.',
    },
  ],
})

```

### Formatting the path to the new file

There are many ways you could set up the return value for the `filename`. One approach is hardcoding the path to the new file. Notice how data submitted by the ‘create form’ is being used. So when a new file is created, you can have the editor enter a title. In this example, that title will become the name of the file in that hard-coded directory.

``` javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
  //...
  filename: form => `content/blog/${form.title}.md`,
})
```

You can take this one step further and ‘slugify’ the title. You can do this manually with Regex or use a handy package aptly called [`slugify`](https://www.npmjs.com/package/slugify).

``` javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
   //...
  filename: form => {
    let slug = form.title.replace(/\s+/, '-').toLowerCase()

    return `content/blog/${slug}.md`
  },
})
```

The `filename` or path formatting is really dependent on the structure of your project. Pick a simple solution that makes sense to you.

## 2. Register the plugin with the sidebar

In the previous step, we created the plugin, now we need to actually add it to the sidebar. Import `withPlugin` from `react-tinacms`. This is a [higher-order component](https://reactjs.org/docs/higher-order-components.html) for adding plugins to the cms.

Export the component and plugin using `withPlugin` and you should now be able to add new posts from the Tina sidebar. The location of the new files will be based on the return value from the `filename` property.

``` javascript

import { withPlugin } from 'react-tinacms'
import { RemarkCreatorPlugin } from 'gatsby-tinacms-remark'

function Layout(props) {
  return (
      /*
      ** Nothing gets changed in the actual component
      ** to register the `content-creator` plugin
      */
    )
  }

  // create instance of `RemarkCreatorPlugin`
  const CreateBlogPlugin = new RemarkCreatorPlugin( {
    label: 'Add New Blog',
    filename: name => {
      let slug = name.title.replace(/\s+/g, '-').toLowerCase()
      return `content/posts/${slug}.md`
    },
    fields: [
      {
        label: 'Title',
        name: 'title',
        component: 'text',
        required: true
      },
      {
        label: 'Date',
        name: 'date',
        component: 'date',
        description: 'The default will be today'
      },
      {
        label: 'Author',
        description: 'Who wrote this, yo?',
        name: 'author',
        component: 'text'
      }
    ],
  })

// export the component & `content-creator` plugin
export default withPlugin(Layout, CreateBlogPlugin)
```

Start up your development server and you’ll see a blue plus (+) icon in the top menu in the sidebar. Click it and you’ll see the `label` you set in your plugin configuration. Try to create a new file! See what happens.

<tip>If you don't see the icon, check if the component where you added the plugin is rendered.</tip>

## 3. Customize The Create Form

In our initial example, the ‘create form’ only captured a title. We can add more fields to populate the new file. In the blog example, we could capture the date and author.

``` javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [
    {
      name: 'title',
      component: 'text',
      label: 'Title',
      description: 'The title of your new post.',
      required: true
    },
    {
     name: 'date',
     component: 'date',
     label: 'Date',
     description: 'The default will be today'
   },
   {
     description: 'Who wrote this, yo?',
     name: 'author',
     label: 'Author',
     component: 'text'
   }
  ],
  filename: form => {
    const slug = form.title.replace(/\s+/, '-').toLowerCase()

    return `content/blog/${slug}.md`
  },
})

```
Notice on the Title field the required property. You can use this to ensure you get all the required data necessary for creating the new file.

Learn about all the default fields to choose from here. If you’d like to create a custom field, read more on that here.

## 4. Configure Defaults

`RemarkCreatorPlugin` can also be given additional information to add default data to the newly created files. For markdown, we can add default frontmatter values and a markdown body.

``` javascript
const CreateBlogButton = new RemarkCreatorPlugin( {
 label: 'Add New Post',
 filename: name => {
     const slug = name.title.replace(/\s+/g, '-').toLowerCase()
     return `content/posts/${slug}.md`
 },
 fields: [
   {
     label: 'Title',
     name: 'title',
     component: 'text',
     required: true
   },
   {
     label: 'Date',
     name: 'date',
     component: 'date',
     description: 'The default will be today'
   },
   {
     label: 'Author',
     description: 'Who wrote this, yo?',
     name: 'author',
     component: 'text'
   }
 ],
 // add default frontmatter
 frontmatter: (postInfo) => {
   return ({
   title: postInfo.title,
   date: postInfo.date ? postInfo.date : new Date(),
   author: postInfo.author ? postInfo.author: ‘Kurt Vonnegut’
 },
 // add a default markdown body
 body: (postInfo) => `New post, who dis?`
})
```
Both the frontmatter and body functions receive the data from the create from. Use the inputted values to populate the new file, or setup defaults if nothing was entered.

## Deleting Files

With the power to create, comes the power to delete. I promise you this step is much simpler.

Instead of adding a ‘delete’ plugin, we simply need to pass a `delete action` to the main form options.
Head to a file where you have a Tina form configured in your project. If you don’t have a Tina form configured in your project, learn more about creating forms with Tina here.

Here’s is an example blog template using markdown with Tina configured:
``` javascript
// 1. Import `DeleteAction`
import { remarkForm, DeleteAction } from 'gatsby-tinacms-remark'

function BlogTemplate(props) {
  return (
    <>
      <h1>{props.markdownRemark.frontmatter.title}</h1>
      <p>{props.markdownRemark.frontmatter.description}</p>
    </>
  )
}

// 2. Add the `DeleteAction` to the form
let BlogFormOptions = {
  actions: [ DeleteAction ],
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

export default remarkForm(BlogTemplate, BlogForm)
```
Import the `DeleteAction` from `gatsby-tinacms-remark` or `gatsby-tinacms-json`, depending on your filetype. On your form options definition, add the action and that’s it! You can now delete the file you’re working on by clicking the three dot icon near the save button.

**ADD CONCLUSION** -- in general feels way to long and just like a verbatim version of the docs... 🤷🏻‍♀️


