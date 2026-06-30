import { minkowski } from '@distances/minkowski'
import { describe, expect, test } from 'bun:test'

describe('minkowski', () => {
  test('throws when p is less than 1', () => {
    expect(() => minkowski(0.5)).toThrow('The Minkowski order p must be at least 1')
  })

  test('returns manhattan distance when p = 1', () => {
    const result = minkowski(1)([0, 0], [3, 4])
    expect(result).toBe(7)
  })

  test('returns euclidean distance when p = 2', () => {
    const result = minkowski(2)([0, 0], [3, 4])
    expect(result).toBe(5)
  })

  test('returns correct distance for p = 3', () => {
    const result = minkowski(3)([0, 0], [3, 4])
    expect(result).toBeCloseTo(4.4979, 4)
  })

  test('returned function returns 0 for identical vectors', () => {
    const result = minkowski(3)([1, 2, 3], [1, 2, 3])
    expect(result).toBe(0)
  })

  test('returned function throws for mismatched dimensions', () => {
    expect(() => minkowski(2)([1, 2], [1, 2, 3])).toThrow('The vectors should have the same length')
  })
})
