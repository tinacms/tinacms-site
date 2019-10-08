---
title: Fields
prev: /docs/concepts/forms
next: /docs/gatsby/quickstart
---

A [form](/docs/concepts/forms 'Tina Concepts: Forms') in Tina is made up of one or more **fields**.

Tina has several built-in field types, as well as the ability to define your own fields.

## Field Definition

Fields can be added to Forms as object literals that conform to the following schema:

```typescript
interface Field {
  name: string
  label?: string
  description?: string
  component: React.FC<any> | string
  defaultValue?: any
}
```

- `name`: The form key of the field. The field's name should correspond to its key in the content source.
- `label`: _(Optional)_ A human-readable label to display above the field.
- `description`: _(Optional)_ A description that will appear below the field. Could be used to explain how the field data is used.
- `component`: Either a React component that renders the field, or a string containing the ID of a built-in field type or custom field plugin
- `defaultValue`: _(Optional)_ This value will be inserted into the field if no value is set.
