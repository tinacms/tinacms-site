---
title: Tina With Gatsby
id: /docs/teams/cli/introduction
prev: /docs/teams/cli/contributing
---

Tina Teams functionality can be added to a Gatsby site with the `gatsby-tinacms-teams` plugin.

## Install the Git & Markdown Packages

    npm install --save gatsby-tinacms-teams

or

    yarn add gatsby-tinacms-teams

## Adding the Teams Plugin

Open the `gatsby-config.js` file and add the plugins:

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

Alternatively, you can use .env files:

**.env.staging**

```
REQUIRE_AUTH=true
```

You will also need to set the `TINA_TEAMS_NAMESPACE` environment variable. This will be the email of the user who owns this site within Tina Teams.

<tip>You can use the [Tina CLI](/docs/teams/cli/commands 'Tina CLI') to add a site to Tina Teams, or check who owns a site</tip>

## Configuring Git for Cloud Commits

<tip>
If you are using the gatsby-tinacms-git plugin, make sure to use version: 0.2.16-canary.0 or later!
</tip>

To get **gatsby-tinacms-git** working in the cloud, we'll need to add a SSH_KEY environment variable:

**.env.staging**

```
SSH_KEY=KS0eLS4CRTTdJTi...
```

### `SSH_KEY` 🔑

The `SSH_KEY` is a private key that allows write access to your git repo. We'll need to add the public key to the repo under Deploy Keys in "Settings" and **enable write access.** The `SSH_KEY` needs to be **Base64 encoded**; we can encode a local key (named id_rsa in this case) by running the following in your terminal:

`$ cat ~/.ssh/id_rsa | base64`
