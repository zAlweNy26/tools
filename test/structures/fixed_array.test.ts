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

  test('from with a single number keeps it as an element', () => {
    const arr = FixedArray.from([5])
    expect(arr.length).toBe(1)
    expect(arr[0]).toBe(5)
  })

  test('unshift and splice respect the capacity', () => {
    const arr = new FixedArray<number>([1, 2])
    expect(() => arr.unshift(0)).toThrow('Array is full')
    expect(() => arr.splice(0, 0, 9)).toThrow('Array is full')
    expect(arr.splice(0, 1, 9)).toEqual([1])
    expect([...arr]).toEqual([9, 2])
    expect(arr.splice(1)).toEqual([2])
    arr.unshift(0)
    expect([...arr]).toEqual([0, 9])
  })

  test('derived arrays are plain arrays', () => {
    const arr = new FixedArray<number>([1, 2, 3])
    const doubled = arr.map(v => v * 2)
    expect(doubled).not.toBeInstanceOf(FixedArray)
    doubled.push(8)
    expect(doubled).toEqual([2, 4, 6, 8])
  })

  test('index assignment and length changes respect the capacity', () => {
    const arr = new FixedArray<number>(2)
    arr[0] = 1
    arr[1] = 2
    expect(() => {
      arr[2] = 3
    }).toThrow('Array is full')
    expect(() => {
      arr.length = 6
    }).toThrow('Array is full')
    arr.length = 1
    expect([...arr]).toEqual([1])
    expect(Array.isArray(arr)).toBeTrue()
  })
})
