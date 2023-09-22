import { List } from "./interfaces"

export class Queue<T> implements List<T> {
    protected _data: T[] = []
    protected _head = 0
    protected _tail = 0
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
    
    enqueue(element: T) {
        if (this.isFull) throw new Error('Queue is full')
        this._data[this._tail] = element
        this._tail++
    }

    dequeue() {
        if (this.isEmpty) throw new Error('Queue is empty')
        const item = this._data[this._head]
        delete this._data[this._head]
        this._head++
        return item
    }

    clear() {
        this._data = []
        this._head = 0
        this._tail = 0
        return this
    }

    peek() {
        if (this.isEmpty) return undefined
        return this._data[this._head]
    }

    get items() {
        if (this.isEmpty) return []
        return [...this._data.filter(v => v != undefined)]
    }

    get space() {
        return this._size - (this._tail - this._head)
    }

    get isEmpty() {
        return this._tail === this._head
    }

    get isFull() {
        return this.space === 0
    }

    get hasRoom() {
        return this.space !== 0
    }
}