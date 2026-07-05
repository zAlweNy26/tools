[Overview](../index.md) / canberra

# canberra()

> **canberra**(`a`, `b`): `number`

Calculates the Canberra distance between `a` and `b`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `number`[] | The first vector. |
| `b` | `number`[] | The second vector. |

## Returns

`number`

The Canberra distance between the two vectors.

## Throws

An error if the vectors do not have the same length.

## Example

```ts
import { canberra } from '@danyalwe/tools'

canberra([1, 2], [3, 4])   // 0.6...
canberra([0, 0], [3, 4])   // 2
```

## See

[https://en.wikipedia.org/wiki/Canberra\_distance](https://en.wikipedia.org/wiki/Canberra_distance)
