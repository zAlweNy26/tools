import { euclideanSquared } from '@distances/euclidean_squared'
import { describe, expect, test } from 'bun:test'

describe('euclideanSquared', () => {
  test('returns 0 for identical vectors', () => {
    const result = euclideanSquared([1, 2, 3], [1, 2, 3])
    expect(result).toBe(0)
  })

  test('returns correct squared distance for 2D vectors', () => {
    const result = euclideanSquared([0, 0], [3, 4])
    expect(result).toBe(25)
  })

  test('returns correct squared distance for 3D vectors', () => {
    const result = euclideanSquared([1, 2, 3], [4, 5, 6])
    expect(result).toBe(27)
  })

  test('throws for mismatched dimensions', () => {
    expect(() => euclideanSquared([1, 2], [1, 2, 3])).toThrow('The vectors should have the same length')
  })
})
