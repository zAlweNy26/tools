import { chebyshev } from '@distances/chebyshev'
import { describe, expect, test } from 'bun:test'

describe('chebyshev', () => {
  test('returns 0 for identical vectors', () => {
    const result = chebyshev([1, 2, 3], [1, 2, 3])
    expect(result).toBe(0)
  })

  test('returns max absolute difference', () => {
    const result = chebyshev([1, 5, 2], [4, 3, 7])
    expect(result).toBe(5)
  })

  test('returns correct distance for uniform differences', () => {
    const result = chebyshev([1, 2, 3], [4, 5, 6])
    expect(result).toBe(3)
  })

  test('throws for mismatched dimensions', () => {
    expect(() => chebyshev([1, 2], [1, 2, 3])).toThrow('The vectors should have the same length')
  })
})
