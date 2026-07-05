[Overview](../index.md) / inOrder

# inOrder()

> **inOrder**\<`T`\>(`node`, `result`, `splitAt`): `void`

Performs an in-order traversal of a tree.
Visits children up to `splitAt`, then the root, then remaining children.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | [`TreeNode`](../classes/TreeNode.md)\<`T`\> \| `null` | The node to start traversal from. |
| `result` | `T`[] | The array to push visited node data into. |
| `splitAt` | (`children`) => `number` | A function that returns the index in `node.children` where the root is visited. For binary trees, return `1` to visit left child, root, then right child. |

## Returns

`void`

## Example

```ts
import { Tree, inOrder } from '@danyalwe/tools'

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
inOrder(tree.root, result, () => 1)
// result: [4, 2, 5, 1, 6, 3]
```
