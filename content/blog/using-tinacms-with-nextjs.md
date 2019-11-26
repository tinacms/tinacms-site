---
title: Using TinaCMS with Next.js
date: '2019-11-26T07:00:00.000Z'
author: Kendall Strautman & DJ Walker
draft: false
consumes:
  - file: /packages/@tinacms/api-git/src/server.ts
    details: Uses tina-git-server
  - file: /packages/@tinacms/api-git/src/router.ts
    details: Uses tina-git-server
  - file: /packages/@tinacms/api-git/src/server.ts
    details: Sets up git client to consume backend
  - file: /packages/tinacms/src/components/Tina.tsx
    details: Shows wrapping Next.js app with Tina component
  - file: /packages/tinacms/src/tina-cms.tsx
    details: Creates cms instance with TinaCMS
---
<div style="text-align: left;">
  <br>
    <h1>Tina + Next: Part II</h1>
  <br>
</div>

This blog is a part of a series exploring the use of Next.js + Tina. In [Part I](https://tinacms.org/blog/simple-markdown-blog-nextjs/), we learned how to create a simple markdown-based blog with Next. In this post we’ll add content editing capacity by configuring the site with TinaCMS.

## Next.js Recap ▲

[Next.js](https://nextjs.org/) is **a React “metaframework”** (a framework built on a framework) for developing web applications, built by the team at [Zeit](https://zeit.co/). Read [Part I](https://tinacms.org/blog/simple-markdown-blog-nextjs/) to get familiar with Next.js basics.

## Tina Overview 🦙

[Tina](https://tinacms.org/) is not a CMS in the sense that you are used to. It is not a separate platform that you create an account with, or store data on.

Rather, Tina is a collection of open-source javascript components that you build into your site codebase — **a toolkit for creating a real time content-editing UI.** It's incredibly flexible, developers are in absolute control over content management and editors get a 'real-time wysiwyg' experience.

The best way to see how Tina works is to use it. Hopefully by the end of this tutorial, you’ll get a better idea of the paradigm shift Tina introduces in the world of CMS's.

## Let’s get started

![brevifolia photo](/blog/brevifolia-screenshot.jpg)

This tutorial will show you how to install and **configure Tina for editing content on a simple markdown-based blog** that was created in last week’s post. If you want to dig into how the base blog was made, read [Part I](https://tinacms.org/blog/simple-markdown-blog-nextjs/) of this series.

<tip>Jump ahead to see the [final repo here](https://github.com/kendallstrautman/brevifolia-next-tinacms). Or check out the [Tina + Next.js documentation](https://tinacms.org/docs/nextjs/overview) here </tip>

### Some background 🏜

It’s important to note that due to the ‘open-ended’ nature of Next.js, there are numerous ways you could incorporate Tina into a Next.js sites or apps. This tutorial will showcase just one approach with hopefully straightforward examples.

Although they are talking of implementing plugins very soon, as of now, **Next.js does not have a plugin system.** Most of the content and examples for TinaCMS up until now have used Gatsby, so you may be familiar with various Gatsby+Tina plugins that help ease the setup process to make content editable. Since we can’t utilize these plugins, we have to do some of this heavier-lift config ourselves.

### Set up locally 🏡

Feel free to follow along and fit these guidelines to your own site or blog, or you can use the starter we created in the previous tutorial. In your terminal, navigate to where you would like this blog to live, then run:

``` bash
#clone the repo
$ git clone git@github.com:kendallstrautman/brevifolia-next-forestry.git next-tina-blog

#navigate to the directory
$ cd next-tina-blog

#install dependencies & run dev server with yarn
$ yarn install
$ yarn dev
```
Now that the development server is running, navigate to http://localhost:3000/ to check it out.

### Configure TinaCMS in App 🔆

With Next.js, there is an [`App` class component](https://nextjs.org/docs#custom-app) that initializes pages; we need to override this component to wrap every page in a `Tina` component that will provide access to the `cms` instance.

Following along with the [Tina documentation:](https://tinacms.org/docs/nextjs/bootstrapping)

```bash
# Install `tinacms` and `react-tinacms`
$ yarn add tinacms react-tinacms
```
Create a new file in the root of your project called `_app.js` and add this code.

``` javascript
import React from 'react'
import App from 'next/app'
import { Tina, TinaCMS } from 'tinacms'

class MyApp extends App {
  constructor() {
    super()
    // initialize the cms
    this.cms = new TinaCMS()
  }
  render() {
    const { Component, pageProps } = this.props
    // Wrap the page with Tina, provide the cms
    return (
      <Tina cms={this.cms}>
        <Component {...pageProps} />
      </Tina>
    )
  }
}

export default MyApp
```

If you restart the dev server, you should now see a pencil icon in the lower left-hand corner. Go ahead and click it to reveal a [sidebar](https://tinacms.org/docs/concepts/sidebar). The `Tina` component we added in `_app.js` gives each page access to this [sidebar](https://tinacms.org/docs/concepts/sidebar), it is home base for making edits with Tina.

### Setting up a Git Backend 👾

As of now, the sidebar is empty because Tina doesn’t know what content to edit. Before we connect Tina to content, we need to [set up a backend](https://tinacms.org/docs/nextjs/adding-backends) that will talk to git and can keep track of content changes as they are happening.

``` bash
# Install concurrently & tina git packages
$ yarn add concurrently @tinacms/api-git @tinacms/git-client
```

Then in your package.json file, add this script:
``` json
"scripts": {
    "develop": "concurrently \"next src\" \"tina-git-server 3001\"",
     ...//
  }
```
This script is using [`concurrently`](https://github.com/kimmobrunfeldt/concurrently) to start both the Next.js development server and the `tina-git-server`. We need these running at the same time so that as we are making content changes in the development environment, the git API will persist those changes.

### Connecting back & front 🖇

Now we need to link this git backend with the instance of the `cms` within our starter blog. Head over to your `_app.js` file and register an instance of `GitClient` with the `cms` as seen in the code below.

``` javascript
import React from 'react'
import App from 'next/app'
import { Tina, TinaCMS } from 'tinacms'
// import the git client
import { GitClient } from '@tinacms/git-client'

class MyApp extends App {
  constructor() {
    super()
    this.cms = new TinaCMS()
    // create the client
    const client = new GitClient('http://localhost:3001/___tina')
    // register client with the cms
    this.cms.registerApi('git', client)
  }

  render() {
   //...
  }
}

export default MyApp
```

That’s all the config for tracking and persisting content changes with git & Tina. To test, run the `develop` script and make sure there are no errors. Things should look the same, only now we have a git api waiting to hear from Tina.

### Creating content forms 📝

Alright, now the fun starts — let’s dig into [editing content](https://tinacms.org/docs/nextjs/creating-forms). We access Tina’s editing powers by registering forms to the `cms`. When creating these [forms](https://tinacms.org/docs/concepts/forms), we define [fields](https://tinacms.org/docs/concepts/fields) that connect to bits and pieces of the content you want to make editable.

Since our site is mainly comprised of blog data, let’s configure Tina to edit blog posts. Open up the [blog template](https://github.com/kendallstrautman/brevifolia-nextjs/blob/master/src/pages/blog/%5Bslug%5D.js) file (`src/pages/blog/[slug].js`).

As a recap from [Part I](https://tinacms.org/blog/simple-markdown-blog-nextjs/), we’re using the `getInitialProps` method to grab markdown data that will be passed as props to the `BlogTemplate` component.

#### Content Form Config

First we need to add an additional property to the return object from `getInitialProps` called `fileRelativePath`. Tina needs this path in order to know what file to update. Here’s an example of how you could add `fileRelativePath`.

``` javascript
BlogTemplate.getInitialProps = async function(ctx) {
 const { slug } = ctx.query
 const content = await import(`../../posts/${slug}.md`)
 const config = await import(`../../data/config.json`)
 const data = matter(content.default);

 return {
   fileRelativePath: `src/posts/${slug}.md`,
   title: config.title,
   ...data
 }
}
```

Next we will create and register a form with the hook, `useLocalForm`. Tina differentiates between forms that are contextual to the content on the page and forms that are used for overarching settings: [local versus global](https://tinacms.org/docs/concepts/forms/). In our case, we want to create a  local form since the content we want to edit is specific to each blog post.

When registering a form, it needs to know four things: a unique `id`, what `initialValues` it can edit, the shape of the content via [`field`](https://tinacms.org/docs/concepts/fields) definitions, and how to handle 'save' or `onSubmit`.

Checkout the code below to see an example of invoking `useLocalForm`.

``` jsx
import { useCMS, useLocalForm } from 'react-tinacms'
import * as yaml from 'js-yaml'

export default function BlogTemplate(props) {

  function toMarkdownString(formValues) {
    return (
      '---\n' +
      yaml.dump(formValues.frontmatter) +
      '---\n' +
      (formValues.markdownBody || '')
    )
  }

 // access the cms instance
 const cms = useCMS()

 // hook to register the form
 const [post, form] = useLocalForm({

   id: props.fileRelativePath, // needs to be unique
   label: 'Edit Post', // label appears in the sidebar

   // starting values for the post object
   initialValues: {
     fileRelativePath: props.fileRelativePath,
     frontmatter: props.data,
     markdownBody: props.content
   },

   // field definitions shape content editing UI
   fields: [
     {
       label: "Hero Image",
       name: 'frontmatter.hero_image',
       component: "image",
       // Generate the frontmatter value based on the filename
       parse: filename => `../static/${filename}`,
        // Decide the file upload directory for the post
       uploadDir: () => "/src/static/",
        // Generate the src attribute for the preview image.
       previewSrc: data => `/static/${data.frontmatter.hero_image}`,
     },
     {
       name: 'frontmatter.title',
       label: 'Title',
       component: 'text',
     },
     {
       name: 'frontmatter.date',
       label: 'Date',
       component: 'date',
     },
     {
       name: 'frontmatter.author',
       label: 'Author',
       component: 'text',
     },
     {
       name: 'markdownBody',
       label: 'Blog Body',
       component: 'markdown',
     },
   ],

   // save & commit the file when the "save" button is pressed
   onSubmit(data) {
     return cms.api.git
       .writeToDisk({
         fileRelativePath: props.fileRelativePath,
         content: toMarkdownString(data),
       })
       .then(() => {
         return cms.api.git.commit({
           files: [props.fileRelativePath],
           message: `Commit from Tina: Update ${data.fileRelativePath}`,
         })
       })
   },
 })

 // useWatchFormValues will go here

 return (
    //...
   );
}


```
To explain in further detail, `onSubmit` is a callback function that talks with the git API we registered earlier to write file changes to disk and then commit those changes.

Notice in this callback the use of the `toMarkdownString` function; this makes sure that the markdown data passed to the git api is properly _stringified_.

#### Update rendered data 🎨

As hooks typically do, `useLocalForm` will return an array with two items: the form data and the form object — `[ post, form ]`. With the code outlined above, all of our blog content will be stored in `post`, so we need to update the render function to reference `post` instead of `props`.

``` jsx
// replace props with post for editable form content
return (
   <Layout siteTitle={props.title}>
     <article className="blog">
         <figure className="blog__hero">
         <img
             src={post.frontmatter.hero_image}
             alt={`blog_hero_${post.frontmatter.title}`}
         />
         </figure>
         <div className="blog__info">
         <h1>{post.frontmatter.title}</h1>
         <h3>{post.frontmatter.date}</h3>
         </div>
         <div className="blog__body">
         <ReactMarkdown source={post.markdownBody} />
         </div>
         <h2 className="blog__footer">
         Written By: {post.frontmatter.author}
         </h2>
     </article>
   </Layout>
   );
```

Note the `siteTitle` still references `props.title`, this is because this value isn't being passed to Tina as an editable part of this form. If we want to edit this site config, we could create another form (for example on the `Layout` component) that would connect Tina to the `config.json` file.

#### Edit content 🎯

If you run `yarn develop` and open up a blog post in the browser, you should see editable fields in the sidebar. Try to update the blog title, hit save and see what happens.

If everything is set up correctly, Tina will try to commit those changes. (You may be prompted for your password in the terminal) Kill the dev server and run `git log` to see the commit from Tina. 🙌🏻

This is amazing, we wired up Tina to make edits and commit changes, but you’ll notice that if you navigate to another page or refresh without saving, these changes don’t persist.

#### Watching for real-time content changes ⌚️

If you want your changes writing to disk in real time, we’ll need to use another hook, `useWatchFormValues`. This hook helps Tina listen for these changes and then immediately write those changes to the source files, then via 'hot-reloading' we should see those changes reflecting live in the browser.

`useWatchFormValues` takes the form object created by the `useLocalForm` hook, and also a callback function (`writeToDisk`) to invoke when the form has changed.

Add this example code below to your `[slug].js` file just before the render function. Feel free to reference the final file [here](https://github.com/kendallstrautman/brevifolia-next-tinacms/blob/master/src/pages/blog/%5Bslug%5D.js).

``` jsx
// add useWatchFormValues to import
import { useCMS, useLocalForm, useWatchFormValues } from 'react-tinacms'

export default function BlogTemplate(props) {
  // useLocalForm config...

  // callback function for form changes
  const writeToDisk = React.useCallback(formState => {
   cms.api.git.onChange({
     fileRelativePath: props.fileRelativePath,
     content: toMarkdownString(formState.values),
   })
  }, [])

  // invoke the hook
  useWatchFormValues(form, writeToDisk)

  return (
    //...
  )
}
```

### Test & edit content ✨

![todo, add gif here]()

If all went well, your blog posts will now be editable by Tina. Let's see it in action.

Start up the dev server — `yarn develop` — open up a blog post in the browser alongside the associated markdown file in `src/posts`. Go ahead and make edits and check the source file.

If you keep the browser and code editor open side-by-side, you should be able to watch the changes reflect in real time in both places.

<tip> **Troubleshooting Tip**: If you’re only seeing changes update in the browser, but not immediately writing to the file system, **make sure you are using the correct script** that initiates both the next dev server and the git api via `concurrently`. </tip>

### Next Steps 🚶‍♀️

Well done! With some config and invoking hooks provided by Tina, we can now edit all our blog posts with Tina.

To set up content editing on the rest of the site, we’ll want to configure Tina for the ‘info’ page, along with any other general site metadata. Try to implement the same approach in the `info` page component. Checkout the [final repo](https://github.com/kendallstrautman/brevifolia-next-tinacms) for reference on how to do this.

Stay tuned: in subsequent posts, we’ll cover how to setup this site for static export, implementing global forms, and extracting this Tina config into a single reusable function.
