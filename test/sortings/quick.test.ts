import { quickSort } from '@sortings/quick'
import { describe, expect, test } from 'bun:test'

describe('quickSort', () => {
  test('returns empty array when input is empty', () => {
    expect(quickSort([])).toEqual([])
  })

  test('returns same array for single element', () => {
    expect(quickSort([5])).toEqual([5])
  })

  test('sorts already sorted array', () => {
    expect(quickSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
  })

  test('sorts reverse sorted array', () => {
    expect(quickSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5])
  })

  test('sorts unsorted array with duplicates', () => {
    expect(quickSort([4, 2, 2, 8, 3, 3, 1])).toEqual([1, 2, 2, 3, 3, 4, 8])
  })

  test('handles array with all same values', () => {
    expect(quickSort([5, 5, 5, 5])).toEqual([5, 5, 5, 5])
  })

  test('handles negative numbers', () => {
    expect(quickSort([-3, 7, -1, 0, 5, -10])).toEqual([-10, -3, -1, 0, 5, 7])
  })

  test('does not mutate the original number array', () => {
    const original = [3, 1, 4, 1, 5]
    const copy = [...original]
    quickSort(original)
    expect(original).toEqual(copy)
  })

  test('sorts strings', () => {
    expect(quickSort(['banana', 'apple', 'cherry'])).toEqual(['apple', 'banana', 'cherry'])
  })

  test('sorts already sorted strings', () => {
    expect(quickSort(['a', 'b', 'c'])).toEqual(['a', 'b', 'c'])
  })

  test('sorts reverse sorted strings', () => {
    expect(quickSort(['c', 'b', 'a'])).toEqual(['a', 'b', 'c'])
  })

  test('sorts array with common prefixes', () => {
    expect(quickSort(['app', 'apple', 'apricot', 'application'])).toEqual(['app', 'apple', 'application', 'apricot'])
  })

  test('handles case sensitivity', () => {
    expect(quickSort(['apple', 'Apple', 'APPLE'])).toEqual(['APPLE', 'Apple', 'apple'])
  })

  test('handles empty strings in array', () => {
    expect(quickSort(['b', '', 'a', ''])).toEqual(['', '', 'a', 'b'])
  })

  test('handles single character strings', () => {
    expect(quickSort(['z', 'a', 'm', 'b'])).toEqual(['a', 'b', 'm', 'z'])
  })

  test('handles strings of varying lengths', () => {
    expect(quickSort(['abc', 'a', 'ab'])).toEqual(['a', 'ab', 'abc'])
  })

  test('does not mutate the original string array', () => {
    const original = ['c', 'a', 'b']
    const copy = [...original]
    quickSort(original)
    expect(original).toEqual(copy)
  })

  test('handles large arrays made of a few repeated values', () => {
    const allSame = Array.from<number>({ length: 50000 }).fill(7)
    const alternating = Array.from({ length: 50000 }, (_, i) => i % 2)
    expect(quickSort(allSame)).toEqual(allSame)
    expect(quickSort(alternating)).toEqual([...alternating].sort((a, b) => a - b))
  })

  test('matches Array.prototype.sort on random input', () => {
    const data = Array.from({ length: 2000 }, (_, i) => (i * 7919) % 211 - 100)
    expect(quickSort(data)).toEqual([...data].sort((a, b) => a - b))
  })
})
