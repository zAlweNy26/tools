[Overview](../index.md) / pipe

# pipe()

> **pipe**\<`A`, `B`\>(`fn`): [`Pipe`](../interfaces/Pipe.md)\<`A`, `B`\>

Creates a pipeline of functions where the output of one function is passed as the input to the next.

## Type Parameters

| Type Parameter |
| ------ |
| `A` |
| `B` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | (`a`) => `B` | The initial function to start the pipeline. |

## Returns

[`Pipe`](../interfaces/Pipe.md)\<`A`, `B`\>

## Example

```ts
const addOne = (x: number) => x + 1;
const double = (x: number) => x * 2;

const pipeline = pipe(addOne).pipe(double);

console.log(pipeline.run(3)); // Outputs: 8
```
