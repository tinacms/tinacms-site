---
title: Manual Setup
id: /gatsby/manual-setup
prev: /gatsby/quickstart
next: /gatsby/content-editing
---

Learn how to setup Tina on an existing Gatsby site.

After this guide you will have installed and added the TinaCMS sidebar to your project. However, this won't make your content editable. Go to the [next guide](/gatsby/edit-content) to learn how to make content editable.

Assumptions: This guide assumes you have the Gatsby CLI installed, Node & a package manager.

Note: Don't have a site yet? Refer to the [quickstart page](/gatsby/quickstart).

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

   You will notice there's a pencil icon, this is the way you can toggle the Tina sidebar.

Hooray!

If you see the icon and can open the editing sidebar, this means you've successfully installed & configured Tina. You will see a note that there is no editable content on the site yet. Follow the next steps to learn how to make content editable.
