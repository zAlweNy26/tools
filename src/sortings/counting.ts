/**
 * Sorts an array using the counting sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @example
 * ```ts
 * import { countingSort } from '@danyalwe/tools'
 *
 * countingSort([4, 2, 2, 8, 3, 3, 1]) // [1, 2, 2, 3, 3, 4, 8]
 * ```
 * @group Sortings
 */
export function countingSort(array: number[]) {
  if (array.length <= 1) return array

  const min = Math.min(...array)
  const max = Math.max(...array) - min
  const count = Array.from<number>({ length: max + 1 }).fill(0)

  for (let i = 0; i < array.length; i++) count[array[i] - min]++

  for (let i = 1; i < count.length; i++) count[i] += count[i - 1]

  const output = Array.from<number>({ length: array.length })
  for (let i = array.length - 1; i >= 0; i--) {
    const idx = count[array[i] - min] - 1
    output[idx] = array[i]
    count[array[i] - min]--
  }

  return output
}
