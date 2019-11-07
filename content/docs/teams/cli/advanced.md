---
title: Advanced Configuration
id: /docs/teams/cli/advanced
prev: /docs/teams/cli/contributing
---
## Private packages

If you are using a private repository, you will need to add a valid NPMTOKEN to the site's secret.json file (with private npm access).  
  
You will also need to use \`\` "forestryio/node:10",\`\` .tina/config, or another image that handles an explicit NPM_TOKEN