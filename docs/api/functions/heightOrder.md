[Overview](../index.md) / heightOrder

# heightOrder()

> **heightOrder**\<`T`\>(`node`, `result`, `first?`): `void`

Traverses a tree by height (level order), visiting the root, then all nodes at each subsequent level.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `node` | `TreeNode`\<`T`\> \| `null` | `undefined` | The node to start traversal from. |
| `result` | `T`[] | `undefined` | The array to push visited node data into. |
| `first` | `boolean` | `true` | Internal flag used to track whether the root has been visited (defaults to `true`). |

## Returns

`void`

## Example

```ts
import { Tree, heightOrder } from '@danyalwe/tools'

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
heightOrder(tree.root, result)
// result: [1, 2, 3, 4, 5, 6]
```
