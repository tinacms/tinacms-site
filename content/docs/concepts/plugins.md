---
title: Plugins
id: /docs/concepts/plugins
prev: /docs/concepts/backends
---

<tip>This document is a work-in-progress. The Plugin API is not stable and it is not recommended to create or consume plugins in your projects.</tip>

**Plugins** allow you to extend the functionality of the CMS. In fact, the plugin API is currently being used to add features to the core CMS, including:

- Built-in Form Fields
- Create Content Buttons

## Defining Plugins

```javascript
cms.plugins.add({
  // Required. Plugins can use the `__type` property to determine which other plugins they can communicate with
  __type: 'say-hello',
  // add other plugin-specific options here
  hello() {
    console.log('Hello, World!')
  },
})
```

## Accessing Plugins

```javascript
cms.plugins.all('say-hello').map(plugin => plugin.hello())
```
