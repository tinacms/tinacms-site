---
title: Group Field
prev: /docs/fields/toggle
next: /docs/fields/group-list
---

The `group` field represents a group of values. This field is typically used with an array of objects within a json file or nested frontmatter values in a markdown file.

## Definition

Below is an example of how a `group` field could be defined in a Gatsby json form. Read more on passing in json form field options [here](/docs/gatsby/json#customizing-json-forms).

```javascript
const formOptions = {
    label: 'Info Page',
    fields: [
      {
        label:"Contact Info",
        name:"rawJson.contact",
        description: "Contact info",
        component: "group",
        fields: [
          {
            label:"Email",
            name:"rawJson.contact.email",
            description: "Contact email",
            component: "text"
          },
          { label:"Twitter",
            name:"rawJson.contact.twitter_handle",
            description: "Twitter handle",
            component: "text"
          },
          { label:"Github",
            name:"rawJson.contact.github_handle",
            description: "Github username",
            component: "text"
          }
        ]
      },
      //...
    ]
  }
```

## Options

 - `name`: The path to some value in the data being edited.
 - `component`: The name of the React component that should be used to edit this field. Available field component types are [defined here](/docs/concepts/fields#field-types)
 - `label`: A human readable label for the field. This label displays in the sidebar and is optional. If no label is provided, the sidebar will default to the name.
 - `fields`: An array of group values that will render as a sub-menu.

```typescript
import { Field } from '@tinacms/core'

interface GroupConfig {
  name: string
  component: 'group'
  label?: string
  fields: Field[]
}
```
