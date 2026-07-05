[Overview](../index.md) / BaseLinkedList

# BaseLinkedList\<T\>

Abstract base class for linked list implementations.

## Extended by

- [`DoublyLinkedList`](DoublyLinkedList.md)
- [`LinkedList`](LinkedList.md)

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of elements held in the list. |

## Implements

- [`Structure`](../interfaces/Structure.md)

## Constructors

### Constructor

> **new BaseLinkedList**\<`T`\>(): `BaseLinkedList`\<`T`\>

#### Returns

`BaseLinkedList`\<`T`\>

## Properties

| Property | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| <a id="property-head"></a> `head` | [`ListNode`](ListNode.md)\<`T`\> \| `null` | `null` | The first node in the list, or null if the list is empty. |

## Accessors

### isEmpty

#### Get Signature

> **get** **isEmpty**(): `boolean`

Returns true if the list is empty, false otherwise.

##### Returns

`boolean`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`T`\>

Iterator for the list, enabling for...of iteration.

#### Returns

`Iterator`\<`T`\>

An iterator over the list's elements.

***

### append()

> `abstract` **append**(`data`): `this`

Adds an element to the end of the list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to append. |

#### Returns

`this`

The list instance.

***

### clear()

> **clear**(): `void`

Clears the list, removing all elements.

#### Returns

`void`

#### Implementation of

[`Structure`](../interfaces/Structure.md).[`clear`](../interfaces/Structure.md#property-clear)

***

### delete()

> `abstract` **delete**(`data`): `boolean`

Removes the first occurrence of the given data from the list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to remove. |

#### Returns

`boolean`

True if the element was found and removed, false otherwise.

***

### deleteAt()

> `abstract` **deleteAt**(`index`): `T` \| `undefined`

Removes and returns the element at the given index.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | The index of the element to remove. |

#### Returns

`T` \| `undefined`

The removed element, or undefined if the index is out of bounds.

***

### every()

> **every**(`predicate`): `boolean`

Returns true if all elements satisfy the predicate.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `predicate` | (`value`, `index`) => `boolean` | The function to test each element. |

#### Returns

`boolean`

True if all elements satisfy the predicate.

***

### find()

> **find**(`data`): [`ListNode`](ListNode.md)\<`T`\> \| `undefined`

Finds the first node containing the given data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to search for. |

#### Returns

[`ListNode`](ListNode.md)\<`T`\> \| `undefined`

The node containing the data, or undefined if not found.

***

### forEach()

> **forEach**(`callback`): `void`

Calls a function for each element in the list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`, `index`) => `void` | The function to call for each element. |

#### Returns

`void`

***

### getAt()

> **getAt**(`index`): `T` \| `undefined`

Returns the element at the given index.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | The index of the element to retrieve. |

#### Returns

`T` \| `undefined`

The element at the given index, or undefined if out of bounds.

***

### includes()

> **includes**(`data`): `boolean`

Returns true if the list includes the given data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to search for. |

#### Returns

`boolean`

True if the data is found, false otherwise.

***

### indexOf()

> **indexOf**(`data`): `number`

Returns the index of the first occurrence of the given data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to search for. |

#### Returns

`number`

The index of the data, or -1 if not found.

***

### insertAt()

> `abstract` **insertAt**(`index`, `data`): `this`

Inserts an element at the given index.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | The position at which to insert the element. |
| `data` | `T` | The data to insert. |

#### Returns

`this`

The list instance.

#### Throws

An error if the index is out of bounds.

***

### prepend()

> `abstract` **prepend**(`data`): `this`

Adds an element to the beginning of the list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to prepend. |

#### Returns

`this`

The list instance.

***

### reduce()

> **reduce**\<`U`\>(`callback`, `initialValue`): `U`

Reduces the list to a single value.

#### Type Parameters

| Type Parameter |
| ------ |
| `U` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`accumulator`, `value`, `index`) => `U` | The function to call for each element. |
| `initialValue` | `U` | The initial value for the accumulator. |

#### Returns

`U`

The reduced value.

***

### reverse()

> `abstract` **reverse**(): `this`

Reverses the list in place.

#### Returns

`this`

The list instance.

***

### size()

> **size**(): `number`

The current number of elements in the list.

#### Returns

`number`

#### Implementation of

[`Structure`](../interfaces/Structure.md).[`size`](../interfaces/Structure.md#property-size)

***

### some()

> **some**(`predicate`): `boolean`

Returns true if at least one element satisfies the predicate.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `predicate` | (`value`, `index`) => `boolean` | The function to test each element. |

#### Returns

`boolean`

True if any element satisfies the predicate.

***

### toArray()

> **toArray**(): `T`[]

Returns an array containing all the elements in the list.

#### Returns

`T`[]

An array of all elements in order.
