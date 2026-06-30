import { manhattan } from '@distances/manhattan'
import { describe, expect, test } from 'bun:test'

describe('manhattan', () => {
  test('returns 0 for identical vectors', () => {
    const result = manhattan([1, 2, 3], [1, 2, 3])
    expect(result).toBe(0)
  })

  test('returns correct distance for 2D vectors', () => {
    const result = manhattan([0, 0], [3, 4])
    expect(result).toBe(7)
  })

  test('returns correct distance for 3D vectors', () => {
    const result = manhattan([1, 2, 3], [4, 5, 6])
    expect(result).toBe(9)
  })

  test('throws for mismatched dimensions', () => {
    expect(() => manhattan([1, 2], [1, 2, 3])).toThrow('The vectors should have the same length')
  })
})
