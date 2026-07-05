[Overview](../index.md) / euclideanSquared

# euclideanSquared()

> **euclideanSquared**(`a`, `b`): `number`

Calculates the squared Euclidean distance between `a` and `b`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `number`[] | The first vector. |
| `b` | `number`[] | The second vector. |

## Returns

`number`

The squared Euclidean distance between the two vectors.

## Throws

An error if the vectors do not have the same length.

## Example

```ts
import { euclideanSquared } from '@danyalwe/tools'

euclideanSquared([0, 0], [3, 4])  // 25
euclideanSquared([1, 1], [4, 5])  // 25
```

## See

[https://en.wikipedia.org/wiki/Euclidean\_distance](https://en.wikipedia.org/wiki/Euclidean_distance)
