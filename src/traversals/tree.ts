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
 */
export function preOrder<T>(node: TreeNode<T> | null, result: T[]) {
  if (!node) return
  result.push(node.data)
  for (const child of node.children)
    if (child) preOrder(child, result)
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
 */
export function postOrder<T>(node: TreeNode<T> | null, result: T[]) {
  if (!node) return
  for (const child of node.children)
    if (child) postOrder(child, result)

  result.push(node.data)
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
 */
export function inOrder<T>(
  node: TreeNode<T> | null,
  result: T[],
  splitAt: (children: readonly (TreeNode<T> | null)[]) => number,
) {
  if (!node) return
  const mid = splitAt(node.children)
  for (let i = 0; i < mid; i++)
    if (node.children[i]) inOrder(node.children[i], result, splitAt)

  result.push(node.data)
  for (let i = mid; i < node.children.length; i++)
    if (node.children[i]) inOrder(node.children[i], result, splitAt)
}

/**
 * Traverses a tree by height (level order), visiting the root, then all nodes at each subsequent level.
 * @param node The node to start traversal from.
 * @param result The array to push visited node data into.
 * @param first Internal flag used to track whether the root has been visited (defaults to `true`).
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
 */
export function heightOrder<T>(node: TreeNode<T> | null, result: T[], first = true) {
  if (!node) return
  if (first) result.push(node.data)
  for (const child of node.children)
    if (child) result.push(child.data)
  for (const child of node.children)
    if (child) heightOrder(child, result, false)
}
