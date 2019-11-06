---
title: Introduction
id: /docs/teams/introduction
prev: null
next: /docs/teams/cli/introduction
---
Tina Teams allows you and your team to edit content in a cloud-hosted environment. Tina Teams is currently in [closed beta](/teams "Tina Teams Signup").

Interaction with Teams' environments is done through the Tina CLI.

Once a site is deployed, any user with access can log in through the live environment's URL, and start making edits to the branch.

## Limitations

* Any Gatsby site which will be making commits on a Tina Team environment will currently need to have a `defaultCommitMessage`, `defaultCommitName`, `defaultCommitEmail` set in its [config](http://localhost:8000/docs/gatsby/configure-git-plugin "git config"). Eventually, these values will be pulled from the logged-in user.