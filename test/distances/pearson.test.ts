import { pearson } from '@distances/pearson'
import { describe, expect, test } from 'bun:test'

describe('pearson', () => {
  test('returns 0 for perfectly correlated vectors', () => {
    const result = pearson([1, 2, 3], [1, 2, 3])
    expect(result).toBeCloseTo(0)
  })

  test('returns 2 for perfectly negatively correlated vectors', () => {
    const result = pearson([1, 2, 3], [3, 2, 1])
    expect(result).toBeCloseTo(2)
  })

  test('returns 1 when a vector has zero variance', () => {
    const result = pearson([5, 5, 5], [1, 2, 3])
    expect(result).toBe(1)
  })

  test('throws for mismatched dimensions', () => {
    expect(() => pearson([1, 2], [1, 2, 3])).toThrow('The vectors should have the same length')
  })
})
