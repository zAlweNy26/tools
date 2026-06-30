[Overview](../index.md) / LinkedList

# LinkedList\<T\>

A singly linked list data structure.

## Extends

- [`BaseLinkedList`](BaseLinkedList.md)\<`T`\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of elements held in the list. |

## Constructors

### Constructor

> **new LinkedList**\<`T`\>(`items?`): `LinkedList`\<`T`\>

Creates a new linked list, optionally initialised with elements from an iterable.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `items?` | `Iterable`\<`T`, `any`, `any`\> | An iterable of elements to initialise the list with. |

#### Returns

`LinkedList`\<`T`\>

#### Overrides

[`BaseLinkedList`](BaseLinkedList.md).[`constructor`](BaseLinkedList.md#constructor)

## Properties

| Property | Type | Default value | Description | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-head"></a> `head` | [`ListNode`](ListNode.md)\<`T`\> \| `null` | `null` | The first node in the list, or null if the list is empty. | [`BaseLinkedList`](BaseLinkedList.md).[`head`](BaseLinkedList.md#property-head) |

## Accessors

### isEmpty

#### Get Signature

> **get** **isEmpty**(): `boolean`

Returns true if the list is empty, false otherwise.

##### Returns

`boolean`

#### Inherited from

[`BaseLinkedList`](BaseLinkedList.md).[`isEmpty`](BaseLinkedList.md#isempty)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`T`\>

Iterator for the list, enabling for...of iteration.

#### Returns

`Iterator`\<`T`\>

An iterator over the list's elements.

#### Inherited from

[`BaseLinkedList`](BaseLinkedList.md).[`[iterator]`](BaseLinkedList.md#iterator)

***

### append()

> **append**(`data`): `this`

Adds an element to the end of the list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to append. |

#### Returns

`this`

The list instance.

#### Overrides

[`BaseLinkedList`](BaseLinkedList.md).[`append`](BaseLinkedList.md#append)

***

### clear()

> **clear**(): `void`

Clears the list, removing all elements.

#### Returns

`void`

#### Inherited from

[`BaseLinkedList`](BaseLinkedList.md).[`clear`](BaseLinkedList.md#clear)

***

### delete()

> **delete**(`data`): `boolean`

Removes the first occurrence of the given data from the list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to remove. |

#### Returns

`boolean`

True if the element was found and removed, false otherwise.

#### Overrides

[`BaseLinkedList`](BaseLinkedList.md).[`delete`](BaseLinkedList.md#delete)

***

### deleteAt()

> **deleteAt**(`index`): `T` \| `undefined`

Removes and returns the element at the given index.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | The index of the element to remove. |

#### Returns

`T` \| `undefined`

The removed element, or undefined if the index is out of bounds.

#### Overrides

[`BaseLinkedList`](BaseLinkedList.md).[`deleteAt`](BaseLinkedList.md#deleteat)

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

#### Inherited from

[`BaseLinkedList`](BaseLinkedList.md).[`every`](BaseLinkedList.md#every)

***

### filter()

> **filter**(`predicate`): `LinkedList`\<`T`\>

Returns a new linked list with elements that pass the given predicate.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `predicate` | (`value`, `index`) => `boolean` | The function to test each element. |

#### Returns

`LinkedList`\<`T`\>

A new linked list with the filtered elements.

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

#### Inherited from

[`BaseLinkedList`](BaseLinkedList.md).[`find`](BaseLinkedList.md#find)

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

#### Inherited from

[`BaseLinkedList`](BaseLinkedList.md).[`forEach`](BaseLinkedList.md#foreach)

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

#### Inherited from

[`BaseLinkedList`](BaseLinkedList.md).[`getAt`](BaseLinkedList.md#getat)

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

#### Inherited from

[`BaseLinkedList`](BaseLinkedList.md).[`includes`](BaseLinkedList.md#includes)

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

#### Inherited from

[`BaseLinkedList`](BaseLinkedList.md).[`indexOf`](BaseLinkedList.md#indexof)

***

### insertAt()

> **insertAt**(`index`, `data`): `this`

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

#### Overrides

[`BaseLinkedList`](BaseLinkedList.md).[`insertAt`](BaseLinkedList.md#insertat)

***

### map()

> **map**\<`U`\>(`callback`): `LinkedList`\<`U`\>

Returns a new linked list with the results of calling a function on each element.

#### Type Parameters

| Type Parameter |
| ------ |
| `U` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`, `index`) => `U` | The function to apply to each element. |

#### Returns

`LinkedList`\<`U`\>

A new linked list with the mapped values.

***

### prepend()

> **prepend**(`data`): `this`

Adds an element to the beginning of the list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to prepend. |

#### Returns

`this`

The list instance.

#### Overrides

[`BaseLinkedList`](BaseLinkedList.md).[`prepend`](BaseLinkedList.md#prepend)

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

#### Inherited from

[`BaseLinkedList`](BaseLinkedList.md).[`reduce`](BaseLinkedList.md#reduce)

***

### reverse()

> **reverse**(): `this`

Reverses the list in place.

#### Returns

`this`

The list instance.

#### Overrides

[`BaseLinkedList`](BaseLinkedList.md).[`reverse`](BaseLinkedList.md#reverse)

***

### size()

> **size**(): `number`

The current number of elements in the list.

#### Returns

`number`

#### Inherited from

[`BaseLinkedList`](BaseLinkedList.md).[`size`](BaseLinkedList.md#size)

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

#### Inherited from

[`BaseLinkedList`](BaseLinkedList.md).[`some`](BaseLinkedList.md#some)

***

### toArray()

> **toArray**(): `T`[]

Returns an array containing all the elements in the list.

#### Returns

`T`[]

An array of all elements in order.

#### Inherited from

[`BaseLinkedList`](BaseLinkedList.md).[`toArray`](BaseLinkedList.md#toarray)
