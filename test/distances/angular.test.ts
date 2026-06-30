import { angular } from '@distances/angular'
import { describe, expect, test } from 'bun:test'

describe('angular', () => {
  test('returns 0 for identical vectors', () => {
    const result = angular([1, 2, 3], [1, 2, 3])
    expect(result).toBeCloseTo(0)
  })

  test('returns 0.5 for orthogonal vectors', () => {
    const result = angular([1, 0], [0, 1])
    expect(result).toBeCloseTo(0.5)
  })

  test('returns 1 for opposite vectors', () => {
    const result = angular([1, 0], [-1, 0])
    expect(result).toBeCloseTo(1)
  })

  test('returns 1 when any vector has zero norm', () => {
    const result = angular([0, 0], [1, 2])
    expect(result).toBe(1)
  })

  test('throws for mismatched dimensions', () => {
    expect(() => angular([1, 2], [1, 2, 3])).toThrow('The vectors should have the same length')
  })
})
