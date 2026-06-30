/**
 * A fixed-capacity array that extends the built-in Array class.
 * @template T The type of elements held in the array.
 * @group Structures
 */
export class FixedArray<T> extends Array<T> {
  private _capacity: number

  constructor(capacity: number | T[]) {
    if (typeof capacity === 'number') {
      super()
      this._capacity = capacity
    }
    else if (capacity) {
      super(...capacity)
      this._capacity = capacity.length
    }
    else {
      super()
      this._capacity = 0
    }
  }

  static from<T>(items: T[]) {
    return new FixedArray(items)
  }

  push(...items: T[]): number {
    if (this.length + items.length > this._capacity) throw new Error('Array is full')
    return super.push(...items)
  }
}
