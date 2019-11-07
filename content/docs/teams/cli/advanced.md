---
title: Advanced Configuration
id: /docs/teams/cli/advanced
prev: /docs/teams/cli/contributing
---
## Private packages

If you are using a private repository, you will need to add a valid `NPM_TOKEN` to the site's secret.json file (with private npm access).

You will also need to use `"image": "forestryio/node:10"` in your site's `.tina/config`, (or another build image that handles an explicit `NPM_TOKEN`