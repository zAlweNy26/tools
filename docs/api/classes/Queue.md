[Overview](../index.md) / Queue

# Queue\<T\>

A queue data structure.

## Extends

- [`ListStructure`](ListStructure.md)\<`T`\>

## Extended by

- [`CircularQueue`](CircularQueue.md)

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of elements held in the queue. |

## Constructors

### Constructor

> **new Queue**\<`T`\>(`size`): `Queue`\<`T`\>

Creates a new queue with the specified size or elements.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `size` | `number` \| `T`[] | The size of the queue or an array of elements to initialize the queue with. |

#### Returns

`Queue`\<`T`\>

#### Overrides

[`ListStructure`](ListStructure.md).[`constructor`](ListStructure.md#constructor)

## Properties

| Property | Modifier | Type | Default value | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-_capacity"></a> `_capacity` | `protected` | `number` | `0` | [`ListStructure`](ListStructure.md).[`_capacity`](ListStructure.md#property-capacity) |
| <a id="property-_data"></a> `_data` | `protected` | `T`[] | `[]` | [`ListStructure`](ListStructure.md).[`_data`](ListStructure.md#property-data) |
| <a id="property-_head"></a> `_head` | `protected` | `number` | `0` | - |
| <a id="property-_tail"></a> `_tail` | `protected` | `number` | `0` | - |

## Accessors

### hasRoom

#### Get Signature

> **get** **hasRoom**(): `boolean`

Returns true if the queue has available space.

##### Returns

`boolean`

True if the queue has available space, false otherwise.

#### Overrides

[`ListStructure`](ListStructure.md).[`hasRoom`](ListStructure.md#hasroom)

***

### isEmpty

#### Get Signature

> **get** **isEmpty**(): `boolean`

Returns true if the queue is empty.

##### Returns

`boolean`

True if the queue is empty, false otherwise.

#### Overrides

[`ListStructure`](ListStructure.md).[`isEmpty`](ListStructure.md#isempty)

***

### isFull

#### Get Signature

> **get** **isFull**(): `boolean`

Returns true if the queue is full.

##### Returns

`boolean`

True if the queue is full, false otherwise.

#### Overrides

[`ListStructure`](ListStructure.md).[`isFull`](ListStructure.md#isfull)

***

### items

#### Get Signature

> **get** **items**(): `T`[]

An array of all the elements in the list.

##### Returns

`T`[]

#### Inherited from

[`ListStructure`](ListStructure.md).[`items`](ListStructure.md#items)

***

### space

#### Get Signature

> **get** **space**(): `number`

Returns the number of available spaces in the queue.

##### Returns

`number`

The number of available spaces in the queue.

#### Overrides

[`ListStructure`](ListStructure.md).[`space`](ListStructure.md#space)

## Methods

### clear()

> **clear**(): `Queue`\<`T`\>

Removes all elements from the queue.

#### Returns

`Queue`\<`T`\>

The queue instance.

#### Overrides

[`ListStructure`](ListStructure.md).[`clear`](ListStructure.md#clear)

***

### dequeue()

> **dequeue**(): `T`

Removes and returns the element at the front of the queue.

#### Returns

`T`

The element at the front of the queue.

#### Throws

An error if the queue is empty.

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

#### Throws

An error if the queue is full.

***

### peek()

> **peek**(): `T` \| `undefined`

Returns the element at the front of the queue without removing it.

#### Returns

`T` \| `undefined`

The element at the front of the queue or undefined if the queue is empty.

#### Overrides

[`ListStructure`](ListStructure.md).[`peek`](ListStructure.md#peek)

***

### size()

> **size**(): `number`

The current number of elements in the queue.

#### Returns

`number`

#### Overrides

[`ListStructure`](ListStructure.md).[`size`](ListStructure.md#size)
