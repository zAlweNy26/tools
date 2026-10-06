import type { Comparator } from '@interfaces/structure'
import { defaultCompare } from '@utils/compare'

/**
 * Sorts an array using the bubble sort algorithm.
 * @param array The array to be sorted. It is not modified.
 * @param compare The comparator deciding the order. Defaults to {@link defaultCompare}.
 * @returns A new sorted array.
 * @example
 * ```ts
 * import { bubbleSort } from '@danyalwe/tools'
 *
 * bubbleSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 * bubbleSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
 * ```
 * @group Sortings
 */
export function bubbleSort<T>(array: T[], compare: Comparator<T> = defaultCompare): T[] {
  const result = [...array]

  for (let i = 0; i < result.length - 1; i++) {
    let swapped = false
    for (let j = 0; j < result.length - 1 - i; j++) {
      if (compare(result[j], result[j + 1]) > 0) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]]
        swapped = true
      }
    }
    if (!swapped) break
  }

  return result
}
