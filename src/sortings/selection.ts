/**
 * Sorts an array using the selection sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @example
 * ```ts
 * import { selectionSort } from '@danyalwe/tools'
 *
 * selectionSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 * selectionSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
 * ```
 * @group Sortings
 */
export function selectionSort<T>(array: T[]) {
  if (array.length <= 1) return array

  const result = [...array]

  for (let i = 0; i < result.length - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < result.length; j++) {
      if (result[j] < result[minIdx])
        minIdx = j
    }
    if (minIdx !== i) [result[i], result[minIdx]] = [result[minIdx], result[i]]
  }

  return result
}
