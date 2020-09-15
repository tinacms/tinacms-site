---
title: Tina With Next.js
id: /docs/teams/next/introduction
prev: /docs/teams/introduction
next: /docs/teams/cloud-commits
---

This doc assumes you have first gone through [setting up a backend with Tina](/docs/nextjs/adding-backends)

Tina Teams functionality can be added to a NextJS site with the `@tinacms/teams` plugin (which also requires access to cookies through the `cookie-parser` plugin).

## Install the Git & Markdown Packages

    npm install @tinacms/teams cookie-parser

or

    yarn add @tinacms/teams cookie-parser

## Adding the Teams Plugin

Open the `server.js` file add register the `cookieParser` and `@tinacms/teams` middleware. They should be registered as high up as possible.

```JavaScript
  // ...
  const teams = require("@tinacms/teams");
  const cookieParser = require("cookie-parser");

  app.prepare().then(() => {
    const server = express();

    server.use(cors());
    server.use(cookieParser());
    server.use(teams.router());

    server.use("/___tina", gitApi.router());

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    // ...
  })
  // ...
```

## Configuration

Teams authentication is enabled/disabled with the `REQUIRE_AUTH` environment variable.

**package.json**

```
"scripts": {
  "start": "REQUIRE_AUTH=true node server.js",
}
```

Alternatively, you can use .env files (as long as your site supports it).

**.env**

```
REQUIRE_AUTH=true
```

<tip>
If you are hosting on a service like Heroku or Render, these environment variables can be added through the host provider's UI.
</tip>

You will also need to set the `TINA_TEAMS_NAMESPACE` environment variable. This will be the email of the user who created this site within Tina Teams.
