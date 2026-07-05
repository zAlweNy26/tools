/**
 * Calculates the squared Euclidean distance between `a` and `b`.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The squared Euclidean distance between the two vectors.
 * @throws An error if the vectors do not have the same length.
 * @example
 * ```ts
 * import { euclideanSquared } from '@danyalwe/tools'
 *
 * euclideanSquared([0, 0], [3, 4])  // 25
 * euclideanSquared([1, 1], [4, 5])  // 25
 * ```
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance}
 * @group Distances
 */
export function euclideanSquared(a: number[], b: number[]) {
  if (a.length !== b.length) throw new Error('The vectors should have the same length')

  let result = 0

  for (let i = 0; i < a.length; ++i) {
    const op = a[i] - b[i]
    result += op * op
  }

  return result
}
