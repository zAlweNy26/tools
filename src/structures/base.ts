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
   * @complexity O(1).
   */
  get capacity() {
    return this._capacity
  }

  /**
   * The number of elements in the structure.
   * @complexity O(1).
   */
  get size() {
    return this._data.length
  }

  /**
   * Whether the structure holds no elements.
   * @complexity O(1).
   */
  get isEmpty() {
    return this.size === 0
  }

  /**
   * Whether the structure has reached its capacity.
   * @complexity O(1).
   */
  get isFull() {
    return this.size >= this._capacity
  }

  /**
   * Removes every element.
   * @returns The structure instance.
   * @complexity O(1).
   */
  clear() {
    this._data = []
    return this
  }

  /**
   * Returns the elements as a new array.
   * @complexity O(n).
   */
  toArray() {
    return [...this._data]
  }

  /**
   * Iterates over the elements in the same order as `toArray()`.
   * @returns An iterator over the elements.
   * @complexity O(n) to iterate every element.
   */
  [Symbol.iterator](): Iterator<T> {
    return this.toArray()[Symbol.iterator]()
  }
}

/**
 * Abstract base shared by every graph. Nodes are stored in an adjacency map;
 * subclasses decide whether edges are directed and how an edge is represented.
 * Iteration and `toArray()` yield the nodes in insertion order.
 * @template N The type of the nodes in the graph.
 * @template E The type of an edge in the adjacency list (`N`, or `[N, number]` for weighted graphs).
 * @category Graphs
 * @group Structures
 */
export abstract class GraphStructure<N, E> implements Structure<N> {
  protected map = new Map<N, E[]>()

  /**
   * Whether edges go from the first node to the second only.
   */
  abstract readonly directed: boolean

  /**
   * Creates a new graph, optionally with a first node.
   * @param node The first node to add to the graph.
   */
  constructor(node?: N) {
    if (node !== undefined) this.map.set(node, [])
  }

  /**
   * Returns the node an edge points to.
   * @param edge The edge.
   */
  protected abstract _target(edge: E): N

  /**
   * Creates an edge pointing to a node.
   * @param target The node the edge points to.
   * @param weight The edge weight, ignored by unweighted graphs.
   */
  protected abstract _edge(target: N, weight: number): E

  /**
   * Returns the weight of an edge, 1 for unweighted graphs.
   * @param edge The edge.
   */
  protected abstract _weight(edge: E): number

  /**
   * Adds a node to the graph if it is not already present.
   * @param node The node to add.
   * @returns The graph instance.
   * @complexity O(1).
   */
  addNode(node: N) {
    if (!this.map.has(node)) this.map.set(node, [])
    return this
  }

  /**
   * Returns true if the graph contains the given node, false otherwise.
   * @param node The node to check for.
   * @complexity O(1).
   */
  hasNode(node: N) {
    return this.map.has(node)
  }

  /**
   * Removes a node and every edge connected to it.
   * @param node The node to remove.
   * @returns True if the node was found and removed, false otherwise.
   * @complexity O(V + E), since every adjacency list is scanned for edges to the node.
   */
  removeNode(node: N) {
    if (!this.map.delete(node)) return false
    for (const [key, edges] of this.map)
      this.map.set(key, edges.filter(e => this._target(e) !== node))
    return true
  }

  /**
   * Removes the edge between two nodes (from `v1` to `v2` in a directed graph).
   * @param v1 The first node.
   * @param v2 The second node.
   * @returns True if the edge was found and removed, false otherwise.
   * @complexity O(deg(v1) + deg(v2)).
   */
  removeEdge(v1: N, v2: N) {
    if (!this._unlink(v1, v2)) return false
    if (!this.directed && v1 !== v2) this._unlink(v2, v1)
    return true
  }

  /**
   * Returns the edges leaving a node.
   * @param node The node to get the edges for.
   * @returns A copy of the node's edges, or undefined if the node is not in the graph.
   * @complexity O(deg(node)).
   */
  getEdges(node: N): E[] | undefined {
    return this.map.get(node)?.map(e => this._edge(this._target(e), this._weight(e)))
  }

  /**
   * Returns the nodes reachable from a node through a single edge.
   * @param node The node to get the neighbors of.
   * @returns The neighboring nodes, or undefined if the node is not in the graph.
   * @complexity O(deg(node)).
   */
  neighbors(node: N): N[] | undefined {
    return this.map.get(node)?.map(e => this._target(e))
  }

  /**
   * Checks whether there is an edge between two nodes (from `v1` to `v2` in a directed graph).
   * @param v1 The first node.
   * @param v2 The second node.
   * @returns True if the nodes are adjacent, false otherwise, including when `v1` is not in the graph.
   * @complexity O(deg(v1)).
   */
  isAdjacent(v1: N, v2: N) {
    return this.map.get(v1)?.some(e => this._target(e) === v2) ?? false
  }

  /**
   * Checks whether the graph contains a cycle.
   * @returns True if a cycle is detected, false otherwise.
   * @complexity O(V + E).
   */
  hasCycle() {
    return this.directed ? this._hasDirectedCycle() : this._hasUndirectedCycle()
  }

  /**
   * The nodes in the graph, in insertion order.
   * @complexity O(V).
   */
  get nodes() {
    return [...this.map.keys()]
  }

