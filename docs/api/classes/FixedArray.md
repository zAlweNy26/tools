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

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `capacity` | `number` \| `T`[] |

#### Returns

`FixedArray`\<`T`\>

#### Overrides

`Array<T>.constructor`

## Methods

### push()

> **push**(...`items`): `number`

Appends new elements to the end of an array, and returns the new length of the array.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`items` | `T`[] | New elements to add to the array. |

#### Returns

`number`

#### Overrides

`Array.push`

***

### from()

> `static` **from**\<`T`\>(`items`): `FixedArray`\<`T`\>

Creates an array from an array-like object.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `items` | `T`[] |

#### Returns

`FixedArray`\<`T`\>

#### Overrides

`Array.from`
