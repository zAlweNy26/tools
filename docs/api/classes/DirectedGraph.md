[Overview](../index.md) / DirectedGraph

# DirectedGraph\<N\>

A directed graph data structure. Edges go in one direction only.

## Example

```ts
import { DirectedGraph } from '@danyalwe/tools'

const graph = new DirectedGraph<string>('A')
graph.addEdge('A', 'B')
graph.isAdjacent('A', 'B')  // true
graph.isAdjacent('B', 'A')  // false
```

## Extends

- [`Graph`](Graph.md)\<`N`\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `N` | The type of the nodes in the graph. |

## Constructors

### Constructor

> **new DirectedGraph**\<`N`\>(`node`): `DirectedGraph`\<`N`\>

Creates a new directed graph with the given node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The first node to add to the graph. |

#### Returns

`DirectedGraph`\<`N`\>

#### Overrides

[`Graph`](Graph.md).[`constructor`](Graph.md#constructor)

## Accessors

### nodes

#### Get Signature

> **get** **nodes**(): `N`[]

Returns an array of nodes in the graph.

##### Returns

`N`[]

#### Inherited from

[`Graph`](Graph.md).[`nodes`](Graph.md#nodes)

## Methods

### addEdge()

> **addEdge**(`v1`, `v2`): `DirectedGraph`\<`N`\>

Adds an edge between two nodes in the graph.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `v1` | `N` | The first node. |
| `v2` | `N` | The second node. |

#### Returns

`DirectedGraph`\<`N`\>

The graph instance.

#### Throws

An error if the first node is not found or if the edge already exists.

#### Overrides

[`Graph`](Graph.md).[`addEdge`](Graph.md#addedge)

***

### addNode()

> **addNode**(`node`): `DirectedGraph`\<`N`\>

Adds a node to the graph.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The node to add. |

#### Returns

`DirectedGraph`\<`N`\>

The graph instance.

***

### clear()

> **clear**(): `void`

Clears the graph by removing all nodes and edges.

#### Returns

`void`

#### Inherited from

[`Graph`](Graph.md).[`clear`](Graph.md#clear)

***

### getEdges()

> **getEdges**(`node`): `N`[]

Returns an array of nodes adjacent to the given node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The node to get the adjacent nodes for. |

#### Returns

`N`[]

An array of adjacent nodes.

#### Throws

An error if the node is not found.

#### Inherited from

[`Graph`](Graph.md).[`getEdges`](Graph.md#getedges)

***

### hasCycle()

> **hasCycle**(): `boolean`

Checks if the graph contains a cycle using depth-first search.

#### Returns

`boolean`

True if a cycle is detected, false otherwise.

#### Overrides

[`Graph`](Graph.md).[`hasCycle`](Graph.md#hascycle)

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

[`Graph`](Graph.md).[`hasNode`](Graph.md#hasnode)

***

### isAdjacent()

> **isAdjacent**(`v1`, `v2`): `boolean`

Checks if two nodes are adjacent in the graph.

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

[`Graph`](Graph.md).[`isAdjacent`](Graph.md#isadjacent)

***

### removeEdge()

> **removeEdge**(`v1`, `v2`): `DirectedGraph`\<`N`\>

Removes an edge between two nodes in the graph.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `v1` | `N` | The first node. |
| `v2` | `N` | The second node. |

#### Returns

`DirectedGraph`\<`N`\>

The graph instance.

#### Throws

An error if either node is not found or if the edge does not exist.

#### Overrides

[`Graph`](Graph.md).[`removeEdge`](Graph.md#removeedge)

***

### removeNode()

> **removeNode**(`node`): `DirectedGraph`\<`N`\>

Removes a node from the graph and all edges connected to it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The node to remove. |

#### Returns

`DirectedGraph`\<`N`\>

The graph instance.

#### Throws

An error if the node is not found.

#### Inherited from

[`Graph`](Graph.md).[`removeNode`](Graph.md#removenode)

***

### size()

> **size**(): `number`

The current number of elements in the graph.

#### Returns

`number`

#### Inherited from

[`Graph`](Graph.md).[`size`](Graph.md#size)
