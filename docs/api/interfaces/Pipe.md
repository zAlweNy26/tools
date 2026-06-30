[Overview](../index.md) / Pipe

# Pipe()\<A, B\>

Interface for a pipable function that allows chaining operations.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `A` | The input type. |
| `B` | The output type. |

> **Pipe**(`a`): `B`

Executes the pipeline with the given input and returns the final output.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The input value. |

## Returns

`B`

The output after all pipeline stages have been applied.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-pipe"></a> `pipe` | \<`C`\>(`fn2`) => `Pipe`\<`A`, `C`\> | Chains another function to the pipeline. The output of the current pipeline is passed as input to the next function. |
