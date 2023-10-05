import { ListStructure } from "./interfaces"

export class Stack<T> implements ListStructure<T> {
    protected _data: T[] = []
    protected _capacity = 0
    size = 0

    constructor(size: number | T[]) {
        if (typeof size === 'number') {
            this.size = size
            this._data = new Array<T>(size)
        } else {
            this.size = size.length
            this._data = [...size]
        }
    }

    push(element: T) {
        if (this.isFull) throw new Error('Stack is full')
        this._data.push(element)
        this._capacity += 1
    }

    pop() {
        if (this.isEmpty) throw new Error('Stack is empty')
        this._capacity -= 1
        return this._data.pop()
    }

    clear() {
        this._data = []
        return this
    }

    peek() {
        return this._data[this._data.length - 1]
    }

    get items() {
        return [...this._data] as readonly T[]
    }

    get space() {
        return this.size - this._capacity
    }

    get isEmpty() {
        return this.space === 0
    }

    get isFull() {
        return this.space === this.size
    }

    get hasRoom() {
        return this.space !== this.size
    }
}