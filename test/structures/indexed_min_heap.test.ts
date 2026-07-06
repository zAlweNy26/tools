import { IndexedMinHeap } from '@structures/indexed_min_heap'
import { describe, expect, test } from 'bun:test'

describe('IndexedMinHeap', () => {
  test('constructor throws on capacity <= 0', () => {
    expect(() => new IndexedMinHeap<number>(0)).toThrow()
    expect(() => new IndexedMinHeap<number>(-1)).toThrow()
  })

  test('blank heap is empty and peekMin returns undefined', () => {
    const heap = new IndexedMinHeap<number>(10)
    expect(heap.isEmpty).toBeTrue()
    expect(heap.size()).toBe(0)
    expect(heap.peekMin()).toBeUndefined()
    expect(heap.extractMin()).toBeUndefined()
  })

  test('insert updates size and contains', () => {
    const heap = new IndexedMinHeap<number>(10)
    heap.insert(0, 5).insert(1, 3).insert(2, 7)
    expect(heap.size()).toBe(3)
    expect(heap.contains(0)).toBeTrue()
    expect(heap.contains(1)).toBeTrue()
    expect(heap.contains(2)).toBeTrue()
    expect(heap.contains(3)).toBeFalse()
    expect(heap.getValue(0)).toBe(5)
    expect(heap.getValue(1)).toBe(3)
    expect(heap.getValue(2)).toBe(7)
    expect(heap.getValue(3)).toBeUndefined()
  })

  test('insert throws on out-of-range index', () => {
    const heap = new IndexedMinHeap<number>(3)
    expect(() => heap.insert(-1, 1)).toThrow()
    expect(() => heap.insert(3, 1)).toThrow()
  })

  test('insert throws on duplicate index', () => {
    const heap = new IndexedMinHeap<number>(5)
    heap.insert(1, 10)
    expect(() => heap.insert(1, 20)).toThrow()
  })

  test('extractMin returns smallest value index', () => {
    const heap = new IndexedMinHeap<number>(10)
    heap.insert(0, 30).insert(1, 10).insert(2, 20)
    expect(heap.extractMin()).toBe(1)
    expect(heap.extractMin()).toBe(2)
    expect(heap.extractMin()).toBe(0)
    expect(heap.extractMin()).toBeUndefined()
  })

  test('extractMin removes index from heap', () => {
    const heap = new IndexedMinHeap<number>(5)
    heap.insert(0, 5)
    expect(heap.contains(0)).toBeTrue()
    heap.extractMin()
    expect(heap.contains(0)).toBeFalse()
    expect(heap.getValue(0)).toBeUndefined()
  })

  test('peekMin returns min without removing', () => {
    const heap = new IndexedMinHeap<number>(10)
    heap.insert(0, 50).insert(1, 10).insert(2, 30)
    expect(heap.peekMin()).toBe(1)
    expect(heap.size()).toBe(3)
    expect(heap.peekMin()).toBe(1)
  })

  test('decreaseKey updates value and restores heap order', () => {
    const heap = new IndexedMinHeap<number>(10)
    heap.insert(0, 50).insert(1, 40).insert(2, 30)
    heap.decreaseKey(1, 10)
    expect(heap.getValue(1)).toBe(10)
    expect(heap.extractMin()).toBe(1)
    expect(heap.extractMin()).toBe(2)
    expect(heap.extractMin()).toBe(0)
  })

  test('decreaseKey on absent index throws', () => {
    const heap = new IndexedMinHeap<number>(5)
    expect(() => heap.decreaseKey(2, 5)).toThrow()
  })

  test('decreaseKey throws when new value is greater', () => {
    const heap = new IndexedMinHeap<number>(5)
    heap.insert(1, 10)
    expect(() => heap.decreaseKey(1, 20)).toThrow()
  })

  test('decreaseKey to same value is allowed', () => {
    const heap = new IndexedMinHeap<number>(5)
    heap.insert(1, 10)
    heap.decreaseKey(1, 10)
    expect(heap.getValue(1)).toBe(10)
    expect(heap.extractMin()).toBe(1)
  })

  test('clear resets all state', () => {
    const heap = new IndexedMinHeap<number>(10)
    heap.insert(0, 1).insert(1, 2).insert(2, 3)
    heap.clear()
    expect(heap.size()).toBe(0)
    expect(heap.isEmpty).toBeTrue()
    expect(heap.contains(0)).toBeFalse()
    expect(heap.contains(1)).toBeFalse()
    expect(heap.peekMin()).toBeUndefined()
  })

  test('items returns snapshot of current heap', () => {
    const heap = new IndexedMinHeap<number>(10)
    heap.insert(0, 30).insert(1, 10).insert(2, 20)
    const arr = heap.items
    arr[0] = 99
    expect(heap.peekMin()).toBe(1)
    expect(heap.peekMin()).not.toBe(99)
  })

  test('capacity of 1 works correctly', () => {
    const heap = new IndexedMinHeap<number>(1)
    heap.insert(0, 42)
    expect(heap.peekMin()).toBe(0)
    expect(heap.extractMin()).toBe(0)
    expect(heap.extractMin()).toBeUndefined()
    heap.insert(0, 7)
    expect(heap.peekMin()).toBe(0)
  })

  test('fluent insert returns this', () => {
    const heap = new IndexedMinHeap<number>(5)
    expect(heap.insert(0, 1)).toBe(heap)
  })

  test('fluent clear returns this', () => {
    const heap = new IndexedMinHeap<number>(5)
    heap.insert(0, 1)
    expect(heap.clear()).toBe(heap)
  })

  test('fluent decreaseKey returns this', () => {
    const heap = new IndexedMinHeap<number>(5)
    heap.insert(1, 10)
    expect(heap.decreaseKey(1, 5)).toBe(heap)
  })

  test('large input maintains heap property', () => {
    const heap = new IndexedMinHeap<number>(100)
    for (let i = 99; i >= 0; i--) heap.insert(i, i)
    const result: number[] = []
    while (!heap.isEmpty) result.push(heap.extractMin()!)
    expect(result).toEqual(Array.from({ length: 100 }).map((_, i) => i))
  })

  test('decreaseKey causes correct reshuffle among many elements', () => {
    const heap = new IndexedMinHeap<number>(10)
    heap.insert(0, 100)
    heap.insert(1, 90)
    heap.insert(2, 80)
    heap.insert(3, 70)
    heap.insert(4, 60)
    heap.decreaseKey(0, 5)
    expect(heap.extractMin()).toBe(0)
  })

  test('multiple decreaseKey operations preserve heap order', () => {
    const heap = new IndexedMinHeap<number>(10)
    heap.insert(0, 30).insert(1, 25).insert(2, 20).insert(3, 15)
    heap.decreaseKey(0, 5)
    heap.decreaseKey(1, 10)
    expect(heap.extractMin()).toBe(0)
    expect(heap.extractMin()).toBe(1)
    expect(heap.extractMin()).toBe(3)
    expect(heap.extractMin()).toBe(2)
  })
})
