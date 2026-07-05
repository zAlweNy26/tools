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

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `T` |

#### Returns

`TreeNode`\<`T`\>

## Properties

| Property | Modifier | Type |
| ------ | ------ | ------ |
| <a id="property-data"></a> `data` | `public` | `T` |

## Accessors

### children

#### Get Signature

> **get** `abstract` **children**(): readonly (`TreeNode`\<`T`\> \| `null`)[]

##### Returns

readonly (`TreeNode`\<`T`\> \| `null`)[]

***

### height

#### Get Signature

> **get** **height**(): `number`

##### Returns

`number`
