---
title: How will TinaCMS work in production?
date: '2019-12-17T20:09:31.626Z'
draft: true
author: James O'Halloran
---

One of the main draws of Tina is that it can give your editors an incredible user experience tailored to their use-case. That being said, it's hardly an ideal solution if an editor needs to run a local development server.

We've been teasing [Tina Teams](/teams 'Tina Teams') as the solution for this, but I'd like to shed some light on how everything fits together.

### Overview

Typically, Tina will be hidden on your live site, and will only be accessible locally, or on your cloud development environment.
If your using git as your backend, you could either host your master branch on the cloud development server (and have all commits deployed to your live site), or you could host another staging branch.

### Hosting

Part of what makes Tina great is that it gives the developer control. It's important for us to extend this control into the Cloud editing experience. For this reason, we've designed it so that you can host your development environment wherever you like.

Already have a Gatsby Cloud plan?
Want to host a small site under Heroku's free tier?

The choice is up to you, depending on your needs!

You can fire up a development environment using one of these services and have users start making commits from the cloud.

If this isn't something in which you'd like to manage, You'll eventually be able to host your staging environment through us on `Tina Teams`.

### Authorization

Some services (like Gatsby Previews) will allow you to password protect your environment. If you're hosting somewhere else, you likely don't want strangers accessing your site and making commits. One of the features that `Tina Teams` provides is an authentication layer over your cloud development environment. Users will first need to log in before accessing your cloud environment

### User management

With Tina Teams, users can have custom roles assigned to each user, which can be referenced within your site.
Maybe you have an external contributor who can only access a specific blog post? An editor who can create, but not delete pages? The implementation is up to you, and your sites needs.

### Commits

Since users will need to authenticate with Tina Teams, we can tie commits back to the logged-in user, so you can always find out who put that llama image in your blog post (to thank them, of course).
![tinacms-add-new-file-gif](/img/rico-replacement.jpg)

### Team management

Some 'down the road' features that we have planned will make it much easier to work alongside other team members on your cloud environment. This includes things like, managing roles across groups of users, locking files which are being edited by another user, SSO, etc.

### In Summary

Not all sites fit into the same box, so we're giving the flexibilty to manage Tina on the Cloud however makes fit for you. Running a development environment on Gatsby Previews without Teams will work for a good chunk of users, and certain users may require more user management, which will be coming your way soon with 'Tina Teams'.

<br />

# ✨

<br />

Thanks for reading! We're going to have some examples soon detailing how to host your cloud development environment on a few different services. You can also sign up for our [Tina Teams Beta](http://tinacms.org/teams) to try it out early!
