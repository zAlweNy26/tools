/**
 * Returns an array of linearly spaced numbers between `start` and `end`.
 * @param start The starting number of the sequence.
 * @param end The ending number of the sequence.
 * @param num The number of samples to generate. Defaults to the maximum of 1 and `end - start` rounded.
 * @returns An array of `num` linearly spaced numbers between `start` and `end`.
 * @example
 * ```ts
 * import { linearSpace } from '@danyalwe/tools'
 *
 * linearSpace(1, 5)       // [1, 2, 3, 4, 5]
 * linearSpace(0, 1, 3)    // [0, 0.5, 1]
 * linearSpace(5, 1)       // [5, 4, 3, 2, 1]
 * ```
 * @group Utils
 */
export function linearSpace(start: number, end: number, num?: number) {
  if (num === undefined) num = Math.max(Math.round(Math.abs(end - start)) + 1, 1)
  if (num < 2) return num === 1 ? [start] : []
  const result = Array.from<number>({ length: num })
  num -= 1
  for (let i = num; i >= 0; --i)
    result[i] = (i * end + (num - i) * start) / num

  return result
}
