import { ListStructure } from "./interfaces"

/**
 * A queue data structure.
 * @template T The type of elements held in the queue.
 */
export class Queue<T> extends ListStructure<T> {
    protected _data: T[] = []
    protected _head = 0
    protected _tail = 0

    /**
     * Creates a new queue with the specified size or elements.
     * @param size The size of the queue or an array of elements to initialize the queue with.
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
        if (this.isFull) throw new Error('Queue is full')
        this._data[this._tail] = element
        this._tail++
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
        this._head++
        return item
    }

    /**
     * Removes all elements from the queue.
     * @returns The queue instance.
     */
    clear() {
        this._data = []
        this._head = 0
        this._tail = 0
        return this
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * @returns The element at the front of the queue or undefined if the queue is empty.
     */
    peek() {
        if (this.isEmpty) return undefined
        return this._data[this._head]
    }

    /**
     * Returns the number of available spaces in the queue.
     * @returns The number of available spaces in the queue.
     */
    get space() {
        return this.size() - (this._tail - this._head)
    }

    /**
     * Returns true if the queue is empty.
     * @returns True if the queue is empty, false otherwise.
     */
    get isEmpty() {
        return this._tail === this._head
    }

    /**
     * Returns true if the queue is full.
     * @returns True if the queue is full, false otherwise.
     */
    get isFull() {
        return this.space === 0
    }

    /**
     * Returns true if the queue has available space.
     * @returns True if the queue has available space, false otherwise.
     */
    get hasRoom() {
        return this.space !== 0
    }
}