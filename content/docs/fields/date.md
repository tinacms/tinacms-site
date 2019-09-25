---
title: Date Field
---

The `"date"` field plugin uses [`react-datettime`](https://www.npmjs.com/package/react-datetime) under the hood. For more details on how the `"date"`

```typescript
interface DateConfig extends DatetimepickerProps {
  component: 'date'
  name: string
  label?: string
  description?: string
  colorFormat?: 'hex' | 'rgb' // Defaults to "hex"
}
```
