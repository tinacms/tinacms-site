---
title: Creating Custom Fields
---

There are two ways to create custom fields with Tina:

1. Create a custom component and add it directly to your form definition via the `component` property
2. Create a **field plugin** to allow forms to use this field simply by using its name

## Component

A field `Component` is React component that accepts three props:

- `field`: The [field definition](../concepts/forms.md#field-definitions) for the current field.
- `input`: The data and callbacks necessary to make an input.
- `meta`: Metadata about the field in the form. (e.g. `dirty`, `valid`)

Checkout the [react-final-form](https://github.com/final-form/react-final-form#fieldrenderprops) docs for a more detailed description of the `input` and `meta` props.

## Registering Field Plugins

A field plugin is a JavaScript object with three properties:

- `name`: A string used to identify the component. This is the name that is set in a [Field Definition](./forms.md#field-definitions). This name must be unique; if multiple plugins are registered with the same name, only the last will be used.
- `Component`: The component that will used in the form. The exact nature of this component depends on which form builder is being used.
- `validate`: An optional function that will be used to validate the field's data.

```javascript
import { MapPicker, validateMap } from 'cms-field-my-map-picker'

let cms = new CMS()

cms.forms.addFieldPlugin({
  name: 'map',
  Component: MapPicker,
  validate: validateMap,
})
```

### Validate (optional)

The optional `validate` function let's you define how you 're

**Arguments**

- `value`: The field's current value
- `allValues`: The current state of the entire form
- `meta`: The form metadata for this field
- `field`: The field's configuration

### Example

Here is an example of a simple text field plugin. The `Component` renders the label, the input, and the errors for the field.

```javascript
import { CMS } from '@tinacms/core'

let cms = new CMS()

cms.forms.addFieldPlugin({
  name: 'text',
  Component({ input, meta, field }) {
    return (
      <div>
        <label htmFor={input.name}>{field.label || field.name}</label>
        <div>{field.description}</div>
        <input type="email" {...input} />
        <div class="field-error">{meta.error}</div>
      </div>
    )
  },
  validate(email, allValues, meta, field) {
    let isValidEmail = /.*@.*\..*/.test(email)

    if (!isValidEmail) return 'Invalid email address'
  },
})
```

## Further Reading

- [Registering Fields in Gatsby](/gatsby/custom-fields)
