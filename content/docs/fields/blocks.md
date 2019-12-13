---
title: Blocks Field
prev: /docs/fields/group-list
next: /docs/fields/custom-fields
consumes:
  - file: /packages/tinacms/src/plugins/fields/BlocksFieldPlugin.tsx
    details: Shows blocks interface
---

The `Blocks` field allows you to edit, rearrange, create and delete individual blocks. A `block` is a component you define, and you can create a `block template` in order to edit / manage it with Tina. The `Blocks` field accepts these `block templates`, which are very similar to a [form configuration](https://tinacms.org/docs/gatsby/markdown#customizing-remark-forms) object.

To see a real-world example of `blocks` in use, check out the [Tina Grande Starter](https://github.com/tinacms/tina-starter-grande).

![tinacms-blocks-gif](/gif/blocks.gif)

In the gif above, you see a list of `blocks`: Title, Image, and Content. The form for this `blocks` field would be configured like this:

``` jsx
const PageForm = {
  label: "Page",
  fields: [
    {
      label: "Page Sections",
      name: "rawJson.blocks",
      component: "blocks",
      templates: {
        TitleBlock,
        ImageBlock,
        ContentBlock,
      },
    },
  ],
}
```

Of the three `block templates`, the individual `ContentBlock` might look something like this:

``` jsx
/*
**  1. Create the component that will
**     render the editable data
*/
export function Content(props) {
  return (
    <article
      dangerouslySetInnerHTML={{
        __html: props.html,
      }}
    ></article>
  )
}

/*
**  2. Define the Block Template
**/
export const ContentBlock = {
  label: "Content",
  key: "content-block",
  defaultItem: {
    content: "",
    center: false,
  },
  fields: [
    { name: "content", label: "Content", component: "markdown" },
  ],
}
```
Think of the `block template` as similar to a [group-list](/docs/fields/group-list) definition. It gives a blueprint for any `block` of its type. The blueprint tells the `block` how to render its data, what the default state should be, and it also provides form field definitions to Tina to make the data editable.

Within a single `blocks field` definition, there may be many different types of `block templates`, and many instances of each type of `block`.

The `blocks field` allows you to manage all of these `blocks` at once. You can rearrange the order, add or delete them, and edit their individual content. It's almost like a group of [`group-lists`](/docs/fields/group-list), where the group items are their own unique components.

## Blocks Field Options

 - `name`: The path to the blocks value in the data being edited.
 - `component`: The name of the React component that should be used to edit this field. Available field component types are [defined here](/docs/concepts/fields#field-types).
 - `label`: A human readable label for the field. This label displays in the sidebar and is optional. If no label is provided, the sidebar will default to the name.
 - `description`: An optional description of the field.
 - `templates`: A list of `block templates` for the `blocks field` to render.

 ## Block Template Options

 - `label`: A human readable label for the `block`.
 - `key`: Should be unique to optimize the [rendering of the list](https://reactjs.org/docs/lists-and-keys.html).
 - `fields`: An array of fields that will render as a sub-menu for each block. The fields should map to editable content.
 - `defaultItem`: An optional function to provide the block with default data upon being created.
 - `itemProps`: An optional function that generates `props` for each group item.
    - `key`: This property is used to optimize the rendering of lists. If rendering is causing problems, use `defaultItem` to generate a new key, as is seen in [this example](http://tinacms.org/docs/fields/group-list#definition). Feel free to reference the [React documentation](https://reactjs.org/docs/lists-and-keys.html) for more on keys and lists.
    - `label`: A readable label for the new `block`.


## Interfaces

```typescript
import { Field } from '@tinacms/core'

interface BlocksConfig {
  name: string
  component: 'blocks'
  label?: string
  description?: string
  templates: {
    [key: string]: BlockTemplate
}

interface BlockTemplate {
  label: string
  key: string
  fields: Field[]
  defaultItem?: object | (() => object)
  itemProps?: (
    item: object
  ) => {
    key?: string
    label?: string
  }
}
```
