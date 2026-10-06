import type { CapacityOptions, Structure } from '@interfaces/structure'

/**
 * Abstract class for array-backed structures with an optional capacity.
 * @template T The type of elements held in the list.
 * @category Lists
 * @group Structures
 */
export abstract class ListStructure<T> implements Structure<T> {
  protected _data: T[]
  protected readonly _capacity: number

  /**
   * Creates a new list structure.
   * @param items The initial elements.
   * @param options The structure options.
   * @throws A RangeError if the capacity is not a positive integer or `Infinity`, or if there are more items than the capacity.
   */
  constructor(items: Iterable<T> = [], options: CapacityOptions = {}) {
    const capacity = options.capacity ?? Infinity
    if (!(capacity > 0) || (capacity !== Infinity && !Number.isInteger(capacity)))
      throw new RangeError('Capacity must be greater than 0')
    this._capacity = capacity
    this._data = [...items]
    if (this._data.length > capacity) throw new RangeError('The initial items exceed the capacity')
  }

  /**
   * Gets the next element without removing it.
   * @returns The next element, or undefined if the structure is empty.
   */
  abstract peek(): T | undefined

  /**
   * The maximum number of elements, `Infinity` if unbounded.
   */
  get capacity() {
    return this._capacity
  }

  /**
   * The number of elements in the structure.
   */
  get size() {
    return this._data.length
  }

  /**
   * Whether the structure holds no elements.
   */
  get isEmpty() {
    return this.size === 0
  }

  /**
   * Whether the structure has reached its capacity.
   */
  get isFull() {
    return this.size >= this._capacity
  }

  /**
   * Removes every element.
   * @returns The structure instance.
   */
  clear() {
    this._data = []
    return this
  }

  /**
   * Returns the elements as a new array.
   */
  toArray() {
    return [...this._data]
  }

  /**
   * Iterates over the elements in the same order as `toArray()`.
   * @returns An iterator over the elements.
   */
  [Symbol.iterator](): Iterator<T> {
    return this.toArray()[Symbol.iterator]()
  }
}

/**
 * Abstract class representing a graph structure.
 * @template N The type of the nodes in the graph.
 * @template E The type of the values associated with the nodes.
 * @category Graphs
 * @group Structures
 */
export abstract class GraphStructure<N, E> {
  protected map = new Map<N, E[]>()

  /**
   * Creates a new graph structure with the given node.
   * @param node The first node to add to the graph.
   */
  constructor(node: N) {
    this.map.set(node, [])
  }

  /**
   * Adds a node to the graph if it is not already present.
   * @param node The node to add.
   * @returns The graph structure instance.
   */
  addNode(node: N) {
    if (!this.map.has(node)) this.map.set(node, [])
    return this
  }

  /**
   * Clears the graph by removing all nodes and edges.
   */
  clear() {
    this.map.clear()
  }

  /**
   * The current number of elements in the graph.
   */
  size() {
    return this.map.size
  }

  /**
   * Adds an edge between two nodes in the graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @returns The graph structure instance.
   */
  abstract addEdge(v1: N, v2: N): this

  /**
   * Removes an edge between two nodes in the graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @returns The graph structure instance.
   */
  abstract removeEdge(v1: N, v2: N): this

  /**
   * Returns an array of nodes adjacent to the given node.
   * @param node The node to get the adjacent nodes for.
   * @returns An array of adjacent nodes.
   */
  abstract getEdges(node: N): E[]

  /**
   * Returns a boolean indicating if two nodes are adjacent in the graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @returns True if the nodes are adjacent, false otherwise.
   */
  abstract isAdjacent(v1: N, v2: N): boolean

  /**
   * Removes a node from the graph.
   * @param node The node to remove.
   * @returns The graph structure instance.
   */
  abstract removeNode(node: N): this

  /**
   * Checks if the graph contains a cycle.
   */
  abstract hasCycle(): boolean

  /**
   * Returns true if the graph contains the given node, false otherwise.
   * @param node The node to check for.
   */
  hasNode(node: N) {
    return this.map.has(node)
  }

  /**
   * Returns an array of nodes in the graph.
   */
  get nodes() {
    return [...this.map.keys()]
  }
}

/**
 * Represents a node in a singly linked list.
 * @template T The type of data stored in the node.
 * @category Lists
 * @group Structures
 */
export class ListNode<T> {
  /**
   * The data stored in the node.
   */
  data: T
  /**
   * The next node in the list, or null if this is the last node.
   */
  next: ListNode<T> | null

  /**
   * Creates a new list node.
   * @param data The data to store in the node.
   * @param next The next node in the list, or null.
   */
  constructor(data: T, next: ListNode<T> | null = null) {
    this.data = data
    this.next = next
  }
}

/**
 * Abstract base class for linked list implementations.
 * @template T The type of elements held in the list.
 * @category Lists
 * @group Structures
 */
export abstract class BaseLinkedList<T> implements Structure<T> {
  protected _head: ListNode<T> | null = null
  protected _tail: ListNode<T> | null = null
  protected _size = 0

  /**
   * Adds an element to the end of the list.
   * @param data The data to append.
   * @returns The list instance.
   */
  abstract append(data: T): this

  /**
   * Adds an element to the beginning of the list.
   * @param data The data to prepend.
   * @returns The list instance.
   */
  abstract prepend(data: T): this

