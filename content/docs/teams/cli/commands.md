---
title: CLI Commands
id: /docs/teams/cli/commands
prev: /docs/teams/cli/introduction
next: /docs/teams/cli/contributing
---
## Help

You can get help on any command with `-h` or `--help`.

e.g: `tina repos --help`

This will describe how to use all the commands in the `repos` context

## Commands

* [tina init](#tina-init) - Guides you along creating a repo/branch in Tina from ground zero.
* [tina login](#tina-login) - Log in / Create a tina account
* [tina config:init](#tina-configinit) - Initialize the local project with a tina config
* [tina repos](#tina-repos) - List repos that the logged in user has access to.
* [tina repos:info](#tina-reposinfo) - Describe a given repo in Tina
* [tina repos:add](#tina-reposadd) - Adds a repo into tina
* [tina repos:remove](#tina-reposremove) - Removes a repo from tina
* [tina branches](#tina-branches) - List branches that the logged in user has access to on the repository context that this command is run from.
* [tina branches:info](#tina-branchesinfo-branch) - Describe a branch in Tina.
* [tina deploy](#tina-deploy--tina-branchesadd-branch) - Adds a branch into tina, and deploys a live staging environment.
* [tina branches:remove](#tina-branchesremove-branch) - Removes a branch from Tina.
* [tina branches:logs](#tina-brancheslogs-branch-step) - Fetches the logs for a deployment step in tina
* [tina users](#tina-users-options) - List users on a tina repo.
* [tina users:info](#tina-usersinfo-email) - Describe a user in Tina
* [tina users:add](#tina-usersadd-email-options) - Adds a user to a repo in tina
* [tina users:update](#tina-usersupdate-email-options) - Updates a user's access on a repo.
* [tina users:remove](#tina-usersremove-email) - Removes a user from a repo.
* [tina users:roles:add](#tina-usersrolesremove-email-roles) - Adds a list of roles onto a user for a repo.
* [tina users:roles:remove](#tina-usersrolesremove-email-roles) - Removes a list of roles from a user on a repo.
* [tina serve](#tina-serve-options--tina-server-options) - Allows you to self-host a development version of your site behind authentication.

### tina init

Guides you along creating a repo/branch in Tina from ground zero.

### tina login

Log in / Create a Tina account.

Required in order to perform most actions within the CLI.

### tina config:init

Initialize the local project with a Tina config.

This should be run from within the root of your site. The generated config file tells Tina how your site should be built.
Tina will read this file directly from your repository, so it will need to be pushed to git before you can deploy a given branch.

When `tina config:init` is run, an empty ./.tina/secrets.json is created if it doesn't already exist. These values are sent to Tina when a branch is deployed.

### tina repos

List any repos that the logged-in user has access to.

### tina repos:info \[options\]

Describe a given repo in Tina

#### Options

      -url, --ssh_url <ssh_url>  Specify a repo to use instead of using the repo from the current context (optional)

### tina repos:add

Add a repo into Tina, based on the site context that this command is run from.

Each repo can multiple branches.

### tina repos:remove

Remove a repo from Tina.
This will remove the repo from Tina based on the repository context that this command is run from.

### tina branches

List branches that the logged-in user has access to within the repository context that this command is run from.

### tina branches:info \[branch\]

Describe a branch in Tina.

#### Arguments

      [branch]  Specify a branch to use instead of prompting from a select list (optional)

### tina deploy \[branch\] | tina branches:add \[branch\]

Add a branch into tina, and deploy a live staging environment.

Once you select a branch, Tina will deploy it to its servers and allow you to access the site in a live preview url. The repository must first be added to Tina with the `[tina repos:add](#tina-reposadd)` command.

#### Arguments

      [branch]  Specify a branch to use instead of prompting from a select list (optional)

### tina branches:remove \[branch\]

Remove a branch from Tina. The branch is based on the site context that this command is run from.

#### Arguments

      [branch]  Specify a branch to use instead of prompting from a select list (optional)

### tina branches:logs \[branch\] \[step\]

Fetches the logs for a deployment step in Tina

#### Arguments

      [branch]  Specify a branch to use instead of prompting from a select list (optional)
      [step]  Specify a step id to use instead of prompting from a select list (optional)

#### Options

    -s, --step <step> Logs status on a branch deployment. If no branch is specified, it will use the current context's branch.

### tina users \[options\]

List users on a Tina repo.

#### Options

    -t, --type [type] type of the users to include (owner or member) - defaults to all

### tina users:info \[email\]

Describe a user on a Tina repo.

#### Arguments

    [email] Specify a user's email to use instead of prompting from a select list (optional)

### tina users:add \[email\] \[options\]

Add a user to a Tina repo.

#### Arguments

    [email] Specify a user's email to use instead of prompting from a select list (optional)

#### Options

    -t, --type [type] type of the users to include (owner, member) - defaults to all
    -r, --role <role> a comma separated list of roles assigned to this user.

### tina users:update \[email\] \[options\]

Update a user's access on a repo.

#### Arguments

    [email] Specify a user's email to use instead of prompting from a select list (optional)

#### Options

    -t, --type [type] type of the users to include (owner, member) - defaults to all
    -r, --role <role> a comma separated list of roles assigned to this user.

### tina users:remove \[email\]

Remove a user from a repo.

#### Arguments

    [email] Specify a user's email to use instead of prompting from a select list (optional)

### tina users:roles:add \[email\] \[roles\]

Adds a list of comma-separated roles onto a user for a repo

#### Example

    tina users:roles:add tim@tina.io editor,developer

#### Arguments

    [email] Specify a user's email to use instead of prompting from a select list (optional)
    [roles] Specify a comma separated list of roles instead of prompting (optional)

### tina users:roles:remove \[email\] \[roles\]

Remove a list of comma-separated roles from a user for a repo

#### Example

    tina users:roles:remove tim@tina.io editor,developer

#### Arguments

    [email] Specify a user's email to use instead of prompting from a select list (optional)
    [roles] Specify a comma separated list of roles instead of prompting (optional)

### tina serve \[options\] | tina server \[options\]

Allows you to self-host a development version of your site behind an authentication .

Sets up a reverse-proxy on your site.

#### Options

    -p, --port <port> Specify a port to listen on
    -u, --proxyurl <proxyurl> Specify the url to proxy
    -s, --secure <secure> http or https
    --auth_client_secret <auth_client_secret> auth client secret
    --auth_endpoint <auth_endpoint> auth endpoint
    --token_endpoint <token_endpoint> token endpoint
    --audience <audience> auth audience
    --jwks_uri <jwks_uri> jwks uri
    --host <host> The hostname where your site will be available