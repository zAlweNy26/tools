[Overview](../index.md) / pearson

# pearson()

> **pearson**(`a`, `b`): `number`

Calculates the Pearson correlation distance between `a` and `b`.
Defined as `1 - r`, where `r` is the Pearson correlation coefficient.
The result is bounded in [0, 2]; 0 means perfect positive correlation, 2 means perfect negative correlation.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `number`[] | The first vector. |
| `b` | `number`[] | The second vector. |

## Returns

`number`

The Pearson correlation distance between the two vectors.

## Throws

An error if the vectors do not have the same length.

## See

[https://en.wikipedia.org/wiki/Pearson\_correlation\_coefficient](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient)
