/**
 * Calculates the Chebyshev distance between `a` and `b`.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The Chebyshev distance between the two vectors.
 * @throws An error if the vectors do not have the same length.
 * @example
 * ```ts
 * import { chebyshev } from '@danyalwe/tools'
 *
 * chebyshev([0, 0], [3, 4])   // 4
 * chebyshev([1, 5], [3, 2])   // 3
 * ```
 * @see {@link https://en.wikipedia.org/wiki/Chebyshev_distance}
 * @group Distances
 */
export function chebyshev(a: number[], b: number[]) {
  if (a.length !== b.length) throw new Error('The vectors should have the same length')

  let max = 0

  for (let i = 0; i < a.length; i++)
    max = Math.max(max, Math.abs(a[i] - b[i]))

  return max
}
