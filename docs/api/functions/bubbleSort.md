[Overview](../index.md) / bubbleSort

# bubbleSort()

> **bubbleSort**\<`T`\>(`array`): `T`[]

Sorts an array using the bubble sort algorithm.

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
import { bubbleSort } from '@danyalwe/tools'

bubbleSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
bubbleSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
```
