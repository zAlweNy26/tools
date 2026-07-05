[Overview](../index.md) / kruskal

# kruskal()

> **kruskal**\<`T`\>(`graph`): [`WeightedGraph`](../classes/WeightedGraph.md)\<`T`\>

Finds the minimum spanning tree of a weighted graph using Kruskal's algorithm.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `graph` | [`WeightedGraph`](../classes/WeightedGraph.md)\<`T`\> | The weighted graph to find the MST for. |

## Returns

[`WeightedGraph`](../classes/WeightedGraph.md)\<`T`\>

The minimum spanning tree.

## Example

```ts
import { WeightedGraph, kruskal } from '@danyalwe/tools'

const graph = new WeightedGraph('A')
graph.addEdge('A', 'B', 2).addEdge('A', 'C', 3)
graph.addEdge('B', 'C', 1).addEdge('B', 'D', 4)

const mst = kruskal(graph)
// MST edges: B-C (1), A-B (2), B-D (4)
```
