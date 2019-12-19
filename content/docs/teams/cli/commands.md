---
title: CLI Commands
id: /docs/teams/cli/commands
prev: /docs/teams/cli/introduction
next: /docs/teams/cli/contributing
---

## Help

You can get help on any command with `-h` or `--help`.

e.g: `tina sites --help`

This will describe how to use all the commands in the `sites` context

## Commands

- [tina login](#tina-login) - Log in / Create a tina account
- [tina sites](#tina-sites) - List sites that the logged in user has access to.
- [tina sites:info](#tina-sitesinfo) - Describe a given site in Tina
- [tina sites:add](#tina-sitesadd) - Adds a site into tina
- [tina sites:remove](#tina-sitesremove) - Removes a site from tina
- [tina users](#tina-users-options) - List users on a tina site.
- [tina users:info](#tina-usersinfo-email) - Describe a user in Tina
- [tina users:add](#tina-usersadd-email-options) - Adds a user to a site in tina
- [tina users:update](#tina-usersupdate-email-options) - Updates a user's access on a site.
- [tina users:remove](#tina-usersremove-email) - Removes a user from a site.
- [tina users:roles:add](#tina-usersrolesremove-email-roles) - Adds a list of roles onto a user for a site.
- [tina users:roles:remove](#tina-usersrolesremove-email-roles) - Removes a list of roles from a user on a site.
- [tina serve](#tina-serve-options--tina-server-options) - (Beta) Allows you to self-host a development version of your site behind authentication.

### tina login

Log in / Create a Tina account.

Required in order to perform most actions within the CLI.

### tina sites

List any sites that the logged-in user has access to.

### tina sites:info \[options\]

Describe a given site in Tina

#### Options

      -url, --ssh_url <ssh_url>  Specify a site to use instead of using the site from the current context (optional)

### tina sites:add

Add a site into Tina, based on the site context that this command is run from.

Each site can multiple branches.

### tina sites:remove

Remove a site from Tina.
This will remove the site from Tina based on the repository context that this command is run from.

### tina users \[options\]

List users on a Tina site.

#### Options

    -t, --type [type] type of the users to include (owner or member) - defaults to all

### tina users:info \[email\]

Describe a user on a Tina site.

#### Arguments

    [email] Specify a user's email to use instead of prompting from a select list (optional)

### tina users:add \[email\] \[options\]

Add a user to a Tina site.

#### Arguments

    [email] Specify a user's email to use instead of prompting from a select list (optional)

#### Options

    -t, --type [type] type of the users to include (owner, member) - defaults to all
    -r, --role <role> a comma separated list of roles assigned to this user.

### tina users:update \[email\] \[options\]

Update a user's access on a site.

#### Arguments

    [email] Specify a user's email to use instead of prompting from a select list (optional)

#### Options

    -t, --type [type] type of the users to include (owner, member) - defaults to all
    -r, --role <role> a comma separated list of roles assigned to this user.

### tina users:remove \[email\]

Remove a user from a site.

#### Arguments

    [email] Specify a user's email to use instead of prompting from a select list (optional)

### tina users:roles:add \[email\] \[roles\]

Adds a list of comma-separated roles onto a user for a site

#### Example

    tina users:roles:add tim@tina.io editor,developer

#### Arguments

    [email] Specify a user's email to use instead of prompting from a select list (optional)
    [roles] Specify a comma separated list of roles instead of prompting (optional)

### tina users:roles:remove \[email\] \[roles\]

Remove a list of comma-separated roles from a user for a site

#### Example

    tina users:roles:remove tim@tina.io editor,developer

#### Arguments

    [email] Specify a user's email to use instead of prompting from a select list (optional)
    [roles] Specify a comma separated list of roles instead of prompting (optional)

### tina serve \[options\] | tina server \[options\]

(Beta) Allows you to self-host a development version of your site behind an authentication layer.

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
