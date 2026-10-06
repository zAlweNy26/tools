import { cosine } from '@distances/cosine'
import { describe, expect, test } from 'bun:test'

describe('cosine', () => {
  test('returns 0 for identical vectors', () => {
    const result = cosine([1, 2, 3], [1, 2, 3])
    expect(result).toBeCloseTo(0)
  })

  test('returns correct distance for orthogonal vectors', () => {
    const result = cosine([1, 0], [0, 1])
    expect(result).toBe(1)
  })

  test('returns 1 when any vector has zero norm', () => {
    const result = cosine([0, 0], [1, 2])
    expect(result).toBe(1)
  })

  test('returns correct distance for opposite vectors', () => {
    const result = cosine([1, 0], [-1, 0])
    expect(result).toBe(2)
  })

  test('returns 1 - cosine similarity', () => {
    expect(cosine([1, 0], [1, 1])).toBeCloseTo(1 - Math.SQRT1_2)
  })

  test('returns 0 instead of NaN for parallel vectors with rounding error', () => {
    expect(cosine([0.1, 0.7], [0.2, 1.4])).toBe(0)
  })

  test('throws for mismatched dimensions', () => {
    expect(() => cosine([1, 2], [1, 2, 3])).toThrow('The vectors should have the same length')
  })
})
