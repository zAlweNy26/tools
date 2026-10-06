import { CircularQueue } from '@structures/circular_queue'
import { describe, expect, test } from 'bun:test'

describe('CircularQueue', () => {
  test('basic enqueue, dequeue', () => {
    const cq = new CircularQueue<number>(3)
    cq.enqueue(1)
    cq.enqueue(2)
    cq.enqueue(3)
    expect(cq.size()).toBe(3)
    expect(cq.isFull).toBeTrue()

    expect(cq.dequeue()).toBe(1)
    expect(cq.size()).toBe(2)
    expect(cq.isFull).toBeFalse()
  })

  test('wrap-around overwrites oldest', () => {
    const cq = new CircularQueue<number>(3)
    cq.enqueue(1)
    cq.enqueue(2)
    cq.enqueue(3)
    cq.enqueue(4)
    expect(cq.size()).toBe(3)
    expect(cq.dequeue()).toBe(2)
    expect(cq.dequeue()).toBe(3)
    expect(cq.dequeue()).toBe(4)
    expect(cq.isEmpty).toBeTrue()
  })

  test('wrap-around after dequeue', () => {
    const cq = new CircularQueue<number>(3)
    cq.enqueue(1)
    cq.enqueue(2)
    expect(cq.dequeue()).toBe(1)
    cq.enqueue(3)
    cq.enqueue(4)
    expect(cq.size()).toBe(3)
    expect(cq.isFull).toBeTrue()
    expect(cq.dequeue()).toBe(2)
    expect(cq.dequeue()).toBe(3)
    expect(cq.dequeue()).toBe(4)
  })

  test('empty throws', () => {
    const cq = new CircularQueue<number>(2)
    expect(() => cq.dequeue()).toThrow('Queue is empty')
  })

  test('array init', () => {
    const cq = new CircularQueue<number>([10, 20, 30])
    expect(cq.size()).toBe(3)
    expect(cq.isFull).toBeTrue()
    expect(cq.dequeue()).toBe(10)
    cq.enqueue(40)
    expect(cq.dequeue()).toBe(20)
    expect(cq.dequeue()).toBe(30)
    expect(cq.dequeue()).toBe(40)
  })

  test('space getter', () => {
    const cq = new CircularQueue<number>(4)
    expect(cq.space).toBe(4)
    cq.enqueue(1)
    expect(cq.space).toBe(3)
    cq.enqueue(2)
    cq.enqueue(3)
    cq.enqueue(4)
    expect(cq.space).toBe(0)
  })

  test('peek returns the front element after wraparound', () => {
    const cq = new CircularQueue<number>(3)
    for (const v of [1, 2, 3, 4]) cq.enqueue(v)
    cq.dequeue()
    cq.dequeue()
    expect(cq.peek()).toBe(4)
  })

  test('items are in queue order after wraparound', () => {
    const cq = new CircularQueue<number>(3)
    for (const v of [1, 2, 3, 4, 5]) cq.enqueue(v)
    expect(cq.items).toEqual([3, 4, 5])
  })

  test('throws for a non-positive capacity', () => {
    expect(() => new CircularQueue<number>(0)).toThrow('Capacity must be greater than 0')
    expect(() => new CircularQueue<number>([])).toThrow('Capacity must be greater than 0')
  })
})
