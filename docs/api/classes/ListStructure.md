[Overview](../index.md) / ListStructure

# ListStructure\<T\>

Abstract class representing a list structure.

## Extended by

- [`Queue`](Queue.md)
- [`Stack`](Stack.md)

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of elements held in the list. |

## Implements

- [`Structure`](../interfaces/Structure.md)

## Constructors

### Constructor

> **new ListStructure**\<`T`\>(`size`): `ListStructure`\<`T`\>

Creates a new list structure with the given size or initial elements.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `size` | `number` \| `T`[] | The maximum capacity (as a number) or an array of initial elements. |

#### Returns

`ListStructure`\<`T`\>

## Accessors

### hasRoom

#### Get Signature

> **get** `abstract` **hasRoom**(): `boolean`

Indicates whether the structure has room for more elements.

##### Returns

`boolean`

***

### isEmpty

#### Get Signature

> **get** `abstract` **isEmpty**(): `boolean`

Indicates whether the structure is empty.

##### Returns

`boolean`

***

### isFull

#### Get Signature

> **get** `abstract` **isFull**(): `boolean`

Indicates whether the structure is full.

##### Returns

`boolean`

***

### items

#### Get Signature

> **get** **items**(): `T`[]

An array of all the elements in the list.

##### Returns

`T`[]

***

### space

#### Get Signature

> **get** `abstract` **space**(): `number`

The available space in the structure.

##### Returns

`number`

## Methods

### clear()

> **clear**(): `ListStructure`\<`T`\>

Clears the list.

#### Returns

`ListStructure`\<`T`\>

#### Implementation of

[`Structure`](../interfaces/Structure.md).[`clear`](../interfaces/Structure.md#property-clear)

***

### peek()

> `abstract` **peek**(): `T` \| `undefined`

Gets the next element in the list without removing it.

#### Returns

`T` \| `undefined`

***

### size()

> **size**(): `number`

The current number of elements in the list.

#### Returns

`number`

#### Implementation of

[`Structure`](../interfaces/Structure.md).[`size`](../interfaces/Structure.md#property-size)
