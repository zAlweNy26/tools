import type { Structure } from '@interfaces/structure'
import { TreeNode } from './base'
import { heightOrder, inOrder, postOrder, preOrder } from '@traversals/tree'

/**
 * Represents a leaf in a tree data structure.
 * @template T The type of data stored in the leaf.
 * @example
 * ```ts
 * import { TreeLeaf } from '@danyalwe/tools'
 *
 * const root = new TreeLeaf('root')
 * const child = root.push('child')
 * child.push('grandchild')
 * root.height  // 2
 * ```
 * @category Trees
 * @group Structures
 */
export class TreeLeaf<T> extends TreeNode<T> {
  private _children: TreeLeaf<T>[] = []

  /**
   * Creates a new TreeLeaf instance.
   * @param data The data to store in the leaf.
   * @param children Optional child leaves.
   */
  constructor(data: T, children?: TreeLeaf<T>[]) {
    super(data)
    this._children = children || []
  }

  /**
   * Adds one or more child leaves to this leaf.
   * @param data The data to store in the new leaves.
   * @param datas Additional data to store in new leaves.
   * @returns The last leaf that was added.
   */
  push(data: T, ...datas: T[]) {
    let leaf = new TreeLeaf(data)
    this._children.push(leaf)
    for (const d of datas) {
      leaf = new TreeLeaf(d)
      this._children.push(leaf)
    }
    return leaf
  }

  get children(): TreeLeaf<T>[] {
    return this._children
  }
}

/**
 * Represents a tree data structure.
 * @template T The type of data stored in the tree.
 * @category Trees
 * @group Structures
 */
export class Tree<T> implements Structure {
  /** The root node of the tree. */
  root!: TreeLeaf<T>

  /**
   * Creates a new tree with the specified data as the root node.
   * @param data The data to be stored in the root node.
   */
  constructor(data: T) {
    this.root = new TreeLeaf(data)
  }

  /**
   * Traverses the tree in the specified order and returns an array of the visited nodes' data.
   * @param order The order in which to traverse the tree. Defaults to "pre".
   * @returns An array of the visited nodes' data.
   */
  traverse(order: 'post' | 'pre' | 'in' | 'height' = 'pre'): T[] {
    const result: T[] = []

    if (order === 'pre') preOrder(this.root, result)
    else if (order === 'post') postOrder(this.root, result)
    else if (order === 'in') inOrder(this.root, result, c => Math.round(c.length / 2))
    else if (order === 'height') heightOrder(this.root, result)

    return result
  }

  /**
   * Searches the tree for a node with the specified data and returns the node if found.
   * @param value The data to search for.
   * @returns The node with the specified data, or undefined if not found.
   */
  search(value: T): TreeLeaf<T> | undefined {
    const queue: TreeLeaf<T>[] = [this.root]
    let head = 0
    while (head < queue.length) {
      const node = queue[head++]
      if (node.data === value) return node
      for (const child of node.children)
        queue.push(child)
    }
    return undefined
  }

  /**
   * Gets the height of the tree.
   * @returns The height of the tree.
   */
  get height(): number {
    return this.root.height
  }

  clear() {
    this.root = new TreeLeaf(this.root.data)
    return this
  }

  size() {
    const count = (node: TreeLeaf<T>): number => {
      return 1 + node.children.reduce((sum, child) => sum + count(child), 0)
    }
    return count(this.root)
  }
}
