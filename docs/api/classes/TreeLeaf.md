[Overview](../index.md) / TreeLeaf

# TreeLeaf\<T\>

Represents a leaf in a tree data structure.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of data stored in the leaf. |

## Constructors

### Constructor

> **new TreeLeaf**\<`T`\>(`data`, `leaves?`): `TreeLeaf`\<`T`\>

Creates a new TreeLeaf instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to store in the leaf. |
| `leaves?` | `TreeLeaf`\<`T`\>[] | Optional child leaves to add to the leaf. |

#### Returns

`TreeLeaf`\<`T`\>

## Properties

| Property | Modifier | Type | Default value | Description |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-data"></a> `data` | `public` | `T` | `undefined` | The data to store in the leaf. |
| <a id="property-leaves"></a> `leaves` | `public` | `TreeLeaf`\<`T`\>[] | `[]` | The child leaves of this leaf. |

## Accessors

### children

#### Get Signature

> **get** **children**(): `T`[]

Returns an array of the data stored in the child leaves of this leaf.

##### Returns

`T`[]

***

### height

#### Get Signature

> **get** **height**(): `number`

Returns the height of the tree rooted at this leaf.

##### Returns

`number`

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
