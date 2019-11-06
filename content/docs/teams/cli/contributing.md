---
title: Contributing
id: /docs/teams/cli/contributing
prev: /docs/teams/cli/commands
next: /docs/teams/cli/advanced
---

## Development

To run this project locally in another directory, you can create a symlink by running

```
npm link
```

Then Tina can be run in another directory by running:

```
tina <commands>
```

To run the command locally in this project directory, you can run:

```
./bin/tina <commands>
```

You can view the list of commands with `--help`

### .env

To access some third party services, you will need to add a .env file.
Use the .env.example to fill in the example keys.

### Creating a Github app

To test the Github APP API locally, you can create a Github app here: https://github.com/settings/apps/new
Homepage URL: http://localhost:4568
User authorization callback URL: http://localhost:4568/github/callback
Setup URL: http://localhost:4568/github/installation-callback
Redirect on update: TRUE

Then click "Generate a Private key".
