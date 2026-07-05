import type { TreeNode } from '@structures/structures'

export function preOrder<T>(node: TreeNode<T> | null, result: T[]) {
  if (!node) return
  result.push(node.data)
  for (const child of node.children)
    if (child) preOrder(child, result)
}

export function postOrder<T>(node: TreeNode<T> | null, result: T[]) {
  if (!node) return
  for (const child of node.children)
    if (child) postOrder(child, result)

  result.push(node.data)
}

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

export function heightOrder<T>(node: TreeNode<T> | null, result: T[], first = true) {
  if (!node) return
  if (first) result.push(node.data)
  for (const child of node.children)
    if (child) result.push(child.data)
  for (const child of node.children)
    if (child) heightOrder(child, result, false)
}
