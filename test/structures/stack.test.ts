import { Stack } from '@structures/stack'
import { describe, expect, test } from 'bun:test'

describe('Stack', () => {
  test('push, pop and peek follow last-in, first-out order', () => {
    const stack = new Stack<number>()
    stack.push(1).push(2).push(3)
    expect(stack.peek()).toBe(3)
    expect(stack.pop()).toBe(3)
    expect(stack.pop()).toBe(2)
    expect(stack.size).toBe(1)
  })

  test('pop and peek return undefined when empty', () => {
    const stack = new Stack<number>()
    expect(stack.pop()).toBeUndefined()
    expect(stack.peek()).toBeUndefined()
    expect(stack.isEmpty).toBeTrue()
  })

  test('initial items go from bottom to top', () => {
    const stack = new Stack([10, 20, 30])
    expect(stack.peek()).toBe(30)
    expect(stack.toArray()).toEqual([10, 20, 30])
    expect([...stack]).toEqual([10, 20, 30])
  })

  test('accepts any iterable', () => {
    const stack = new Stack(new Set([1, 2]))
    expect(stack.toArray()).toEqual([1, 2])
  })

  test('is unbounded by default', () => {
    const stack = new Stack([1, 2])
    expect(stack.capacity).toBe(Infinity)
    expect(stack.isFull).toBeFalse()
  })

  test('throws when pushing onto a full stack', () => {
    const stack = new Stack<number>([1, 2], { capacity: 2 })
    expect(stack.isFull).toBeTrue()
    expect(() => stack.push(3)).toThrow('Stack is full')
    expect(stack.toArray()).toEqual([1, 2])
  })

  test('rejects invalid capacities', () => {
    expect(() => new Stack<number>([], { capacity: 0 })).toThrow('Capacity must be greater than 0')
    expect(() => new Stack<number>([], { capacity: 1.5 })).toThrow('Capacity must be greater than 0')
    expect(() => new Stack([1, 2, 3], { capacity: 2 })).toThrow('The initial items exceed the capacity')
  })

  test('clear removes every element and returns the stack', () => {
    const stack = new Stack([1, 2, 3])
    expect(stack.clear()).toBe(stack)
    expect(stack.size).toBe(0)
    expect(stack.toArray()).toEqual([])
  })

  test('toArray returns a copy', () => {
    const stack = new Stack([1, 2])
    stack.toArray().push(99)
    expect(stack.size).toBe(2)
  })

  test('keeps undefined elements', () => {
    const stack = new Stack<number | undefined>([1, undefined])
    expect(stack.toArray()).toStrictEqual([1, undefined])
    expect(stack.size).toBe(2)
  })
})
