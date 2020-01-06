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
