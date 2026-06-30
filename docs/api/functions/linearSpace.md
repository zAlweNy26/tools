[Overview](../index.md) / linearSpace

# linearSpace()

> **linearSpace**(`start`, `end`, `num?`): `number`[]

Returns an array of linearly spaced numbers between `start` and `end`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `start` | `number` | The starting number of the sequence. |
| `end` | `number` | The ending number of the sequence. |
| `num?` | `number` | The number of samples to generate. Defaults to the maximum of 1 and `end - start` rounded. |

## Returns

`number`[]

An array of `num` linearly spaced numbers between `start` and `end`.
