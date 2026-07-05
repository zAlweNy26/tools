[Overview](../index.md) / postOrder

# postOrder()

> **postOrder**\<`T`\>(`node`, `result`): `void`

Traverses a tree in post-order (children left-to-right, then root).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | [`TreeNode`](../classes/TreeNode.md)\<`T`\> \| `null` | The node to start traversal from. |
| `result` | `T`[] | The array to push visited node data into. |

## Returns

`void`

## Example

```ts
import { Tree, postOrder } from '@danyalwe/tools'

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
postOrder(tree.root, result)
// result: [4, 5, 2, 6, 3, 1]
```
