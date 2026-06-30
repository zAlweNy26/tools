/**
 * Sorts an array of numbers using the bubble sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @group Sortings
 */
export function bubbleSortNum(array: number[]) {
  if (array.length <= 1) return array

  const result = [...array]

  for (let i = 0; i < result.length - 1; i++) {
    let swapped = false
    for (let j = 0; j < result.length - 1 - i; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]]
        swapped = true
      }
    }
    if (!swapped) break
  }

  return result
}

/**
 * Sorts an array of strings using the bubble sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @group Sortings
 */
export function bubbleSortStr(array: string[]) {
  if (array.length <= 1) return array

  const result = [...array]

  for (let i = 0; i < result.length - 1; i++) {
    let swapped = false
    for (let j = 0; j < result.length - 1 - i; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]]
        swapped = true
      }
    }
    if (!swapped) break
  }

  return result
}
