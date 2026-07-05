[Overview](../index.md) / BSTNode

# BSTNode\<T\>

A node in a binary search tree.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of data stored in the node. |

## Constructors

### Constructor

> **new BSTNode**\<`T`\>(`data`, `left?`, `right?`): `BSTNode`\<`T`\>

Creates a new BST node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to store in the node. |
| `left?` | `BSTNode`\<`T`\> \| `null` | Optional left child node. |
| `right?` | `BSTNode`\<`T`\> \| `null` | Optional right child node. |

#### Returns

`BSTNode`\<`T`\>

#### Overrides

`TreeNode<T>.constructor`

## Properties

| Property | Modifier | Type | Default value | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-data"></a> `data` | `public` | `T` | `undefined` | `TreeNode.data` |
| <a id="property-left"></a> `left` | `public` | `BSTNode`\<`T`\> \| `null` | `null` | - |
| <a id="property-right"></a> `right` | `public` | `BSTNode`\<`T`\> \| `null` | `null` | - |

## Accessors

### children

#### Get Signature

> **get** **children**(): (`TreeNode`\<`T`\> \| `null`)[]

##### Returns

(`TreeNode`\<`T`\> \| `null`)[]

#### Overrides

`TreeNode.children`

***

### height

#### Get Signature

> **get** **height**(): `number`

##### Returns

`number`

#### Inherited from

`TreeNode.height`
