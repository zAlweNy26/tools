import { selectionSortNum, selectionSortStr } from '@sortings/selection'
import { describe, expect, test } from 'bun:test'

describe('selectionSortNum', () => {
  test('returns empty array when input is empty', () => {
    const result = selectionSortNum([])
    expect(result).toEqual([])
  })

  test('returns same array for single element', () => {
    const result = selectionSortNum([5])
    expect(result).toEqual([5])
  })

  test('sorts already sorted array', () => {
    const result = selectionSortNum([1, 2, 3, 4, 5])
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  test('sorts reverse sorted array', () => {
    const result = selectionSortNum([5, 4, 3, 2, 1])
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  test('sorts unsorted array with duplicates', () => {
    const result = selectionSortNum([4, 2, 2, 8, 3, 3, 1])
    expect(result).toEqual([1, 2, 2, 3, 3, 4, 8])
  })

  test('handles array with all same values', () => {
    const result = selectionSortNum([5, 5, 5, 5])
    expect(result).toEqual([5, 5, 5, 5])
  })

  test('handles negative numbers', () => {
    const result = selectionSortNum([-3, 7, -1, 0, 5, -10])
    expect(result).toEqual([-10, -3, -1, 0, 5, 7])
  })

  test('does not mutate the original array', () => {
    const original = [3, 1, 4, 1, 5]
    const copy = [...original]
    selectionSortNum(original)
    expect(original).toEqual(copy)
  })
})

describe('selectionSortStr', () => {
  test('returns empty array when input is empty', () => {
    const result = selectionSortStr([])
    expect(result).toEqual([])
  })

  test('returns same array for single element', () => {
    const result = selectionSortStr(['hello'])
    expect(result).toEqual(['hello'])
  })

  test('sorts already sorted array', () => {
    const result = selectionSortStr(['a', 'b', 'c'])
    expect(result).toEqual(['a', 'b', 'c'])
  })

  test('sorts reverse sorted array', () => {
    const result = selectionSortStr(['c', 'b', 'a'])
    expect(result).toEqual(['a', 'b', 'c'])
  })

  test('sorts unsorted array', () => {
    const result = selectionSortStr(['banana', 'apple', 'cherry'])
    expect(result).toEqual(['apple', 'banana', 'cherry'])
  })

  test('sorts array with common prefixes', () => {
    const result = selectionSortStr(['app', 'apple', 'apricot', 'application'])
    expect(result).toEqual(['app', 'apple', 'application', 'apricot'])
  })

  test('handles case sensitivity', () => {
    const result = selectionSortStr(['apple', 'Apple', 'APPLE'])
    expect(result).toEqual(['APPLE', 'Apple', 'apple'])
  })

  test('handles empty strings in array', () => {
    const result = selectionSortStr(['b', '', 'a', ''])
    expect(result).toEqual(['', '', 'a', 'b'])
  })

  test('handles single character strings', () => {
    const result = selectionSortStr(['z', 'a', 'm', 'b'])
    expect(result).toEqual(['a', 'b', 'm', 'z'])
  })

  test('handles strings of varying lengths', () => {
    const result = selectionSortStr(['abc', 'a', 'ab'])
    expect(result).toEqual(['a', 'ab', 'abc'])
  })

  test('does not mutate the original array', () => {
    const original = ['c', 'a', 'b']
    const copy = [...original]
    selectionSortStr(original)
    expect(original).toEqual(copy)
  })
})
