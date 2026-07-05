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

`TreeNode<T>.constructor`

## Properties

| Property | Modifier | Type | Inherited from |
| ------ | ------ | ------ | ------ |
| <a id="property-data"></a> `data` | `public` | `T` | `TreeNode.data` |

## Accessors

### children

#### Get Signature

> **get** **children**(): `TreeLeaf`\<`T`\>[]

##### Returns

`TreeLeaf`\<`T`\>[]

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
