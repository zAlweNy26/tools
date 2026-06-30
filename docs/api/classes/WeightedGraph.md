[Overview](../index.md) / WeightedGraph

# WeightedGraph\<N\>

A weighted graph data structure.

## Extends

- [`GraphStructure`](GraphStructure.md)\<`N`, [`Edge`](../type-aliases/Edge.md)\<`N`\>\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `N` | The type of the nodes in the graph. |

## Constructors

### Constructor

> **new WeightedGraph**\<`N`\>(`node`): `WeightedGraph`\<`N`\>

Creates a new graph structure with the given node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The first node to add to the graph. |

#### Returns

`WeightedGraph`\<`N`\>

#### Inherited from

[`GraphStructure`](GraphStructure.md).[`constructor`](GraphStructure.md#constructor)

## Properties

| Property | Modifier | Type | Inherited from |
| ------ | ------ | ------ | ------ |
| <a id="property-map"></a> `map` | `protected` | `Map`\<`N`, [`Edge`](../type-aliases/Edge.md)\<`N`\>[]\> | [`GraphStructure`](GraphStructure.md).[`map`](GraphStructure.md#property-map) |

## Accessors

### nodes

#### Get Signature

> **get** **nodes**(): `N`[]

Returns an array of nodes in the graph.

##### Returns

`N`[]

#### Inherited from

[`GraphStructure`](GraphStructure.md).[`nodes`](GraphStructure.md#nodes)

## Methods

### addEdge()

> **addEdge**(`v1`, `v2`, `weight?`): `WeightedGraph`\<`N`\>

Adds an edge between two nodes with an optional weight.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `v1` | `N` | `undefined` | The first node. |
| `v2` | `N` | `undefined` | The second node. |
| `weight` | `number` | `0` | The weight of the edge (default is 0). |

#### Returns

`WeightedGraph`\<`N`\>

The updated weighted graph.

#### Throws

An error if the first node is not found or if the edge already exists.

#### Overrides

[`GraphStructure`](GraphStructure.md).[`addEdge`](GraphStructure.md#addedge)

***

### clear()

> **clear**(): `void`

Clears the graph by removing all nodes and edges.

#### Returns

`void`

#### Inherited from

[`GraphStructure`](GraphStructure.md).[`clear`](GraphStructure.md#clear)

***

### getEdges()

> **getEdges**(`node`): [`Edge`](../type-aliases/Edge.md)\<`N`\>[]

Returns an array of nodes adjacent to the given node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The node to get the adjacent nodes for. |

#### Returns

[`Edge`](../type-aliases/Edge.md)\<`N`\>[]

An array of adjacent nodes.

#### Overrides

[`GraphStructure`](GraphStructure.md).[`getEdges`](GraphStructure.md#getedges)

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

***

### hasCycle()

> **hasCycle**(): `boolean`

Checks if the graph contains a cycle.

#### Returns

`boolean`

#### Overrides

[`GraphStructure`](GraphStructure.md).[`hasCycle`](GraphStructure.md#hascycle)

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

[`GraphStructure`](GraphStructure.md).[`hasNode`](GraphStructure.md#hasnode)

***

### isAdjacent()

> **isAdjacent**(`v1`, `v2`): `boolean`

Returns a boolean indicating if two nodes are adjacent in the graph.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `v1` | `N` | The first node. |
| `v2` | `N` | The second node. |

#### Returns

`boolean`

True if the nodes are adjacent, false otherwise.

#### Overrides

[`GraphStructure`](GraphStructure.md).[`isAdjacent`](GraphStructure.md#isadjacent)

***

### removeEdge()

> **removeEdge**(`v1`, `v2`): `WeightedGraph`\<`N`\>

Removes an edge between two nodes in the graph.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `v1` | `N` | The first node. |
| `v2` | `N` | The second node. |

#### Returns

`WeightedGraph`\<`N`\>

The graph structure instance.

#### Overrides

[`GraphStructure`](GraphStructure.md).[`removeEdge`](GraphStructure.md#removeedge)

***

### removeNode()

> **removeNode**(`node`): `WeightedGraph`\<`N`\>

Removes a node from the graph.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The node to remove. |

#### Returns

`WeightedGraph`\<`N`\>

The graph structure instance.

#### Overrides

[`GraphStructure`](GraphStructure.md).[`removeNode`](GraphStructure.md#removenode)

***

### size()

> **size**(): `number`

The current number of elements in the graph.

#### Returns

`number`

#### Inherited from

[`GraphStructure`](GraphStructure.md).[`size`](GraphStructure.md#size)
