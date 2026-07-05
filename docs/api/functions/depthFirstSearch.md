[Overview](../index.md) / depthFirstSearch

# depthFirstSearch()

> **depthFirstSearch**\<`T`\>(`graph`): `NonNullable`\<`T`\>[]

Performs a depth-first search traversal on a graph.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `graph` | [`Graph`](../classes/Graph.md)\<`T`\> | The graph to traverse. |

## Returns

`NonNullable`\<`T`\>[]

An array of nodes in DFS order.

## Example

```ts
import { Graph, depthFirstSearch } from '@danyalwe/tools'

const graph = new Graph(1)
graph.addEdge(1, 2).addEdge(1, 3).addEdge(2, 4)

depthFirstSearch(graph) // [1, 3, 2, 4]
```
