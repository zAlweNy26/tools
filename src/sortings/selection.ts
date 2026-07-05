/**
 * Sorts an array of numbers using the selection sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @example
 * ```ts
 * import { selectionSortNum } from '@danyalwe/tools'
 *
 * selectionSortNum([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 * ```
 * @group Sortings
 */
export function selectionSortNum(array: number[]) {
  if (array.length <= 1) return array

  const result = [...array]

  for (let i = 0; i < result.length - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < result.length; j++) {
      if (result[j] < result[minIdx])
        minIdx = j
    }
    if (minIdx !== i) [result[i], result[minIdx]] = [result[minIdx], result[i]]
  }

  return result
}

/**
 * Sorts an array of strings using the selection sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @example
 * ```ts
 * import { selectionSortStr } from '@danyalwe/tools'
 *
 * selectionSortStr(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
 * ```
 * @group Sortings
 */
export function selectionSortStr(array: string[]) {
  if (array.length <= 1) return array

  const result = [...array]

  for (let i = 0; i < result.length - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < result.length; j++) {
      if (result[j] < result[minIdx])
        minIdx = j
    }
    if (minIdx !== i) [result[i], result[minIdx]] = [result[minIdx], result[i]]
  }

  return result
}
