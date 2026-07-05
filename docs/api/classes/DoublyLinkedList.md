[Overview](../index.md) / DoublyLinkedList

# DoublyLinkedList\<T\>

A doubly linked list data structure.

## Example

```ts
import { DoublyLinkedList } from '@danyalwe/tools'

const list = new DoublyLinkedList<number>([1, 2, 3])
list.append(4)
list.deleteLast()    // 4
list.toArrayReverse() // [3, 2, 1]
```

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of elements held in the list. |

## Constructors

### Constructor

> **new DoublyLinkedList**\<`T`\>(`items?`): `DoublyLinkedList`\<`T`\>

Creates a new doubly linked list, optionally initialised with elements from an iterable.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `items?` | `Iterable`\<`T`, `any`, `any`\> | An iterable of elements to initialise the list with. |

#### Returns

`DoublyLinkedList`\<`T`\>

#### Overrides

`BaseLinkedList<T>.constructor`

## Properties

| Property | Type | Default value | Description | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-head"></a> `head` | `ListNode`\<`T`\> \| `null` | `null` | The first node in the list, or null if the list is empty. | `BaseLinkedList.head` |

## Accessors

### isEmpty

#### Get Signature

> **get** **isEmpty**(): `boolean`

Returns true if the list is empty, false otherwise.

##### Returns

`boolean`

#### Inherited from

`BaseLinkedList.isEmpty`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`T`\>

Iterator for the list, enabling for...of iteration.

#### Returns

`Iterator`\<`T`\>

An iterator over the list's elements.

#### Inherited from

`BaseLinkedList.[iterator]`

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

`BaseLinkedList.append`

***

### backward()

> **backward**(): `Iterator`\<`T`\>

Returns an iterator that traverses the list from tail to head.

#### Returns

`Iterator`\<`T`\>

An iterator over the list's elements in reverse order.

***

### clear()

> **clear**(): `void`

Clears the list, removing all elements.

#### Returns

`void`

#### Inherited from

`BaseLinkedList.clear`

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

`BaseLinkedList.delete`

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

`BaseLinkedList.deleteAt`

***

### deleteLast()

> **deleteLast**(): `T` \| `undefined`

Removes and returns the last element in the list.

#### Returns

`T` \| `undefined`

The removed element, or undefined if the list is empty.

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

`BaseLinkedList.every`

***

### filter()

> **filter**(`predicate`): `DoublyLinkedList`\<`T`\>

Returns a new doubly linked list with elements that pass the given predicate.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `predicate` | (`value`, `index`) => `boolean` | The function to test each element. |

#### Returns

`DoublyLinkedList`\<`T`\>

A new doubly linked list with the filtered elements.

***

### find()

> **find**(`data`): `ListNode`\<`T`\> \| `undefined`

Finds the first node containing the given data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The data to search for. |

#### Returns

`ListNode`\<`T`\> \| `undefined`

The node containing the data, or undefined if not found.

#### Inherited from

`BaseLinkedList.find`

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

`BaseLinkedList.forEach`

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

`BaseLinkedList.getAt`

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

`BaseLinkedList.includes`

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

`BaseLinkedList.indexOf`

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

`BaseLinkedList.insertAt`

***

### map()

> **map**\<`U`\>(`callback`): `DoublyLinkedList`\<`U`\>

Returns a new doubly linked list with the results of calling a function on each element.

#### Type Parameters

| Type Parameter |
| ------ |
| `U` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`, `index`) => `U` | The function to apply to each element. |

#### Returns

`DoublyLinkedList`\<`U`\>

A new doubly linked list with the mapped values.

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

`BaseLinkedList.prepend`

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

`BaseLinkedList.reduce`

***

### reverse()

> **reverse**(): `this`

Reverses the list in place.

#### Returns

`this`

The list instance.

#### Overrides

`BaseLinkedList.reverse`

***

### size()

> **size**(): `number`

The current number of elements in the list.

#### Returns

`number`

#### Inherited from

`BaseLinkedList.size`

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

`BaseLinkedList.some`

***

### toArray()

> **toArray**(): `T`[]

Returns an array containing all the elements in the list.

#### Returns

`T`[]

An array of all elements in order.

#### Inherited from

`BaseLinkedList.toArray`

***

### toArrayReverse()

> **toArrayReverse**(): `T`[]

Returns an array containing all the elements in reverse order.

#### Returns

`T`[]

An array of all elements from tail to head.
