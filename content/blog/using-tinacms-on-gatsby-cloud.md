---
title: Using TinaCMS on Gatsby Cloud
date: '2019-12-18T14:06:10.854Z'
draft: true
author: James O'Halloran
---

We've [recently written](/blog/editing-on-the-cloud/ 'TinaCMS on the cloud') about how TinaCMS will work on the cloud. Gatsby Cloud offers a great way for editors to edit TinaCMS sites, without having to run a local development environment.

Since Gatsby Cloud is built from the ground-up specifically for Gatsby sites, it takes advantage of parallelizing tasks & build-artifact caching to make things fast ⚡

So, let's do this! 🕺

## Deploying a site on Gatsby Cloud 🚀

Deploying a cloud preview with Gatsby Cloud can be done in just a few clicks, once you've created an account, you can just connect your repository, enter some build information (your site's root directory, environment variables)

And tada! ✨ Your site's preview should be live within a few clicks! Any commits we make going forward will automatically trigger a rebuild in your Gatsby Cloud environment.

Now that your **cloud development environment is live**, there's some extra configuration we'll want to do to have Tina work smoothly on the cloud.

## Make your site private 🔒

We don't want any stranger making commits from our cloud development environment, so one of the first things we will want to do is make this environment private. This can be toggled within the `Access Control` section of the Gatsby Cloud `Site Settings`

## Configuring git for cloud commits ✔️

<tip>
If you are using the gatsby-tinacms-git plugin, make sure you're using version: 0.2.16 or later!
</tip>

To get Tina working in Gatsby Cloud, you'll need to configure a few environment variables in your **Gatsby Cloud site settings**:

    GIT_AUTHOR_EMAIL
    GIT_AUTHOR_NAME
    SSH_KEY

### `GIT_AUTHOR_NAME` & `GIT_AUTHOR_EMAIL` 🗣️

These values will define who will show up in the author field when commits are made.
![tinacms-add-new-file-gif](/img/commit_author_scott.png)

If you want the author to be based off of the logged in user instead of a static value in your env, you might want to take a look at [Tina Teams](/teams 'Tina Teams')!

### `SSH_KEY` 🔑

The `SSH_KEY` is a private key that allows write access to your git repo. You'll need to add the public key to your repo under Deploy Keys in Settings and **enable write access.** The `SSH_KEY` needs to be **Base64 encoded** before adding it to Gatsby Cloud; you can encode a local key by running:

`cat ./.ssh/id_rsa | base64`

<tip>
After you update any environment variables, you will need to rebuild your Gatsby Cloud site for them to take effect.
</tip>

## Site configuration 🔨

When it's time to allow your editors to edit a site with Tina on a hosted server, you will need to be **extra careful around safeguarding against run-time errors.** Does your site blow up if an array is empty? or if an image isn't defined? You'll want to account for these edge cases which your editors may run into while editing.

## Happy Cloud Editing! ☁️

Hopefully this gets you started editing **your Gatsby site on the cloud.**

We'll continue to detail how to host your cloud development environments on a few different services. You can also sign up for our [Tina Teams Beta](http://tinacms.org/teams) to try out some extended team features!

If you run into trouble or have any questions, head over to the [Tina Forum](https://community.tinacms.org/) for help. Stoked on TinaCMS? Please ⭐️ us on [Github](https://github.com/tinacms/tinacms) or [Tweet us](https://twitter.com/Tina_cms) 🐦 to show-off your Tina projects.
