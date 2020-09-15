---
title: Troubleshooting
id: /docs/teams/troubleshooting
prev: /docs/teams/cli/contributing
---

## "You are not authorized to access this site within Tina Teams"

If you are seeing this page when accessing your cloud editing environment, there are a few common issues to check:

1.  **Cloud Editing Environment does not exist within Tina Teams**

    The cloud editing environment must first be added as a "site" within Tina Teams. If you have the [Tina Teams CLI](/docs/teams/cli/introduction) installed, you can add your site with:

    ```
    tina sites:add
    ```

2.  **User not added to the site within Tina Teams**

    If the logged-in user has not been added to the site within Tina Teams, this screen will be displayed. An admin of the site can add new users by using the [Tina Teams CLI](/docs/teams/cli/introduction):

    ```
    tina users:add
    ```

3.  **Mismatching Namespace**

    The `TINA_TEAMS_NAMESPACE` environment variable, set in the cloud environment's env, should match the creator of the site within Tina Teams.

    Any admins of this Tina Teams site can verify the site's creator by using the [Tina Teams CLI](/docs/teams/cli/introduction):

    ```
    tina sites:info
    ```

## Commits not working from the api-git or gatsby-tinacms-git plugins

If you are using the **api-git** plugin and clicking save isn't pushing to your repo, there are a few common issues to check:

1.  **SSH_KEY env variable not properly set**

    Your cloud editing environment will need to have a **SSH_KEY** environment set. This key also needs to Base64 encoded. This should be the private key of your SSH keypair. [Check out our docs](/docs/teams/gatsby/introduction#code-classlanguage-textssh_keycode-) for more details creating & assigning this key.

2.  **Public key not properly set within your Git provider**

    The public key from your generated keypair should be set on your repository within your Git provider (Github, Gitlab, Bitbucket, etc). This key also needs write permissions.

3.  **Tina Teams not properly authenticating users**

    You will need to confirm that users are infact being authenticated (you can test this by trying to access your cloud editing environment in an incognito window).
    If the teams plugin is not properly authenticating users, this may be because the teams plugin hasn't been registered on your site, or the following environment variable hasn't been set:

    ```
    REQUIRE_AUTH: true
    ```
