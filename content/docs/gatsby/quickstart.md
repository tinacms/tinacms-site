---
id: /docs/gatsby/quickstart
title: Quickstart
prev: how-tina-works
next: /docs/gatsby/manual-setup
---

If you want to get up and running quickly to see how Tina works, this is your route. You can either use a [Gatsby starter](/docs/gatsby/quickstart) that is preconfigured with Tina or add Tina to your [existing project](/docs/gatsby/manual-setup).

#### Prerequisites

To run all the tools required you need at least the following installed:

- [Node.js](https://nodejs.org/en/) (8.0.0+)
- [Yarn](https://yarnpkg.com) (Optional. You can still use `npm` if you want, but this is for your own sanity.)

##**Use a starter**

###1. Install the Gatsby CLI

To use the starter, you will need to use the `gatsby-cli`. To install it, run the following command.

```bash
# npm
npm install -g gatsby-cli
# yarn
yarn global add gatsby-cli
```

###2. Create a Gatsby Tina Site

Now we have `gatsby-cli` installed, we can now create a project based on the Tina starter by running:

```
gatsby new my-tina-starter https://github.com/forestryio/gatsby-starter-Tina
```

The project is generated in a folder titled `my-tina-starter`, feel free to change or update that name.
###3. Start the Server
Now let's start the development server to see how Tina edits our files.

```
cd my-tina-starter
gatsby develop
```

Now navigate to http://localhost:8000 to checkout the starter site!

###4. Open the CMS

You will notice there's a pencil icon, this is the way you can toggle 'edit-mode' with Tina.

###5. Make Edits

Navigate to various pages and see the different fields of editable content. Make changes and watch them live update on the site and in your files.

## Next Steps

- [Customizing Content Forms](/docs/gatsby/custom-fields)
- [Creating New Content](/docs/gatsby/content-creation)
