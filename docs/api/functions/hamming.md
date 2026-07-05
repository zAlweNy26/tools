[Overview](../index.md) / hamming

# hamming()

> **hamming**(`a`, `b`): `number`

Calculates the Hamming distance between `a` and `b`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `number`[] | The first vector. |
| `b` | `number`[] | The second vector. |

## Returns

`number`

The Hamming distance between the two vectors.

## Throws

An error if the vectors do not have the same length.

## Example

```ts
import { hamming } from '@danyalwe/tools'

hamming([1, 0, 1], [1, 1, 1])  // 0.333... (1 of 3 differs)
hamming([0, 0], [1, 1])        // 1 (all differ)
```

## See

[https://en.wikipedia.org/wiki/Hamming\_distance](https://en.wikipedia.org/wiki/Hamming_distance)
