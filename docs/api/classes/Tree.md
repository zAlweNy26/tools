[Overview](../index.md) / Tree

# Tree\<T\>

Represents a tree data structure.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of data stored in the tree. |

## Implements

- [`Structure`](../interfaces/Structure.md)

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

### height

#### Get Signature

> **get** **height**(): `number`

Gets the height of the tree.

##### Returns

`number`

The height of the tree.

## Methods

### clear()

> **clear**(): `Tree`\<`T`\>

Clears the structure.

#### Returns

`Tree`\<`T`\>

#### Implementation of

[`Structure`](../interfaces/Structure.md).[`clear`](../interfaces/Structure.md#property-clear)

***

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

### size()

> **size**(): `number`

The current number of elements in the structure.

#### Returns

`number`

#### Implementation of

[`Structure`](../interfaces/Structure.md).[`size`](../interfaces/Structure.md#property-size)

***

### traverse()

> **traverse**(`order?`): `T`[]

Traverses the tree in the specified order and returns an array of the visited nodes' data.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `order` | `"pre"` \| `"in"` \| `"post"` \| `"height"` | `'pre'` | The order in which to traverse the tree. Defaults to "pre". |

#### Returns

`T`[]

An array of the visited nodes' data.
