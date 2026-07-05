[Overview](../index.md) / preOrder

# preOrder()

> **preOrder**\<`T`\>(`node`, `result`): `void`

Traverses a tree in pre-order (root first, then children left-to-right).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `TreeNode`\<`T`\> \| `null` | The node to start traversal from. |
| `result` | `T`[] | The array to push visited node data into. |

## Returns

`void`

## Example

```ts
import { Tree, preOrder } from '@danyalwe/tools'

//       1
//      / \
//     2   3
//    / \   \
//   4   5   6
const tree = new Tree(1)
const node2 = tree.root.push(2)
const node3 = tree.root.push(3)
node2.push(4)
node2.push(5)
node3.push(6)

const result: number[] = []
preOrder(tree.root, result)
// result: [1, 2, 4, 5, 3, 6]
```
