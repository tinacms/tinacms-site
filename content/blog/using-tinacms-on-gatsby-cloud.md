---
title: Using TinaCMS on Gatsby Cloud
date: '2019-12-18T14:06:10.854Z'
draft: true
author: James O'Halloran
---

We've [recently written](/blog/editing-on-the-cloud/ 'TinaCMS on the cloud') about how TinaCMS will work on the cloud. Gatsby Cloud offers a great way for editors to edit TinaCMS sites, without having to run a local development environment.

Since Gatsby Cloud is built from the ground-up specifically for Gatsby sites, it takes advantage of parallelizing tasks & build artifact caching to make things fast ⚡

So let's do this! 🕺

## Configuring git

<tip>
If you are using the gatsby-tinacms-git plugin, make sure you're using version: 0.2.16 or later!
</tip>

To get Tina working in Gatsby Cloud, you'll need to configure a few environment variables in your Gatsby Cloud site settings:

    GIT_AUTHOR_EMAIL
    GIT_AUTHOR_NAME
    SSH_KEY

### `GIT_AUTHOR_NAME` & `GIT_AUTHOR_EMAIL`

These values will define who will show up in the author field when commits are made.
![tinacms-add-new-file-gif](/img/commit_author_scott.png)

If you want the author to be based off of the logged in user instead of a static value in your env, you might want to take a look at [Tina Teams](/teams 'Tina Teams')!

### SSH_KEY

The `SSH_KEY` is a private key that allows write access to your git repo. You'll need to add the public key to your repo under Deploy Keys in Settings and enable write access. The SSH_KEY needs to be Base64 encoded before adding to Gatsby Cloud; you can encode this locally by running:

`cat ./.ssh/id_rsa | base64`
