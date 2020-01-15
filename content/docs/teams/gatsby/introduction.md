---
title: Tina With Gatsby
id: /docs/teams/gatsby/introduction
prev: /docs/teams/introduction
next: /docs/teams/cli/introduction
---

Tina Teams functionality can be added to a Gatsby site with the `gatsby-tinacms-teams` plugin.

## Install the Git & Markdown Packages

    npm install --save gatsby-tinacms-teams

or

    yarn add gatsby-tinacms-teams

## Adding the Teams Plugin

Open the `gatsby-config.js` file and add the **gatsby-tinacms-teams** plugin. It should be the first child plugin of **gatsby-plugin-tinacms**

```JavaScript
module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
      plugins: [
        "gatsby-tinacms-teams"
      ]
      },
    },
    // ...
  ],
}
```

## Configuration

Teams authentication is enabled/disabled with the `REQUIRE_AUTH` environment variable.

**package.json**

```
"scripts": {
  "auth-start": "REQUIRE_AUTH=true gatsby develop"
}
```

Alternatively, you can use .env files (as long as your site supports it).

**.env**

```
REQUIRE_AUTH=true
```

<tip>
If you are hosting on a service like Heroku or Gatsby Cloud, these environment variables can be added through the host provider's UI.
</tip>

You will also need to set the `TINA_TEAMS_NAMESPACE` environment variable. This will be the email of the user who created this site within Tina Teams.

## Configuring Git for Cloud Commits

To get **gatsby-tinacms-git** working in the cloud, we'll need to add a SSH_KEY environment variable:

**.env**

```
SSH_KEY=KS0eLS4CRTTdJTi...
```

### `SSH_KEY` 🔑

The `SSH_KEY` is a private key that allows write access to your git repo. We'll need to add the public key to the repo under Deploy Keys in "Settings" and **enable write access.** The `SSH_KEY` needs to be **Base64 encoded**; we can encode a local key (named id_rsa in this case) by running the following in your terminal:

`$ cat ~/.ssh/id_rsa | base64`

## Limitations

The Tina Teams plugin will put the site behind an authentication layer, however Gatsby's **/graphql** endpoint may still be accessible. If this is an issue for your site, we suggest password-protecting your environment through your hosting provider. 
