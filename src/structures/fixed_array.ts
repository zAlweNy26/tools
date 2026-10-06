const ARRAY_INDEX = /^(?:0|[1-9]\d*)$/

/**
 * A fixed-capacity array that extends the built-in Array class.
 *
 * Every way of growing the array (`push`, `unshift`, `splice`, index assignment,
 * setting `length`) is checked against the capacity. Methods that derive a new array
 * (`map`, `filter`, `slice`, …) return plain arrays.
 * @template T The type of elements held in the array.
 * @example
 * ```ts
 * import { FixedArray } from '@danyalwe/tools'
 *
 * const arr = new FixedArray<number>(3)
 * arr.push(10)
 * arr.push(20)
 * arr.length  // 2
 * ```
 * @category Lists
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
      // `super(...capacity)` would treat a single number as a length and overflow on large arrays
      super()
      this._capacity = capacity.length
      for (const item of capacity) super.push(item)
    }
    else {
      super()
      this._capacity = 0
    }

    // a proxy is the only way to intercept index assignment and length changes on an array
    const exceeds = (target: FixedArray<T>, prop: string | symbol, value: unknown) =>
      (prop === 'length' && Number(value) > target._capacity)
      || (typeof prop === 'string' && ARRAY_INDEX.test(prop) && Number(prop) >= target._capacity)

    return new Proxy(this, {
      set(target, prop, value, receiver) {
        if (exceeds(target, prop, value)) throw new Error('Array is full')
        return Reflect.set(target, prop, value, receiver)
      },
      defineProperty(target, prop, descriptor) {
        if (exceeds(target, prop, descriptor.value)) throw new Error('Array is full')
        return Reflect.defineProperty(target, prop, descriptor)
      },
    })
  }

  static get [Symbol.species]() {
    return Array
  }

  /**
   * Creates a new fixed-capacity array from an array of items.
   * @param items The items to initialize the array with.
   * @returns A new fixed-capacity array with capacity equal to the number of items.
   * @complexity O(n).
   */
  static from<T>(items: T[]) {
    return new FixedArray(items)
  }

  /**
   * Appends new elements to the end of the fixed-capacity array.
   * @param items The items to add.
   * @throws An error if adding the items would exceed the array's capacity.
   * @returns The new length of the array.
   * @complexity O(k) for k items.
   */
  push(...items: T[]): number {
    if (this.length + items.length > this._capacity) throw new Error('Array is full')
    return super.push(...items)
  }

  /**
   * Inserts new elements at the start of the fixed-capacity array.
   * @param items The items to add.
   * @throws An error if adding the items would exceed the array's capacity.
   * @returns The new length of the array.
   * @complexity O(n + k) for k items.
   */
  unshift(...items: T[]): number {
    if (this.length + items.length > this._capacity) throw new Error('Array is full')
    return super.unshift(...items)
  }

  /**
   * Removes elements and inserts new ones in their place.
   * @param start The index at which to start changing the array.
   * @param deleteCount The number of elements to remove.
   * @param items The items to insert.
   * @throws An error if the change would exceed the array's capacity.
   * @returns The removed elements.
   * @complexity O(n).
   */
  splice(start: number, deleteCount?: number, ...items: T[]): T[] {
    const from = start < 0 ? Math.max(this.length + start, 0) : Math.min(start, this.length)
    const removed = deleteCount === undefined ? this.length - from : Math.min(Math.max(deleteCount, 0), this.length - from)
    if (this.length - removed + items.length > this._capacity) throw new Error('Array is full')
    return deleteCount === undefined && items.length === 0 ? super.splice(start) : super.splice(start, removed, ...items)
  }
}
