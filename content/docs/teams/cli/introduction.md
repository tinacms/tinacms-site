---
title: Tina CLI
id: /docs/teams/cli/introduction
prev: /docs/teams/introduction
next: /docs/teams/cli/commands
---

The Tina CLI can be used to setup your **cloud development ennvironment** with Tina Teams, and manage its users. Tina Teams pairs nicely with [Tina CMS](https://github.com/tinacms/tinacms) so that editors can edit sites from a live URL without having to pull anything down to a local dev environment.

## Limitations

- Currently only supports repositories stored on Github (Gitlab support to come)

## Getting started

Npm:

`npm install -g @tinacms/tina-cli`

Yarn:

`yarn global add @tinacms/tina-cli`

Then you can run the init command within a repository context:

`tina init`

..And that's it! (You can also run the individual steps below instead of `tina init`)

## Usage

Arguments wrapped in `[]` in the command name are optional. If not provided, the user will be prompted for their values.
E.g:

#### tina sites \[dns_name\]

    You can enter:
    $ tina sites
      - User will be prompted for a site's dns name

    or:
    $ tina sites dev.mysite.tina.io
