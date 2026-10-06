/**
 * Sorts an array using the counting sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @throws An error if the array contains a value that is not an integer.
 * @remarks Allocates one counter per value between the minimum and the maximum, so it suits arrays with a small value range.
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

  let min = Infinity, max = -Infinity
  for (const value of array) {
    if (!Number.isSafeInteger(value)) throw new Error('Counting sort only supports integers')
    if (value < min) min = value
    if (value > max) max = value
  }
  max -= min
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
