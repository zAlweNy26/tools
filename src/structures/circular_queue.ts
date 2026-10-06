import { Queue } from './queue'

/**
 * A circular queue data structure.
 * @template T The type of elements held in the queue.
 * @example
 * ```ts
 * import { CircularQueue } from '@danyalwe/tools'
 *
 * const cq = new CircularQueue<number>(3)
 * cq.enqueue(1)
 * cq.enqueue(2)
 * cq.enqueue(3)
 * cq.enqueue(4) // overwrites the oldest (1)
 * cq.peek()     // 2
 * ```
 * @category Queues
 * @group Structures
 */
export class CircularQueue<T> extends Queue<T> {
  /**
   * Creates a new instance of the CircularQueue class.
   * @param size The maximum size of the queue, or an array of elements to initialize the queue with.
   * @throws An error if the resulting capacity is not positive.
   */
  constructor(size: number | T[]) {
    super(size)
    if (!(typeof size === 'number'))
      this._capacity = size.length
    if (this._capacity <= 0) throw new Error('Capacity must be greater than 0')
  }

  /**
   * Adds an element to the end of the queue.
   * @param element The element to add to the queue.
   */
  enqueue(element: T) {
    if (this.isFull) this._head++
    this._data[this._tail % this._capacity] = element
    this._tail++
  }

  /**
   * Removes and returns the element at the front of the queue.
   * @returns The element at the front of the queue.
   * @throws An error if the queue is empty.
   */
  dequeue() {
    if (this.isEmpty) throw new Error('Queue is empty')
    const item = this._data[this._head % this._capacity]
    delete this._data[this._head % this._capacity]
    this._head++
    return item
  }

  /**
   * Returns the element at the front of the queue without removing it.
   * @returns The element at the front of the queue or undefined if the queue is empty.
   */
  peek() {
    if (this.isEmpty) return undefined
    return this._data[this._head % this._capacity]
  }

  /**
   * An array of all the elements in the queue, from front to back.
   */
  get items() {
    return Array.from({ length: this.size() }, (_, i) => this._data[(this._head + i) % this._capacity])
  }

  /**
   * Returns the number of available spaces in the queue.
   */
  get space() {
    return this._capacity - this.size()
  }

  /**
   * Returns whether the queue is full.
   */
  get isFull() {
    return this._capacity > 0 && this.size() >= this._capacity
  }

  /**
   * Returns whether the queue is empty.
   */
  get isEmpty() {
    return this.size() === 0
  }
}
