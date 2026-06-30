import { insertionSortNum, insertionSortStr } from '@sortings/insertion'
import { describe, expect, test } from 'bun:test'

describe('insertionSortNum', () => {
  test('returns empty array when input is empty', () => {
    const result = insertionSortNum([])
    expect(result).toEqual([])
  })

  test('returns same array for single element', () => {
    const result = insertionSortNum([5])
    expect(result).toEqual([5])
  })

  test('sorts already sorted array', () => {
    const result = insertionSortNum([1, 2, 3, 4, 5])
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  test('sorts reverse sorted array', () => {
    const result = insertionSortNum([5, 4, 3, 2, 1])
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  test('sorts unsorted array with duplicates', () => {
    const result = insertionSortNum([4, 2, 2, 8, 3, 3, 1])
    expect(result).toEqual([1, 2, 2, 3, 3, 4, 8])
  })

  test('handles array with all same values', () => {
    const result = insertionSortNum([5, 5, 5, 5])
    expect(result).toEqual([5, 5, 5, 5])
  })

  test('handles negative numbers', () => {
    const result = insertionSortNum([-3, 7, -1, 0, 5, -10])
    expect(result).toEqual([-10, -3, -1, 0, 5, 7])
  })

  test('does not mutate the original array', () => {
    const original = [3, 1, 4, 1, 5]
    const copy = [...original]
    insertionSortNum(original)
    expect(original).toEqual(copy)
  })
})

describe('insertionSortStr', () => {
  test('returns empty array when input is empty', () => {
    const result = insertionSortStr([])
    expect(result).toEqual([])
  })

  test('returns same array for single element', () => {
    const result = insertionSortStr(['hello'])
    expect(result).toEqual(['hello'])
  })

  test('sorts already sorted array', () => {
    const result = insertionSortStr(['a', 'b', 'c'])
    expect(result).toEqual(['a', 'b', 'c'])
  })

  test('sorts reverse sorted array', () => {
    const result = insertionSortStr(['c', 'b', 'a'])
    expect(result).toEqual(['a', 'b', 'c'])
  })

  test('sorts unsorted array', () => {
    const result = insertionSortStr(['banana', 'apple', 'cherry'])
    expect(result).toEqual(['apple', 'banana', 'cherry'])
  })

  test('sorts array with common prefixes', () => {
    const result = insertionSortStr(['app', 'apple', 'apricot', 'application'])
    expect(result).toEqual(['app', 'apple', 'application', 'apricot'])
  })

  test('handles case sensitivity', () => {
    const result = insertionSortStr(['apple', 'Apple', 'APPLE'])
    expect(result).toEqual(['APPLE', 'Apple', 'apple'])
  })

  test('handles empty strings in array', () => {
    const result = insertionSortStr(['b', '', 'a', ''])
    expect(result).toEqual(['', '', 'a', 'b'])
  })

  test('handles single character strings', () => {
    const result = insertionSortStr(['z', 'a', 'm', 'b'])
    expect(result).toEqual(['a', 'b', 'm', 'z'])
  })

  test('handles strings of varying lengths', () => {
    const result = insertionSortStr(['abc', 'a', 'ab'])
    expect(result).toEqual(['a', 'ab', 'abc'])
  })

  test('does not mutate the original array', () => {
    const original = ['c', 'a', 'b']
    const copy = [...original]
    insertionSortStr(original)
    expect(original).toEqual(copy)
  })
})
