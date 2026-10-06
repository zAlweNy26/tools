import { BinarySearchTree } from '@structures/binary_search_tree'
import { Tree } from '@structures/tree'
import { heightOrder, inOrder, postOrder, preOrder } from '@traversals/tree'
import { describe, expect, test } from 'bun:test'

//       1
//     / | \
//    2  3  4
//   / \    |
//  5   6   7
function buildTree() {
  const tree = new Tree(1)
  const node2 = tree.root.push(2)
  tree.root.push(3)
  const node4 = tree.root.push(4)
  node2.push(5, 6)
  node4.push(7)
  return tree
}

function chain(length: number) {
  const tree = new Tree(0)
  let node = tree.root
  for (let i = 1; i < length; i++) node = node.push(i)
  return tree
}

describe('tree traversals', () => {
  test('preOrder visits each node before its children', () => {
    const result: number[] = []
    preOrder(buildTree().root, result)
    expect(result).toEqual([1, 2, 5, 6, 3, 4, 7])
  })

  test('postOrder visits each node after its children', () => {
    const result: number[] = []
    postOrder(buildTree().root, result)
    expect(result).toEqual([5, 6, 2, 3, 7, 4, 1])
  })

  test('inOrder visits the node after the children before the split point', () => {
    const half: number[] = []
    inOrder(buildTree().root, half, children => Math.round(children.length / 2))
    expect(half).toEqual([5, 2, 6, 3, 1, 7, 4])

    const first: number[] = []
    inOrder(buildTree().root, first, () => 0)
    expect(first).toEqual([1, 2, 5, 6, 3, 4, 7])

    const last: number[] = []
    inOrder(buildTree().root, last, children => children.length)
    expect(last).toEqual([5, 6, 2, 3, 7, 4, 1])
  })

  test('inOrder with a split of 1 is the usual binary in-order', () => {
    const bst = new BinarySearchTree([8, 4, 12, 2, 6, 10, 14])
    expect(bst.traverse('in')).toEqual([2, 4, 6, 8, 10, 12, 14])
  })

  test('heightOrder visits level by level', () => {
    const result: number[] = []
    heightOrder(buildTree().root, result)
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  test('handle trees too deep for recursion', () => {
    const tree = chain(100_000)
    const expected = Array.from({ length: 100_000 }, (_, i) => i)
    expect(tree.traverse('pre')).toEqual(expected)
    expect(tree.traverse('post')).toEqual([...expected].reverse())
    expect(tree.traverse('in')).toEqual([...expected].reverse())
    expect(tree.size).toBe(100_000)
    expect(tree.height).toBe(99_999)
  })
})
