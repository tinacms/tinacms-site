---
title: Tina With Gatsby
id: /docs/teams/gatsby/introduction
prev: /docs/teams/introduction
next: /docs/teams/cloud-commits
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
