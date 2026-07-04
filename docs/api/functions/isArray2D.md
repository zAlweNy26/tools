[Overview](../index.md) / isArray2D

# isArray2D()

> **isArray2D**\<`T`\>(`array`): `array is T[][]`

Type guard function that checks if an array is a 2D array of a specific type.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the elements to check for. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `unknown`[][] | The array to check. |

## Returns

`array is T[][]`

boolean indicating whether the 2D array is of the specified type.

## Example

```ts
import { isArray2D } from '@danyalwe/tools'

isArray2D<number>([[1, 2], [3, 4]]) // true
isArray2D<number>([[1, 2], ['a', 'b']]) // false
```
