import { euclidean } from '@distances/euclidean'
import { describe, expect, test } from 'bun:test'

describe('euclidean', () => {
  test('returns 0 for identical vectors', () => {
    const result = euclidean([1, 2, 3], [1, 2, 3])
    expect(result).toBe(0)
  })

  test('returns correct distance for 2D vectors', () => {
    const result = euclidean([0, 0], [3, 4])
    expect(result).toBe(5)
  })

  test('returns correct distance for 3D vectors', () => {
    const result = euclidean([1, 2, 3], [4, 5, 6])
    expect(result).toBeCloseTo(5.1962, 4)
  })

  test('throws for mismatched dimensions', () => {
    expect(() => euclidean([1, 2], [1, 2, 3])).toThrow('The vectors should have the same length')
  })
})
