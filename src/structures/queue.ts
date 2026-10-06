import type { CapacityOptions } from '@interfaces/structure'
import { ListStructure } from './base'

/**
 * A first-in, first-out queue with amortized O(1) enqueue and dequeue.
 * Iteration and `toArray()` go from the front of the queue to the back.
 * @template T The type of elements held in the queue.
 * @example
 * ```ts
 * import { Queue } from '@danyalwe/tools'
 *
 * const queue = new Queue(['a'])
 * queue.enqueue('b')
 * queue.dequeue() // 'a'
 * queue.peek()    // 'b'
 * ```
 * @category Queues
 * @group Structures
 */
export class Queue<T> extends ListStructure<T> {
  // dequeued slots before _head are dropped in batches instead of shifting on every dequeue
  private _head = 0

  /**
   * Creates a new queue.
   * @param items The initial elements, from front to back.
   * @param options The queue options.
   * @throws A RangeError if the capacity is invalid or smaller than the number of items.
   */
  constructor(items?: Iterable<T>, options?: CapacityOptions) {
    super(items, options)
  }

  /**
   * Adds an element to the back of the queue.
   * @param element The element to add.
   * @returns The queue instance.
   * @throws An error if the queue is full.
   */
  enqueue(element: T) {
    if (this.isFull) throw new Error('Queue is full')
    this._data.push(element)
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
    this._head++
    if (this._head * 2 >= this._data.length) {
      this._data = this._data.slice(this._head)
      this._head = 0
    }
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
    return this._data.length - this._head
  }

  /**
   * Removes every element.
   * @returns The queue instance.
   */
  clear() {
    this._head = 0
    return super.clear()
  }

  /**
   * Returns the elements, from front to back, as a new array.
   */
  toArray() {
    return this._data.slice(this._head)
  }
}
