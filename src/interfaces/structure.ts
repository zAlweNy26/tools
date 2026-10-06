/**
 * Common interface implemented by every collection.
 * Iterating a structure yields the same elements, in the same order, as `toArray()`.
 * @template T The type of the elements held in the structure.
 * @group Interfaces
 */
export interface Structure<T> extends Iterable<T> {
  /**
   * The number of elements in the structure.
   */
  readonly size: number
  /**
   * Whether the structure holds no elements.
   */
  readonly isEmpty: boolean
  /**
   * Removes every element.
   * @returns The structure instance.
   */
  clear: () => this
  /**
   * Returns the elements as a new array.
   */
  toArray: () => T[]
}

/**
 * Options for structures that can be limited to a maximum number of elements.
 * @group Interfaces
 */
export interface CapacityOptions {
  /**
   * The maximum number of elements. Defaults to `Infinity` (unbounded).
   */
  capacity?: number
}

/**
 * Options for structures that order their elements.
 * @template T The type of the elements being compared.
 * @group Interfaces
 */
export interface CompareOptions<T> {
  /**
   * Returns a negative number if `a` comes before `b`, a positive number if after, and 0 if they are equal.
   * Defaults to {@link defaultCompare}.
   */
  compare?: Comparator<T>
}

/**
 * A comparison function in the style of `Array.prototype.sort`.
 * @template T The type of the elements being compared.
 * @group Interfaces
 */
export type Comparator<T> = (a: T, b: T) => number
