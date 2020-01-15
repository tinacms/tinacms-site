---
title: Troubleshooting
id: /docs/teams/troubleshooting
prev: /docs/teams/cli/contributing
---

## "You are not authorized to access this site within Tina Teams"

If you are seeing this page when accessing your cloud editing environment, there are a few common issues to check:

#### Cloud Editing Environment does not exist within Tina Teams

The cloud editing environment must first be added as a "site" within tina teams. If you have the Tina Teams CLI installed, you can add your site with:

```
tina sites:add
```

#### User not added to site within Tina Teams

If the logged-in user has not been added to the site within Tina Teams, this screen will be displayed. An admin of the site can add new users by using the Tina CLI:

```
tina users:add
```

#### Mismatching Namespace

The `TINA_TEAMS_NAMESPACE` environment variable set in the cloud environment's env should match the creator of the site within Tina Teams.

Any admins of the this site within Tina Teams can verify the site's creator by using the Tina CLI:

```
tina sites:info
```
