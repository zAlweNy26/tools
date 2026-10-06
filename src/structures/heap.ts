import type { Comparator, CompareOptions, Structure } from '@interfaces/structure'
import { defaultCompare } from '@utils/compare'

/**
 * A binary heap. The element that sorts first according to the comparator is always on top,
 * so the default comparator gives a min-heap.
 * Iteration and `toArray()` yield the elements in internal heap order, not sorted order.
 * @template T The type of elements held in the heap.
 * @example
 * ```ts
 * import { Heap } from '@danyalwe/tools'
 *
 * const heap = new Heap([3, 1, 2])
 * heap.peek()    // 1
 * heap.extract() // 1
 * heap.extract() // 2
 *
 * const maxHeap = new Heap([3, 1, 2], { compare: (a, b) => b - a })
 * maxHeap.peek() // 3
 * ```
 * @category Heaps
 * @group Structures
 */
export class Heap<T> implements Structure<T> {
  private _data: T[]
  private readonly _compare: Comparator<T>

  /**
   * Creates a new heap.
   * @param items The initial elements.
   * @param options The heap options.
   */
  constructor(items: Iterable<T> = [], options: CompareOptions<T> = {}) {
    this._compare = options.compare ?? defaultCompare
    this._data = [...items]
    // heapify bottom-up in O(n)
    for (let i = (this._data.length >> 1) - 1; i >= 0; i--) this._sinkDown(i)
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
   * The number of elements in the heap.
   */
  get size() {
    return this._data.length
  }

  /**
   * Returns true if the heap is empty, false otherwise.
   */
  get isEmpty() {
    return this._data.length === 0
  }

  /**
   * Returns the elements, in internal heap order, as a new array.
   */
  toArray() {
    return [...this._data]
  }

  /**
   * Iterates over the elements in internal heap order.
   * @returns An iterator over the elements.
   */
  [Symbol.iterator](): Iterator<T> {
    return this.toArray()[Symbol.iterator]()
  }

  private _bubbleUp(index: number) {
    while (index > 0) {
      const parent = (index - 1) >> 1
      if (this._compare(this._data[index], this._data[parent]) >= 0) break
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

      if (left < n && this._compare(this._data[left], this._data[smallest]) < 0)
        smallest = left
      if (right < n && this._compare(this._data[right], this._data[smallest]) < 0)
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
