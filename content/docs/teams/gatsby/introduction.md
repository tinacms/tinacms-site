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

<tip>	
If you are using the gatsby-tinacms-git plugin, make sure to use version: 0.2.16 or later!	
</tip>

To get **gatsby-tinacms-git** working in the cloud, we'll need to add a SSH_KEY environment variable:

**.env**

```
SSH_KEY=KS0eLS4CRTTdJTi...
```

### `SSH_KEY` 🔑

The `SSH_KEY` is a private key that allows write access to your git repo from our cloud editing environment.

Let's start by creating a new keypair using the following command. (Make a note of your key path/name, and when prompted for a password leave it blank) 

```
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

This should have created a **private key**, and a **public key**. We'll need to add the **public key** to your site's repo within your Git provider (Github, Gitlab, Bitbucket etc). In Github, This can be done in "Settings" > "Deploy Keys". Make sure to **enable write access.** 

We can log out our public key by running the following command in your terminal:
`$ cat ~/.ssh/your_key_name.pub`

Now let's add the **private key** to our cloud editing environment. 

The **private key** will need to be be **Base64 encoded** and added to our cloud editing environment as an environment variable.

We can encode and log our **private key** by running the following command in your terminal:

`$ cat ~/.ssh/your_key_name | base64`

Let's add this as an environment variable within our cloud editing environment:

```
SSH_KEY: [value logged out above]
```

Now after you rebuild your cloud editing environment, it should be able to commit to your repository!

<tip>
Note that Base64 encoding the key DOES NOT make it safe to share this key!! We are Base64 encoding the key only to avoid formatting issues when using it as an environment variable.
</tip>	

## Limitations

The Tina Teams plugin will put the site behind an authentication layer, however Gatsby's **/graphql** endpoint may still be accessible. If this is an issue for your site, we suggest password-protecting your environment through your hosting provider. 
