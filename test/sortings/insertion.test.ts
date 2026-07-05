import { insertionSort } from '@sortings/insertion'
import { describe, expect, test } from 'bun:test'

describe('insertionSort', () => {
  test('returns empty array when input is empty', () => {
    expect(insertionSort([])).toEqual([])
  })

  test('returns same array for single element', () => {
    expect(insertionSort([5])).toEqual([5])
  })

  test('sorts already sorted array', () => {
    expect(insertionSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
  })

  test('sorts reverse sorted array', () => {
    expect(insertionSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5])
  })

  test('sorts unsorted array with duplicates', () => {
    expect(insertionSort([4, 2, 2, 8, 3, 3, 1])).toEqual([1, 2, 2, 3, 3, 4, 8])
  })

  test('handles array with all same values', () => {
    expect(insertionSort([5, 5, 5, 5])).toEqual([5, 5, 5, 5])
  })

  test('handles negative numbers', () => {
    expect(insertionSort([-3, 7, -1, 0, 5, -10])).toEqual([-10, -3, -1, 0, 5, 7])
  })

  test('does not mutate the original number array', () => {
    const original = [3, 1, 4, 1, 5]
    const copy = [...original]
    insertionSort(original)
    expect(original).toEqual(copy)
  })

  test('sorts strings', () => {
    expect(insertionSort(['banana', 'apple', 'cherry'])).toEqual(['apple', 'banana', 'cherry'])
  })

  test('sorts already sorted strings', () => {
    expect(insertionSort(['a', 'b', 'c'])).toEqual(['a', 'b', 'c'])
  })

  test('sorts reverse sorted strings', () => {
    expect(insertionSort(['c', 'b', 'a'])).toEqual(['a', 'b', 'c'])
  })

  test('sorts array with common prefixes', () => {
    expect(insertionSort(['app', 'apple', 'apricot', 'application'])).toEqual(['app', 'apple', 'application', 'apricot'])
  })

  test('handles case sensitivity', () => {
    expect(insertionSort(['apple', 'Apple', 'APPLE'])).toEqual(['APPLE', 'Apple', 'apple'])
  })

  test('handles empty strings in array', () => {
    expect(insertionSort(['b', '', 'a', ''])).toEqual(['', '', 'a', 'b'])
  })

  test('handles single character strings', () => {
    expect(insertionSort(['z', 'a', 'm', 'b'])).toEqual(['a', 'b', 'm', 'z'])
  })

  test('handles strings of varying lengths', () => {
    expect(insertionSort(['abc', 'a', 'ab'])).toEqual(['a', 'ab', 'abc'])
  })

  test('does not mutate the original string array', () => {
    const original = ['c', 'a', 'b']
    const copy = [...original]
    insertionSort(original)
    expect(original).toEqual(copy)
  })
})
