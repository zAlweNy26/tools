import { linearSpace } from '@utils/linear_space'
import { describe, expect, test } from 'bun:test'

describe('linearSpace', () => {
  test('returns evenly spaced numbers from start to end', () => {
    expect(linearSpace(1, 5)).toEqual([1, 2, 3, 4, 5])
    expect(linearSpace(0, 10, 3)).toEqual([0, 5, 10])
  })

  test('returns a single element when start equals end', () => {
    expect(linearSpace(5, 5)).toEqual([5])
  })

  test('handles descending range', () => {
    expect(linearSpace(10, 5)).toEqual([10, 9, 8, 7, 6, 5])
  })

  test('handles fractional numbers', () => {
    expect(linearSpace(0, 1, 3)).toEqual([0, 0.5, 1])
  })

  test('handles negative numbers', () => {
    expect(linearSpace(-2, 2, 3)).toEqual([-2, 0, 2])
  })

  test('returns empty array when num is 0', () => {
    expect(linearSpace(1, 5, 0)).toEqual([])
  })

  test('infers num when omitted', () => {
    expect(linearSpace(0, 4)).toEqual([0, 1, 2, 3, 4])
  })
})
