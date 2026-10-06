import type { TreeNode } from '@structures/base'

/**
 * Traverses a tree in pre-order (root first, then children left-to-right).
 * @param node The node to start traversal from.
 * @param result The array to push visited node data into.
 * @example
 * ```ts
 * import { Tree, preOrder } from '@danyalwe/tools'
 *
 * //       1
 * //      / \
 * //     2   3
 * //    / \   \
 * //   4   5   6
 * const tree = new Tree(1)
 * const node2 = tree.root.push(2)
 * const node3 = tree.root.push(3)
 * node2.push(4)
 * node2.push(5)
 * node3.push(6)
 *
 * const result: number[] = []
 * preOrder(tree.root, result)
 * // result: [1, 2, 4, 5, 3, 6]
 * ```
 * @group Traversals
 * @complexity O(n).
 */
export function preOrder<T>(node: TreeNode<T> | null, result: T[]) {
  if (!node) return
  // an explicit stack instead of recursion, so deep trees can't overflow the call stack
  const stack: TreeNode<T>[] = [node]
  while (stack.length > 0) {
    const current = stack.pop()!
    result.push(current.data)
    const { children } = current
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i]
      if (child) stack.push(child)
    }
  }
}

/**
 * Traverses a tree in post-order (children left-to-right, then root).
 * @param node The node to start traversal from.
 * @param result The array to push visited node data into.
 * @example
 * ```ts
 * import { Tree, postOrder } from '@danyalwe/tools'
 *
 * //       1
 * //      / \
 * //     2   3
 * //    / \   \
 * //   4   5   6
 * const tree = new Tree(1)
 * const node2 = tree.root.push(2)
 * const node3 = tree.root.push(3)
 * node2.push(4)
 * node2.push(5)
 * node3.push(6)
 *
 * const result: number[] = []
 * postOrder(tree.root, result)
 * // result: [4, 5, 2, 6, 3, 1]
 * ```
 * @group Traversals
 * @complexity O(n).
 */
export function postOrder<T>(node: TreeNode<T> | null, result: T[]) {
  if (!node) return
  // visiting node, then children last-to-first, gives the exact reverse of post-order
  const stack: TreeNode<T>[] = [node]
  const reversed: T[] = []
  while (stack.length > 0) {
    const current = stack.pop()!
    reversed.push(current.data)
    for (const child of current.children)
      if (child) stack.push(child)
  }
  for (let i = reversed.length - 1; i >= 0; i--) result.push(reversed[i])
}

/**
 * Performs an in-order traversal of a tree.
 * Visits children up to `splitAt`, then the root, then remaining children.
 * @param node The node to start traversal from.
 * @param result The array to push visited node data into.
 * @param splitAt A function that returns the index in `node.children` where the root is visited. For binary trees, return `1` to visit left child, root, then right child.
 * @example
 * ```ts
 * import { Tree, inOrder } from '@danyalwe/tools'
 *
 * //       1
 * //      / \
 * //     2   3
 * //    / \   \
 * //   4   5   6
 * const tree = new Tree(1)
 * const node2 = tree.root.push(2)
 * const node3 = tree.root.push(3)
 * node2.push(4)
 * node2.push(5)
 * node3.push(6)
 *
 * const result: number[] = []
 * inOrder(tree.root, result, () => 1)
 * // result: [4, 2, 5, 1, 6, 3]
 * ```
 * @group Traversals
 * @complexity O(n).
 */
export function inOrder<T>(
  node: TreeNode<T> | null,
  result: T[],
  splitAt: (children: readonly (TreeNode<T> | null)[]) => number,
) {
  if (!node) return
  interface Frame { node: TreeNode<T>, mid: number, next: number, visited: boolean }
  const frame = (n: TreeNode<T>): Frame => ({ node: n, mid: splitAt(n.children), next: 0, visited: false })
  // each frame remembers which child comes next, replacing the recursive call stack
  const stack: Frame[] = [frame(node)]
  while (stack.length > 0) {
    const top = stack[stack.length - 1]
    if (!top.visited && top.next >= top.mid) {
      result.push(top.node.data)
      top.visited = true
    }
    if (top.next < top.node.children.length) {
      const child = top.node.children[top.next++]
      if (child) stack.push(frame(child))
    }
    else {
      if (!top.visited) result.push(top.node.data)
      stack.pop()
    }
  }
}

/**
 * Traverses a tree by height (level order), visiting the root, then all nodes at each subsequent level.
 * @param node The node to start traversal from.
 * @param result The array to push visited node data into.
 * @example
 * ```ts
 * import { Tree, heightOrder } from '@danyalwe/tools'
 *
 * //       1
 * //      / \
 * //     2   3
 * //    / \   \
 * //   4   5   6
 * const tree = new Tree(1)
 * const node2 = tree.root.push(2)
 * const node3 = tree.root.push(3)
 * node2.push(4)
 * node2.push(5)
 * node3.push(6)
 *
 * const result: number[] = []
 * heightOrder(tree.root, result)
 * // result: [1, 2, 3, 4, 5, 6]
 * ```
 * @group Traversals
 * @complexity O(n).
 */
export function heightOrder<T>(node: TreeNode<T> | null, result: T[]) {
  if (!node) return
  const queue: TreeNode<T>[] = [node]
  for (let i = 0; i < queue.length; i++) {
    result.push(queue[i].data)
    for (const child of queue[i].children)
      if (child) queue.push(child)
  }
}
