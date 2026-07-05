[Overview](../index.md) / chebyshev

# chebyshev()

> **chebyshev**(`a`, `b`): `number`

Calculates the Chebyshev distance between `a` and `b`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `number`[] | The first vector. |
| `b` | `number`[] | The second vector. |

## Returns

`number`

The Chebyshev distance between the two vectors.

## Throws

An error if the vectors do not have the same length.

## Example

```ts
import { chebyshev } from '@danyalwe/tools'

chebyshev([0, 0], [3, 4])   // 4
chebyshev([1, 5], [3, 2])   // 3
```

## See

[https://en.wikipedia.org/wiki/Chebyshev\_distance](https://en.wikipedia.org/wiki/Chebyshev_distance)
