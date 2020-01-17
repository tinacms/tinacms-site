---
title: Introduction
id: /docs/teams/introduction
prev: null
next: /docs/teams/gatsby/introduction
---

When it's time to get your editors editing a TinaCMS site, you will likely want to setup a **cloud editing environment** so that editors can edit the site's content from the cloud. The **cloud editing environment** is separate from your production site. It is a staging environment which runs your site in dev-mode, in which TinaCMS will be accesible.

Once a cloud editing environment has been setup for your site, **Tina Teams** can be used to manage which users can access the cloud editing environment.

## Get Started

Let's walk you through all the steps required to get your editors editing in the cloud.

### 1) Deploy your Cloud Editing Environment

Part of what makes Tina great is that it gives the developer control. It’s important for us to extend this control into the Cloud editing experience. For this reason, we’ve designed it so that you can host your cloud editing environment wherever you like (Gatsby Cloud, Heroku, Digital Ocean, etc).

Check out our guide to [setting up a cloud editing environment](/blog/using-tinacms-on-gatsby-cloud) on Gatsby Cloud

### 2) Add Tina Teams package to your site

Now that our cloud editing environment is live, we will want to manage who can access this environment. We also need a way to identify each user so that we can attribute saves made through TinaCMS with it's author.

i.e.: If i am using the **gatsby-tinacms-git** plugin, when a user hits "save" it will create a commit with the author set to the logged-in user.
![tinacms-add-new-file-gif](/img/commit_author_scott.png)

[Add the teams plugin to a Gatsby site](/docs/teams/gatsby/introduction)

[Add the teams plugin to a NextJS site](/docs/teams/next/introduction)

### 3) Configure Git for cloud commits

If you are using git as a backend for your TinaCMS site, we'll need to [add a bit of configuration](/docs/teams/cloud-commits) so that TinaCMS can commit from the cloud.

### 4) Register your Cloud Editing Environment with Tina Teams

The teams plugin (that you added in Step 2) will require users to log in before accessing the **cloud editing environment**. The plugin will first verify that the user has access to the site within Tina Teams before loading the site content.

Interaction with Tina Teams is performed through the [Tina CLI](/docs/teams/cli/introduction 'Tina CLI').

You can run `tina sites:add` to add your cloud editing environment to Tina Teams, and `tina users:add` to give any additional editors access.
