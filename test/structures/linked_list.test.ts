import { LinkedList, ListNode } from '@structures/linked_list'
import { describe, expect, test } from 'bun:test'

describe('ListNode', () => {
  test('constructor sets data and next', () => {
    const node = new ListNode(42)
    expect(node.data).toBe(42)
    expect(node.next).toBeNull()
  })

  test('constructor sets next when provided', () => {
    const next = new ListNode(2)
    const node = new ListNode(1, next)
    expect(node.data).toBe(1)
    expect(node.next).toBe(next)
  })
})

describe('LinkedList', () => {
  test('empty constructor creates an empty list', () => {
    const list = new LinkedList<number>()
    expect(list.size()).toBe(0)
    expect(list.isEmpty).toBeTrue()
    expect(list.head).toBeNull()
    expect(list.toArray()).toEqual([])
  })

  test('constructor from iterable initialises list', () => {
    const list = new LinkedList([1, 2, 3])
    expect(list.size()).toBe(3)
    expect(list.toArray()).toEqual([1, 2, 3])
  })

  test('append adds elements to the end', () => {
    const list = new LinkedList<number>()
    list.append(1).append(2).append(3)
    expect(list.size()).toBe(3)
    expect(list.toArray()).toEqual([1, 2, 3])
  })

  test('append returns the list for chaining', () => {
    const list = new LinkedList<number>()
    const result = list.append(1)
    expect(result).toBe(list)
  })

  test('prepend adds elements to the beginning', () => {
    const list = new LinkedList<number>()
    list.prepend(3).prepend(2).prepend(1)
    expect(list.toArray()).toEqual([1, 2, 3])
  })

  test('prepend works on empty list', () => {
    const list = new LinkedList<number>()
    list.prepend(1)
    expect(list.size()).toBe(1)
    expect(list.head!.data).toBe(1)
  })

  test('insertAt inserts at a specific index', () => {
    const list = new LinkedList([1, 3])
    list.insertAt(1, 2)
    expect(list.toArray()).toEqual([1, 2, 3])
  })

  test('insertAt at index 0 prepends', () => {
    const list = new LinkedList([2, 3])
    list.insertAt(0, 1)
    expect(list.toArray()).toEqual([1, 2, 3])
  })

  test('insertAt at size appends', () => {
    const list = new LinkedList([1, 2])
    list.insertAt(2, 3)
    expect(list.toArray()).toEqual([1, 2, 3])
  })

  test('insertAt throws on negative index', () => {
    const list = new LinkedList([1, 2])
    expect(() => list.insertAt(-1, 0)).toThrow('Index out of bounds')
  })

  test('insertAt throws on index greater than size', () => {
    const list = new LinkedList([1, 2])
    expect(() => list.insertAt(3, 0)).toThrow('Index out of bounds')
  })

  test('deleteAt removes and returns element at index', () => {
    const list = new LinkedList([1, 2, 3])
    expect(list.deleteAt(1)).toBe(2)
    expect(list.toArray()).toEqual([1, 3])
    expect(list.size()).toBe(2)
  })

  test('deleteAt removes head', () => {
    const list = new LinkedList([1, 2, 3])
    expect(list.deleteAt(0)).toBe(1)
    expect(list.toArray()).toEqual([2, 3])
  })

  test('deleteAt removes tail and updates tail pointer', () => {
    const list = new LinkedList([1, 2, 3])
    expect(list.deleteAt(2)).toBe(3)
    expect(list.toArray()).toEqual([1, 2])
    list.append(4)
    expect(list.toArray()).toEqual([1, 2, 4])
  })

  test('deleteAt returns undefined for out of bounds', () => {
    const list = new LinkedList([1, 2])
    expect(list.deleteAt(-1)).toBeUndefined()
    expect(list.deleteAt(5)).toBeUndefined()
  })

  test('deleteAt on empty list returns undefined', () => {
    const list = new LinkedList<number>()
    expect(list.deleteAt(0)).toBeUndefined()
  })

  test('delete removes by value', () => {
    const list = new LinkedList([1, 2, 3])
    expect(list.delete(2)).toBeTrue()
    expect(list.toArray()).toEqual([1, 3])
    expect(list.size()).toBe(2)
  })

  test('delete removes head by value', () => {
    const list = new LinkedList([1, 2, 3])
    expect(list.delete(1)).toBeTrue()
    expect(list.toArray()).toEqual([2, 3])
  })

  test('delete removes tail by value', () => {
    const list = new LinkedList([1, 2, 3])
    expect(list.delete(3)).toBeTrue()
    expect(list.toArray()).toEqual([1, 2])
    list.append(4)
    expect(list.toArray()).toEqual([1, 2, 4])
  })

  test('delete removes only first occurrence', () => {
    const list = new LinkedList([1, 2, 2, 3])
    expect(list.delete(2)).toBeTrue()
    expect(list.toArray()).toEqual([1, 2, 3])
  })

  test('delete returns false for missing value', () => {
    const list = new LinkedList([1, 2])
    expect(list.delete(99)).toBeFalse()
  })

  test('delete on empty list returns false', () => {
    const list = new LinkedList<number>()
    expect(list.delete(1)).toBeFalse()
  })

  test('find returns the node for existing data', () => {
    const list = new LinkedList([1, 2, 3])
    const node = list.find(2)
    expect(node).toBeDefined()
    expect(node!.data).toBe(2)
    expect(node!.next).toBeDefined()
    expect(node!.next!.data).toBe(3)
  })

  test('find returns undefined for missing data', () => {
    const list = new LinkedList([1, 2])
    expect(list.find(99)).toBeUndefined()
  })

  test('find returns undefined on empty list', () => {
    const list = new LinkedList<number>()
    expect(list.find(1)).toBeUndefined()
  })

  test('getAt returns element at index', () => {
    const list = new LinkedList([10, 20, 30])
    expect(list.getAt(0)).toBe(10)
    expect(list.getAt(1)).toBe(20)
    expect(list.getAt(2)).toBe(30)
  })

  test('getAt returns undefined for out of bounds', () => {
    const list = new LinkedList([1, 2])
    expect(list.getAt(-1)).toBeUndefined()
    expect(list.getAt(2)).toBeUndefined()
  })

  test('size returns correct count', () => {
    const list = new LinkedList<number>()
    expect(list.size()).toBe(0)
    list.append(1)
    expect(list.size()).toBe(1)
    list.append(2)
    expect(list.size()).toBe(2)
  })

  test('clear empties the list', () => {
    const list = new LinkedList([1, 2, 3])
    list.clear()
    expect(list.size()).toBe(0)
    expect(list.isEmpty).toBeTrue()
    expect(list.head).toBeNull()
    expect(list.toArray()).toEqual([])
  })

  test('isEmpty returns true only when empty', () => {
    const list = new LinkedList<number>()
    expect(list.isEmpty).toBeTrue()
    list.append(1)
    expect(list.isEmpty).toBeFalse()
    list.clear()
    expect(list.isEmpty).toBeTrue()
  })

  test('toArray returns elements in order', () => {
    const list = new LinkedList([1, 2, 3])
    expect(list.toArray()).toEqual([1, 2, 3])
    list.prepend(0)
    expect(list.toArray()).toEqual([0, 1, 2, 3])
  })

  test('reverse reverses the list in place', () => {
    const list = new LinkedList([1, 2, 3])
    const result = list.reverse()
    expect(list.toArray()).toEqual([3, 2, 1])
    expect(result).toBe(list)
  })

  test('reverse on empty list does nothing', () => {
    const list = new LinkedList<number>()
    list.reverse()
    expect(list.toArray()).toEqual([])
  })

  test('reverse on single element does nothing', () => {
    const list = new LinkedList([42])
    list.reverse()
    expect(list.toArray()).toEqual([42])
  })

  test('reverse preserves ability to append after', () => {
    const list = new LinkedList([1, 2, 3])
    list.reverse()
    list.append(4)
    expect(list.toArray()).toEqual([3, 2, 1, 4])
  })

  test('for...of iterates elements in order', () => {
    const list = new LinkedList([1, 2, 3])
    const result: number[] = []
    for (const value of list)
      result.push(value)
    expect(result).toEqual([1, 2, 3])
  })

  test('for...of works on empty list', () => {
    const list = new LinkedList<number>()
    const result: number[] = []
    for (const value of list)
      result.push(value)
    expect(result).toEqual([])
  })

  test('forEach calls callback for each element', () => {
    const list = new LinkedList([1, 2, 3])
    const values: number[] = []
    const indices: number[] = []
    list.forEach((v, i) => {
      values.push(v)
      indices.push(i)
    })
    expect(values).toEqual([1, 2, 3])
    expect(indices).toEqual([0, 1, 2])
  })

  test('map transforms elements', () => {
    const list = new LinkedList([1, 2, 3])
    const result = list.map((v, i) => v * 10 + i)
    expect(result.toArray()).toEqual([10, 21, 32])
    expect(list.toArray()).toEqual([1, 2, 3])
  })

  test('map on empty list returns empty list', () => {
    const list = new LinkedList<number>()
    const result = list.map(v => v * 2)
    expect(result.size()).toBe(0)
  })

  test('filter keeps matching elements', () => {
    const list = new LinkedList([1, 2, 3, 4, 5])
    const result = list.filter((v, i) => v % 2 === 0 && i > 0)
    expect(result.toArray()).toEqual([2, 4])
  })

  test('filter on empty list returns empty list', () => {
    const list = new LinkedList<number>()
    const result = list.filter(() => true)
    expect(result.size()).toBe(0)
  })

  test('reduce accumulates values', () => {
    const list = new LinkedList([1, 2, 3])
    const sum = list.reduce((acc, v, i) => acc + v + i, 0)
    expect(sum).toBe(9)
  })

  test('reduce with single element', () => {
    const list = new LinkedList([5])
    const result = list.reduce((acc, v) => acc + v, 10)
    expect(result).toBe(15)
  })

  test('indexOf returns position of element', () => {
    const list = new LinkedList([10, 20, 30])
    expect(list.indexOf(10)).toBe(0)
    expect(list.indexOf(20)).toBe(1)
    expect(list.indexOf(30)).toBe(2)
  })

  test('indexOf returns first occurrence', () => {
    const list = new LinkedList([1, 2, 2, 3])
    expect(list.indexOf(2)).toBe(1)
  })

  test('indexOf returns -1 for missing element', () => {
    const list = new LinkedList([1, 2])
    expect(list.indexOf(99)).toBe(-1)
  })

  test('indexOf on empty list returns -1', () => {
    const list = new LinkedList<number>()
    expect(list.indexOf(1)).toBe(-1)
  })

  test('contains returns true if element is in list', () => {
    const list = new LinkedList([1, 2, 3])
    expect(list.includes(2)).toBeTrue()
  })

  test('contains returns false if element is not in list', () => {
    const list = new LinkedList([1, 2])
    expect(list.includes(99)).toBeFalse()
  })

  test('contains on empty list returns false', () => {
    const list = new LinkedList<number>()
    expect(list.includes(1)).toBeFalse()
  })

  test('some returns true if any element matches', () => {
    const list = new LinkedList([1, 2, 3])
    expect(list.some(v => v > 2)).toBeTrue()
  })

  test('some returns false if no element matches', () => {
    const list = new LinkedList([1, 2, 3])
    expect(list.some(v => v > 10)).toBeFalse()
  })

  test('some stops after first match', () => {
    const list = new LinkedList([1, 2, 3])
    let count = 0
    const result = list.some((v) => { count++; return v === 1 })
    expect(result).toBeTrue()
    expect(count).toBe(1)
  })

  test('some on empty list returns false', () => {
    const list = new LinkedList<number>()
    expect(list.some(() => true)).toBeFalse()
  })

  test('every returns true if all elements match', () => {
    const list = new LinkedList([1, 2, 3])
    expect(list.every(v => v > 0)).toBeTrue()
  })

  test('every returns false if any element fails', () => {
    const list = new LinkedList([1, 2, 3])
    expect(list.every(v => v > 2)).toBeFalse()
  })

  test('every stops after first failure', () => {
    const list = new LinkedList([1, 2, 3])
    let count = 0
    const result = list.every((v) => { count++; return v < 2 })
    expect(result).toBeFalse()
    expect(count).toBe(2)
  })

  test('every on empty list returns true', () => {
    const list = new LinkedList<number>()
    expect(list.every(() => false)).toBeTrue()
  })
})
