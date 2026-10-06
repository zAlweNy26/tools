/**
 * Sorts an array using the quick sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @example
 * ```ts
 * import { quickSort } from '@danyalwe/tools'
 *
 * quickSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 * quickSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
 * ```
 * @group Sortings
 */
export function quickSort<T>(array: T[]): T[] {
  if (array.length <= 1) return array

  const result = [...array]
  qs(result, 0, result.length - 1)
  return result
}

function qs<T>(arr: T[], low: number, high: number) {
  // recursing only into the smaller side keeps the stack depth O(log n)
  while (low < high) {
    const [lt, gt] = partition(arr, low, high)
    if (lt - low < high - gt) {
      qs(arr, low, lt - 1)
      low = gt + 1
    }
    else {
      qs(arr, gt + 1, high)
      high = lt - 1
    }
  }
}

/**
 * Three-way partition around a median-of-three pivot, so runs of equal values are handled in one pass.
 * @returns The bounds `[lt, gt]` of the range holding values equal to the pivot.
 */
function partition<T>(arr: T[], low: number, high: number): [number, number] {
  const pivot = medianOfThree(arr[low], arr[(low + high) >> 1], arr[high])
  let lt = low, i = low, gt = high

  while (i <= gt) {
    if (arr[i] < pivot) {
      [arr[lt], arr[i]] = [arr[i], arr[lt]]
      lt++
      i++
    }
    else if (pivot < arr[i]) {
      [arr[i], arr[gt]] = [arr[gt], arr[i]]
      gt--
    }
    else i++
  }

  return [lt, gt]
}

function medianOfThree<T>(a: T, b: T, c: T) {
  if (a < b) return b < c ? b : a < c ? c : a
  return a < c ? a : b < c ? c : b
}
