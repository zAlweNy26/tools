[Overview](../index.md) / WeightedDirectedGraph

# WeightedDirectedGraph\<N\>

A directed, weighted graph data structure. Edges go in one direction only with weights.

## Example

```ts
import { WeightedDirectedGraph } from '@danyalwe/tools'

const graph = new WeightedDirectedGraph<string>('A')
graph.addEdge('A', 'B', 5)
graph.getWeight('A', 'B')  // 5
graph.isAdjacent('B', 'A') // false
```

## Extends

- [`WeightedGraph`](WeightedGraph.md)\<`N`\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `N` | The type of the nodes in the graph. |

## Constructors

### Constructor

> **new WeightedDirectedGraph**\<`N`\>(`node`): `WeightedDirectedGraph`\<`N`\>

Creates a new weighted directed graph with the given node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The first node to add to the graph. |

#### Returns

`WeightedDirectedGraph`\<`N`\>

#### Overrides

[`WeightedGraph`](WeightedGraph.md).[`constructor`](WeightedGraph.md#constructor)

## Accessors

### nodes

#### Get Signature

> **get** **nodes**(): `N`[]

Returns an array of nodes in the graph.

##### Returns

`N`[]

#### Inherited from

[`WeightedGraph`](WeightedGraph.md).[`nodes`](WeightedGraph.md#nodes)

## Methods

### addEdge()

> **addEdge**(`v1`, `v2`, `weight?`): `WeightedDirectedGraph`\<`N`\>

Adds a weighted directed edge from `v1` to `v2`.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `v1` | `N` | `undefined` | The source node. |
| `v2` | `N` | `undefined` | The destination node. |
| `weight` | `number` | `0` | The edge weight (default 0). |

#### Returns

`WeightedDirectedGraph`\<`N`\>

The graph instance.

#### Throws

An error if the edge already exists or the source node is not found.

#### Overrides

[`WeightedGraph`](WeightedGraph.md).[`addEdge`](WeightedGraph.md#addedge)

***

### addNode()

> **addNode**(`node`): `WeightedDirectedGraph`\<`N`\>

Adds a node to the graph.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The node to add. |

#### Returns

`WeightedDirectedGraph`\<`N`\>

The graph instance.

***

### clear()

> **clear**(): `void`

Clears the graph by removing all nodes and edges.

#### Returns

`void`

#### Inherited from

[`WeightedGraph`](WeightedGraph.md).[`clear`](WeightedGraph.md#clear)

***

### getEdges()

> **getEdges**(`node`): \[`N`, `number`\][]

Returns an array of edges (as `[node, weight]` tuples) for the given node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The node to get the edges for. |

#### Returns

\[`N`, `number`\][]

An array of edges, each represented as a `[node, weight]` tuple.

#### Throws

An error if the node is not found.

#### Inherited from

[`WeightedGraph`](WeightedGraph.md).[`getEdges`](WeightedGraph.md#getedges)

***

### getWeight()

> **getWeight**(`v1`, `v2`, ...`vn`): `number`

Returns the weight of the edge between the first node and the second node,
and optionally additional nodes if provided.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `v1` | `N` | The first node. |
| `v2` | `N` | The second node. |
| ...`vn` | `N`[] | Additional nodes (optional). |

#### Returns

`number`

The weight of the edge between the nodes.

#### Throws

Error if the first or second node is not found.

#### Inherited from

[`WeightedGraph`](WeightedGraph.md).[`getWeight`](WeightedGraph.md#getweight)

***

### hasCycle()

> **hasCycle**(): `boolean`

Checks if the weighted directed graph contains a cycle using DFS.

#### Returns

`boolean`

`true` if a cycle is detected, `false` otherwise.

#### Overrides

[`WeightedGraph`](WeightedGraph.md).[`hasCycle`](WeightedGraph.md#hascycle)

***

### hasNode()

> **hasNode**(`node`): `boolean`

Returns true if the graph contains the given node, false otherwise.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The node to check for. |

#### Returns

`boolean`

#### Inherited from

[`WeightedGraph`](WeightedGraph.md).[`hasNode`](WeightedGraph.md#hasnode)

***

### isAdjacent()

> **isAdjacent**(`v1`, `v2`): `boolean`

Checks if two nodes are adjacent in the weighted graph.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `v1` | `N` | The first node. |
| `v2` | `N` | The second node. |

#### Returns

`boolean`

True if the nodes are adjacent, false otherwise.

#### Throws

An error if the first node is not found.

#### Inherited from

[`WeightedGraph`](WeightedGraph.md).[`isAdjacent`](WeightedGraph.md#isadjacent)

***

### removeEdge()

> **removeEdge**(`v1`, `v2`): `WeightedDirectedGraph`\<`N`\>

Removes a weighted directed edge from `v1` to `v2`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `v1` | `N` | The source node. |
| `v2` | `N` | The destination node. |

#### Returns

`WeightedDirectedGraph`\<`N`\>

The graph instance.

#### Throws

An error if the edge or the source node is not found.

#### Overrides

[`WeightedGraph`](WeightedGraph.md).[`removeEdge`](WeightedGraph.md#removeedge)

***

### removeNode()

> **removeNode**(`node`): `WeightedDirectedGraph`\<`N`\>

Removes a node from the weighted graph and all edges connected to it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The node to remove. |

#### Returns

`WeightedDirectedGraph`\<`N`\>

The weighted graph instance.

#### Throws

An error if the node is not found.

#### Inherited from

[`WeightedGraph`](WeightedGraph.md).[`removeNode`](WeightedGraph.md#removenode)

***

### size()

> **size**(): `number`

The current number of elements in the graph.

#### Returns

`number`

#### Inherited from

[`WeightedGraph`](WeightedGraph.md).[`size`](WeightedGraph.md#size)
