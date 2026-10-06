import type { Comparator } from '@interfaces/structure'
import { defaultCompare } from '@utils/compare'

/**
 * Sorts an array using the merge sort algorithm.
 * @param array The array to be sorted. It is not modified.
 * @param compare The comparator deciding the order. Defaults to {@link defaultCompare}.
 * @returns A new sorted array.
 * @example
 * ```ts
 * import { mergeSort } from '@danyalwe/tools'
 *
 * mergeSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 * mergeSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
 * ```
 * @group Sortings
 * @complexity O(n log n) time, O(n) extra space. Stable.
 */
export function mergeSort<T>(array: T[], compare: Comparator<T> = defaultCompare): T[] {
  if (array.length <= 1) return [...array]

  const middle = Math.floor(array.length / 2)
  return merge(mergeSort(array.slice(0, middle), compare), mergeSort(array.slice(middle), compare), compare)
}

function merge<T>(left: T[], right: T[], compare: Comparator<T>) {
  const result: T[] = []
  let li = 0, ri = 0
  const ll = left.length, rl = right.length

  while (li < ll && ri < rl)
    // taking from the left on ties keeps the sort stable
    result.push(compare(left[li], right[ri]) <= 0 ? left[li++] : right[ri++])

  while (li < ll) result.push(left[li++])
  while (ri < rl) result.push(right[ri++])

  return result
}
