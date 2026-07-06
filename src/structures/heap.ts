import type { Structure } from '@interfaces/structure'

/**
 * A binary heap data structure.
 * @template T The type of elements held in the heap.
 * @example
 * ```ts
 * import { Heap } from '@danyalwe/tools'
 *
 * const heap = new Heap<number>()
 * heap.insert(3).insert(1).insert(2)
 * heap.peek()    // 1
 * heap.extract() // 1
 * heap.extract() // 2
 * ```
 * @category Heaps
 * @group Structures
 */
export class Heap<T> implements Structure {
  private _data: T[] = []
  private _compare: (a: T, b: T) => boolean

  /**
   * Creates a new heap with an optional comparator function.
   * Default is a min-heap (`(a, b) => a < b`).
   * @param compare A comparator function that returns true if `a` should be above `b`.
   */
  constructor(compare: (a: T, b: T) => boolean = (a, b) => a < b) {
    this._compare = compare
  }

  /**
   * Inserts a value into the heap.
   * @param value The value to insert.
   * @returns The heap instance.
   */
  insert(value: T) {
    this._data.push(value)
    this._bubbleUp(this._data.length - 1)
    return this
  }

  /**
   * Removes and returns the element at the top of the heap.
   * @returns The element at the top of the heap, or undefined if empty.
   */
  extract() {
    if (this._data.length === 0) return undefined
    const top = this._data[0]
    const last = this._data.pop()!
    if (this._data.length > 0) {
      this._data[0] = last
      this._sinkDown(0)
    }
    return top
  }

  /**
   * Returns the element at the top of the heap without removing it.
   * @returns The element at the top of the heap, or undefined if empty.
   */
  peek() {
    return this._data[0]
  }

  /**
   * Removes all elements from the heap.
   * @returns The heap instance.
   */
  clear() {
    this._data = []
    return this
  }

  /**
   * Returns the number of elements in the heap.
   */
  size() {
    return this._data.length
  }

  /**
   * Returns true if the heap is empty, false otherwise.
   */
  get isEmpty() {
    return this._data.length === 0
  }

  /**
   * Returns a copy of the internal data array.
   */
  get items() {
    return [...this._data]
  }

  private _bubbleUp(index: number) {
    while (index > 0) {
      const parent = (index - 1) >> 1
      if (!this._compare(this._data[index], this._data[parent])) break
      this._swap(index, parent)
      index = parent
    }
  }

  private _sinkDown(index: number) {
    const n = this._data.length
    while (true) {
      const left = (index << 1) + 1
      const right = left + 1
      let smallest = index

      if (left < n && this._compare(this._data[left], this._data[smallest]))
        smallest = left
      if (right < n && this._compare(this._data[right], this._data[smallest]))
        smallest = right

      if (smallest === index) break
      this._swap(index, smallest)
      index = smallest
    }
  }

  private _swap(i: number, j: number) {
    const temp = this._data[i]
    this._data[i] = this._data[j]
    this._data[j] = temp
  }
}
