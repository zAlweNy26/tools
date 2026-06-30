[Overview](../index.md) / Graph

# Graph\<N\>

A graph data structure.

## Extends

- [`GraphStructure`](GraphStructure.md)\<`N`, `N`\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `N` | The type of the nodes in the graph. |

## Constructors

### Constructor

> **new Graph**\<`N`\>(`node`): `Graph`\<`N`\>

Creates a new graph structure with the given node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The first node to add to the graph. |

#### Returns

`Graph`\<`N`\>

#### Inherited from

[`GraphStructure`](GraphStructure.md).[`constructor`](GraphStructure.md#constructor)

## Properties

| Property | Modifier | Type | Inherited from |
| ------ | ------ | ------ | ------ |
| <a id="property-map"></a> `map` | `protected` | `Map`\<`N`, `N`[]\> | [`GraphStructure`](GraphStructure.md).[`map`](GraphStructure.md#property-map) |

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

> **addEdge**(`v1`, `v2`): `Graph`\<`N`\>

Adds an edge between two nodes in the graph.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `v1` | `N` | The first node. |
| `v2` | `N` | The second node. |

#### Returns

`Graph`\<`N`\>

The graph instance.

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

#### Overrides

[`GraphStructure`](GraphStructure.md).[`getEdges`](GraphStructure.md#getedges)

***

### hasCycle()

> **hasCycle**(): `boolean`

Checks if the graph contains a cycle using depth-first search.

#### Returns

`boolean`

True if a cycle is detected, false otherwise.

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

#### Overrides

[`GraphStructure`](GraphStructure.md).[`isAdjacent`](GraphStructure.md#isadjacent)

***

### removeEdge()

> **removeEdge**(`v1`, `v2`): `Graph`\<`N`\>

Removes an edge between two nodes in the graph.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `v1` | `N` | The first node. |
| `v2` | `N` | The second node. |

#### Returns

`Graph`\<`N`\>

The graph instance.

#### Throws

An error if either node is not found or if the edge does not exist.

#### Overrides

[`GraphStructure`](GraphStructure.md).[`removeEdge`](GraphStructure.md#removeedge)

***

### removeNode()

> **removeNode**(`node`): `Graph`\<`N`\>

Removes a node from the graph and all edges connected to it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `N` | The node to remove. |

#### Returns

`Graph`\<`N`\>

The graph instance.

#### Throws

An error if the node is not found.

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
