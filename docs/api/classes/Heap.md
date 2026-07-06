[Overview](../index.md) / Heap

# Heap\<T\>

A binary heap data structure.

## Example

```ts
import { Heap } from '@danyalwe/tools'

const heap = new Heap<number>()
heap.insert(3).insert(1).insert(2)
heap.peek()    // 1
heap.extract() // 1
heap.extract() // 2
```

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of elements held in the heap. |

## Implements

- [`Structure`](../interfaces/Structure.md)

## Constructors

### Constructor

> **new Heap**\<`T`\>(`compare?`): `Heap`\<`T`\>

Creates a new heap with an optional comparator function.
Default is a min-heap (`(a, b) => a < b`).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `compare` | (`a`, `b`) => `boolean` | A comparator function that returns true if `a` should be above `b`. |

#### Returns

`Heap`\<`T`\>

## Accessors

### isEmpty

#### Get Signature

> **get** **isEmpty**(): `boolean`

Returns true if the heap is empty, false otherwise.

##### Returns

`boolean`

***

### items

#### Get Signature

> **get** **items**(): `T`[]

Returns a copy of the internal data array.

##### Returns

`T`[]

## Methods

### clear()

> **clear**(): `Heap`\<`T`\>

Removes all elements from the heap.

#### Returns

`Heap`\<`T`\>

The heap instance.

#### Implementation of

[`Structure`](../interfaces/Structure.md).[`clear`](../interfaces/Structure.md#property-clear)

***

### extract()

> **extract**(): `T` \| `undefined`

Removes and returns the element at the top of the heap.

#### Returns

`T` \| `undefined`

The element at the top of the heap, or undefined if empty.

***

### insert()

> **insert**(`value`): `Heap`\<`T`\>

Inserts a value into the heap.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The value to insert. |

#### Returns

`Heap`\<`T`\>

The heap instance.

***

### peek()

> **peek**(): `T`

Returns the element at the top of the heap without removing it.

#### Returns

`T`

The element at the top of the heap, or undefined if empty.

***

### size()

> **size**(): `number`

Returns the number of elements in the heap.

#### Returns

`number`

#### Implementation of

[`Structure`](../interfaces/Structure.md).[`size`](../interfaces/Structure.md#property-size)
