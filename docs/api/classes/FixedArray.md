[Overview](../index.md) / FixedArray

# FixedArray\<T\>

A fixed-capacity array that extends the built-in Array class.

## Extends

- `Array`\<`T`\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of elements held in the array. |

## Indexable

> \[`n`: `number`\]: `T`

## Constructors

### Constructor

> **new FixedArray**\<`T`\>(`capacity`): `FixedArray`\<`T`\>

Creates a new fixed-capacity array.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `capacity` | `number` \| `T`[] | The maximum capacity (as a number) or an initial set of items (as an array). |

#### Returns

`FixedArray`\<`T`\>

#### Overrides

`Array<T>.constructor`

## Methods

### push()

> **push**(...`items`): `number`

Appends new elements to the end of the fixed-capacity array.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`items` | `T`[] | The items to add. |

#### Returns

`number`

The new length of the array.

#### Throws

An error if adding the items would exceed the array's capacity.

#### Overrides

`Array.push`

***

### from()

> `static` **from**\<`T`\>(`items`): `FixedArray`\<`T`\>

Creates a new fixed-capacity array from an array of items.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `items` | `T`[] | The items to initialize the array with. |

#### Returns

`FixedArray`\<`T`\>

A new fixed-capacity array with capacity equal to the number of items.

#### Overrides

`Array.from`
