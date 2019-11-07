---
title: Tina CLI
id: /docs/teams/cli/introduction
prev: /docs/teams/introduction
next: /docs/teams/cli/commands
---

The Tina CLI can be used to deploy / manage your site on Tina's hosted environment. Tina Teams pairs nicely with [Tina CMS](https://github.com/tinacms/tinacms) so that editors can edit sites from a live URL without having to pull anything down to a local dev environment.

You can add repos to Tina, and deploy multiple branches for each repo. Each deployed branch allows your team to edit a version of your site via a unique public URL.

## Limitations

- Currently only supports repositories stored on Github (Gitlab support to come)
- When initializing config, there are currently only defaults for Gatsby

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

#### tina branches \[branch\]

    You can enter:
    $ tina branches
      - User will be prompted for a branch name

    or:
    $ tina branches master
