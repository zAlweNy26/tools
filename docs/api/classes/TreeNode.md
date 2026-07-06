[Overview](../index.md) / TreeNode

# TreeNode\<T\>

Abstract base class for tree nodes.

## Extended by

- [`BSTNode`](BSTNode.md)
- [`TreeLeaf`](TreeLeaf.md)

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of data stored in the node. |

## Constructors

### Constructor

> **new TreeNode**\<`T`\>(`data`): `TreeNode`\<`T`\>

Creates a new tree node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to store in the node. |

#### Returns

`TreeNode`\<`T`\>

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="property-data"></a> `data` | `public` | `T` | The data to store in the node. |

## Accessors

### children

#### Get Signature

> **get** `abstract` **children**(): readonly (`TreeNode`\<`T`\> \| `null`)[]

Returns the children of this node.

##### Returns

readonly (`TreeNode`\<`T`\> \| `null`)[]

***

### height

#### Get Signature

> **get** **height**(): `number`

Returns the height of the subtree rooted at this node.

##### Returns

`number`
