import type { Comparator } from '@interfaces/structure'
import { defaultCompare } from '@utils/compare'

/**
 * Sorts an array using the selection sort algorithm.
 * @param array The array to be sorted. It is not modified.
 * @param compare The comparator deciding the order. Defaults to {@link defaultCompare}.
 * @returns A new sorted array.
 * @example
 * ```ts
 * import { selectionSort } from '@danyalwe/tools'
 *
 * selectionSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 * selectionSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
 * ```
 * @group Sortings
 * @complexity O(n²) time in every case. O(n) extra space for the copy. Not stable.
 */
export function selectionSort<T>(array: T[], compare: Comparator<T> = defaultCompare): T[] {
  const result = [...array]

  for (let i = 0; i < result.length - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < result.length; j++) {
      if (compare(result[j], result[minIdx]) < 0)
        minIdx = j
    }
    if (minIdx !== i) [result[i], result[minIdx]] = [result[minIdx], result[i]]
  }

  return result
}
