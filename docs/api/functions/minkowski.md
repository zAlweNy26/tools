[Overview](../index.md) / minkowski

# minkowski()

> **minkowski**(`p`): (`a`, `b`) => `number`

Returns a function that calculates the Minkowski distance between `a` and `b` using order `p`.
When `p = 1` it is equivalent to Manhattan distance, `p = 2` to Euclidean distance,
and `p → ∞` to Chebyshev distance.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `p` | `number` | The order of the Minkowski distance. Must be ≥ 1. |

## Returns

A distance function `(a: number[], b: number[]) => number`.

(`a`, `b`) => `number`

## Throws

An error if `p < 1`.

## See

[https://en.wikipedia.org/wiki/Minkowski\_distance](https://en.wikipedia.org/wiki/Minkowski_distance)
