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
- [tina sites:info](#tina-sitesinfo-options) - Describe a given site in Tina
- [tina sites:add](#tina-sitesadd-options) - Adds a site into tina
- [tina sites:remove](#tina-sitesremove-options) - Removes a site from tina
- [tina users](#tina-users-options) - List users on a tina site.
- [tina users:info](#tina-usersinfo-options) - Describe a user in Tina
- [tina users:add](#tina-usersadd-email-options) - Adds a user to a site in tina
- [tina users:update](#tina-usersupdate-email-options) - Updates a user's access on a site.
- [tina users:remove](#tina-usersremove-options) - Removes a user from a site.
- [tina users:roles:add](#tina-usersrolesremove-options) - Adds a list of roles onto a user for a site.
- [tina users:roles:remove](#tina-usersrolesremove-options) - Removes a list of roles from a user on a site.

### tina login

Log in / Create a Tina account.

Required in order to perform most actions within the CLI.

### tina sites \[options\]

List any sites that the logged-in user has access to.

### tina sites:info \[options\]

Describe a given site in Tina

#### Options

      --site_id <site_id>  Specify a site to use (in [namespace]/[base_url] format) instead of prompting from a select list (optional)

### tina sites:add \[options\]

Add a site into Tina.

#### Options

      --site_id <site_id>  Specify a site to use (in [namespace]/[base_url] format) instead of prompting from a select list (optional)

      // Your base_url might look like "[your_cloud_environment_url_1234].io" or "[your_ip]:[8888]"

### tina sites:remove \[options\]

Remove a site from Tina.

#### Options

      --site_id <site_id>  Specify a site to use (in [namespace]/[base_url] format) instead of prompting from a select list (optional)

### tina users \[options\]

List users on a Tina site.

#### Options

    -t, --type <type> type of the users to include (owner or member) - defaults to all

### tina users:info \[options\]

Describe a user on a Tina site.

#### Options

    --email <email> Specify a user's email to use instead of prompting from a select list (optional)
    --site_id <site_id>  Specify a site to use (in [namespace]/[base_url] format) instead of prompting from a select list (optional)

### tina users:add \[options\]

Add a user to a Tina site.

#### Options

    --email <email> Specify a user's email to use instead of prompting from a select list (optional)
    --site_id <site_id>  Specify a site to use (in [namespace]/[base_url] format) instead of prompting from a select list (optional)
    -t, --type <type> type of the users to include (owner, member) - defaults to all
    -r, --role <role> a comma separated list of roles assigned to this user.

### tina users:update \[options\]

Update a user's access on a site.

#### Options

    --email <email> Specify a user's email to use instead of prompting from a select list (optional)
    --site_id <site_id>  Specify a site to use (in [namespace]/[base_url] format) instead of prompting from a select list (optional)
    -t, --type <type> type of the users to include (owner, member) - defaults to all
    -r, --role <role> a comma separated list of roles assigned to this user.

### tina users:remove \[options\]

Remove a user from a site.

#### Options

    --email <email> Specify a user's email to use instead of prompting from a select list (optional)
    --site_id <site_id>  Specify a site to use (in [namespace]/[base_url] format) instead of prompting from a select list (optional)

### tina users:roles:add \[options\]

Adds a list of comma-separated roles onto a user for a site

#### Example

    tina users:roles:add tim@tina.io editor,developer

#### Options

    --email <email> Specify a user's email to use instead of prompting from a select list (optional)
    --site_id <site_id>  Specify a site to use (in [namespace]/[base_url] format) instead of prompting from a select list (optional)
    -r, --role <role> a comma separated list of roles assigned to this user.

### tina users:roles:remove \[options\]

Remove a list of comma-separated roles from a user for a site

#### Example

    tina users:roles:remove tim@tina.io editor,developer

#### Options

    --email <email> Specify a user's email to use instead of prompting from a select list (optional)
    --site_id <site_id>  Specify a site to use (in [namespace]/[base_url] format) instead of prompting from a select list (optional)
    -r, --role <role> a comma separated list of roles assigned to this user.
