import type { Structure } from '@interfaces/structure'
import { TreeNode } from './base'
import { heightOrder, inOrder, postOrder, preOrder } from '@traversals/tree'

/**
 * A node in a binary search tree.
 * @template T The type of data stored in the node.
 * @category Trees
 * @group Structures
 */
export class BSTNode<T> extends TreeNode<T> {
  left: BSTNode<T> | null = null
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
 * const bst = new BinarySearchTree<number>()
 * bst.insert(5).insert(3).insert(7)
 * bst.contains(3)  // true
 * bst.traverse()   // [3, 5, 7]
 * ```
 * @category Trees
 * @group Structures
 */
export class BinarySearchTree<T> implements Structure {
  private _root: BSTNode<T> | null = null
  private _size = 0
  private _compare: (a: T, b: T) => number

  /**
   * Creates a new binary search tree.
   * @param compare A comparator function that returns a negative number if `a < b`,
   *   zero if `a === b`, and a positive number if `a > b`.
   *   Defaults to numeric comparison (`a - b`).
   * @param values Optional iterable of values to insert into the tree.
   */
  constructor(compare?: (a: T, b: T) => number)
  constructor(values?: Iterable<T>)
  constructor(compare?: (a: T, b: T) => number, values?: Iterable<T>)
  constructor(compare?: ((a: T, b: T) => number) | Iterable<T>, values?: Iterable<T>) {
    if (typeof compare === 'function') this._compare = compare
    else this._compare = (a, b) => (a as unknown as number) - (b as unknown as number)

    const iterable = (typeof compare === 'function' ? values : compare) ?? null
    if (iterable)
      for (const v of iterable) this.insert(v)
  }

  /**
   * Inserts a value into the tree.
   * @param value The value to insert.
   * @returns The tree instance.
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
   * @returns The tree instance.
   * @throws An error if the value is not found.
   */
  delete(value: T) {
    this._root = this._deleteNode(this._root, value)
    this._size--
    return this
  }

  private _deleteNode(node: BSTNode<T> | null, value: T): BSTNode<T> | null {
    if (!node) throw new Error('Value not found')

    const cmp = this._compare(value, node.data)
    if (cmp < 0) node.left = this._deleteNode(node.left, value)
    else if (cmp > 0) node.right = this._deleteNode(node.right, value)
    else {
      if (!node.left) return node.right
      if (!node.right) return node.left
      const successor = this._minNode(node.right)
      node.data = successor.data
      node.right = this._deleteNode(node.right, successor.data)
    }

    return node
  }

  /**
   * Searches for a value and returns the node containing it.
   * @param value The value to search for.
   * @returns The node containing the value, or undefined if not found.
   */
  search(value: T) {
    let current = this._root
    while (current) {
      const cmp = this._compare(value, current.data)
      if (cmp === 0) return current
      current = cmp < 0 ? current.left : current.right
    }
    return undefined
  }

  /**
   * Checks if a value exists in the tree.
   * @param value The value to check for.
   * @returns True if the value exists, false otherwise.
   */
  contains(value: T) {
    return this.search(value) !== undefined
  }

  /**
   * Traverses the tree in the specified order.
   * @param order The traversal order. Defaults to `'in'` (in-order).
   * @returns An array of values in the specified order.
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
   */
  min() {
    if (!this._root) return undefined
    return this._minNode(this._root).data
  }

  /**
   * Returns the maximum value in the tree.
   * @returns The maximum value, or undefined if the tree is empty.
   */
  max() {
    if (!this._root) return undefined
    let current = this._root
    while (current.right) current = current.right
    return current.data
  }

  clear() {
    this._root = null
    this._size = 0
    return this
  }

  size() {
    return this._size
  }

  get height() {
    return this._root?.height ?? -1
  }

  /**
   * Returns true if the tree is empty, false otherwise.
   */
  get isEmpty() {
    return this._size === 0
  }

  /**
   * Returns an in-order iterator over the tree values.
   */
  * [Symbol.iterator]() {
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
