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
  const n = array.length
  // bottom-up: merge runs of width 1, 2, 4, … back and forth between two buffers, with no recursion or slicing
  let source = [...array]
  let target = Array.from<T>({ length: n })

  for (let width = 1; width < n; width *= 2) {
    for (let start = 0; start < n; start += 2 * width) {
      const middle = Math.min(start + width, n)
      const end = Math.min(start + 2 * width, n)
      let left = start
      let right = middle
      let out = start
      // taking from the left on ties keeps the sort stable
      while (left < middle && right < end)
        target[out++] = compare(source[left], source[right]) <= 0 ? source[left++] : source[right++]
      while (left < middle) target[out++] = source[left++]
      while (right < end) target[out++] = source[right++]
    }
    [source, target] = [target, source]
  }

  return source
}
