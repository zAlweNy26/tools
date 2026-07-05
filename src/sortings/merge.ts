/**
 * Sorts an array using the merge sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 * @example
 * ```ts
 * import { mergeSort } from '@danyalwe/tools'
 *
 * mergeSort([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]
 * mergeSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
 * ```
 * @group Sortings
 */
export function mergeSort<T>(array: T[]): T[] {
  if (array.length <= 1) return array

  const middle = Math.floor(array.length / 2)

  let left = array.slice(0, middle)
  let right = array.slice(middle)

  left = mergeSort(left)
  right = mergeSort(right)

  return merge(left, right)
}

function merge<T>(left: T[], right: T[]) {
  const result: T[] = []
  let li = 0, ri = 0
  const ll = left.length, rl = right.length

  while (li < ll && ri < rl)
    result.push(left[li] <= right[ri] ? left[li++] : right[ri++])

  while (li < ll) result.push(left[li++])
  while (ri < rl) result.push(right[ri++])

  return result
}
