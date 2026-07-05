import { Heap } from '@structures/heap'
import { describe, expect, test } from 'bun:test'

describe('Heap', () => {
  test('min-heap by default', () => {
    const heap = new Heap<number>()
    heap.insert(3).insert(1).insert(2)
    expect(heap.peek()).toBe(1)
    expect(heap.extract()).toBe(1)
    expect(heap.extract()).toBe(2)
    expect(heap.extract()).toBe(3)
    expect(heap.extract()).toBeUndefined()
  })

  test('max-heap via comparator', () => {
    const heap = new Heap<number>((a, b) => a > b)
    heap.insert(3).insert(1).insert(2)
    expect(heap.peek()).toBe(3)
    expect(heap.extract()).toBe(3)
    expect(heap.extract()).toBe(2)
    expect(heap.extract()).toBe(1)
  })

  test('size and isEmpty', () => {
    const heap = new Heap<number>()
    expect(heap.size()).toBe(0)
    expect(heap.isEmpty).toBeTrue()
    heap.insert(5)
    expect(heap.size()).toBe(1)
    expect(heap.isEmpty).toBeFalse()
    heap.extract()
    expect(heap.size()).toBe(0)
    expect(heap.isEmpty).toBeTrue()
  })

  test('clear', () => {
    const heap = new Heap<number>()
    heap.insert(1).insert(2).insert(3)
    heap.clear()
    expect(heap.size()).toBe(0)
    expect(heap.isEmpty).toBeTrue()
    expect(heap.peek()).toBeUndefined()
  })

  test('items returns copy of internal data', () => {
    const heap = new Heap<number>()
    heap.insert(3).insert(1).insert(4).insert(2)
    const arr = heap.items
    arr[0] = 99
    expect(heap.peek()).not.toBe(99)
  })

  test('large input maintains heap property', () => {
    const heap = new Heap<number>()
    for (let i = 100; i >= 1; i--) heap.insert(i)
    const result: number[] = []
    while (!heap.isEmpty) result.push(heap.extract()!)
    expect(result).toEqual(Array.from({ length: 100 }).map((_, i) => i + 1))
  })

  test('custom object comparator', () => {
    const heap = new Heap<{ v: number }>((a, b) => a.v < b.v)
    heap.insert({ v: 5 }).insert({ v: 1 }).insert({ v: 3 })
    expect(heap.extract()!.v).toBe(1)
    expect(heap.extract()!.v).toBe(3)
    expect(heap.extract()!.v).toBe(5)
  })

  test('peek on empty returns undefined', () => {
    const heap = new Heap<number>()
    expect(heap.peek()).toBeUndefined()
  })

  test('extract on empty returns undefined', () => {
    const heap = new Heap<number>()
    expect(heap.extract()).toBeUndefined()
  })

  test('fluent insert returns this', () => {
    const heap = new Heap<number>()
    const ret = heap.insert(1)
    expect(ret).toBe(heap)
  })

  test('fluent clear returns this', () => {
    const heap = new Heap<number>()
    heap.insert(1)
    const ret = heap.clear()
    expect(ret).toBe(heap)
  })
})
