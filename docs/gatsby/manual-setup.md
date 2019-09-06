---
id: /gatsby/manual-setup
title: Manual Setup
prev: /gatsby/quickstart
next: /gatsby/content-editing
---

Learn how to setup Tina on an existing Gatsby site. Don't have a site yet? Refer to the [quickstart page](/gatsby/quickstart). This guide assumes you have the Gatsby CLI installed, Node & a package manager.

This page will guide you through installing and configuring Tina onto your project, however this won't make the content editable right away. [Go here](/gatsby/edit-content) to learn how to make content editable.

## Installation

```
npm install --save @tinacms/gatsby-plugin-tinacms
```

or

```
yarn add @tinacms/gatsby-plugin-tinacms
```

## Adding the Plugin

Open your `gatsby-config.js` file and add `'@tinacms/gatsby-plugin-tinacms'` to the list of plugins:

**gatsby-config.js**

```javascript
module.exports = {
  // ...
  plugins: [
    '@tinacms/gatsby-plugin-tinacms',
    // ...
  ],
}
```

## Accessing the CMS

1. **Start the Gatsby development server**

   ```
   gatsby develop
   ```

1. **Visit your Website**

   Go to https://localhost:8000 to access your website.

1. **Open the CMS**

   You will notice there's a pencil icon, this is the way you can toggle 'edit-mode' with Tina.

Hooray! If you see the icon and can open the editing sidebar, this means you've successfully installed & configured Tina, however you should see a note that there is no editable content on the site yet. Follow the next steps to learn how to make content editable.

## Next Steps

- [Editing Markdown Files](/gatsby/content-editing#1-editing-markdown-in-gatsby)
- [Editing JSON Files](/gatsby/content-editing/#2-editing-json-in-gatsby)
- [Creating Custom Fields](/gatsby/custom-fields)
