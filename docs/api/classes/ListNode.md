[Overview](../index.md) / ListNode

# ListNode\<T\>

Represents a node in a singly linked list.

## Extended by

- [`DoublyListNode`](DoublyListNode.md)

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of data stored in the node. |

## Constructors

### Constructor

> **new ListNode**\<`T`\>(`data`, `next?`): `ListNode`\<`T`\>

Creates a new list node.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `data` | `T` | `undefined` | The data to store in the node. |
| `next` | `ListNode`\<`T`\> \| `null` | `null` | The next node in the list, or null. |

#### Returns

`ListNode`\<`T`\>

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-data"></a> `data` | `T` | The data stored in the node. |
| <a id="property-next"></a> `next` | `ListNode`\<`T`\> \| `null` | The next node in the list, or null if this is the last node. |
