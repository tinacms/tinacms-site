---
title: Image Field
---

```typescript
interface ImageConfig {
  component: 'Toggle'
  name: string
  label?: string
  description?: string
  parse(filename: string): string
  srcPreview(formValues: any): string
  uploadDir(formValues: any): string
}
```
