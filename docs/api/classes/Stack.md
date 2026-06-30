[Overview](../index.md) / Stack

# Stack\<T\>

A stack data structure.

## Extends

- [`ListStructure`](ListStructure.md)\<`T`\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of elements held in the stack. |

## Constructors

### Constructor

> **new Stack**\<`T`\>(`size`): `Stack`\<`T`\>

Creates a new stack with the specified size or elements.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `size` | `number` \| `T`[] | The size of the stack or an array of elements to initialize the stack with. |

#### Returns

`Stack`\<`T`\>

#### Overrides

[`ListStructure`](ListStructure.md).[`constructor`](ListStructure.md#constructor)

## Accessors

### hasRoom

#### Get Signature

> **get** **hasRoom**(): `boolean`

Returns true if the stack has room for more elements, false otherwise.

##### Returns

`boolean`

True if the stack has room for more elements, false otherwise.

#### Overrides

[`ListStructure`](ListStructure.md).[`hasRoom`](ListStructure.md#hasroom)

***

### isEmpty

#### Get Signature

> **get** **isEmpty**(): `boolean`

Returns true if the stack is empty, false otherwise.

##### Returns

`boolean`

True if the stack is empty, false otherwise.

#### Overrides

[`ListStructure`](ListStructure.md).[`isEmpty`](ListStructure.md#isempty)

***

### isFull

#### Get Signature

> **get** **isFull**(): `boolean`

Returns true if the stack is full, false otherwise.

##### Returns

`boolean`

True if the stack is full, false otherwise.

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

Returns the remaining space in the stack.

##### Returns

`number`

The remaining space in the stack.

#### Overrides

[`ListStructure`](ListStructure.md).[`space`](ListStructure.md#space)

## Methods

### clear()

> **clear**(): `Stack`\<`T`\>

Clears the list.

#### Returns

`Stack`\<`T`\>

#### Inherited from

[`ListStructure`](ListStructure.md).[`clear`](ListStructure.md#clear)

***

### peek()

> **peek**(): `T`

Returns the element at the top of the stack without removing it.

#### Returns

`T`

The element at the top of the stack.

#### Overrides

[`ListStructure`](ListStructure.md).[`peek`](ListStructure.md#peek)

***

### pop()

> **pop**(): `T` \| `undefined`

Removes and returns the element at the top of the stack.

#### Returns

`T` \| `undefined`

The element at the top of the stack.

#### Throws

An error if the stack is empty.

***

### push()

> **push**(`element`): `void`

Adds an element to the top of the stack.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `element` | `T` | The element to add to the stack. |

#### Returns

`void`

#### Throws

An error if the stack is full.

***

### size()

> **size**(): `number`

The current number of elements in the list.

#### Returns

`number`

#### Inherited from

[`ListStructure`](ListStructure.md).[`size`](ListStructure.md#size)
