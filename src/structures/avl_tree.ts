import { BinarySearchTree, BSTNode } from './binary_search_tree'

/**
 * A node in an AVL tree.
 * @template T The type of data stored in the node.
 * @category Trees
 * @group Structures
 */
export class AVLNode<T> extends BSTNode<T> {
  private _height = 0

  declare left: AVLNode<T> | null
  declare right: AVLNode<T> | null

  /**
   * Creates a new AVL node.
   * @param data The data to store in the node.
   * @param left Optional left child node.
   * @param right Optional right child node.
   */
  constructor(data: T, left?: AVLNode<T> | null, right?: AVLNode<T> | null) {
    super(data, left, right)
  }

  /**
   * Returns the height of the subtree rooted at this node.
   */
  get height(): number {
    return this._height
  }

  /**
   * Recomputes the height of this node from the heights of its children.
   */
  updateHeight() {
    this._height = 1 + Math.max(this.left?.height ?? -1, this.right?.height ?? -1)
  }
}

/**
 * A self-balancing AVL tree data structure.
 * @template T The type of elements held in the tree.
 * @example
 * ```ts
 * import { AVLTree } from '@danyalwe/tools'
 *
 * const tree = new AVLTree([3, 1, 2])
 * tree.toArray() // [1, 2, 3]
 * tree.height    // 1
 * ```
 * @category Trees
 * @group Structures
 */
export class AVLTree<T> extends BinarySearchTree<T> {
  declare _root: AVLNode<T> | null

  private _getHeight(node: AVLNode<T> | null): number {
    return node?.height ?? -1
  }

  private _updateHeight(node: AVLNode<T>) {
    node.updateHeight()
  }

  private _balanceFactor(node: AVLNode<T>): number {
    return this._getHeight(node.left) - this._getHeight(node.right)
  }

  private _rotateRight(y: AVLNode<T>): AVLNode<T> {
    const x = y.left!
    const t2 = x.right
    x.right = y
    y.left = t2
    this._updateHeight(y)
    this._updateHeight(x)
    return x
  }

  private _rotateLeft(x: AVLNode<T>): AVLNode<T> {
    const y = x.right!
    const t2 = y.left
    y.left = x
    x.right = t2
    this._updateHeight(x)
    this._updateHeight(y)
    return y
  }

  private _balance(node: AVLNode<T>): AVLNode<T> {
    this._updateHeight(node)
    const bf = this._balanceFactor(node)
    if (bf > 1) {
      if (this._balanceFactor(node.left!) < 0) node.left = this._rotateLeft(node.left!)
      return this._rotateRight(node)
    }
    if (bf < -1) {
      if (this._balanceFactor(node.right!) > 0) node.right = this._rotateRight(node.right!)
      return this._rotateLeft(node)
    }
    return node
  }

  private _insert(node: AVLNode<T> | null, value: T): AVLNode<T> {
    if (!node) {
      this._size++
      return new AVLNode(value)
    }

    const cmp = this._compare(value, node.data)
    if (cmp < 0)
      node.left = this._insert(node.left, value)
    else if (cmp > 0)
      node.right = this._insert(node.right, value)
    else {
      node.data = value
      return node
    }

    return this._balance(node)
  }

  /**
   * Inserts a value into the AVL tree and rebalances it.
   * @param value The value to insert.
   * @returns The tree instance.
   */
  insert(value: T) {
    this._root = this._insert(this._root, value)
    return this
  }

  private _minValueNode(node: AVLNode<T>): AVLNode<T> {
    while (node.left) node = node.left
    return node
  }

  private _delete(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
    if (!node) throw new Error('Value not found')

    const cmp = this._compare(value, node.data)
    if (cmp < 0)
      node.left = this._delete(node.left, value)
    else if (cmp > 0)
      node.right = this._delete(node.right, value)
    else {
      if (!node.left || !node.right) {
        const child = node.left || node.right
        this._size--
        return child
      }
      const successor = this._minValueNode(node.right!)
      node.data = successor.data
      node.right = this._delete(node.right, successor.data)
    }

    return this._balance(node)
  }

  /**
   * Removes a value from the AVL tree and rebalances it.
   * @param value The value to remove.
   * @returns True if the value was found and removed, false otherwise.
   */
  delete(value: T) {
    if (!this.contains(value)) return false
    this._root = this._delete(this._root, value)
    return true
  }

  /**
   * Returns true if the AVL tree satisfies the balance invariant:
   * every node has a balance factor in the range [-1, 0, 1].
   */
  isBalanced(): boolean {
    return this._isBalanced(this._root)
  }

  private _isBalanced(node: AVLNode<T> | null): boolean {
    if (!node) return true
    const bf = (node.left?.height ?? -1) - (node.right?.height ?? -1)
    if (Math.abs(bf) > 1) return false
    return this._isBalanced(node.left) && this._isBalanced(node.right)
  }
}
