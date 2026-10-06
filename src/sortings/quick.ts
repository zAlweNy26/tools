import type { Comparator } from '@interfaces/structure'
import { defaultCompare } from '@utils/compare'

/**
 * Sorts an array using the quick sort algorithm.
 * @param array The array to be sorted. It is not modified.
 * @param compare The comparator deciding the order. Defaults to {@link defaultCompare}.
 * @returns A new sorted array.
 * @example
 * ```ts
 * import { quickSort } from '@danyalwe/tools'
 *
 * quickSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 * quickSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
 * ```
 * @group Sortings
 */
export function quickSort<T>(array: T[], compare: Comparator<T> = defaultCompare): T[] {
  const result = [...array]
  qs(result, 0, result.length - 1, compare)
  return result
}

function qs<T>(arr: T[], low: number, high: number, compare: Comparator<T>) {
  // recursing only into the smaller side keeps the stack depth O(log n)
  while (low < high) {
    const [lt, gt] = partition(arr, low, high, compare)
    if (lt - low < high - gt) {
      qs(arr, low, lt - 1, compare)
      low = gt + 1
    }
    else {
      qs(arr, gt + 1, high, compare)
      high = lt - 1
    }
  }
}

/**
 * Three-way partition around a median-of-three pivot, so runs of equal values are handled in one pass.
 * @returns The bounds `[lt, gt]` of the range holding values equal to the pivot.
 */
function partition<T>(arr: T[], low: number, high: number, compare: Comparator<T>): [number, number] {
  const pivot = medianOfThree(arr[low], arr[(low + high) >> 1], arr[high], compare)
  let lt = low, i = low, gt = high

  while (i <= gt) {
    const cmp = compare(arr[i], pivot)
    if (cmp < 0) {
      [arr[lt], arr[i]] = [arr[i], arr[lt]]
      lt++
      i++
    }
    else if (cmp > 0) {
      [arr[i], arr[gt]] = [arr[gt], arr[i]]
      gt--
    }
    else i++
  }

  return [lt, gt]
}

function medianOfThree<T>(a: T, b: T, c: T, compare: Comparator<T>) {
  const lt = (x: T, y: T) => compare(x, y) < 0
  if (lt(a, b)) return lt(b, c) ? b : lt(a, c) ? c : a
  return lt(a, c) ? a : lt(b, c) ? c : b
}
