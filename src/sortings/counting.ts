/**
 * Sorts an array of numbers using the counting sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @group Sortings
 */
export function countingSort(array: number[]) {
  if (array.length <= 1) return array

  const max = Math.max(...array)
  const count = Array.from<number>({ length: max + 1 }).fill(0)

  array.forEach(element => count[element]++)

  for (let i = 1; i < count.length; i++) count[i] += count[i - 1]

  const output = Array.from<number>({ length: array.length })
  for (let i = array.length - 1; i >= 0; i--) {
    output[count[array[i]] - 1] = array[i]
    count[array[i]]--
  }

  return output
}
