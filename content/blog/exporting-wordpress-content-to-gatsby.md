---
title: Export WordPress Content to Markdown and Gatsby
date: '2019-12-19T00:00:00.000Z'
draft: false
author: Mitch MacKenzie
---
Say hello to the [WordPress to Gatsby Exporter](https://github.com/tinacms/wp-gatsby-exporter)! It's a WordPress plugin to export posts, pages, and other content from WordPress to Markdown. 

It's true that WordPress powers a large portion of sites on the web. But there are many cases where a modern static site generator like [GatsbyJS](https://www.gatsbyjs.org/) can be better suited to build a website.

Gatsby provides the intrinsic benefits of traditional static site generators like increased security, improved performance, and lower maintenance overhead. It also tackles modern problems like enhanced offline browsing and progressive image loading.

<figure><img alt="Gatsby vs WordPress comparison table" style="margin: auto; padding: 2rem .5rem; border: none;" src="/img/blog/gatsby-vs-wordpress.png" /><figcaption><a href="https://www.gatsbyjs.org/features/cms/gatsby-vs-drupal/">GatsbyJS vs WordPress comparison</a></figcaption></figure>

Gatsby can include content from many sources, including WordPress via API. In our case, we're going to completely leave WordPress and export our content as Markdown files.