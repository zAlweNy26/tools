/**
 * Sorts an array of numbers using the insertion sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @example
 * ```ts
 * import { insertionSortNum } from '@danyalwe/tools'
 *
 * insertionSortNum([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 * ```
 * @group Sortings
 */
export function insertionSortNum(array: number[]) {
  if (array.length <= 1) return array

  const result = [...array]

  for (let i = 1; i < result.length; i++) {
    const key = result[i]
    let j = i - 1
    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j]
      j--
    }
    result[j + 1] = key
  }

  return result
}

/**
 * Sorts an array of strings using the insertion sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @example
 * ```ts
 * import { insertionSortStr } from '@danyalwe/tools'
 *
 * insertionSortStr(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
 * ```
 * @group Sortings
 */
export function insertionSortStr(array: string[]) {
  if (array.length <= 1) return array

  const result = [...array]

  for (let i = 1; i < result.length; i++) {
    const key = result[i]
    let j = i - 1
    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j]
      j--
    }
    result[j + 1] = key
  }

  return result
}
