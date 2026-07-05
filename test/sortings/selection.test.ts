import { selectionSort } from '@sortings/selection'
import { describe, expect, test } from 'bun:test'

describe('selectionSort', () => {
  test('returns empty array when input is empty', () => {
    expect(selectionSort([])).toEqual([])
  })

  test('returns same array for single element', () => {
    expect(selectionSort([5])).toEqual([5])
  })

  test('sorts already sorted array', () => {
    expect(selectionSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
  })

  test('sorts reverse sorted array', () => {
    expect(selectionSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5])
  })

  test('sorts unsorted array with duplicates', () => {
    expect(selectionSort([4, 2, 2, 8, 3, 3, 1])).toEqual([1, 2, 2, 3, 3, 4, 8])
  })

  test('handles array with all same values', () => {
    expect(selectionSort([5, 5, 5, 5])).toEqual([5, 5, 5, 5])
  })

  test('handles negative numbers', () => {
    expect(selectionSort([-3, 7, -1, 0, 5, -10])).toEqual([-10, -3, -1, 0, 5, 7])
  })

  test('does not mutate the original number array', () => {
    const original = [3, 1, 4, 1, 5]
    const copy = [...original]
    selectionSort(original)
    expect(original).toEqual(copy)
  })

  test('sorts strings', () => {
    expect(selectionSort(['banana', 'apple', 'cherry'])).toEqual(['apple', 'banana', 'cherry'])
  })

  test('sorts already sorted strings', () => {
    expect(selectionSort(['a', 'b', 'c'])).toEqual(['a', 'b', 'c'])
  })

  test('sorts reverse sorted strings', () => {
    expect(selectionSort(['c', 'b', 'a'])).toEqual(['a', 'b', 'c'])
  })

  test('sorts array with common prefixes', () => {
    expect(selectionSort(['app', 'apple', 'apricot', 'application'])).toEqual(['app', 'apple', 'application', 'apricot'])
  })

  test('handles case sensitivity', () => {
    expect(selectionSort(['apple', 'Apple', 'APPLE'])).toEqual(['APPLE', 'Apple', 'apple'])
  })

  test('handles empty strings in array', () => {
    expect(selectionSort(['b', '', 'a', ''])).toEqual(['', '', 'a', 'b'])
  })

  test('handles single character strings', () => {
    expect(selectionSort(['z', 'a', 'm', 'b'])).toEqual(['a', 'b', 'm', 'z'])
  })

  test('handles strings of varying lengths', () => {
    expect(selectionSort(['abc', 'a', 'ab'])).toEqual(['a', 'ab', 'abc'])
  })

  test('does not mutate the original string array', () => {
    const original = ['c', 'a', 'b']
    const copy = [...original]
    selectionSort(original)
    expect(original).toEqual(copy)
  })
})
