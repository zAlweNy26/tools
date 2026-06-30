[Overview](../index.md) / measure

# measure()

> **measure**\<`T`\>(`_target`, `_propertyKey`, `descriptor`): `PropertyDescriptor`

A decorator function that measures the execution time of a method and logs it to the console.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_target` | `unknown` | The target object. |
| `_propertyKey` | `string` | The name of the property. |
| `descriptor` | `PropertyDescriptor` | The property descriptor. |

## Returns

`PropertyDescriptor`

The updated property descriptor.
