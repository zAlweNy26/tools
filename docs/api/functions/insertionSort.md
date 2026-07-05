[Overview](../index.md) / insertionSort

# insertionSort()

> **insertionSort**\<`T`\>(`array`): `T`[]

Sorts an array using the insertion sort algorithm.

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
import { insertionSort } from '@danyalwe/tools'

insertionSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
insertionSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
```
