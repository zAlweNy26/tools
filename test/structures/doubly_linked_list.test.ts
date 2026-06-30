import { DoublyLinkedList, DoublyListNode } from '@structures/doubly_linked_list'
import { describe, expect, test } from 'bun:test'

describe('DoublyListNode', () => {
  test('constructor sets data, next, and prev', () => {
    const node = new DoublyListNode(42)
    expect(node.data).toBe(42)
    expect(node.next).toBeNull()
    expect(node.prev).toBeNull()
  })

  test('constructor sets next and prev when provided', () => {
    const next = new DoublyListNode(2)
    const prev = new DoublyListNode(0)
    const node = new DoublyListNode(1, next, prev)
    expect(node.data).toBe(1)
    expect(node.next).toBe(next)
    expect(node.prev).toBe(prev)
  })
})

describe('DoublyLinkedList', () => {
  test('empty constructor creates an empty list', () => {
    const list = new DoublyLinkedList<number>()
    expect(list.size()).toBe(0)
    expect(list.isEmpty).toBeTrue()
    expect(list.head).toBeNull()
    expect(list.toArray()).toEqual([])
  })

  test('constructor from iterable initialises list', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    expect(list.size()).toBe(3)
    expect(list.toArray()).toEqual([1, 2, 3])
  })

  test('append wires prev pointers', () => {
    const list = new DoublyLinkedList<number>()
    list.append(1).append(2).append(3)

    const head = list.head as DoublyListNode<number>
    expect(head.data).toBe(1)
    expect(head.prev).toBeNull()

    const mid = head.next!
    expect(mid.data).toBe(2)
    expect((mid as DoublyListNode<number>).prev).toBe(head)

    const tail = mid.next as DoublyListNode<number>
    expect(tail.data).toBe(3)
    expect(tail.prev).toBe(mid)
    expect(tail.next).toBeNull()
  })

  test('prepend wires prev pointers', () => {
    const list = new DoublyLinkedList<number>()
    list.prepend(3).prepend(2).prepend(1)

    const head = list.head as DoublyListNode<number>
    expect(head.data).toBe(1)
    expect(head.prev).toBeNull()

    const mid = head.next!
    expect(mid.data).toBe(2)
    expect((mid as DoublyListNode<number>).prev).toBe(head)

    const tail = mid.next as DoublyListNode<number>
    expect(tail.data).toBe(3)
    expect(tail.prev).toBe(mid)
  })

  test('prepend on empty list', () => {
    const list = new DoublyLinkedList<number>()
    list.prepend(1)
    expect(list.size()).toBe(1)
    expect(list.head!.data).toBe(1)
    const node = list.head as DoublyListNode<number>
    expect(node.prev).toBeNull()
    expect(node.next).toBeNull()
  })

  test('insertAt wires prev pointers', () => {
    const list = new DoublyLinkedList([1, 3])
    list.insertAt(1, 2)
    expect(list.toArray()).toEqual([1, 2, 3])

    const head = list.head as DoublyListNode<number>
    const mid = head.next as DoublyListNode<number>
    const tail = mid.next as DoublyListNode<number>
    expect(mid.prev).toBe(head)
    expect(tail.prev).toBe(mid)
  })

  test('insertAt at index 0 prepends', () => {
    const list = new DoublyLinkedList([2, 3])
    list.insertAt(0, 1)
    expect(list.toArray()).toEqual([1, 2, 3])
    const head = list.head as DoublyListNode<number>
    expect(head.prev).toBeNull()
    expect((head.next as DoublyListNode<number>).prev).toBe(head)
  })

  test('insertAt at size appends', () => {
    const list = new DoublyLinkedList([1, 2])
    list.insertAt(2, 3)
    expect(list.toArray()).toEqual([1, 2, 3])
    const second = (list.head as DoublyListNode<number>).next as DoublyListNode<number>
    const third = second.next as DoublyListNode<number>
    expect(third.prev).toBe(second)
    expect(third.next).toBeNull()
  })

  test('deleteAt maintains prev pointers (head)', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.deleteAt(0)
    expect(list.toArray()).toEqual([2, 3])
    const head = list.head as DoublyListNode<number>
    expect(head.prev).toBeNull()
  })

  test('deleteAt maintains prev pointers (middle)', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.deleteAt(1)
    expect(list.toArray()).toEqual([1, 3])
    const head = list.head as DoublyListNode<number>
    const tail = head.next as DoublyListNode<number>
    expect(tail.prev).toBe(head)
  })

  test('deleteAt maintains prev pointers (tail)', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.deleteAt(2)
    expect(list.toArray()).toEqual([1, 2])
    const head = list.head as DoublyListNode<number>
    const tail = head.next as DoublyListNode<number>
    expect(tail.prev).toBe(head)
    expect(tail.next).toBeNull()
  })

  test('deleteAt on single element returns data', () => {
    const list = new DoublyLinkedList([42])
    expect(list.deleteAt(0)).toBe(42)
    expect(list.size()).toBe(0)
    expect(list.head).toBeNull()
  })

  test('delete removes by value and maintains prev pointers', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.delete(2)
    expect(list.toArray()).toEqual([1, 3])
    const head = list.head as DoublyListNode<number>
    const tail = head.next as DoublyListNode<number>
    expect(tail.prev).toBe(head)
  })

  test('delete head by value maintains prev', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.delete(1)
    expect(list.toArray()).toEqual([2, 3])
    const head = list.head as DoublyListNode<number>
    expect(head.prev).toBeNull()
  })

  test('delete tail by value maintains prev', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.delete(3)
    expect(list.toArray()).toEqual([1, 2])
    const second = (list.head as DoublyListNode<number>).next as DoublyListNode<number>
    expect(second.next).toBeNull()
  })

  test('deleteLast removes and returns last element', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    expect(list.deleteLast()).toBe(3)
    expect(list.toArray()).toEqual([1, 2])
    expect(list.size()).toBe(2)

    const head = list.head as DoublyListNode<number>
    const tail = head.next as DoublyListNode<number>
    expect(tail.next).toBeNull()
  })

  test('deleteLast on single element clears list', () => {
    const list = new DoublyLinkedList([42])
    expect(list.deleteLast()).toBe(42)
    expect(list.size()).toBe(0)
    expect(list.head).toBeNull()
    expect(list.isEmpty).toBeTrue()
  })

  test('deleteLast on empty list returns undefined', () => {
    const list = new DoublyLinkedList<number>()
    expect(list.deleteLast()).toBeUndefined()
  })

  test('deleteLast then append works correctly', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.deleteLast()
    list.append(4)
    expect(list.toArray()).toEqual([1, 2, 4])
    const tail = list.head!.next!.next as DoublyListNode<number>
    expect(tail.prev!.data).toBe(2)
    expect(tail.next).toBeNull()
  })

  test('reverse maintains prev pointers', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.reverse()
    expect(list.toArray()).toEqual([3, 2, 1])

    const head = list.head as DoublyListNode<number>
    expect(head.prev).toBeNull()
    const mid = head.next as DoublyListNode<number>
    expect(mid.prev).toBe(head)
    const tail = mid.next as DoublyListNode<number>
    expect(tail.prev).toBe(mid)
    expect(tail.next).toBeNull()
  })

  test('reverse preserves ability to append after', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.reverse()
    list.append(4)
    expect(list.toArray()).toEqual([3, 2, 1, 4])

    const tail = list.head!.next!.next!.next as DoublyListNode<number>
    expect(tail.next).toBeNull()
    expect(tail.prev!.data).toBe(1)
  })

  test('reverse on empty list does nothing', () => {
    const list = new DoublyLinkedList<number>()
    list.reverse()
    expect(list.toArray()).toEqual([])
  })

  test('reverse on single element does nothing', () => {
    const list = new DoublyLinkedList([42])
    list.reverse()
    expect(list.toArray()).toEqual([42])
    const node = list.head as DoublyListNode<number>
    expect(node.prev).toBeNull()
    expect(node.next).toBeNull()
  })

  test('toArrayReverse returns elements tail to head', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    expect(list.toArrayReverse()).toEqual([3, 2, 1])
  })

  test('toArrayReverse on empty list returns empty array', () => {
    const list = new DoublyLinkedList<number>()
    expect(list.toArrayReverse()).toEqual([])
  })

  test('backward iterator traverses tail to head', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    const result: number[] = []
    const iter = list.backward()
    let item = iter.next()
    while (!item.done) {
      result.push(item.value)
      item = iter.next()
    }
    expect(result).toEqual([3, 2, 1])
  })

  test('backward iterator on empty list yields nothing', () => {
    const list = new DoublyLinkedList<number>()
    const iter = list.backward()
    expect(iter.next()).toEqual({ value: undefined, done: true })
  })

  test('map returns DoublyLinkedList with correct prev pointers', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    const result = list.map(v => v * 10)
    expect(result).toBeInstanceOf(DoublyLinkedList)
    expect(result.toArray()).toEqual([10, 20, 30])

    // Verify prev pointers in result
    const head = result.head as DoublyListNode<number>
    expect(head.prev).toBeNull()
    const mid = head.next as DoublyListNode<number>
    expect(mid.prev).toBe(head)
    const tail = mid.next as DoublyListNode<number>
    expect(tail.prev).toBe(mid)
    expect(tail.next).toBeNull()
  })

  test('filter returns DoublyLinkedList with correct prev pointers', () => {
    const list = new DoublyLinkedList([1, 2, 3, 4])
    const result = list.filter(v => v % 2 === 0)
    expect(result).toBeInstanceOf(DoublyLinkedList)
    expect(result.toArray()).toEqual([2, 4])

    const head = result.head as DoublyListNode<number>
    expect(head.prev).toBeNull()
    const tail = head.next as DoublyListNode<number>
    expect(tail.prev).toBe(head)
    expect(tail.next).toBeNull()
  })

  test('inherited: find returns node', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    const node = list.find(2) as DoublyListNode<number>
    expect(node).toBeDefined()
    expect(node.data).toBe(2)
    expect(node.prev).toBeDefined()
    expect(node.prev!.data).toBe(1)
    expect(node.next).toBeDefined()
  })

  test('inherited: getAt works', () => {
    const list = new DoublyLinkedList([10, 20, 30])
    expect(list.getAt(0)).toBe(10)
    expect(list.getAt(1)).toBe(20)
    expect(list.getAt(2)).toBe(30)
  })

  test('inherited: for...of iterates forward', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    const result: number[] = []
    for (const value of list)
      result.push(value)
    expect(result).toEqual([1, 2, 3])
  })

  test('inherited: forEach calls callback', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    const values: number[] = []
    list.forEach(v => values.push(v))
    expect(values).toEqual([1, 2, 3])
  })

  test('inherited: reduce accumulates', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    const sum = list.reduce((acc, v) => acc + v, 0)
    expect(sum).toBe(6)
  })

  test('inherited: indexOf returns position', () => {
    const list = new DoublyLinkedList([10, 20, 30])
    expect(list.indexOf(20)).toBe(1)
    expect(list.indexOf(99)).toBe(-1)
  })

  test('inherited: contains works', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    expect(list.includes(2)).toBeTrue()
    expect(list.includes(99)).toBeFalse()
  })

  test('inherited: some works', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    expect(list.some(v => v > 2)).toBeTrue()
    expect(list.some(v => v > 10)).toBeFalse()
  })

  test('inherited: every works', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    expect(list.every(v => v > 0)).toBeTrue()
    expect(list.every(v => v > 2)).toBeFalse()
  })

  test('inherited: clear empties list', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.clear()
    expect(list.size()).toBe(0)
    expect(list.head).toBeNull()
    expect(list.isEmpty).toBeTrue()
  })
})
