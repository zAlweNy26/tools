[Overview](../index.md) / selectionSort

# selectionSort()

> **selectionSort**\<`T`\>(`array`): `T`[]

Sorts an array using the selection sort algorithm.

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
import { selectionSort } from '@danyalwe/tools'

selectionSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
selectionSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
```
