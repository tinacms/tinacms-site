---
title: Inline Editing
id: inline-editing
prev: null
next: null
---

**Inline editing** refers to the ability to edit content directly on your site's page, as opposed to editing within the CMS sidebar.

## Enabling Inline Editing for Remark Content

Creating an inline editing experience for Remark content only requires a few extra steps. Note that users will still be able to edit via the sidebar when inline editing is configured.

### 1. Add Inline Fields

To facilitate inline editing, you will need to add fields into your layout using the `TinaField` component. The `TinaField`component should wrap the HTML that outputs the contents of the field it edits. When **editing mode** is activated, the content will become editable.

In the following example, we wrap the `section` that renders the markdown content in a `TinaField that uses the Wysiwyg` component. Note that the field being edited by `TinaField` does **not** have to be the same as the field being rendered in its child components.

**Before**

```jsx
const Template = ({ data }) => (
  <section class="content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></section>
)
```

**After**

```jsx
import { Wysiwyg } from '@tinacms/fields'

const Template = ({ data }) => (
  <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
    <section class="content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></section>
  </TinaField>
)
```

### 2. Replace remarkForm with liveRemarkForm

If you followed the [editing markdown in Gatsby](/gatsby/content-editing.md#editing-markdown-in-gatsby) guide, you used the `remarkForm` function to attach the CMS to your page template. Once you've added some inline fields into your template, all you have to do is replace the call to `remarkForm` with a call to `liveRemarkForm`

**Before**

```jsx
import { remarkForm } from '@tinacms/react-tinacms-remark'

const Template = ({ data }) => (
  <section class="content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></section>
)

export default remarkForm(Template, {
  fields: [{ name: 'rawMarkdownBody', component: Wysiwyg }],
})
```

**After**

```jsx
import { liveRemarkForm } from '@tinacms/react-tinacms-remark'

import { TinaField } from '@tinacms/form-builder'

const Template = ({ data }) => (
  <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
    <section class="content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></section>
  </TinaField>
)

export default liveRemarkForm(Template)
```

### 3. Trigger Edit Mode

When your template is processed through the `liveRemarkForm` function, it will have the properties `isEditing` and `setIsEditing` that you can use to create a trigger for activating inline editing mode.

```jsx
import { liveRemarkForm } from '@tinacms/react-tinacms-remark'

import { TinaField } from '@tinacms/form-builder'

const Template = ({ data, isEditing, setIsEditing }) => (
  <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
    <section class="content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></section>
    <button onClick={() => setIsEditing(p => !p)}>{isEditing ? 'Preview' : 'Edit'}</button>
  </TinaField>
)

export default liveRemarkForm(Template)
```

For the time being, users will still need to open the CMS sidebar in order to save.
