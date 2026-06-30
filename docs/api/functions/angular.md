[Overview](../index.md) / angular

# angular()

> **angular**(`a`, `b`): `number`

Calculates the angular distance between `a` and `b`.
Defined as `acos(cosine_similarity) / π`, bounded in [0, 1].

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `number`[] | The first vector. |
| `b` | `number`[] | The second vector. |

## Returns

`number`

The angular distance between the two vectors.

## Throws

An error if the vectors do not have the same length.

## See

[https://en.wikipedia.org/wiki/Cosine\_similarity#Angular\_distance\_and\_similarity](https://en.wikipedia.org/wiki/Cosine_similarity#Angular_distance_and_similarity)
