[Overview](../index.md) / BinarySearchTree

# BinarySearchTree\<T\>

A binary search tree data structure.

## Example

```ts
import { BinarySearchTree } from '@danyalwe/tools'

const bst = new BinarySearchTree<number>()
bst.insert(5).insert(3).insert(7)
bst.contains(3)  // true
bst.traverse()   // [3, 5, 7]
```

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of elements held in the tree. |

## Implements

- [`Structure`](../interfaces/Structure.md)

## Constructors

### Constructor

> **new BinarySearchTree**\<`T`\>(`compare?`): `BinarySearchTree`\<`T`\>

Creates a new binary search tree.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `compare?` | (`a`, `b`) => `number` | A comparator function that returns a negative number if `a < b`, zero if `a === b`, and a positive number if `a > b`. Defaults to numeric comparison (`a - b`). |

#### Returns

`BinarySearchTree`\<`T`\>

### Constructor

> **new BinarySearchTree**\<`T`\>(`values?`): `BinarySearchTree`\<`T`\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `values?` | `Iterable`\<`T`, `any`, `any`\> |

#### Returns

`BinarySearchTree`\<`T`\>

### Constructor

> **new BinarySearchTree**\<`T`\>(`compare?`, `values?`): `BinarySearchTree`\<`T`\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `compare?` | (`a`, `b`) => `number` |
| `values?` | `Iterable`\<`T`, `any`, `any`\> |

#### Returns

`BinarySearchTree`\<`T`\>

## Accessors

### height

#### Get Signature

> **get** **height**(): `number`

##### Returns

`number`

***

### isEmpty

#### Get Signature

> **get** **isEmpty**(): `boolean`

Returns true if the tree is empty, false otherwise.

##### Returns

`boolean`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Generator`\<`T`, `void`, `unknown`\>

Returns an in-order iterator over the tree values.

#### Returns

`Generator`\<`T`, `void`, `unknown`\>

***

### clear()

> **clear**(): `BinarySearchTree`\<`T`\>

Clears the structure.

#### Returns

`BinarySearchTree`\<`T`\>

#### Implementation of

[`Structure`](../interfaces/Structure.md).[`clear`](../interfaces/Structure.md#property-clear)

***

### contains()

> **contains**(`value`): `boolean`

Checks if a value exists in the tree.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The value to check for. |

#### Returns

`boolean`

True if the value exists, false otherwise.

***

### delete()

> **delete**(`value`): `BinarySearchTree`\<`T`\>

Removes a value from the tree.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The value to remove. |

#### Returns

`BinarySearchTree`\<`T`\>

The tree instance.

#### Throws

An error if the value is not found.

***

### insert()

> **insert**(`value`): `BinarySearchTree`\<`T`\>

Inserts a value into the tree.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The value to insert. |

#### Returns

`BinarySearchTree`\<`T`\>

The tree instance.

***

### max()

> **max**(): `T` \| `undefined`

Returns the maximum value in the tree.

#### Returns

`T` \| `undefined`

The maximum value, or undefined if the tree is empty.

***

### min()

> **min**(): `T` \| `undefined`

Returns the minimum value in the tree.

#### Returns

`T` \| `undefined`

The minimum value, or undefined if the tree is empty.

***

### search()

> **search**(`value`): [`BSTNode`](BSTNode.md)\<`T`\> \| `undefined`

Searches for a value and returns the node containing it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The value to search for. |

#### Returns

[`BSTNode`](BSTNode.md)\<`T`\> \| `undefined`

The node containing the value, or undefined if not found.

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

Traverses the tree in the specified order.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `order` | `"pre"` \| `"in"` \| `"post"` \| `"height"` | `'in'` | The traversal order. Defaults to `'in'` (in-order). |

#### Returns

`T`[]

An array of values in the specified order.
