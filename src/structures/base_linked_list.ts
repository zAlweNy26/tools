import type { Structure } from '../interfaces/structure'

/**
 * Represents a node in a singly linked list.
 * @template T The type of data stored in the node.
 * @group Structures
 */
export class ListNode<T> {
  /**
   * The data stored in the node.
   */
  data: T
  /**
   * The next node in the list, or null if this is the last node.
   */
  next: ListNode<T> | null

  /**
   * Creates a new list node.
   * @param data The data to store in the node.
   * @param next The next node in the list, or null.
   */
  constructor(data: T, next: ListNode<T> | null = null) {
    this.data = data
    this.next = next
  }
}

/**
 * Abstract base class for linked list implementations.
 * @template T The type of elements held in the list.
 * @group Structures
 */
export abstract class BaseLinkedList<T> implements Structure {
  /**
   * The first node in the list, or null if the list is empty.
   */
  head: ListNode<T> | null = null

  protected _tail: ListNode<T> | null = null
  protected _size = 0

  /**
   * Adds an element to the end of the list.
   * @param data The data to append.
   * @returns The list instance.
   */
  abstract append(data: T): this

  /**
   * Adds an element to the beginning of the list.
   * @param data The data to prepend.
   * @returns The list instance.
   */
  abstract prepend(data: T): this

  /**
   * Inserts an element at the given index.
   * @param index The position at which to insert the element.
   * @param data The data to insert.
   * @returns The list instance.
   * @throws An error if the index is out of bounds.
   */
  abstract insertAt(index: number, data: T): this

  /**
   * Removes and returns the element at the given index.
   * @param index The index of the element to remove.
   * @returns The removed element, or undefined if the index is out of bounds.
   */
  abstract deleteAt(index: number): T | undefined

  /**
   * Removes the first occurrence of the given data from the list.
   * @param data The data to remove.
   * @returns True if the element was found and removed, false otherwise.
   */
  abstract delete(data: T): boolean

  /**
   * Reverses the list in place.
   * @returns The list instance.
   */
  abstract reverse(): this

  /**
   * Finds the first node containing the given data.
   * @param data The data to search for.
   * @returns The node containing the data, or undefined if not found.
   */
  find(data: T): ListNode<T> | undefined {
    let current = this.head
    while (current) {
      if (current.data === data) return current
      current = current.next
    }
    return undefined
  }

  /**
   * Returns the element at the given index.
   * @param index The index of the element to retrieve.
   * @returns The element at the given index, or undefined if out of bounds.
   */
  getAt(index: number): T | undefined {
    if (index < 0 || index >= this._size) return undefined
    return this._nodeAt(index).data
  }

  /**
   * The current number of elements in the list.
   */
  size(): number {
    return this._size
  }

  /**
   * Clears the list, removing all elements.
   */
  clear(): void {
    this.head = null
    this._tail = null
    this._size = 0
  }

  /**
   * Returns true if the list is empty, false otherwise.
   */
  get isEmpty(): boolean {
    return this._size === 0
  }

  /**
   * Returns an array containing all the elements in the list.
   * @returns An array of all elements in order.
   */
  toArray(): T[] {
    const result: T[] = []
    let current = this.head
    while (current) {
      result.push(current.data)
      current = current.next
    }
    return result
  }

  /**
   * Calls a function for each element in the list.
   * @param callback The function to call for each element.
   */
  forEach(callback: (value: T, index: number) => void): void {
    let current = this.head
    let index = 0
    while (current) {
      callback(current.data, index++)
      current = current.next
    }
  }

  /**
   * Reduces the list to a single value.
   * @param callback The function to call for each element.
   * @param initialValue The initial value for the accumulator.
   * @returns The reduced value.
   */
  reduce<U>(callback: (accumulator: U, value: T, index: number) => U, initialValue: U): U {
    let accumulator = initialValue
    let current = this.head
    let index = 0
    while (current) {
      accumulator = callback(accumulator, current.data, index++)
      current = current.next
    }
    return accumulator
  }

  /**
   * Returns the index of the first occurrence of the given data.
   * @param data The data to search for.
   * @returns The index of the data, or -1 if not found.
   */
  indexOf(data: T): number {
    let current = this.head
    let index = 0
    while (current) {
      if (current.data === data) return index
      current = current.next
      index++
    }
    return -1
  }

  /**
   * Returns true if the list includes the given data.
   * @param data The data to search for.
   * @returns True if the data is found, false otherwise.
   */
  includes(data: T): boolean {
    // eslint-disable-next-line e18e/prefer-includes, unicorn/prefer-includes
    return this.indexOf(data) !== -1
  }

  /**
   * Returns true if at least one element satisfies the predicate.
   * @param predicate The function to test each element.
   * @returns True if any element satisfies the predicate.
   */
  some(predicate: (value: T, index: number) => boolean): boolean {
    let current = this.head
    let index = 0
    while (current) {
      if (predicate(current.data, index++)) return true
      current = current.next
    }
    return false
  }

  /**
   * Returns true if all elements satisfy the predicate.
   * @param predicate The function to test each element.
   * @returns True if all elements satisfy the predicate.
   */
  every(predicate: (value: T, index: number) => boolean): boolean {
    let current = this.head
    let index = 0
    while (current) {
      if (!predicate(current.data, index++)) return false
      current = current.next
    }
    return true
  }

  /**
   * Iterator for the list, enabling for...of iteration.
   * @returns An iterator over the list's elements.
   */
  [Symbol.iterator](): Iterator<T> {
    let current = this.head
    return {
      next: (): IteratorResult<T> => {
        if (current) {
          const value = current.data
          current = current.next
          return { value, done: false }
        }
        return { value: undefined, done: true }
      },
    }
  }

  protected _nodeAt(index: number): ListNode<T> {
    let current = this.head!
    for (let i = 0; i < index; i++)
      current = current.next!
    return current
  }
}
