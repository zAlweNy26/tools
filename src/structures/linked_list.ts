import { BaseLinkedList, ListNode } from './base_linked_list'

export { ListNode }

/**
 * A singly linked list data structure.
 * @template T The type of elements held in the list.
 * @group Structures
 */
export class LinkedList<T> extends BaseLinkedList<T> {
  /**
   * Creates a new linked list, optionally initialised with elements from an iterable.
   * @param items An iterable of elements to initialise the list with.
   */
  constructor(items?: Iterable<T>) {
    super()
    if (items) {
      for (const item of items)
        this.append(item)
    }
  }

  /**
   * Adds an element to the end of the list.
   * @param data The data to append.
   * @returns The list instance.
   */
  append(data: T): this {
    const node = new ListNode(data)
    if (!this.head) {
      this.head = node
      this._tail = node
    }
    else {
      this._tail!.next = node
      this._tail = node
    }
    this._size++
    return this
  }

  /**
   * Adds an element to the beginning of the list.
   * @param data The data to prepend.
   * @returns The list instance.
   */
  prepend(data: T): this {
    const node = new ListNode(data, this.head)
    this.head = node
    if (!this._tail)
      this._tail = node
    this._size++
    return this
  }

  /**
   * Inserts an element at the given index.
   * @param index The position at which to insert the element.
   * @param data The data to insert.
   * @returns The list instance.
   * @throws An error if the index is out of bounds.
   */
  insertAt(index: number, data: T): this {
    if (index < 0 || index > this._size)
      throw new Error('Index out of bounds')
    if (index === 0) return this.prepend(data)
    if (index === this._size) return this.append(data)

    const prev = this._nodeAt(index - 1)
    prev.next = new ListNode(data, prev.next)
    this._size++
    return this
  }

  /**
   * Removes and returns the element at the given index.
   * @param index The index of the element to remove.
   * @returns The removed element, or undefined if the index is out of bounds.
   */
  deleteAt(index: number): T | undefined {
    if (index < 0 || index >= this._size) return undefined
    if (index === 0) {
      const node = this.head!
      this.head = node.next
      if (!this.head) this._tail = null
      this._size--
      return node.data
    }

    const prev = this._nodeAt(index - 1)
    const node = prev.next!
    prev.next = node.next
    if (!prev.next) this._tail = prev
    this._size--
    return node.data
  }

  /**
   * Removes the first occurrence of the given data from the list.
   * @param data The data to remove.
   * @returns True if the element was found and removed, false otherwise.
   */
  delete(data: T): boolean {
    if (!this.head) return false

    if (this.head.data === data) {
      this.head = this.head.next
      if (!this.head) this._tail = null
      this._size--
      return true
    }

    let current = this.head
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next
        if (!current.next) this._tail = current
        this._size--
        return true
      }
      current = current.next
    }
    return false
  }

  /**
   * Reverses the list in place.
   * @returns The list instance.
   */
  reverse(): this {
    if (!this.head || !this.head.next) return this

    this._tail = this.head
    let prev: ListNode<T> | null = null
    let current: ListNode<T> | null = this.head

    while (current) {
      const next: ListNode<T> | null = current.next
      current.next = prev
      prev = current
      current = next
    }

    this.head = prev
    return this
  }

  /**
   * Returns a new linked list with the results of calling a function on each element.
   * @param callback The function to apply to each element.
   * @returns A new linked list with the mapped values.
   */
  map<U>(callback: (value: T, index: number) => U): LinkedList<U> {
    const result = new LinkedList<U>()
    let current = this.head
    let index = 0
    while (current) {
      result.append(callback(current.data, index++))
      current = current.next
    }
    return result
  }

  /**
   * Returns a new linked list with elements that pass the given predicate.
   * @param predicate The function to test each element.
   * @returns A new linked list with the filtered elements.
   */
  filter(predicate: (value: T, index: number) => boolean): LinkedList<T> {
    const result = new LinkedList<T>()
    let current = this.head
    let index = 0
    while (current) {
      if (predicate(current.data, index)) result.append(current.data)
      current = current.next
      index++
    }
    return result
  }
}
