[Overview](../index.md) / manhattan

# manhattan()

> **manhattan**(`a`, `b`): `number`

Calculates the Manhattan distance between `a` and `b`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `number`[] | The first vector. |
| `b` | `number`[] | The second vector. |

## Returns

`number`

The Manhattan distance between the two vectors.

## Throws

An error if the vectors do not have the same length.

## Example

```ts
import { manhattan } from '@danyalwe/tools'

manhattan([0, 0], [3, 4])  // 7
manhattan([1, 2], [4, 6])  // 7
```

## See

[https://en.wikipedia.org/wiki/Manhattan\_distance](https://en.wikipedia.org/wiki/Manhattan_distance)
