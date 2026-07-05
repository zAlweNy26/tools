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

  const qs = (arr: T[], low: number, high: number) => {
    if (low < high) {
      const pi = partition(arr, low, high)

      qs(arr, low, pi - 1)
      qs(arr, pi + 1, high)
    }
  }

  qs(result, 0, result.length - 1)

  return result
}

function partition<T>(arr: T[], low: number, high: number) {
  const mid = (low + high) >> 1
  if (arr[mid] < arr[low]) [arr[low], arr[mid]] = [arr[mid], arr[low]]
  if (arr[high] < arr[low]) [arr[low], arr[high]] = [arr[high], arr[low]]
  if (arr[mid] < arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]]

  const pivot = arr[high]
  let i = low - 1

  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]

  return i + 1
}