  /**
   * The number of nodes in the graph.
   * @complexity O(1).
   */
  get size() {
    return this.map.size
  }

  /**
   * Whether the graph has no nodes.
   * @complexity O(1).
   */
  get isEmpty() {
    return this.map.size === 0
  }

  /**
   * Removes every node and edge.
   * @returns The graph instance.
   * @complexity O(V).
   */
  clear() {
    this.map.clear()
    return this
  }

  /**
   * Returns the nodes, in insertion order, as a new array.
   * @complexity O(V).
   */
  toArray() {
    return this.nodes
  }

  /**
   * Iterates over the nodes in insertion order.
   * @returns An iterator over the nodes.
   * @complexity O(V) to iterate every node.
   */
  [Symbol.iterator](): Iterator<N> {
    return this.nodes[Symbol.iterator]()
  }

  /**
   * Adds an edge, mirroring it in undirected graphs. A missing second node is added.
   * @param v1 The first node.
   * @param v2 The second node.
   * @param weight The edge weight.
   * @returns The graph instance.
   * @throws An error if the first node is not found or the edge already exists.
   */
  protected _addEdge(v1: N, v2: N, weight: number) {
    const list = this.map.get(v1)
    if (!list) throw new Error('First node not found')
    if (list.some(e => this._target(e) === v2)) throw new Error('Edge already present')
    list.push(this._edge(v2, weight))
    this.addNode(v2)
    // a self-loop is stored once
    if (!this.directed && v1 !== v2) this.map.get(v2)!.push(this._edge(v1, weight))
    return this
  }

  /**
   * Returns the total weight of the path through the given nodes.
   * @param path The nodes along the path, in order.
   * @returns The summed weight, or undefined if two consecutive nodes are not adjacent.
   */
  protected _pathWeight(path: N[]) {
    let total = 0
    for (let i = 1; i < path.length; i++) {
      const edge = this.map.get(path[i - 1])?.find(e => this._target(e) === path[i])
      if (edge === undefined) return undefined
      total += this._weight(edge)
    }
    return total
  }

  private _unlink(from: N, to: N) {
    const list = this.map.get(from)
    const index = list?.findIndex(e => this._target(e) === to) ?? -1
    if (index === -1) return false
    list!.splice(index, 1)
    return true
  }

  private _hasUndirectedCycle() {
    const visited = new Set<N>()

    const dfs = (node: N, parent: N | undefined): boolean => {
      visited.add(node)
      for (const neighbor of this.neighbors(node) ?? []) {
        if (!visited.has(neighbor)) {
          if (dfs(neighbor, node)) return true
        }
        // reaching a visited node other than the one we came from closes a cycle
        else if (neighbor !== parent) return true
      }
      return false
    }

    for (const node of this.map.keys())
      if (!visited.has(node) && dfs(node, undefined)) return true
    return false
  }

  private _hasDirectedCycle() {
    // 1 = on the current DFS path, 2 = fully explored
    const state = new Map<N, 1 | 2>()

    const dfs = (node: N): boolean => {
      state.set(node, 1)
      for (const neighbor of this.neighbors(node) ?? []) {
        if (state.get(neighbor) === 1) return true
        if (!state.has(neighbor) && dfs(neighbor)) return true
      }
      state.set(node, 2)
      return false
    }

    for (const node of this.map.keys())
      if (!state.has(node) && dfs(node)) return true
    return false
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
   * @complexity O(n).
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
   * @complexity O(n), walking from the head.
   */
  getAt(index: number): T | undefined {
    if (index < 0 || index >= this._size) return undefined
    return this._nodeAt(index).data
  }

  /**
   * The number of elements in the list.
   * @complexity O(1).
   */
  get size(): number {
    return this._size
  }

  /**
   * Removes every element.
   * @returns The list instance.
   * @complexity O(1).
   */
  clear(): this {
    this._head = null
    this._tail = null
    this._size = 0
    return this
  }

  /**
   * Returns true if the list is empty, false otherwise.
   * @complexity O(1).
   */
  get isEmpty(): boolean {
    return this._size === 0
  }

  /**
   * Returns an array containing all the elements in the list.
   * @returns An array of all elements in order.
   * @complexity O(n).
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
   * @complexity O(n).
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
   * @complexity O(n).
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
   * @complexity O(n).
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
   * @complexity O(n).
   */
  includes(data: T): boolean {
    // eslint-disable-next-line e18e/prefer-includes, unicorn/prefer-includes
    return this.indexOf(data) !== -1
  }

  /**
   * Returns true if at least one element satisfies the predicate.
   * @param predicate The function to test each element.
   * @returns True if any element satisfies the predicate.
   * @complexity O(n).
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
   * @complexity O(n).
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
   * @complexity O(n) to iterate every element.
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
   * @complexity O(n), computed over the whole subtree on each access.
   */
  get height(): number {
    // count levels breadth-first instead of recursing, so deep trees can't overflow the call stack
    let level: TreeNode<T>[] = [this]
    let height = -1
    while (level.length > 0) {
      height++
      const next: TreeNode<T>[] = []
      for (const node of level) {
        for (const child of node.children)
          if (child) next.push(child)
      }
      level = next
    }
    return height
  }
}
