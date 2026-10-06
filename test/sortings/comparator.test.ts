import { bubbleSort } from '@sortings/bubble'
import { countingSort } from '@sortings/counting'
import { insertionSort } from '@sortings/insertion'
import { mergeSort } from '@sortings/merge'
import { quickSort } from '@sortings/quick'
import { selectionSort } from '@sortings/selection'
import { describe, expect, test } from 'bun:test'

const sorts = { bubbleSort, insertionSort, mergeSort, quickSort, selectionSort }
const stableSorts = { bubbleSort, insertionSort, mergeSort }

describe.each(Object.entries(sorts))('%s', (_, sort) => {
  test('sorts with a custom comparator', () => {
    expect(sort([3, 1, 4, 1, 5], (a, b) => b - a)).toEqual([5, 4, 3, 1, 1])
  })

  test('sorts objects by a key', () => {
    const people = [{ age: 30 }, { age: 20 }, { age: 25 }]
    expect(sort(people, (a, b) => a.age - b.age).map(p => p.age)).toEqual([20, 25, 30])
  })

  test('always returns a new array', () => {
    for (const input of [[], [1], [2, 1]]) {
      const output = sort(input)
      expect(output).not.toBe(input)
    }
  })
})

describe.each(Object.entries(stableSorts))('%s stability', (_, sort) => {
  test('keeps equal elements in their original order', () => {
    const items = [{ k: 1, id: 'a' }, { k: 0, id: 'b' }, { k: 1, id: 'c' }, { k: 0, id: 'd' }]
    expect(sort(items, (a, b) => a.k - b.k).map(i => i.id)).toEqual(['b', 'd', 'a', 'c'])
  })
})

describe('countingSort', () => {
  test('always returns a new array', () => {
    const input = [1]
    expect(countingSort(input)).not.toBe(input)
  })
})
