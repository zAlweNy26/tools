import { List } from "./interfaces"

export class Stack<T> implements List<T> {
    protected _data: T[] = []
    protected _capacity = 0
    protected _size = 0

    constructor(size: number | T[]) {
        if (typeof size === 'number') {
            this._size = size
            this._data = new Array<T>(size)
        } else {
            this._size = size.length
            this._data = [...size]
        }
    }

    push(element: T) {
        if (this.isFull) throw new Error('Stack is full')
        this._data.push(element)
    }

    pop() {
        if (this.isEmpty) throw new Error('Stack is empty')
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
        return [...this._data]
    }

    get space() {
        return this._data.length
    }

    get isEmpty() {
        return this.space === 0
    }

    get isFull() {
        return this.space === this._size
    }

    get hasRoom() {
        return this.space !== this._size
    }
}