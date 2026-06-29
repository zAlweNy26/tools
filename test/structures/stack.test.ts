import { Stack } from '@structures/stack'
import { describe, expect, test } from 'bun:test'

describe('Stack', () => {
  test('numeric capacity - push, pop, peek', () => {
    const stack = new Stack<number>(3)
    expect(stack.size()).toBe(0)
    expect(stack.isEmpty).toBeTrue()
    expect(stack.isFull).toBeFalse()
    expect(stack.hasRoom).toBeTrue()

    stack.push(1)
    expect(stack.size()).toBe(1)
    expect(stack.peek()).toBe(1)
    stack.push(2)
    stack.push(3)
    expect(stack.size()).toBe(3)
    expect(stack.isFull).toBeTrue()
    expect(stack.hasRoom).toBeFalse()
    expect(() => stack.push(4)).toThrow('Stack is full')

    expect(stack.pop()).toBe(3)
    expect(stack.size()).toBe(2)
    expect(stack.pop()).toBe(2)
    expect(stack.pop()).toBe(1)
    expect(stack.isEmpty).toBeTrue()
    expect(() => stack.pop()).toThrow('Stack is empty')
  })

  test('array initialization - unbounded', () => {
    const stack = new Stack([10, 20, 30])
    expect(stack.size()).toBe(3)
    expect(stack.isEmpty).toBeFalse()
    expect(stack.peek()).toBe(30)
    expect(stack.isFull).toBeFalse()
    expect(stack.hasRoom).toBeTrue()

    stack.push(40)
    expect(stack.size()).toBe(4)
    expect(stack.peek()).toBe(40)
  })

  test('items getter', () => {
    const stack = new Stack<number>(3)
    stack.push(1)
    stack.push(2)
    expect(stack.items).toEqual([1, 2])
  })

  test('clear resets to empty', () => {
    const stack = new Stack<number>(3)
    stack.push(1)
    stack.push(2)
    stack.clear()
    expect(stack.size()).toBe(0)
    expect(stack.isEmpty).toBeTrue()
    stack.push(5)
    expect(stack.size()).toBe(1)
  })

  test('default space for unbounded', () => {
    const stack = new Stack([1, 2])
    expect(stack.space).toBe(Infinity)
    expect(stack.hasRoom).toBeTrue()
    expect(stack.isFull).toBeFalse()
  })
})
