---
title: Date Field
---

The `"date"` field plugin uses [`react-datettime`](https://www.npmjs.com/package/react-datetime) under the hood. 

```typescript
interface DateConfig extends DatetimepickerProps {
  component: 'date'
  name: string
  label?: string
  description?: string
  colorFormat?: 'hex' | 'rgb' // Defaults to "hex"
}
```

Any extra properties added to the the `date` field definition will be passed along to the [`react-datettime`](https://www.npmjs.com/package/react-datetime) component. For instance you can specify a default date format like this:

```js
{
  name: "datePosted",
  component: "date",
  label: "Date Posted",
  dateFormat: "MMMM, dd, YYYY"
}
```
