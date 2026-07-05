[Overview](../index.md) / countingSort

# countingSort()

> **countingSort**(`array`): `number`[]

Sorts an array using the counting sort algorithm.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `number`[] | The array to be sorted. |

## Returns

`number`[]

The sorted array.

## Example

```ts
import { countingSort } from '@danyalwe/tools'

countingSort([4, 2, 2, 8, 3, 3, 1]) // [1, 2, 2, 3, 3, 4, 8]
```
