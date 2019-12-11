---
title: Plugins
id: /docs/concepts/plugins
prev: /docs/concepts/backends
---

**Plugins** allow you to extend the functionality of the CMS. In fact, the plugin API is currently being used to add features to the core CMS, including:

- [Form Fields](https://tinacms.org/docs/concepts/fields)
- [Global and Local Forms](https://tinacms.org/docs/concepts/forms)
- [Content Creator Plugins](https://tinacms.org/docs/gatsby/creating-new-files#1-add-content-creator-plugin)
- Screen Plugins

<tip>**Please note:** creating or consuming custom plugins is considered an advanced usecase. It is recommended for most folks to use Tina's predefined plugins mentioned above.</tip>

## Defining Plugins

``` ts
interface Plugin {
  /*
  ** Required. Plugins can use the `__type` property to
  ** determine which other plugins they can communicate with
  */
  __type: string
  name: string
  icon?: string
  // add additional plugin-specific options
}
```
The interface for the `Field` plugin as an example:

```ts
interface FieldPlugin {
  __type: 'field'
  name: string
  Component: React.FC<any>
  type?: string
  validate?(
    value: any,
    allValues: any,
    meta: any,
    field: Field
  ): string | object | undefined
  parse?: (value: any, name: string, field: Field) => any
  format?: (value: any, name: string, field: Field) => any
  defaultValue?: any
}
```

## Adding and Removing Plugins

The CMS instance has a Plugin Manager that surfaces `add`,`remove` and other methods.

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

**Accessing The Plugin**

```javascript
cms.plugins.all('say-hello').map(plugin => plugin.hello())
```

### withPlugin HOC & usePlugins Hook

The best way to add plugins to the CMS is via the `withPlugin` HOC or `usePlugins` hook. `usePlugins` accepts a single plugin or an array of plugins and will update the plugins registered with the CMS by adding and removing them [dynamically](https://tinacms.org/blog/dynamic-plugin-system/).



In the example below, a custom `postCreatorPlugin` was created. And the `usePlugins` hook will dynamically add this plugin to the CMS only when the `BlogIndex` component is rendered.

```js
import { usePlugins } from "tinacms"
import { postCreatorPlugin } from "./post-creator-plugin"

function BlogIndex(props) {

  // adds creator plugin to cms
  usePlugins(postCreatorPlugin)

  return ( ... )
}
```

Using the `withPlugin` HOC in this example would look like this:

```js
import { withPlugin } from "tinacms"
import { postCreatorPlugin } from "./post-creator-plugin"

function BlogIndex(props) {
  return ( ... )
}

// export the HOC with the component and plugin
export default withPlugin( BlogIndex, postCreatorPlugin )
```

Read more on [creating new files](https://tinacms.org/docs/gatsby/creating-new-files#2-register-plugin-to-sidebar) with `content-creator` plugins in Gatsby [here](https://tinacms.org/docs/gatsby/creating-new-files#2-register-plugin-to-sidebar).
