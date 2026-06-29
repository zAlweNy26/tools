import { FixedArray } from '@structures/fixed_array'
import { describe, expect, test } from 'bun:test'

describe('FixedArray', () => {
  test('numeric capacity - push, pop, length', () => {
    const arr = new FixedArray(3)
    expect(arr.length).toBe(0)
    arr.push(1)
    expect(arr.length).toBe(1)
    expect(arr[0]).toBe(1)
    arr.push(2, 3)
    expect(arr.length).toBe(3)
    expect(arr[2]).toBe(3)
    expect(() => arr.push(4)).toThrow('Array is full')
  })

  test('array initialization - length reflects capacity', () => {
    const arr = new FixedArray([10, 20, 30])
    expect(arr.length).toBe(3)
    expect(arr[0]).toBe(10)
    expect(arr[1]).toBe(20)
    expect(() => arr.push(40)).toThrow('Array is full')
  })

  test('static from', () => {
    const arr = FixedArray.from([1, 2])
    expect(arr.length).toBe(2)
    expect(() => arr.push(3)).toThrow('Array is full')
  })

  test('pop decrements length', () => {
    const arr = new FixedArray([1, 2, 3])
    expect(arr.pop()).toBe(3)
    expect(arr.length).toBe(2)
    arr.push(4)
    expect(arr.length).toBe(3)
    expect(arr[2]).toBe(4)
  })

  test('pop on empty', () => {
    const arr = new FixedArray(3)
    expect(arr.pop()).toBeUndefined()
    expect(arr.length).toBe(0)
  })
})
