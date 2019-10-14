---
title: Blocks FIeld
---

```typescript
import { Field } from '@tinacms/core'

interface BlocksConfig {
  component: 'blocks'
  name: string
  label?: string
  templates: {
    [key: string]: BlockTemplate
  }
}

interface BlockTemplate {
  // The text displayed when adding a new block
  label: string
  // A default item for creating
  defaultItem: object
  fields: Field[]
}
```
