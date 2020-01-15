---
title: Tina CLI
id: /docs/teams/cli/introduction
prev: /docs/teams/gatsby/introduction
next: /docs/teams/cli/commands
---

The Tina CLI can be used to setup your **cloud editing environment** with Tina Teams, and manage its users. Tina Teams pairs nicely with [Tina CMS](https://github.com/tinacms/tinacms) so that editors can edit sites from a live URL without having to pull anything down to a local dev environment.

<tip>Before you can add a **Cloud Editing Environment** to Tina Teams, it needs to be hosted somewhere. Check out [this post](/blog/using-tinacms-on-gatsby-cloud) for an example where we host our Cloud Editing Environment on **Gatsby Cloud**</tip>

## Limitations

- Currently only supports repositories stored on Github (Gitlab support to come)

## Getting started

Npm:

`npm install -g @tinacms/tina-cli`

Yarn:

`yarn global add @tinacms/tina-cli`

## Usage

Arguments wrapped in `[]` in the command name are optional. If not provided, the user will be prompted for their values.
E.g:

#### tina sites \[dns_name\]

    You can enter:
    $ tina sites
      - User will be prompted for a site's dns name

    or:
    $ tina sites dev.mysite.tina.io
