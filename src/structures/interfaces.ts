import { FixedArray } from './fixed_array'

/**
 * Interface for data structures.
 * @group Structures
 */
export interface Structure {
  /**
   * Clears the structure.
   */
  clear: () => void
  /**
   * The current number of elements in the structure.
   */
  size: () => number
}

/**
 * Abstract class representing a list structure.
 * @template T The type of elements held in the list.
 * @group Structures
 */
export abstract class ListStructure<T> implements Structure {
  protected _data: T[] = []
  protected _capacity: number = 0

  /**
   * Creates a new list structure with the given size or initial elements.
   * @param size The maximum capacity (as a number) or an array of initial elements.
   */
  constructor(size: number | T[]) {
    if (typeof size === 'number') {
      this._data = new FixedArray(size)
      this._capacity = size
    }
    else
      this._data = [...size]
  }

  /**
   * The available space in the structure.
   */
  abstract get space(): number
  /**
   * Indicates whether the structure has room for more elements.
   */
  abstract get hasRoom(): boolean
  /**
   * Indicates whether the structure is empty.
   */
  abstract get isEmpty(): boolean
  /**
   * Indicates whether the structure is full.
   */
  abstract get isFull(): boolean
  /**
   * Gets the next element in the list without removing it.
   */
  abstract peek(): T | undefined

  /**
   * An array of all the elements in the list.
   */
  get items() {
    return [...this._data].filter(v => v !== undefined) as T[]
  }

  /**
   * Clears the list.
   */
  clear() {
    this._data = this._capacity > 0 ? new FixedArray(this._capacity) : []
    return this
  }

  /**
   * The current number of elements in the list.
   */
  size() {
    return this._data.length
  }
}

/**
 * Abstract class representing a graph structure.
 * @template N The type of the nodes in the graph.
 * @template E The type of the values associated with the nodes.
 * @group Structures
 */
export abstract class GraphStructure<N, E> implements Structure {
  protected map = new Map<N, E[]>()

  /**
   * Creates a new graph structure with the given node.
   * @param node The first node to add to the graph.
   */
  constructor(node: N) {
    this.map.set(node, [])
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
