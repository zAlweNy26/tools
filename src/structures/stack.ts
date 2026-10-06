import type { CapacityOptions } from '@interfaces/structure'
import { ListStructure } from './base'

/**
 * A last-in, first-out stack.
 * Iteration and `toArray()` go from the bottom of the stack to the top.
 * @template T The type of elements held in the stack.
 * @example
 * ```ts
 * import { Stack } from '@danyalwe/tools'
 *
 * const stack = new Stack([1, 2])
 * stack.push(3)
 * stack.pop()   // 3
 * stack.peek()  // 2
 *
 * const bounded = new Stack<number>([], { capacity: 2 })
 * ```
 * @category Queues
 * @group Structures
 */
export class Stack<T> extends ListStructure<T> {
  /**
   * Creates a new stack.
   * @param items The initial elements, from bottom to top.
   * @param options The stack options.
   * @throws A RangeError if the capacity is invalid or smaller than the number of items.
   */
  constructor(items?: Iterable<T>, options?: CapacityOptions) {
    super(items, options)
  }

  /**
   * Adds an element to the top of the stack.
   * @param element The element to add.
   * @returns The stack instance.
   * @throws An error if the stack is full.
   * @complexity O(1) amortized.
   */
  push(element: T) {
    if (this.isFull) throw new Error('Stack is full')
    this._data.push(element)
    return this
  }

  /**
   * Removes and returns the element at the top of the stack.
   * @returns The top element, or undefined if the stack is empty.
   * @complexity O(1).
   */
  pop() {
    return this._data.pop()
  }

  /**
   * Returns the element at the top of the stack without removing it.
   * @returns The top element, or undefined if the stack is empty.
   * @complexity O(1).
   */
  peek() {
    return this._data.at(-1)
  }
}
