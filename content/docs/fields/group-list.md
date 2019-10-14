---
title: Group-List Field
---

```typescript
import { Field } from '@tinacms/core'

interface GroupListConfig {
  component: 'group-list'
  name: string
  label?: string
  /**
   * The list of fields for each item.
   */
  fields: Field[]
  /**
   * An optional object/function used when creating new items.
   */
  defaultItem?: object | (() => object)
  /**
   * An optional function which generates `props` for
   * this items's `li`.
   */
  itemProps?(
    item: object
  ): {
    /**
     * The `key` property used to optimize the rendering of lists.
     *
     * If rendering is causing problems, use `defaultItem` to
     * generate a unique key for the item.
     *
     * Reference:
     * * https://reactjs.org/docs/lists-and-keys.html
     */
    key?: string
    /**
     * The label to be display on the list item.
     */
    label?: string
  }
}
```
