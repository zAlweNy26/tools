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

// walking backwards follows every prev pointer from the tail, so matching both directions checks the links
function expectLinked<T>(list: DoublyLinkedList<T>, expected: T[]) {
  expect(list.toArray()).toEqual(expected)
  expect(list.toArrayReverse()).toEqual([...expected].reverse())
  expect(list.size).toBe(expected.length)
}

describe('DoublyLinkedList', () => {
  test('empty constructor creates an empty list', () => {
    const list = new DoublyLinkedList<number>()
    expect(list.isEmpty).toBeTrue()
    expectLinked(list, [])
  })

  test('constructor from iterable initialises list', () => {
    expectLinked(new DoublyLinkedList([1, 2, 3]), [1, 2, 3])
  })

  test('append wires prev pointers', () => {
    const list = new DoublyLinkedList<number>()
    list.append(1).append(2).append(3)
    expectLinked(list, [1, 2, 3])
  })

  test('prepend wires prev pointers', () => {
    const list = new DoublyLinkedList<number>()
    list.prepend(3).prepend(2).prepend(1)
    expectLinked(list, [1, 2, 3])
  })

  test('prepend on empty list', () => {
    const list = new DoublyLinkedList<number>()
    list.prepend(1)
    expectLinked(list, [1])
  })

  test('insertAt wires prev pointers', () => {
    const list = new DoublyLinkedList([1, 3])
    list.insertAt(1, 2)
    expectLinked(list, [1, 2, 3])
  })

  test('insertAt at index 0 prepends', () => {
    const list = new DoublyLinkedList([2, 3])
    list.insertAt(0, 1)
    expectLinked(list, [1, 2, 3])
  })

  test('insertAt at size appends', () => {
    const list = new DoublyLinkedList([1, 2])
    list.insertAt(2, 3)
    expectLinked(list, [1, 2, 3])
  })

  test('insertAt out of bounds throws a RangeError', () => {
    const list = new DoublyLinkedList([1])
    expect(() => list.insertAt(5, 2)).toThrow(RangeError)
    expect(() => list.insertAt(-1, 2)).toThrow('Index out of bounds')
  })

  test('deleteAt maintains prev pointers (head)', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    expect(list.deleteAt(0)).toBe(1)
    expectLinked(list, [2, 3])
  })

  test('deleteAt maintains prev pointers (middle)', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    expect(list.deleteAt(1)).toBe(2)
    expectLinked(list, [1, 3])
  })

  test('deleteAt maintains prev pointers (tail)', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    expect(list.deleteAt(2)).toBe(3)
    expectLinked(list, [1, 2])
  })

  test('deleteAt on single element returns data', () => {
    const list = new DoublyLinkedList([42])
    expect(list.deleteAt(0)).toBe(42)
    expectLinked(list, [])
  })

  test('deleteAt out of bounds returns undefined', () => {
    const list = new DoublyLinkedList([1])
    expect(list.deleteAt(3)).toBeUndefined()
    expectLinked(list, [1])
  })

  test('delete removes by value and maintains prev pointers', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    expect(list.delete(2)).toBeTrue()
    expectLinked(list, [1, 3])
  })

  test('delete head by value maintains prev', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.delete(1)
    expectLinked(list, [2, 3])
  })

  test('delete tail by value maintains prev', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.delete(3)
    expectLinked(list, [1, 2])
  })

  test('delete returns false for a missing value', () => {
    const list = new DoublyLinkedList([1, 2])
    expect(list.delete(9)).toBeFalse()
    expectLinked(list, [1, 2])
  })

  test('deleteLast removes and returns last element', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    expect(list.deleteLast()).toBe(3)
    expectLinked(list, [1, 2])
  })

  test('deleteLast on single element clears list', () => {
    const list = new DoublyLinkedList([42])
    expect(list.deleteLast()).toBe(42)
    expect(list.isEmpty).toBeTrue()
    expectLinked(list, [])
  })

  test('deleteLast on empty list returns undefined', () => {
    const list = new DoublyLinkedList<number>()
    expect(list.deleteLast()).toBeUndefined()
  })

  test('deleteLast then append works correctly', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.deleteLast()
    list.append(4)
    expectLinked(list, [1, 2, 4])
  })

  test('reverse maintains prev pointers', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.reverse()
    expectLinked(list, [3, 2, 1])
  })

  test('reverse preserves ability to append after', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    list.reverse()
    list.append(4)
    expectLinked(list, [3, 2, 1, 4])
  })

  test('reverse on empty list does nothing', () => {
    const list = new DoublyLinkedList<number>()
    list.reverse()
    expectLinked(list, [])
  })

  test('reverse on single element does nothing', () => {
    const list = new DoublyLinkedList([42])
    list.reverse()
    expectLinked(list, [42])
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
    expect([...list.backward()]).toEqual([3, 2, 1])
  })

  test('backward iterator on empty list yields nothing', () => {
    const list = new DoublyLinkedList<number>()
    expect(list.backward().next()).toEqual({ value: undefined, done: true })
  })

  test('map returns DoublyLinkedList with correct prev pointers', () => {
    const result = new DoublyLinkedList([1, 2, 3]).map(v => v * 10)
    expect(result).toBeInstanceOf(DoublyLinkedList)
    expectLinked(result, [10, 20, 30])
  })

  test('filter returns DoublyLinkedList with correct prev pointers', () => {
    const result = new DoublyLinkedList([1, 2, 3, 4]).filter(v => v % 2 === 0)
    expect(result).toBeInstanceOf(DoublyLinkedList)
    expectLinked(result, [2, 4])
  })

  test('inherited: find returns the first matching value', () => {
    const list = new DoublyLinkedList([1, 2, 3, 4])
    expect(list.find(v => v > 1)).toBe(2)
    expect(list.find((_, i) => i === 3)).toBe(4)
    expect(list.find(v => v > 9)).toBeUndefined()
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
    expect(list.clear()).toBe(list)
    expect(list.isEmpty).toBeTrue()
    expectLinked(list, [])
  })

  test('backward can be used in for...of', () => {
    const list = new DoublyLinkedList([1, 2, 3])
    const result: number[] = []
    for (const v of list.backward()) result.push(v)
    expect(result).toEqual([3, 2, 1])
  })

  test('index operations are correct in both halves of the list', () => {
    const values = Array.from({ length: 11 }, (_, i) => i)
    const list = new DoublyLinkedList(values)
    for (const i of values) expect(list.getAt(i)).toBe(i)
    list.insertAt(8, 100)
    list.insertAt(2, 200)
    expect(list.deleteAt(9)).toBe(100)
    expect(list.deleteAt(8)).toBe(7)
    expectLinked(list, [0, 1, 200, 2, 3, 4, 5, 6, 8, 9, 10])
  })
})
