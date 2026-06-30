[Overview](../index.md) / measureTime

# measureTime()

> **measureTime**\<`Args`, `Return`\>(`func`, ...`params`): `number`

Measures the time it takes for a function to execute.

## Type Parameters

| Type Parameter |
| ------ |
| `Args` *extends* `unknown`[] |
| `Return` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `func` | (...`params`) => `Return` | The function to measure the execution time of. |
| ...`params` | `Args` | The parameters to pass to the function. |

## Returns

`number`

The time it took for the function to execute, in milliseconds.
