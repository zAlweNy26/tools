import { Queue } from "./queue"

export class CircularQueue<T> extends Queue<T> {
    constructor(size: number | T[]) {
        super(size) 
    }

    enqueue(element: T) {
        if (this.isFull) {
            this._data[this._tail % this.size] = element
            this._tail = (this._tail + 1) % this.size
            this._head = this._tail === this._head ? (this._head + 1) % this.size : this._head
        } else {
            super.enqueue(element)
        }
    }

    dequeue() {
        if (this.isEmpty) throw new Error('Queue is empty')
        const item = this._data[this._head]
        delete this._data[this._head]
        this._head = (this._head + 1) % this.size
        return item
    }

    get space() {
        return this._tail >= this._head ?
            this.size - (this._tail - this._head)
            :
            this._head - this._tail
    }

    get isFull() {
        return this.space === 0
    }

    get isEmpty() {
        return this.space === this.size
    }
}