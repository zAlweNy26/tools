import { BaseLinkedList, ListNode } from './base_linked_list'

/**
 * Represents a node in a doubly linked list.
 * @template T The type of data stored in the node.
 * @group Structures
 */
export class DoublyListNode<T> extends ListNode<T> {
  /**
   * The next node in the list, or null if this is the last node.
   */
  declare next: DoublyListNode<T> | null
  /**
   * The previous node in the list, or null if this is the first node.
   */
  prev: DoublyListNode<T> | null

  /**
   * Creates a new doubly linked list node.
   * @param data The data to store in the node.
   * @param next The next node in the list, or null.
   * @param prev The previous node in the list, or null.
   */
  constructor(data: T, next: DoublyListNode<T> | null = null, prev: DoublyListNode<T> | null = null) {
    super(data, next)
    this.prev = prev
  }
}

/**
 * A doubly linked list data structure.
 * @template T The type of elements held in the list.
 * @group Structures
 */
export class DoublyLinkedList<T> extends BaseLinkedList<T> {
  /**
   * Creates a new doubly linked list, optionally initialised with elements from an iterable.
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
    const node = new DoublyListNode(data)
    if (!this.head) {
      this.head = node
      this._tail = node
    }
    else {
      const tail = this._tail as DoublyListNode<T>
      tail.next = node
      node.prev = tail
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
    const node = new DoublyListNode(data, this.head as DoublyListNode<T> | null)
    if (this.head)
      (this.head as DoublyListNode<T>).prev = node
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

    const prev = this._nodeAt(index - 1) as DoublyListNode<T>
    const next = prev.next!
    const node = new DoublyListNode(data, next, prev)
    prev.next = node
    next.prev = node
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
      const node = this.head as DoublyListNode<T>
      this.head = node.next
      if (this.head)
        (this.head as DoublyListNode<T>).prev = null
      else
        this._tail = null
      this._size--
      return node.data
    }
    if (index === this._size - 1) return this.deleteLast()

    const node = this._nodeAt(index) as DoublyListNode<T>
    node.prev!.next = node.next
    const next = node.next as DoublyListNode<T>
    next.prev = node.prev
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
      this.deleteAt(0)
      return true
    }

    let current = this.head as DoublyListNode<T>
    while (current.next) {
      if (current.next.data === data) {
        const removed = current.next
        current.next = removed.next
        if (removed.next)
          (removed.next as DoublyListNode<T>).prev = current
        else
          this._tail = current
        this._size--
        return true
      }
      current = current.next as DoublyListNode<T>
    }
    return false
  }

  /**
   * Reverses the list in place.
   * @returns The list instance.
   */
  reverse(): this {
    if (!this.head || !this.head.next) return this

    let current: DoublyListNode<T> | null = this.head as DoublyListNode<T>
    const newHead = this._tail as DoublyListNode<T>
    this._tail = current

    while (current) {
      const temp = current.prev
      current.prev = current.next
      current.next = temp
      current = current.prev
    }

    this.head = newHead
    return this
  }

  /**
   * Removes and returns the last element in the list.
   * @returns The removed element, or undefined if the list is empty.
   */
  deleteLast(): T | undefined {
    if (!this._tail) return undefined
    const tail = this._tail as DoublyListNode<T>
    if (!tail.prev) {
      this.head = null
      this._tail = null
      this._size = 0
      return tail.data
    }
    tail.prev.next = null
    this._tail = tail.prev
    this._size--
    return tail.data
  }

  /**
   * Returns an array containing all the elements in reverse order.
   * @returns An array of all elements from tail to head.
   */
  toArrayReverse(): T[] {
    const result: T[] = []
    let current: DoublyListNode<T> | null = this._tail as DoublyListNode<T> | null
    while (current) {
      result.push(current.data)
      current = current.prev
    }
    return result
  }

  /**
   * Returns an iterator that traverses the list from tail to head.
   * @returns An iterator over the list's elements in reverse order.
   */
  backward(): Iterator<T> {
    let current: DoublyListNode<T> | null = this._tail as DoublyListNode<T> | null
    return {
      next: (): IteratorResult<T> => {
        if (current) {
          const value = current.data
          current = current.prev
          return { value, done: false }
        }
        return { value: undefined, done: true }
      },
    }
  }

  /**
   * Returns a new doubly linked list with the results of calling a function on each element.
   * @param callback The function to apply to each element.
   * @returns A new doubly linked list with the mapped values.
   */
  map<U>(callback: (value: T, index: number) => U): DoublyLinkedList<U> {
    const result = new DoublyLinkedList<U>()
    let current = this.head
    let index = 0
    while (current) {
      result.append(callback(current.data, index++))
      current = current.next
    }
    return result
  }

  /**
   * Returns a new doubly linked list with elements that pass the given predicate.
   * @param predicate The function to test each element.
   * @returns A new doubly linked list with the filtered elements.
   */
  filter(predicate: (value: T, index: number) => boolean): DoublyLinkedList<T> {
    const result = new DoublyLinkedList<T>()
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
