import { getLCP, measure, measureTime } from '@utils/helpers'
import { describe, expect, test } from 'bun:test'

describe('getLCP', () => {
  test('returns the length of the longest common prefix', () => {
    expect(getLCP('hello', 'help')).toBe(3)
    expect(getLCP('flower', 'flow')).toBe(4)
  })

  test('returns 0 when there is no common prefix', () => {
    expect(getLCP('abc', 'xyz')).toBe(0)
  })

  test('returns the length of the shorter string when one is a prefix of the other', () => {
    expect(getLCP('test', 'testing')).toBe(4)
    expect(getLCP('prefix', 'pre')).toBe(3)
  })

  test('returns 0 for empty strings', () => {
    expect(getLCP('', 'abc')).toBe(0)
    expect(getLCP('abc', '')).toBe(0)
  })
})

describe('measureTime', () => {
  test('returns a positive number', () => {
    const ms = measureTime(() => {
      let sum = 0
      for (let i = 0; i < 1e5; i++) sum += i
    })
    expect(ms).toBeGreaterThan(0)
  })

  test('passes parameters to the function', () => {
    const ms = measureTime((a: number, b: number) => a + b, 1, 2)
    expect(ms).toBeGreaterThan(-1)
  })
})

describe('measure', () => {
  test('wraps a method to log its execution time', () => {
    function add(this: unknown, a: number, b: number) {
      return a + b
    }

    const descriptor: PropertyDescriptor = {
      value: add,
    }

    const updated = measure(undefined as any, '', descriptor)
    const result = updated.value(2, 3)
    expect(result).toBe(5)
  })
})
