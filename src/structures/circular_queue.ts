import { ListStructure } from './base'

/**
 * A fixed-capacity queue backed by a ring buffer.
 * When full, enqueueing overwrites the oldest element instead of throwing.
 * Iteration and `toArray()` go from the front of the queue to the back.
 * @template T The type of elements held in the queue.
 * @example
 * ```ts
 * import { CircularQueue } from '@danyalwe/tools'
 *
 * const cq = new CircularQueue<number>(3, [1, 2, 3])
 * cq.enqueue(4) // overwrites the oldest (1)
 * cq.peek()     // 2
 * cq.toArray()  // [2, 3, 4]
 * ```
 * @category Queues
 * @group Structures
 */
export class CircularQueue<T> extends ListStructure<T> {
  private _head = 0
  private _count = 0

  /**
   * Creates a new circular queue.
   * @param capacity The number of elements the queue holds before it starts overwriting.
   * @param items The initial elements, from front to back. Only the last `capacity` of them are kept.
   * @throws A RangeError if the capacity is not a positive integer.
   */
  constructor(capacity: number, items: Iterable<T> = []) {
    if (capacity === Infinity) throw new RangeError('Capacity must be finite')
    super([], { capacity })
    for (const item of items) this.enqueue(item)
  }

  /**
   * Adds an element to the back of the queue, overwriting the oldest element if the queue is full.
   * @param element The element to add.
   * @returns The queue instance.
   */
  enqueue(element: T) {
    this._data[(this._head + this._count) % this._capacity] = element
    if (this.isFull) this._head = (this._head + 1) % this._capacity
    else this._count++
    return this
  }

  /**
   * Removes and returns the element at the front of the queue.
   * @returns The front element, or undefined if the queue is empty.
   */
  dequeue() {
    if (this.isEmpty) return undefined
    const item = this._data[this._head]
    this._data[this._head] = undefined as T
    this._head = (this._head + 1) % this._capacity
    this._count--
    return item
  }

  /**
   * Returns the element at the front of the queue without removing it.
   * @returns The front element, or undefined if the queue is empty.
   */
  peek() {
    return this.isEmpty ? undefined : this._data[this._head]
  }

  /**
   * The number of elements in the queue.
   */
  get size() {
    return this._count
  }

  /**
   * Removes every element.
   * @returns The queue instance.
   */
  clear() {
    this._head = 0
    this._count = 0
    return super.clear()
  }

  /**
   * Returns the elements, from front to back, as a new array.
   */
  toArray() {
    return Array.from({ length: this._count }, (_, i) => this._data[(this._head + i) % this._capacity])
  }
}
