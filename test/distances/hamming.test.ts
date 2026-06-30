import { hamming } from '@distances/hamming'
import { describe, expect, test } from 'bun:test'

describe('hamming', () => {
  test('returns 0 for identical vectors', () => {
    const result = hamming([1, 2, 3], [1, 2, 3])
    expect(result).toBe(0)
  })

  test('returns 1 when all elements differ', () => {
    const result = hamming([1, 2, 3], [4, 5, 6])
    expect(result).toBe(1)
  })

  test('returns fraction for partial match', () => {
    const result = hamming([1, 2, 3], [1, 5, 3])
    expect(result).toBeCloseTo(1 / 3)
  })

  test('throws for mismatched dimensions', () => {
    expect(() => hamming([1, 2], [1, 2, 3])).toThrow('The vectors should have the same length')
  })
})
