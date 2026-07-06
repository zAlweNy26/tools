[Overview](../index.md) / AVLNode

# AVLNode\<T\>

A node in an AVL tree.

## Extends

- [`BSTNode`](BSTNode.md)\<`T`\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of data stored in the node. |

## Constructors

### Constructor

> **new AVLNode**\<`T`\>(`data`, `left?`, `right?`): `AVLNode`\<`T`\>

Creates a new AVL node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to store in the node. |
| `left?` | `AVLNode`\<`T`\> \| `null` | Optional left child node. |
| `right?` | `AVLNode`\<`T`\> \| `null` | Optional right child node. |

#### Returns

`AVLNode`\<`T`\>

#### Overrides

[`BSTNode`](BSTNode.md).[`constructor`](BSTNode.md#constructor)

## Properties

| Property | Modifier | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-data"></a> `data` | `public` | `T` | The data to store in the node. | - | [`BSTNode`](BSTNode.md).[`data`](BSTNode.md#property-data) |
| <a id="property-left"></a> `left` | `public` | `AVLNode`\<`T`\> \| `null` | The left child node. | [`BSTNode`](BSTNode.md).[`left`](BSTNode.md#property-left) | - |
| <a id="property-right"></a> `right` | `public` | `AVLNode`\<`T`\> \| `null` | The right child node. | [`BSTNode`](BSTNode.md).[`right`](BSTNode.md#property-right) | - |

## Accessors

### children

#### Get Signature

> **get** **children**(): ([`TreeNode`](TreeNode.md)\<`T`\> \| `null`)[]

Returns the children of this node as `[left, right]`.

##### Returns

([`TreeNode`](TreeNode.md)\<`T`\> \| `null`)[]

#### Inherited from

[`BSTNode`](BSTNode.md).[`children`](BSTNode.md#children)

***

### height

#### Get Signature

> **get** **height**(): `number`

Returns the height of the subtree rooted at this node.

##### Returns

`number`

#### Set Signature

> **set** **height**(`value`): `void`

Sets the height of the subtree rooted at this node.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

##### Returns

`void`

#### Overrides

[`BSTNode`](BSTNode.md).[`height`](BSTNode.md#height)
