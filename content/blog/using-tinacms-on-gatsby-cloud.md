---
title: Using TinaCMS on Gatsby Cloud
date: '2019-12-30T12:00:00.000Z'
draft: true
author: James O'Halloran
---

We've [recently written](/blog/editing-on-the-cloud/ 'TinaCMS on the cloud') about how TinaCMS will work on the cloud. Gatsby Cloud offers a great way for editors to edit TinaCMS sites, without having to run a local development environment.

Since Gatsby Cloud is built from the ground up specifically for Gatsby sites, it takes advantage of _build-artifact caching_ & _parallelizing tasks_ to make things fast ⚡

So, let's do this! 🕺

## Deploying a Site on Gatsby Cloud 🚀

Deploying a cloud preview with Gatsby Cloud can be done in just a few clicks. Once we've [created an account](https://www.gatsbyjs.com/cloud/ 'Gatsby Cloud'), we can connect the site's repository and enter some build information (the site's root directory and environment variables).

And tada! ✨ Our site's preview should be live! Any commits we make to the repo going forward will automatically trigger a rebuild of our Gatsby preview.

Now that our **preview is live**, there's some extra configuration that we'll want to do to have Tina work smoothly on the cloud.

## Make the Cloud Environment Private 🔒

We don't want just any stranger making commits from our cloud editing environment, so one of the first things we will want to do is make this environment private. This can be toggled within the **Access Control** section of the Gatsby Cloud **Site Settings**

## Configuring Git for Cloud Commits ✔️

<tip>
If you are using the gatsby-tinacms-git plugin, make sure to use version: 0.2.16-canary.0 or later!
</tip>

To get Tina working in Gatsby Cloud, we'll need to configure a few environment variables in our **Gatsby Cloud site settings**:

    GIT_AUTHOR_EMAIL
    GIT_AUTHOR_NAME
    SSH_KEY

### `GIT_AUTHOR_NAME` & `GIT_AUTHOR_EMAIL` 🗣️

These values will define who will show up in the author field when commits are made.
![tinacms-add-new-file-gif](/img/commit_author_scott.png)

If you want the author to be based off of the logged-in user instead of a static value in your env, you might want to take a look at [Tina Teams](/teams 'Tina Teams')!

### `SSH_KEY` 🔑

The `SSH_KEY` is a private key that allows write access to your git repo. We'll need to add the public key to the repo under Deploy Keys in "Settings" and **enable write access.** The `SSH_KEY` needs to be **Base64 encoded** before it's added to Gatsby Cloud; we can encode a local key (named id_rsa in this case) by running:

`cat ./.ssh/id_rsa | base64`

<tip>
After you update any environment variables, you will need to rebuild your Gatsby Cloud site for them to take effect.
</tip>

## Site Configuration 🔨

When it's time to get our editors editing a Tina site on a cloud editing environment, we will need to be **extra careful around safeguarding against run-time errors.** Does the site blow up if an array is empty? or if an image isn't defined? We'll want to account for these edge cases which your editors may run into while editing.

## Happy Cloud Editing! ☁️

Hopefully this gets you started editing **your Gatsby site on the cloud.**

We'll continue to detail how to host cloud editing environments on a few different services. You can also sign up for our [Tina Teams Beta](http://tinacms.org/teams) to try out some extended team features!

If you run into trouble or have any questions, head over to the [Tina Forum](https://community.tinacms.org/) for help. Stoked on TinaCMS? Please ⭐️ us on [Github](https://github.com/tinacms/tinacms) or [Tweet us](https://twitter.com/Tina_cms) 🐦 to show-off your Tina projects.
