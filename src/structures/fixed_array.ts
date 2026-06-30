/**
 * A fixed-capacity array that extends the built-in Array class.
 * @template T The type of elements held in the array.
 * @group Structures
 */
export class FixedArray<T> extends Array<T> {
  private _capacity: number

  /**
   * Creates a new fixed-capacity array.
   * @param capacity The maximum capacity (as a number) or an initial set of items (as an array).
   */
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

  /**
   * Creates a new fixed-capacity array from an array of items.
   * @param items The items to initialize the array with.
   * @returns A new fixed-capacity array with capacity equal to the number of items.
   */
  static from<T>(items: T[]) {
    return new FixedArray(items)
  }

  /**
   * Appends new elements to the end of the fixed-capacity array.
   * @param items The items to add.
   * @throws An error if adding the items would exceed the array's capacity.
   * @returns The new length of the array.
   */
  push(...items: T[]): number {
    if (this.length + items.length > this._capacity) throw new Error('Array is full')
    return super.push(...items)
  }
}
