---
title: "Introducing Tina Grande \U0001F389"
date: '2019-11-21T14:58:24.451Z'
draft: true
author: Scott Byrne
---
[Tina Grande](https://github.com/tinacms/tina-starter-grande "Tina Grande Repo") is a Gatsby starter with full TinaCMS integration. Grande was built to provide a reference implementation of Tina that covers a variety of use cases. Even for those that don’t need a starter, we hope that Grande will prove to be a useful reference for both designers and developers looking to use TinaCMS.

[Check out the preview of Grande on Netlify.](https://tina-starter-grande.netlify.com/ "Tina Grande Preview - Netlify")

## Feature Breakdown

### Theme

Grande features a fully customizable theme. You can edit the site colours, header styles, hero styles and more.

Grande intelligently selects a foreground color based on the theme colours chosen, which means you can choose any color without causing contrast issues. Some elements — such as links —  select between the primary and secondary color based on which option provides better contrast. Updated theme colours won’t be reflected in the Tina UI until the Gatsby server is restarted, but should be visible in the website instantly.

### Pages

Pages use a blocks-based system that is extendible to add any block you’d like. At the time of writing you can choose from a **title**, **form** or _**content**_ block.

The **form** block is a simple form builder with [**Formspree.io **](https://formspree.io/ "Formspree.io")integration. You can select pre-made inputs or create a custom input. Each input has a **label**, **type** and **autocomplete** property. The first time your form is used from a new domain it requires confirmation, so send a test message and you'll receive a confirmation prompt from Formspree.

On the _page_ sidebar form you can select _hero_ to add a hero section to your page. If the hero contains a **headline**, **textline** or at least one **action** it will be rendered above your content. The default hero image is set through the theme but can be customized on a per-page (or post) basis. Toggle **large** to add extra vertical spacing to the hero section.

### Posts

You can create posts from within Tina by using the _+_ button in the top right of the sidebar. Posts are created as a draft by default and won’t be published with your live site. You can edit the post in the sidebar, or use the in-page editor to write your blog post by clicking the _edit_ button on the top left of the post.

## Content Structure

All site content is stored in the `/content` folder in the root of the project. Here you’ll find images, pages, posts, and settings. You’ll notice there are `dummy.json` and `dummy.md` files; these are there to ensure that even if all site content is removed, the graphql queries will still work.

**Posts** use markdown, while **Pages** and **Settings** use JSON.