import { bubbleSort } from '@sortings/bubble'
import { describe, expect, test } from 'bun:test'

describe('bubbleSort', () => {
  test('returns empty array when input is empty', () => {
    expect(bubbleSort([])).toEqual([])
  })

  test('returns same array for single element', () => {
    expect(bubbleSort([5])).toEqual([5])
  })

  test('sorts already sorted array', () => {
    expect(bubbleSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
  })

  test('sorts reverse sorted array', () => {
    expect(bubbleSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5])
  })

  test('sorts unsorted array with duplicates', () => {
    expect(bubbleSort([4, 2, 2, 8, 3, 3, 1])).toEqual([1, 2, 2, 3, 3, 4, 8])
  })

  test('handles array with all same values', () => {
    expect(bubbleSort([5, 5, 5, 5])).toEqual([5, 5, 5, 5])
  })

  test('handles negative numbers', () => {
    expect(bubbleSort([-3, 7, -1, 0, 5, -10])).toEqual([-10, -3, -1, 0, 5, 7])
  })

  test('does not mutate the original number array', () => {
    const original = [3, 1, 4, 1, 5]
    const copy = [...original]
    bubbleSort(original)
    expect(original).toEqual(copy)
  })

  test('sorts strings', () => {
    expect(bubbleSort(['banana', 'apple', 'cherry'])).toEqual(['apple', 'banana', 'cherry'])
  })

  test('sorts already sorted strings', () => {
    expect(bubbleSort(['a', 'b', 'c'])).toEqual(['a', 'b', 'c'])
  })

  test('sorts reverse sorted strings', () => {
    expect(bubbleSort(['c', 'b', 'a'])).toEqual(['a', 'b', 'c'])
  })

  test('sorts array with common prefixes', () => {
    expect(bubbleSort(['app', 'apple', 'apricot', 'application'])).toEqual(['app', 'apple', 'application', 'apricot'])
  })

  test('handles case sensitivity', () => {
    expect(bubbleSort(['apple', 'Apple', 'APPLE'])).toEqual(['APPLE', 'Apple', 'apple'])
  })

  test('handles empty strings in array', () => {
    expect(bubbleSort(['b', '', 'a', ''])).toEqual(['', '', 'a', 'b'])
  })

  test('handles single character strings', () => {
    expect(bubbleSort(['z', 'a', 'm', 'b'])).toEqual(['a', 'b', 'm', 'z'])
  })

  test('handles strings of varying lengths', () => {
    expect(bubbleSort(['abc', 'a', 'ab'])).toEqual(['a', 'ab', 'abc'])
  })

  test('does not mutate the original string array', () => {
    const original = ['c', 'a', 'b']
    const copy = [...original]
    bubbleSort(original)
    expect(original).toEqual(copy)
  })
})
