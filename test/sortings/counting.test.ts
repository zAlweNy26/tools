import { countingSort } from '@sortings/counting'
import { describe, expect, test } from 'bun:test'

describe('countingSort', () => {
  test('returns empty array when input is empty', () => {
    const result = countingSort([])
    expect(result).toEqual([])
  })

  test('returns same array for single element', () => {
    const result = countingSort([5])
    expect(result).toEqual([5])
  })

  test('sorts already sorted array', () => {
    const result = countingSort([1, 2, 3, 4, 5])
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  test('sorts reverse sorted array', () => {
    const result = countingSort([5, 4, 3, 2, 1])
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  test('sorts unsorted array with duplicates', () => {
    const result = countingSort([4, 2, 2, 8, 3, 3, 1])
    expect(result).toEqual([1, 2, 2, 3, 3, 4, 8])
  })

  test('handles array with all same values', () => {
    const result = countingSort([5, 5, 5, 5])
    expect(result).toEqual([5, 5, 5, 5])
  })

  test('handles array containing zeros', () => {
    const result = countingSort([0, 5, 0, 3, 0])
    expect(result).toEqual([0, 0, 0, 3, 5])
  })

  test('handles large value range', () => {
    const result = countingSort([100, 0, 50, 25, 75, 10])
    expect(result).toEqual([0, 10, 25, 50, 75, 100])
  })

  test('does not mutate the original array', () => {
    const original = [3, 1, 4, 1, 5]
    const copy = [...original]
    countingSort(original)
    expect(original).toEqual(copy)
  })

  test('handles negative numbers', () => {
    expect(countingSort([3, -2, 0, -5, 3])).toEqual([-5, -2, 0, 3, 3])
  })

  test('throws for values that are not integers', () => {
    expect(() => countingSort([1.5, 0.5, 2.25])).toThrow('Counting sort only supports integers')
    expect(() => countingSort([1, Number.NaN])).toThrow('Counting sort only supports integers')
  })

  test('handles arrays too large to spread into Math.min', () => {
    const data = Array.from({ length: 1_000_000 }, (_, i) => (i * 31) % 1000)
    const result = countingSort(data)
    expect(result[0]).toBe(0)
    expect(result.at(-1)).toBe(999)
  })
})
