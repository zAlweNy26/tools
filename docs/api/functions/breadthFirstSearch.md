[Overview](../index.md) / breadthFirstSearch

# breadthFirstSearch()

> **breadthFirstSearch**\<`T`\>(`graph`): `NonNullable`\<`T`\>[]

Performs a breadth-first search traversal on a graph.

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

An array of nodes in BFS order.

## Example

```ts
import { Graph, breadthFirstSearch } from '@danyalwe/tools'

const graph = new Graph(1)
graph.addEdge(1, 2).addEdge(1, 3).addEdge(2, 4)

breadthFirstSearch(graph) // [1, 2, 3, 4]
```
