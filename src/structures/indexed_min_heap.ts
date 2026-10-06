import type { Comparator, CompareOptions, Structure } from '@interfaces/structure'
import { defaultCompare } from '@utils/compare'

/**
 * A fixed-capacity indexed binary min-heap.
 *
 * Stores elements at numeric indices and maintains them in heap order
 * by their associated values. Supports O(log n) `decreaseKey()` via
 * position tracking. The structure's elements are the indices: `size`,
 * `toArray()` and iteration all refer to the indices, in internal heap order.
 *
 * @template T The type of the values associated with each index.
 * @example
 * ```ts
 * import { IndexedMinHeap } from '@danyalwe/tools'
 *
 * const heap = new IndexedMinHeap<number>(5)
 * heap.insert(0, 10).insert(1, 5).insert(2, 20)
 * heap.decreaseKey(2, 3)
 * heap.extractMin() // 2 (value 3)
 * ```
 * @category Heaps
 * @group Structures
 */
export class IndexedMinHeap<T> implements Structure<number> {
  private _size: number = 0
  private readonly _capacity: number
  private readonly _heap: number[]
  private readonly _values: (T | undefined)[]
  private readonly _position: number[]
  private readonly _compare: Comparator<T>

  /**
   * Creates a new indexed min-heap with the given capacity.
   * @param capacity The maximum number of indices the heap can hold.
   * @param options The heap options.
   * @throws A RangeError if the capacity is not a positive integer.
   */
  constructor(capacity: number, options: CompareOptions<T> = {}) {
    if (!Number.isInteger(capacity) || capacity <= 0) throw new RangeError('Capacity must be greater than 0')
    this._capacity = capacity
    this._compare = options.compare ?? defaultCompare
    this._heap = Array.from({ length: capacity })
    this._values = Array.from<T | undefined>({ length: capacity }).fill(undefined)
    this._position = Array.from<number>({ length: capacity }).fill(-1)
  }

  /**
   * Inserts a value at the given index into the heap.
   * @param index The numeric index (0 to capacity - 1).
   * @param value The value to associate with the index.
   * @returns The heap instance.
   * @throws If the index is out of range or already inserted.
   */
  insert(index: number, value: T): this {
    if (!this._inRange(index))
      throw new Error('Index out of range')
    if (this._position[index] !== -1)
      throw new Error('Index already inserted')
    this._values[index] = value
    this._position[index] = this._size
    this._heap[this._size] = index
    this._size++
    this._bubbleUp(this._size - 1)
    return this
  }

  /**
   * Decreases the value associated with an index.
   * @param index The index whose value to decrease.
   * @param value The new lower value.
   * @returns The heap instance.
   * @throws If the index is not present or the new value is greater.
   */
  decreaseKey(index: number, value: T): this {
    if (!this.contains(index))
      throw new Error('Index not found')
    if (this._compare(value, this._values[index] as T) > 0)
      throw new Error('New value must not be greater than current value')
    this._values[index] = value
    this._bubbleUp(this._position[index])
    return this
  }

  /**
   * Removes and returns the index with the smallest value.
   * @returns The index with the smallest value, or undefined if empty.
   */
  extractMin(): number | undefined {
    if (this._size === 0) return undefined
    const min = this._heap[0]
    this._size--
    if (this._size > 0) {
      this._heap[0] = this._heap[this._size]
      this._position[this._heap[0]] = 0
      this._sinkDown(0)
    }
    this._position[min] = -1
    return min
  }

  /**
   * Returns the index with the smallest value without removing it.
   * @returns The min index, or undefined if empty.
   */
  peekMin(): number | undefined {
    return this._size === 0 ? undefined : this._heap[0]
  }

  /**
   * Checks whether the given index is currently present in the heap.
   * @param index The index to check.
   * @returns True if the index is present, false otherwise.
   */
  contains(index: number): boolean {
    return this._inRange(index) && this._position[index] !== -1
  }

  /**
   * Returns the current value associated with an index.
   * @param index The index to look up.
   * @returns The associated value, or undefined if absent.
   */
  getValue(index: number): T | undefined {
    if (!this.contains(index)) return undefined
    return this._values[index]
  }

  /**
   * Removes all elements from the heap.
   * @returns The heap instance.
   */
  clear(): this {
    this._position.fill(-1)
    this._values.fill(undefined)
    this._size = 0
    return this
  }

  /**
   * The number of indices currently in the heap.
   */
  get size(): number {
    return this._size
  }

  /**
   * Returns true if the heap is empty, false otherwise.
   */
  get isEmpty(): boolean {
    return this._size === 0
  }

  /**
   * Returns the indices, in internal heap order, as a new array.
   */
  toArray(): number[] {
    return this._heap.slice(0, this._size)
  }

  /**
   * Iterates over the indices in internal heap order.
   * @returns An iterator over the indices.
   */
  [Symbol.iterator](): Iterator<number> {
    return this.toArray()[Symbol.iterator]()
  }

  private _inRange(index: number): boolean {
    return Number.isInteger(index) && index >= 0 && index < this._capacity
  }

  private _less(a: number, b: number): boolean {
    return this._compare(this._values[a] as T, this._values[b] as T) < 0
  }

  private _parent(i: number): number {
    return (i - 1) >> 1
  }

  private _left(i: number): number {
    return (i << 1) + 1
  }

  private _right(i: number): number {
    return (i << 1) + 2
  }

  private _swap(i: number, j: number): void {
    const a = this._heap[i]
    const b = this._heap[j]
    this._heap[i] = b
    this._heap[j] = a
    this._position[a] = j
    this._position[b] = i
  }

  private _bubbleUp(pos: number): void {
    while (pos > 0) {
      const parent = this._parent(pos)
      if (this._less(this._heap[pos], this._heap[parent])) {
        this._swap(pos, parent)
        pos = parent
      }
      else
        break
    }
  }

  private _sinkDown(pos: number): void {
    while (true) {
      const left = this._left(pos)
      const right = this._right(pos)
      let smallest = pos
      if (left < this._size && this._less(this._heap[left], this._heap[smallest]))
        smallest = left
      if (right < this._size && this._less(this._heap[right], this._heap[smallest]))
        smallest = right
      if (smallest === pos) break
      this._swap(pos, smallest)
      pos = smallest
    }
  }
}
