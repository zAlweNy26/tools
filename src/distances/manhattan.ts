/**
 * Calculates the Manhattan distance between `a` and `b`.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The Manhattan distance between the two vectors.
 * @throws An error if the vectors do not have the same length.
 * @example
 * ```ts
 * import { manhattan } from '@danyalwe/tools'
 *
 * manhattan([0, 0], [3, 4])  // 7
 * manhattan([1, 2], [4, 6])  // 7
 * ```
 * @see {@link https://en.wikipedia.org/wiki/Manhattan_distance}
 * @group Distances
 * @complexity O(n) for vectors of length n.
 */
export function manhattan(a: number[], b: number[]) {
  if (a.length !== b.length) throw new Error('The vectors should have the same length')

  let result = 0

  for (let i = 0; i < a.length; i++) result += Math.abs(a[i] - b[i])

  return result
}
