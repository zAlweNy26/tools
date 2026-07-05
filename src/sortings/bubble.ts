/**
 * Sorts an array using the bubble sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @example
 * ```ts
 * import { bubbleSort } from '@danyalwe/tools'
 *
 * bubbleSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 * bubbleSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
 * ```
 * @group Sortings
 */
export function bubbleSort<T>(array: T[]) {
  if (array.length <= 1) return array

  const result = [...array]

  for (let i = 0; i < result.length - 1; i++) {
    let swapped = false
    for (let j = 0; j < result.length - 1 - i; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]]
        swapped = true
      }
    }
    if (!swapped) break
  }

  return result
}
