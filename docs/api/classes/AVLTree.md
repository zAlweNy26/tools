[Overview](../index.md) / AVLTree

# AVLTree\<T\>

A self-balancing AVL tree data structure.

## Example

```ts
import { AVLTree } from '@danyalwe/tools'

const tree = new AVLTree<number>()
tree.insert(3).insert(1).insert(2)
tree.traverse() // [1, 2, 3]
```

## Extends

- [`BinarySearchTree`](BinarySearchTree.md)\<`T`\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of elements held in the tree. |

## Constructors

### Constructor

> **new AVLTree**\<`T`\>(`compare?`): `AVLTree`\<`T`\>

Creates a new binary search tree.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `compare?` | (`a`, `b`) => `number` | A comparator function that returns a negative number if `a < b`, zero if `a === b`, and a positive number if `a > b`. Defaults to numeric comparison (`a - b`). |

#### Returns

`AVLTree`\<`T`\>

#### Inherited from

[`BinarySearchTree`](BinarySearchTree.md).[`constructor`](BinarySearchTree.md#constructor)

### Constructor

> **new AVLTree**\<`T`\>(`values?`): `AVLTree`\<`T`\>

Creates a new binary search tree with initial values.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `values?` | `Iterable`\<`T`, `any`, `any`\> | Optional iterable of values to insert into the tree. |

#### Returns

`AVLTree`\<`T`\>

#### Inherited from

[`BinarySearchTree`](BinarySearchTree.md).[`constructor`](BinarySearchTree.md#constructor)

### Constructor

> **new AVLTree**\<`T`\>(`compare`, `values`): `AVLTree`\<`T`\>

Creates a new binary search tree with a comparator and initial values.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `compare` | (`a`, `b`) => `number` | A comparator function. |
| `values` | `Iterable`\<`T`\> | Optional iterable of values to insert into the tree. |

#### Returns

`AVLTree`\<`T`\>

#### Inherited from

[`BinarySearchTree`](BinarySearchTree.md).[`constructor`](BinarySearchTree.md#constructor)

## Properties

| Property | Type | Overrides |
| ------ | ------ | ------ |
| <a id="property-_root"></a> `_root` | [`AVLNode`](AVLNode.md)\<`T`\> \| `null` | `BinarySearchTree._root` |

## Accessors

### height

#### Get Signature

> **get** **height**(): `number`

Returns the height of the tree, or -1 if empty.

##### Returns

`number`

#### Inherited from

[`BinarySearchTree`](BinarySearchTree.md).[`height`](BinarySearchTree.md#height)

***

### isEmpty

#### Get Signature

> **get** **isEmpty**(): `boolean`

Returns true if the tree is empty, false otherwise.

##### Returns

`boolean`

#### Inherited from

[`BinarySearchTree`](BinarySearchTree.md).[`isEmpty`](BinarySearchTree.md#isempty)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Generator`\<`T`, `void`, `unknown`\>

Returns an in-order iterator over the tree values.

#### Returns

`Generator`\<`T`, `void`, `unknown`\>

#### Inherited from

[`BinarySearchTree`](BinarySearchTree.md).[`[iterator]`](BinarySearchTree.md#iterator)

***

### clear()

> **clear**(): `AVLTree`\<`T`\>

Removes all elements from the tree.

#### Returns

`AVLTree`\<`T`\>

The tree instance.

#### Inherited from

[`BinarySearchTree`](BinarySearchTree.md).[`clear`](BinarySearchTree.md#clear)

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

#### Inherited from

[`BinarySearchTree`](BinarySearchTree.md).[`contains`](BinarySearchTree.md#contains)

***

### delete()

> **delete**(`value`): `AVLTree`\<`T`\>

Removes a value from the AVL tree and rebalances it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The value to remove. |

#### Returns

`AVLTree`\<`T`\>

The tree instance.

#### Throws

An error if the value is not found.

#### Overrides

[`BinarySearchTree`](BinarySearchTree.md).[`delete`](BinarySearchTree.md#delete)

***

### insert()

> **insert**(`value`): `AVLTree`\<`T`\>

Inserts a value into the AVL tree and rebalances it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The value to insert. |

#### Returns

`AVLTree`\<`T`\>

The tree instance.

#### Overrides

[`BinarySearchTree`](BinarySearchTree.md).[`insert`](BinarySearchTree.md#insert)

***

### isBalanced()

> **isBalanced**(): `boolean`

Returns true if the AVL tree satisfies the balance invariant:
every node has a balance factor in the range [-1, 0, 1].

#### Returns

`boolean`

***

### max()

> **max**(): `T` \| `undefined`

Returns the maximum value in the tree.

#### Returns

`T` \| `undefined`

The maximum value, or undefined if the tree is empty.

#### Inherited from

[`BinarySearchTree`](BinarySearchTree.md).[`max`](BinarySearchTree.md#max)

***

### min()

> **min**(): `T` \| `undefined`

Returns the minimum value in the tree.

#### Returns

`T` \| `undefined`

The minimum value, or undefined if the tree is empty.

#### Inherited from

[`BinarySearchTree`](BinarySearchTree.md).[`min`](BinarySearchTree.md#min)

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

#### Inherited from

[`BinarySearchTree`](BinarySearchTree.md).[`search`](BinarySearchTree.md#search)

***

### size()

> **size**(): `number`

Returns the number of elements in the tree.

#### Returns

`number`

#### Inherited from

[`BinarySearchTree`](BinarySearchTree.md).[`size`](BinarySearchTree.md#size)

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

#### Inherited from

[`BinarySearchTree`](BinarySearchTree.md).[`traverse`](BinarySearchTree.md#traverse)
