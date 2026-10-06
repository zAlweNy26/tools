import type { Comparator, CompareOptions, Structure } from '@interfaces/structure'
import { TreeNode } from './base'
import { heightOrder, inOrder, postOrder, preOrder } from '@traversals/tree'
import { defaultCompare } from '@utils/compare'

/**
 * A node in a binary search tree.
 * @template T The type of data stored in the node.
 * @category Trees
 * @group Structures
 */
export class BSTNode<T> extends TreeNode<T> {
  /** The left child node. */
  left: BSTNode<T> | null = null
  /** The right child node. */
  right: BSTNode<T> | null = null

  /**
   * Creates a new BST node.
   * @param data The data to store in the node.
   * @param left Optional left child node.
   * @param right Optional right child node.
   */
  constructor(data: T, left?: BSTNode<T> | null, right?: BSTNode<T> | null) {
    super(data)
    this.left = left ?? null
    this.right = right ?? null
  }

  /**
   * Returns the children of this node as `[left, right]`.
   */
  get children(): (TreeNode<T> | null)[] {
    return [this.left, this.right]
  }
}

/**
 * A binary search tree data structure.
 * @template T The type of elements held in the tree.
 * @example
 * ```ts
 * import { BinarySearchTree } from '@danyalwe/tools'
 *
 * const bst = new BinarySearchTree([5, 3, 7])
 * bst.contains(3)  // true
 * bst.toArray()    // [3, 5, 7]
 *
 * const byLength = new BinarySearchTree(['ccc', 'a'], { compare: (a, b) => a.length - b.length })
 * ```
 * @category Trees
 * @group Structures
 */
export class BinarySearchTree<T> implements Structure<T> {
  protected _root: BSTNode<T> | null = null
  protected _size = 0
  protected readonly _compare: Comparator<T>

  /**
   * Creates a new binary search tree. Values that compare equal are stored once.
   * @param items The initial values.
   * @param options The tree options.
   * @complexity O(n · h) for n initial items.
   */
  constructor(items: Iterable<T> = [], options: CompareOptions<T> = {}) {
    this._compare = options.compare ?? defaultCompare
    for (const item of items) this.insert(item)
  }

  /**
   * Inserts a value into the tree.
   * @param value The value to insert.
   * @returns The tree instance.
   * @complexity O(h), where h is the tree height: O(log n) on average and O(n) for skewed input. AVLTree keeps h at O(log n).
   */
  insert(value: T) {
    const newNode = new BSTNode(value)

    if (!this._root) {
      this._root = newNode
      this._size++
      return this
    }

    let current = this._root
    while (true) {
      const cmp = this._compare(value, current.data)
      if (cmp < 0) {
        if (!current.left) {
          current.left = newNode
          break
        }
        current = current.left
      }
      else if (cmp > 0) {
        if (!current.right) {
          current.right = newNode
          break
        }
        current = current.right
      }
      else {
        current.data = value
        return this
      }
    }

    this._size++
    return this
  }

  /**
   * Removes a value from the tree.
   * @param value The value to remove.
   * @returns True if the value was found and removed, false otherwise.
   * @complexity O(h), where h is the tree height: O(log n) on average and O(n) for skewed input. AVLTree keeps h at O(log n).
   */
  delete(value: T) {
    let parent: BSTNode<T> | null = null
    let node = this._root
    while (node) {
      const cmp = this._compare(value, node.data)
      if (cmp === 0) break
      parent = node
      node = cmp < 0 ? node.left : node.right
    }
    if (!node) return false

    // a node with two children takes its in-order successor's value, and the successor is removed instead
    if (node.left && node.right) {
      let successorParent = node
      let successor = node.right
      while (successor.left) {
        successorParent = successor
        successor = successor.left
      }
      node.data = successor.data
      parent = successorParent
      node = successor
    }

    const child = node.left ?? node.right
    if (!parent) this._root = child
    else if (parent.left === node) parent.left = child
    else parent.right = child
    this._size--
    return true
  }

  /**
   * Searches for a value and returns the stored value that compares equal to it.
   * Useful with a key-based comparator, e.g. to look up a full record by its id.
   * @param value The value to search for.
   * @returns The stored value, or undefined if not found.
   * @complexity O(h), where h is the tree height: O(log n) on average and O(n) for skewed input. AVLTree keeps h at O(log n).
   */
  search(value: T): T | undefined {
    return this._findNode(value)?.data
  }

  /**
   * Checks if a value exists in the tree.
   * @param value The value to check for.
   * @returns True if the value exists, false otherwise.
   * @complexity O(h), where h is the tree height: O(log n) on average and O(n) for skewed input. AVLTree keeps h at O(log n).
   */
  contains(value: T) {
    return this._findNode(value) !== null
  }

  private _findNode(value: T) {
    let current = this._root
    while (current) {
      const cmp = this._compare(value, current.data)
      if (cmp === 0) return current
      current = cmp < 0 ? current.left : current.right
    }
    return null
  }

  /**
   * Traverses the tree in the specified order.
   * @param order The traversal order. Defaults to `'in'` (in-order).
   * @returns An array of values in the specified order.
   * @complexity O(n).
   */
  traverse(order: 'pre' | 'in' | 'post' | 'height' = 'in') {
    const result: T[] = []
    if (order === 'pre') preOrder(this._root, result)
    else if (order === 'in') inOrder(this._root, result, () => 1)
    else if (order === 'height') heightOrder(this._root, result)
    else postOrder(this._root, result)
    return result
  }

  /**
   * Returns the minimum value in the tree.
   * @returns The minimum value, or undefined if the tree is empty.
   * @complexity O(h), where h is the tree height: O(log n) on average and O(n) for skewed input. AVLTree keeps h at O(log n).
   */
  min() {
    if (!this._root) return undefined
    return this._minNode(this._root).data
  }

  /**
   * Returns the maximum value in the tree.
   * @returns The maximum value, or undefined if the tree is empty.
   * @complexity O(h), where h is the tree height: O(log n) on average and O(n) for skewed input. AVLTree keeps h at O(log n).
   */
  max() {
    if (!this._root) return undefined
    let current = this._root
    while (current.right) current = current.right
    return current.data
  }

  /**
   * Removes all elements from the tree.
   * @returns The tree instance.
   * @complexity O(1).
   */
  clear() {
    this._root = null
    this._size = 0
    return this
  }

  /**
   * The number of elements in the tree.
   * @complexity O(1).
   */
  get size() {
    return this._size
  }

  /**
   * Returns the height of the tree, or -1 if empty.
   * @complexity O(n) for a BinarySearchTree; O(1) for an AVLTree, which stores node heights.
   */
  get height() {
    return this._root?.height ?? -1
  }

  /**
   * Returns true if the tree is empty, false otherwise.
   * @complexity O(1).
   */
  get isEmpty() {
    return this._size === 0
  }

  /**
   * Returns the values in order as a new array.
   * @complexity O(n).
   */
  toArray() {
    return [...this]
  }

  /**
   * Iterates over the values in order.
   * @yields Each value, from smallest to largest.
   * @returns An iterator over the values.
   * @complexity O(n) to iterate every value, using O(h) extra space.
   */
  * [Symbol.iterator](): Generator<T, void, undefined> {
    const stack: BSTNode<T>[] = []
    let current = this._root

    while (current || stack.length > 0) {
      while (current) {
        stack.push(current)
        current = current.left
      }
      current = stack.pop()!
      yield current.data
      current = current.right
    }
  }

  private _minNode(node: BSTNode<T>) {
    while (node.left) node = node.left
    return node
  }
}
