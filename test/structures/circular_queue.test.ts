import { CircularQueue } from '@structures/circular_queue'
import { describe, expect, test } from 'bun:test'

describe('CircularQueue', () => {
  test('enqueue and dequeue follow first-in, first-out order', () => {
    const cq = new CircularQueue<number>(3)
    cq.enqueue(1).enqueue(2)
    expect(cq.dequeue()).toBe(1)
    expect(cq.dequeue()).toBe(2)
    expect(cq.isEmpty).toBeTrue()
  })

  test('dequeue and peek return undefined when empty', () => {
    const cq = new CircularQueue<number>(2)
    expect(cq.dequeue()).toBeUndefined()
    expect(cq.peek()).toBeUndefined()
  })

  test('enqueueing when full overwrites the oldest element', () => {
    const cq = new CircularQueue<number>(3)
    for (const v of [1, 2, 3, 4, 5]) cq.enqueue(v)
    expect(cq.size).toBe(3)
    expect(cq.isFull).toBeTrue()
    expect(cq.toArray()).toEqual([3, 4, 5])
    expect([...cq]).toEqual([3, 4, 5])
  })

  test('peek returns the front element after wraparound', () => {
    const cq = new CircularQueue<number>(3)
    for (const v of [1, 2, 3, 4]) cq.enqueue(v)
    cq.dequeue()
    cq.dequeue()
    expect(cq.peek()).toBe(4)
  })

  test('keeps order across many interleaved operations', () => {
    const cq = new CircularQueue<number>(4)
    const expected: number[] = []
    for (let i = 0; i < 50; i++) {
      cq.enqueue(i)
      expected.push(i)
      if (expected.length > 4) expected.shift()
      if (i % 3 === 0) expect(cq.dequeue()).toBe(expected.shift())
    }
    expect(cq.toArray()).toEqual(expected)
  })

  test('initial items keep only the last `capacity` elements', () => {
    const cq = new CircularQueue(2, [10, 20, 30])
    expect(cq.toArray()).toEqual([20, 30])
    expect(cq.capacity).toBe(2)
  })

  test('clear removes every element and returns the queue', () => {
    const cq = new CircularQueue(3, [1, 2, 3])
    expect(cq.clear()).toBe(cq)
    expect(cq.size).toBe(0)
    cq.enqueue(7)
    expect(cq.toArray()).toEqual([7])
  })

  test('throws for an invalid capacity', () => {
    expect(() => new CircularQueue<number>(0)).toThrow('Capacity must be greater than 0')
    expect(() => new CircularQueue<number>(Infinity)).toThrow('Capacity must be finite')
  })
})