  /**
   * Inserts an element at the given index.
   * @param index The position at which to insert the element.
   * @param data The data to insert.
   * @returns The list instance.
   * @throws An error if the index is out of bounds.
   */
  abstract insertAt(index: number, data: T): this

  /**
   * Removes and returns the element at the given index.
   * @param index The index of the element to remove.
   * @returns The removed element, or undefined if the index is out of bounds.
   */
  abstract deleteAt(index: number): T | undefined

  /**
   * Removes the first occurrence of the given data from the list.
   * @param data The data to remove.
   * @returns True if the element was found and removed, false otherwise.
   */
  abstract delete(data: T): boolean

  /**
   * Reverses the list in place.
   * @returns The list instance.
   */
  abstract reverse(): this

  /**
   * Returns the first element that satisfies the predicate.
   * @param predicate The function to test each element with.
   * @returns The first matching element, or undefined if none matches.
   */
  find(predicate: (value: T, index: number) => boolean): T | undefined {
    let current = this._head
    let index = 0
    while (current) {
      if (predicate(current.data, index++)) return current.data
      current = current.next
    }
    return undefined
  }

  /**
   * Returns the element at the given index.
   * @param index The index of the element to retrieve.
   * @returns The element at the given index, or undefined if out of bounds.
   */
  getAt(index: number): T | undefined {
    if (index < 0 || index >= this._size) return undefined
    return this._nodeAt(index).data
  }

  /**
   * The number of elements in the list.
   */
  get size(): number {
    return this._size
  }

  /**
   * Removes every element.
   * @returns The list instance.
   */
  clear(): this {
    this._head = null
    this._tail = null
    this._size = 0
    return this
  }

  /**
   * Returns true if the list is empty, false otherwise.
   */
  get isEmpty(): boolean {
    return this._size === 0
  }

  /**
   * Returns an array containing all the elements in the list.
   * @returns An array of all elements in order.
   */
  toArray(): T[] {
    const result: T[] = []
    let current = this._head
    while (current) {
      result.push(current.data)
      current = current.next
    }
    return result
  }

  /**
   * Calls a function for each element in the list.
   * @param callback The function to call for each element.
   */
  forEach(callback: (value: T, index: number) => void): void {
    let current = this._head
    let index = 0
    while (current) {
      callback(current.data, index++)
      current = current.next
    }
  }

  /**
   * Reduces the list to a single value.
   * @param callback The function to call for each element.
   * @param initialValue The initial value for the accumulator.
   * @returns The reduced value.
   */
  reduce<U>(callback: (accumulator: U, value: T, index: number) => U, initialValue: U): U {
    let accumulator = initialValue
    let current = this._head
    let index = 0
    while (current) {
      accumulator = callback(accumulator, current.data, index++)
      current = current.next
    }
    return accumulator
  }

  /**
   * Returns the index of the first occurrence of the given data.
   * @param data The data to search for.
   * @returns The index of the data, or -1 if not found.
   */
  indexOf(data: T): number {
    let current = this._head
    let index = 0
    while (current) {
      if (current.data === data) return index
      current = current.next
      index++
    }
    return -1
  }

  /**
   * Returns true if the list includes the given data.
   * @param data The data to search for.
   * @returns True if the data is found, false otherwise.
   */
  includes(data: T): boolean {
    // eslint-disable-next-line e18e/prefer-includes, unicorn/prefer-includes
    return this.indexOf(data) !== -1
  }

  /**
   * Returns true if at least one element satisfies the predicate.
   * @param predicate The function to test each element.
   * @returns True if any element satisfies the predicate.
   */
  some(predicate: (value: T, index: number) => boolean): boolean {
    let current = this._head
    let index = 0
    while (current) {
      if (predicate(current.data, index++)) return true
      current = current.next
    }
    return false
  }

  /**
   * Returns true if all elements satisfy the predicate.
   * @param predicate The function to test each element.
   * @returns True if all elements satisfy the predicate.
   */
  every(predicate: (value: T, index: number) => boolean): boolean {
    let current = this._head
    let index = 0
    while (current) {
      if (!predicate(current.data, index++)) return false
      current = current.next
    }
    return true
  }

  /**
   * Iterator for the list, enabling for...of iteration.
   * @returns An iterator over the list's elements.
   */
  [Symbol.iterator](): Iterator<T> {
    let current = this._head
    return {
      next: (): IteratorResult<T> => {
        if (current) {
          const value = current.data
          current = current.next
          return { value, done: false }
        }
        return { value: undefined, done: true }
      },
    }
  }

  protected _nodeAt(index: number): ListNode<T> {
    let current = this._head!
    for (let i = 0; i < index; i++)
      current = current.next!
    return current
  }
}

/**
 * Abstract base class for tree nodes.
 * @template T The type of data stored in the node.
 * @category Trees
 */
export abstract class TreeNode<T> {
  /**
   * Creates a new tree node.
   * @param data The data to store in the node.
   */
  constructor(public data: T) {}

  /**
   * Returns the children of this node.
   */
  abstract get children(): readonly (TreeNode<T> | null)[]

  /**
   * Returns the height of the subtree rooted at this node.
   */
  get height(): number {
    const valid = this.children.filter((c): c is TreeNode<T> => c !== null)
    return valid.length > 0
      ? 1 + Math.max(...valid.map(c => c.height))
      : 0
  }
}
