[Overview](../index.md) / CircularQueue

# CircularQueue\<T\>

A circular queue data structure.

## Extends

- [`Queue`](Queue.md)\<`T`\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of elements held in the queue. |

## Constructors

### Constructor

> **new CircularQueue**\<`T`\>(`size`): `CircularQueue`\<`T`\>

Creates a new instance of the CircularQueue class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `size` | `number` \| `T`[] | The maximum size of the queue, or an array of elements to initialize the queue with. |

#### Returns

`CircularQueue`\<`T`\>

#### Overrides

[`Queue`](Queue.md).[`constructor`](Queue.md#constructor)

## Properties

| Property | Modifier | Type | Default value | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-_capacity"></a> `_capacity` | `protected` | `number` | `0` | [`Queue`](Queue.md).[`_capacity`](Queue.md#property-capacity) |
| <a id="property-_data"></a> `_data` | `protected` | `T`[] | `[]` | [`Queue`](Queue.md).[`_data`](Queue.md#property-data) |
| <a id="property-_head"></a> `_head` | `protected` | `number` | `0` | [`Queue`](Queue.md).[`_head`](Queue.md#property-head) |
| <a id="property-_tail"></a> `_tail` | `protected` | `number` | `0` | [`Queue`](Queue.md).[`_tail`](Queue.md#property-tail) |

## Accessors

### hasRoom

#### Get Signature

> **get** **hasRoom**(): `boolean`

Returns true if the queue has available space.

##### Returns

`boolean`

True if the queue has available space, false otherwise.

#### Inherited from

[`Queue`](Queue.md).[`hasRoom`](Queue.md#hasroom)

***

### isEmpty

#### Get Signature

> **get** **isEmpty**(): `boolean`

Returns whether the queue is empty.

##### Returns

`boolean`

#### Overrides

[`Queue`](Queue.md).[`isEmpty`](Queue.md#isempty)

***

### isFull

#### Get Signature

> **get** **isFull**(): `boolean`

Returns whether the queue is full.

##### Returns

`boolean`

#### Overrides

[`Queue`](Queue.md).[`isFull`](Queue.md#isfull)

***

### items

#### Get Signature

> **get** **items**(): `T`[]

An array of all the elements in the list.

##### Returns

`T`[]

#### Inherited from

[`Queue`](Queue.md).[`items`](Queue.md#items)

***

### space

#### Get Signature

> **get** **space**(): `number`

Returns the number of available spaces in the queue.

##### Returns

`number`

#### Overrides

[`Queue`](Queue.md).[`space`](Queue.md#space)

## Methods

### clear()

> **clear**(): `CircularQueue`\<`T`\>

Removes all elements from the queue.

#### Returns

`CircularQueue`\<`T`\>

The queue instance.

#### Inherited from

[`Queue`](Queue.md).[`clear`](Queue.md#clear)

***

### dequeue()

> **dequeue**(): `T`

Removes and returns the element at the front of the queue.

#### Returns

`T`

The element at the front of the queue.

#### Throws

An error if the queue is empty.

#### Overrides

[`Queue`](Queue.md).[`dequeue`](Queue.md#dequeue)

***

### enqueue()

> **enqueue**(`element`): `void`

Adds an element to the end of the queue.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `element` | `T` | The element to add to the queue. |

#### Returns

`void`

#### Overrides

[`Queue`](Queue.md).[`enqueue`](Queue.md#enqueue)

***

### peek()

> **peek**(): `T` \| `undefined`

Returns the element at the front of the queue without removing it.

#### Returns

`T` \| `undefined`

The element at the front of the queue or undefined if the queue is empty.

#### Inherited from

[`Queue`](Queue.md).[`peek`](Queue.md#peek)

***

### size()

> **size**(): `number`

The current number of elements in the queue.

#### Returns

`number`

#### Inherited from

[`Queue`](Queue.md).[`size`](Queue.md#size)
