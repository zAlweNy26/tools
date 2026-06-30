[Overview](../index.md) / DoublyListNode

# DoublyListNode\<T\>

Represents a node in a doubly linked list.

## Extends

- [`ListNode`](ListNode.md)\<`T`\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of data stored in the node. |

## Constructors

### Constructor

> **new DoublyListNode**\<`T`\>(`data`, `next?`, `prev?`): `DoublyListNode`\<`T`\>

Creates a new doubly linked list node.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `data` | `T` | `undefined` | The data to store in the node. |
| `next` | `DoublyListNode`\<`T`\> \| `null` | `null` | The next node in the list, or null. |
| `prev` | `DoublyListNode`\<`T`\> \| `null` | `null` | The previous node in the list, or null. |

#### Returns

`DoublyListNode`\<`T`\>

#### Overrides

[`ListNode`](ListNode.md).[`constructor`](ListNode.md#constructor)

## Properties

| Property | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-data"></a> `data` | `T` | The data stored in the node. | - | [`ListNode`](ListNode.md).[`data`](ListNode.md#property-data) |
| <a id="property-next"></a> `next` | `DoublyListNode`\<`T`\> \| `null` | The next node in the list, or null if this is the last node. | [`ListNode`](ListNode.md).[`next`](ListNode.md#property-next) | - |
| <a id="property-prev"></a> `prev` | `DoublyListNode`\<`T`\> \| `null` | The previous node in the list, or null if this is the first node. | - | - |
