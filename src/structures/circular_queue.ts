import { Queue } from "./queue"

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
    }

    /**
     * Adds an element to the end of the queue.
     * @param element The element to add to the queue.
     * @throws An error if the queue is full.
     */
    enqueue(element: T) {
        if (this.isFull) {
            this._data[this._tail % this.size] = element
            this._tail = (this._tail + 1) % this.size
            this._head = this._tail === this._head ? (this._head + 1) % this.size : this._head
        } else super.enqueue(element)
    }

    /**
     * Removes and returns the element at the front of the queue.
     * @returns The element at the front of the queue.
     * @throws An error if the queue is empty.
     */
    dequeue() {
        if (this.isEmpty) throw new Error('Queue is empty')
        const item = this._data[this._head]
        delete this._data[this._head]
        this._head = (this._head + 1) % this.size
        return item
    }

    /**
     * Returns the number of available spaces in the queue.
     */
    get space() {
        return this._tail >= this._head ?
            this.size - (this._tail - this._head)
            :
            this._head - this._tail
    }

    /**
     * Returns whether the queue is full.
     */
    get isFull() {
        return this.space === 0
    }

    /**
     * Returns whether the queue is empty.
     */
    get isEmpty() {
        return this.space === this.size
    }
}