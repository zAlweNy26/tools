[Overview](../index.md) / GraphStructure

# GraphStructure\<N, E\>

Abstract class representing a graph structure.

## Extended by

- [`Graph`](Graph.md)
- [`WeightedGraph`](WeightedGraph.md)

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `N` | The type of the nodes in the graph. |
| `E` | The type of the values associated with the nodes. |

## Implements

- [`Structure`](../interfaces/Structure.md)

## Constructors

### Constructor

> **new GraphStructure**\<`N`, `E`\>(`node`): `GraphStructure`\<`N`, `E`\>

Creates a new graph structure with the given node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The first node to add to the graph. |

#### Returns

`GraphStructure`\<`N`, `E`\>

## Accessors

### nodes

#### Get Signature

> **get** **nodes**(): `N`[]

Returns an array of nodes in the graph.

##### Returns

`N`[]

## Methods

### addEdge()

> `abstract` **addEdge**(`v1`, `v2`): `this`

Adds an edge between two nodes in the graph.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `v1` | `N` | The first node. |
| `v2` | `N` | The second node. |

#### Returns

`this`

The graph structure instance.

***

### clear()

> **clear**(): `void`

Clears the graph by removing all nodes and edges.

#### Returns

`void`

#### Implementation of

[`Structure`](../interfaces/Structure.md).[`clear`](../interfaces/Structure.md#property-clear)

***

### getEdges()

> `abstract` **getEdges**(`node`): `E`[]

Returns an array of nodes adjacent to the given node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The node to get the adjacent nodes for. |

#### Returns

`E`[]

An array of adjacent nodes.

***

### hasCycle()

> `abstract` **hasCycle**(): `boolean`

Checks if the graph contains a cycle.

#### Returns

`boolean`

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

***

### isAdjacent()

> `abstract` **isAdjacent**(`v1`, `v2`): `boolean`

Returns a boolean indicating if two nodes are adjacent in the graph.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `v1` | `N` | The first node. |
| `v2` | `N` | The second node. |

#### Returns

`boolean`

True if the nodes are adjacent, false otherwise.

***

### removeEdge()

> `abstract` **removeEdge**(`v1`, `v2`): `this`

Removes an edge between two nodes in the graph.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `v1` | `N` | The first node. |
| `v2` | `N` | The second node. |

#### Returns

`this`

The graph structure instance.

***

### removeNode()

> `abstract` **removeNode**(`node`): `this`

Removes a node from the graph.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The node to remove. |

#### Returns

`this`

The graph structure instance.

***

### size()

> **size**(): `number`

The current number of elements in the graph.

#### Returns

`number`

#### Implementation of

[`Structure`](../interfaces/Structure.md).[`size`](../interfaces/Structure.md#property-size)
