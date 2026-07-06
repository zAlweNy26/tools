[Overview](../index.md) / BSTNode

# BSTNode\<T\>

A node in a binary search tree.

## Extends

- [`TreeNode`](TreeNode.md)\<`T`\>

## Extended by

- [`AVLNode`](AVLNode.md)

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

[`TreeNode`](TreeNode.md).[`constructor`](TreeNode.md#constructor)

## Properties

| Property | Modifier | Type | Default value | Description | Inherited from |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-data"></a> `data` | `public` | `T` | `undefined` | The data to store in the node. | [`TreeNode`](TreeNode.md).[`data`](TreeNode.md#property-data) |
| <a id="property-left"></a> `left` | `public` | `BSTNode`\<`T`\> \| `null` | `null` | The left child node. | - |
| <a id="property-right"></a> `right` | `public` | `BSTNode`\<`T`\> \| `null` | `null` | The right child node. | - |

## Accessors

### children

#### Get Signature

> **get** **children**(): ([`TreeNode`](TreeNode.md)\<`T`\> \| `null`)[]

Returns the children of this node as `[left, right]`.

##### Returns

([`TreeNode`](TreeNode.md)\<`T`\> \| `null`)[]

#### Overrides

[`TreeNode`](TreeNode.md).[`children`](TreeNode.md#children)

***

### height

#### Get Signature

> **get** **height**(): `number`

Returns the height of the subtree rooted at this node.

##### Returns

`number`

#### Inherited from

[`TreeNode`](TreeNode.md).[`height`](TreeNode.md#height)
