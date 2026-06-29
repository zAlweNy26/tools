import { Queue } from './queue'

/**
 * A circular queue data structure.
 * @template T The type of elements held in the queue.
 */
export class CircularQueue<T> extends Queue<T> {
  /**
   * Creates a new instance of the CircularQueue class.
   * @param size The maximum size of the queue, or an array of elements to initialize the queue with.
   */
  constructor(size: number | T[]) {
    super(size)
    if (!(typeof size === 'number'))
      this._capacity = size.length
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
