import { euclideanWeighted } from '@distances/euclidean_weighted'
import { describe, expect, test } from 'bun:test'

describe('euclideanWeighted', () => {
  test('returns 0 for identical vectors', () => {
    const result = euclideanWeighted([1, 1])([1, 2], [1, 2])
    expect(result).toBe(0)
  })

  test('returns euclidean distance when all weights are 1', () => {
    const result = euclideanWeighted([1, 1])([0, 0], [3, 4])
    expect(result).toBe(5)
  })

  test('returns correct weighted distance', () => {
    const result = euclideanWeighted([2, 1])([0, 0], [3, 4])
    expect(result).toBeCloseTo(5.831, 3)
  })

  test('returned function throws when weights length mismatches vectors', () => {
    expect(() => euclideanWeighted([1, 2, 3])([1, 2], [3, 4]))
      .toThrow('The weights vector should have the same length as the input vectors')
  })

  test('returned function throws for mismatched vector dimensions', () => {
    expect(() => euclideanWeighted([1, 1])([1, 2], [1, 2, 3]))
      .toThrow('The vectors should have the same length')
  })
})
