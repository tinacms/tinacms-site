---
title: Group Field
prev: /docs/fields/toggle
next: /docs/fields/group-list
---

```typescript
import { Field } from '@tinacms/core'

interface GroupConfig {
  component: 'group'
  name: string
  label?: string
  fields: Field[]
}
```
