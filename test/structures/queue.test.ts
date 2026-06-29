import { describe, expect, test } from 'bun:test'
import { Queue } from 'structures/queue'

describe('Queue', () => {
  test('numeric capacity - enqueue, dequeue, peek', () => {
    const queue = new Queue<number>(3)
    expect(queue.size()).toBe(0)
    expect(queue.isEmpty).toBeTrue()
    expect(queue.isFull).toBeFalse()

    queue.enqueue(1)
    expect(queue.size()).toBe(1)
    expect(queue.peek()).toBe(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.size()).toBe(3)
    expect(queue.isFull).toBeTrue()
    expect(() => queue.enqueue(4)).toThrow('Queue is full')

    expect(queue.dequeue()).toBe(1)
    expect(queue.size()).toBe(2)
    expect(queue.peek()).toBe(2)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    expect(queue.isEmpty).toBeTrue()
    expect(queue.peek()).toBeUndefined()
    expect(() => queue.dequeue()).toThrow('Queue is empty')
  })

  test('array initialization', () => {
    const queue = new Queue([10, 20, 30])
    expect(queue.size()).toBe(3)
    expect(queue.isEmpty).toBeFalse()
    expect(queue.peek()).toBe(10)
    expect(queue.isFull).toBeFalse()

    queue.enqueue(40)
    expect(queue.size()).toBe(4)
    expect(queue.dequeue()).toBe(10)
    expect(queue.peek()).toBe(20)
  })

  test('clear', () => {
    const queue = new Queue<number>(3)
    queue.enqueue(1)
    queue.enqueue(2)
    queue.clear()
    expect(queue.size()).toBe(0)
    expect(queue.isEmpty).toBeTrue()
    queue.enqueue(5)
    expect(queue.size()).toBe(1)
  })

  test('dequeue from middle maintains order', () => {
    const queue = new Queue<number>(5)
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    queue.enqueue(4)
    queue.enqueue(5)
    expect(queue.dequeue()).toBe(3)
    expect(queue.dequeue()).toBe(4)
    expect(queue.dequeue()).toBe(5)
  })

  test('items getter returns plain array', () => {
    const queue = new Queue<number>(5)
    queue.enqueue(1)
    queue.enqueue(2)
    queue.dequeue()
    queue.enqueue(3)
    expect(queue.items).toEqual([2, 3])
  })

  test('default space for unbounded', () => {
    const queue = new Queue([1, 2])
    expect(queue.space).toBe(Infinity)
    expect(queue.hasRoom).toBeTrue()
    expect(queue.isFull).toBeFalse()
  })
})
