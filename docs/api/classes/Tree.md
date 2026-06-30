[Overview](../index.md) / Tree

# Tree\<T\>

Represents a tree data structure.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of data stored in the tree. |

## Constructors

### Constructor

> **new Tree**\<`T`\>(`data`): `Tree`\<`T`\>

Creates a new tree with the specified data as the root node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to be stored in the root node. |

#### Returns

`Tree`\<`T`\>

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-root"></a> `root` | [`TreeLeaf`](TreeLeaf.md)\<`T`\> | The root node of the tree. |

## Accessors

### depth

#### Get Signature

> **get** **depth**(): `number`

Gets the depth of the tree.

##### Returns

`number`

The depth of the tree.

## Methods

### search()

> **search**(`value`): [`TreeLeaf`](TreeLeaf.md)\<`T`\> \| `undefined`

Searches the tree for a node with the specified data and returns the node if found.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The data to search for. |

#### Returns

[`TreeLeaf`](TreeLeaf.md)\<`T`\> \| `undefined`

The node with the specified data, or undefined if not found.

***

### traverse()

> **traverse**(`order?`): `T`[]

Traverses the tree in the specified order and returns an array of the visited nodes' data.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `order` | `"post"` \| `"pre"` \| `"in"` \| `"height"` | `'pre'` | The order in which to traverse the tree. Defaults to "pre". |

#### Returns

`T`[]

An array of the visited nodes' data.
