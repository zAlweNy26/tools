[Overview](../index.md) / euclideanWeighted

# euclideanWeighted()

> **euclideanWeighted**(`weights`): (`a`, `b`) => `number`

Returns a function that calculates the weighted Euclidean distance between `a` and `b`
using the given per-dimension weight vector.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `weights` | `number`[] | The weight vector. Each weight `w_i` is applied to the squared difference `(a_i - b_i)^2`. |

## Returns

A distance function `(a: number[], b: number[]) => number`.

(`a`, `b`) => `number`

## See

[https://en.wikipedia.org/wiki/Euclidean\_distance#Weighted\_Euclidean\_distance](https://en.wikipedia.org/wiki/Euclidean_distance#Weighted_Euclidean_distance)
