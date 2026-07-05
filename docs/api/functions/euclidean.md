[Overview](../index.md) / euclidean

# euclidean()

> **euclidean**(`a`, `b`): `number`

Calculates the Euclidean distance between `a` and `b`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `number`[] | The first vector. |
| `b` | `number`[] | The second vector. |

## Returns

`number`

The Euclidean distance between the two vectors.

## Throws

An error if the vectors do not have the same length.

## Example

```ts
import { euclidean } from '@danyalwe/tools'

euclidean([0, 0], [3, 4])  // 5
euclidean([1, 2], [4, 6])  // 5
```

## See

[https://en.wikipedia.org/wiki/Euclidean\_distance](https://en.wikipedia.org/wiki/Euclidean_distance)
