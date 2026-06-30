import { canberra } from '@distances/canberra'
import { describe, expect, test } from 'bun:test'

describe('canberra', () => {
  test('returns 0 for identical vectors', () => {
    const result = canberra([1, 2, 3], [1, 2, 3])
    expect(result).toBe(0)
  })

  test('returns correct distance for different vectors', () => {
    const result = canberra([1, 2], [3, 4])
    expect(result).toBeCloseTo(0.8333, 4)
  })

  test('skips terms where denominator is zero', () => {
    const result = canberra([0, 0], [0, 0])
    expect(result).toBe(0)
  })

  test('throws for mismatched dimensions', () => {
    expect(() => canberra([1, 2], [1, 2, 3])).toThrow('The vectors should have the same length')
  })
})
