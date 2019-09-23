---
id: /contributing/setting-up
title: Contribution Set-up
prev: /contributing/guidelines
next: /contributing/troubleshooting
---

## Development

To get started:

```bash
git clone git@github.com:tinacms/tinacms.git
cd cms
npm run bootstrap
npm run build

# Start the Gatsby demo
cd packages/demo/demo-gatsby
npm run start
```

## Commands

| Commands                           | Descriptiton                                  |
| ---------------------------------- | --------------------------------------------- |
| npm run bootstrap                  | Install dependencies and link local packages. |
| npm run build                      | Build all packages                            |
| npm run test                       | Run tests for all packages                    |
| lerna run build --scope \<package> | Build only \<package>.                        |
| lerna run watch --parallel         | Watch all packages for rebuilds.              |

## Links

- [Circle CI](https://circleci.com/gh/tinacms/tinacms): Continuous Integration
