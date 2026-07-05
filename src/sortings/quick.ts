function partitionNumbers(arr: number[], low: number, high: number) {
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

function partitionStrings(arr: string[], low: number, high: number) {
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

/**
 * Sorts an array of numbers using the quick sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @example
 * ```ts
 * import { quickSortNum } from '@danyalwe/tools'
 *
 * quickSortNum([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 * ```
 * @group Sortings
 */
export function quickSortNum(array: number[]) {
  if (array.length <= 1) return array

  const result = [...array]

  const qs = (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pi = partitionNumbers(arr, low, high)

      qs(arr, low, pi - 1)
      qs(arr, pi + 1, high)
    }
  }

  qs(result, 0, result.length - 1)

  return result
}

/**
 * Sorts an array of strings using the quick sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @example
 * ```ts
 * import { quickSortStr } from '@danyalwe/tools'
 *
 * quickSortStr(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
 * ```
 * @group Sortings
 */
export function quickSortStr(array: string[]) {
  if (array.length <= 1) return array

  const result = [...array]

  const qs = (arr: string[], low: number, high: number) => {
    if (low < high) {
      const pi = partitionStrings(arr, low, high)

      qs(arr, low, pi - 1)
      qs(arr, pi + 1, high)
    }
  }

  qs(result, 0, result.length - 1)

  return result
}
