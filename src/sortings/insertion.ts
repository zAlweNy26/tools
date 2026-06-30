/**
 * Sorts an array of numbers using the insertion sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
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
