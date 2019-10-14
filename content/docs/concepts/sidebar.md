---
title: Sidebar
id: /docs/concepts/sidebar
prev: /docs/getting-started/how-tina-works
next: /docs/concepts/forms
---
The **sidebar** is the primary interface in Tina. It is the shell that holds [forms](/docs/concepts/forms "Tina Concepts: Forms") and [plugins](/docs/concepts/plugins "Tina Concepts: Plugins").

## Setup the Sidebar

Head over to the [Gatsby Quickstart Guide](/docs/gatsby/quickstart) to learn how to setup the sidebar on a Gatsby site. If you want to setup the sidebar on an existing site, head to the [Gatsby Manual Setup](/docs/gatsby/manual-setup).

## Using the Sidebar

A site configured to use Tina will display a blue edit button in the lower left corner. Clicking this button will open the sidebar.

![Clicking the pen icon to reveal Tina Sidebar](/img/tina-sidebar-gatsby-london.gif)

Sidebar contents are **contextual**. For example, when using Tina with Markdown files, a conventional implementation will display a form for the current page's markdown file.

![Sidebar after adding remarkform to your template](/img/tina-sidebar-remarkform-gatsby-london.gif)

In the event a page is composed from multiple files, it is possible to add multiple forms to the sidebar for that page's context. All forms available in the current context will then be displayed.

## Sidebar Style

$SCREENSHOT_PLEASE

The sidebar has two display options: `fixed` and `float`.

By default, Tina's sidebar will overlay on top of your website (`float`). This default is set to prevent any layout conflicts with the sidebar and your site. If you set Tina to position `fixed`, when you open Tina, your website will shrink to make space for the sidebar. Depending on your site's design, you may have CSS rules that conflict with this approach (`fixed`), or may simply prefer to have the sidebar overlay your content instead of displacing it (`float`). Override or adjust this by specifying the sidebar option in the config file where you register Tina plugins.

For example, in your `gatsby-config.js` file...
```javascript
 {
    resolve: '@tinacms/gatsby-plugin-tinacms',
    options: {
      sidebar: {
        position: 'fixed',
      },
    },
  }...
```
