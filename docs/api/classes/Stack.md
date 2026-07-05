[Overview](../index.md) / Stack

# Stack\<T\>

A stack data structure.

## Example

```ts
import { Stack } from '@danyalwe/tools'

const stack = new Stack<number>(5)
stack.push(1)
stack.push(2)
stack.pop()   // 2
stack.peek()  // 1
```

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

`ListStructure<T>.constructor`

## Accessors

### hasRoom

#### Get Signature

> **get** **hasRoom**(): `boolean`

Returns true if the stack has room for more elements, false otherwise.

##### Returns

`boolean`

True if the stack has room for more elements, false otherwise.

#### Overrides

`ListStructure.hasRoom`

***

### isEmpty

#### Get Signature

> **get** **isEmpty**(): `boolean`

Returns true if the stack is empty, false otherwise.

##### Returns

`boolean`

True if the stack is empty, false otherwise.

#### Overrides

`ListStructure.isEmpty`

***

### isFull

#### Get Signature

> **get** **isFull**(): `boolean`

Returns true if the stack is full, false otherwise.

##### Returns

`boolean`

True if the stack is full, false otherwise.

#### Overrides

`ListStructure.isFull`

***

### items

#### Get Signature

> **get** **items**(): `T`[]

An array of all the elements in the list.

##### Returns

`T`[]

#### Inherited from

`ListStructure.items`

***

### space

#### Get Signature

> **get** **space**(): `number`

Returns the remaining space in the stack.

##### Returns

`number`

The remaining space in the stack.

#### Overrides

`ListStructure.space`

## Methods

### clear()

> **clear**(): `Stack`\<`T`\>

Clears the list.

#### Returns

`Stack`\<`T`\>

#### Inherited from

`ListStructure.clear`

***

### peek()

> **peek**(): `T`

Returns the element at the top of the stack without removing it.

#### Returns

`T`

The element at the top of the stack.

#### Overrides

`ListStructure.peek`

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

`ListStructure.size`
