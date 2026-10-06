import type { Comparator } from '@interfaces/structure'
import { defaultCompare } from '@utils/compare'

/**
 * Sorts an array using the insertion sort algorithm.
 * @param array The array to be sorted. It is not modified.
 * @param compare The comparator deciding the order. Defaults to {@link defaultCompare}.
 * @returns A new sorted array.
 * @example
 * ```ts
 * import { insertionSort } from '@danyalwe/tools'
 *
 * insertionSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 * insertionSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
 * ```
 * @group Sortings
 */
export function insertionSort<T>(array: T[], compare: Comparator<T> = defaultCompare): T[] {
  const result = [...array]

  for (let i = 1; i < result.length; i++) {
    const key = result[i]
    let j = i - 1
    while (j >= 0 && compare(result[j], key) > 0) {
      result[j + 1] = result[j]
      j--
    }
    result[j + 1] = key
  }

  return result
}
