import { ListStructure } from "./interfaces"

/**
 * A stack data structure.
 * @template T The type of elements held in the stack.
 */
export class Stack<T> implements ListStructure<T> {
    protected _data: T[] = []
    protected _capacity = 0
    size = 0

    /**
     * Creates a new stack with the specified size or elements.
     * @param size The size of the stack or an array of elements to initialize the stack with.
     */
    constructor(size: number | T[]) {
        if (typeof size === 'number') {
            this.size = size
            this._data = new Array<T>(size)
        } else {
            this.size = size.length
            this._data = [...size]
        }
    }

    /**
     * Adds an element to the top of the stack.
     * @param element The element to add to the stack.
     * @throws An error if the stack is full.
     */
    push(element: T) {
        if (this.isFull) throw new Error('Stack is full')
        this._data.push(element)
        this._capacity += 1
    }

    /**
     * Removes and returns the element at the top of the stack.
     * @returns The element at the top of the stack.
     * @throws An error if the stack is empty.
     */
    pop() {
        if (this.isEmpty) throw new Error('Stack is empty')
        this._capacity -= 1
        return this._data.pop()
    }

    /**
     * Removes all elements from the stack.
     * @returns The stack instance.
     */
    clear() {
        this._data = []
        return this
    }

    /**
     * Returns the element at the top of the stack without removing it.
     * @returns The element at the top of the stack.
     */
    peek() {
        return this._data[this._data.length - 1]
    }

    /**
     * Returns a copy of the elements in the stack.
     * @returns A copy of the elements in the stack.
     */
    get items() {
        return [...this._data] as readonly T[]
    }

    /**
     * Returns the remaining space in the stack.
     * @returns The remaining space in the stack.
     */
    get space() {
        return this.size - this._capacity
    }

    /**
     * Returns true if the stack is empty, false otherwise.
     * @returns True if the stack is empty, false otherwise.
     */
    get isEmpty() {
        return this.space === 0
    }

    /**
     * Returns true if the stack is full, false otherwise.
     * @returns True if the stack is full, false otherwise.
     */
    get isFull() {
        return this.space === this.size
    }

    /**
     * Returns true if the stack has room for more elements, false otherwise.
     * @returns True if the stack has room for more elements, false otherwise.
     */
    get hasRoom() {
        return this.space !== this.size
    }
}