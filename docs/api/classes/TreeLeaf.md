[Overview](../index.md) / TreeLeaf

# TreeLeaf\<T\>

Represents a leaf in a tree data structure.

## Example

```ts
import { TreeLeaf } from '@danyalwe/tools'

const root = new TreeLeaf('root')
const child = root.push('child')
child.push('grandchild')
root.height  // 2
```

## Extends

- [`TreeNode`](TreeNode.md)\<`T`\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of data stored in the leaf. |

## Constructors

### Constructor

> **new TreeLeaf**\<`T`\>(`data`, `children?`): `TreeLeaf`\<`T`\>

Creates a new TreeLeaf instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to store in the leaf. |
| `children?` | `TreeLeaf`\<`T`\>[] | Optional child leaves. |

#### Returns

`TreeLeaf`\<`T`\>

#### Overrides

[`TreeNode`](TreeNode.md).[`constructor`](TreeNode.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-data"></a> `data` | `public` | `T` | The data to store in the node. | [`TreeNode`](TreeNode.md).[`data`](TreeNode.md#property-data) |

## Accessors

### children

#### Get Signature

> **get** **children**(): `TreeLeaf`\<`T`\>[]

Returns the children of this leaf.

##### Returns

`TreeLeaf`\<`T`\>[]

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

## Methods

### push()

> **push**(`data`, ...`datas`): `TreeLeaf`\<`T`\>

Adds one or more child leaves to this leaf.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to store in the new leaves. |
| ...`datas` | `T`[] | Additional data to store in new leaves. |

#### Returns

`TreeLeaf`\<`T`\>

The last leaf that was added.
