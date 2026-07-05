[Overview](../index.md) / quickSort

# quickSort()

> **quickSort**\<`T`\>(`array`): `T`[]

Sorts an array using the quick sort algorithm.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `T`[] | The array to be sorted. |

## Returns

`T`[]

The sorted array.

## Example

```ts
import { quickSort } from '@danyalwe/tools'

quickSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
quickSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
```
