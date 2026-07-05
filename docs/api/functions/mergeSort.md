[Overview](../index.md) / mergeSort

# mergeSort()

> **mergeSort**\<`T`\>(`array`): `T`[]

Sorts an array using the merge sort algorithm.

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
import { mergeSort } from '@danyalwe/tools'

mergeSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
mergeSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
```
