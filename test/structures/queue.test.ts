import { Queue } from '@structures/queue'
import { describe, expect, test } from 'bun:test'

describe('Queue', () => {
  test('enqueue, dequeue and peek follow first-in, first-out order', () => {
    const queue = new Queue<number>()
    queue.enqueue(1).enqueue(2).enqueue(3)
    expect(queue.peek()).toBe(1)
    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.size).toBe(1)
  })

  test('dequeue and peek return undefined when empty', () => {
    const queue = new Queue<number>()
    expect(queue.dequeue()).toBeUndefined()
    expect(queue.peek()).toBeUndefined()
    expect(queue.isEmpty).toBeTrue()
  })

  test('initial items go from front to back', () => {
    const queue = new Queue([10, 20, 30])
    expect(queue.peek()).toBe(10)
    expect(queue.toArray()).toEqual([10, 20, 30])
    expect([...queue]).toEqual([10, 20, 30])
  })

  test('keeps order across many interleaved operations', () => {
    const queue = new Queue<number>()
    const expected: number[] = []
    for (let i = 0; i < 100; i++) {
      queue.enqueue(i)
      expected.push(i)
      if (i % 3 === 0) expect(queue.dequeue()).toBe(expected.shift())
    }
    expect(queue.toArray()).toEqual(expected)
    expect(queue.size).toBe(expected.length)
  })

  test('toArray only contains queued elements after dequeues', () => {
    const queue = new Queue([1, 2, 3, 4])
    queue.dequeue()
    queue.dequeue()
    queue.dequeue()
    expect(queue.toArray()).toEqual([4])
  })

  test('throws when enqueueing onto a full queue', () => {
    const queue = new Queue<number>([], { capacity: 2 })
    queue.enqueue(1).enqueue(2)
    expect(() => queue.enqueue(3)).toThrow('Queue is full')
    queue.dequeue()
    expect(() => queue.enqueue(3)).not.toThrow()
    expect(queue.toArray()).toEqual([2, 3])
  })

  test('clear removes every element and returns the queue', () => {
    const queue = new Queue([1, 2, 3])
    queue.dequeue()
    expect(queue.clear()).toBe(queue)
    expect(queue.size).toBe(0)
    queue.enqueue(5)
    expect(queue.toArray()).toEqual([5])
  })

  test('keeps undefined elements', () => {
    const queue = new Queue<number | undefined>()
    queue.enqueue(1).enqueue(undefined)
    expect(queue.toArray()).toStrictEqual([1, undefined])
  })
})
