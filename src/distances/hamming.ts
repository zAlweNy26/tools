/**
 * Calculates the Hamming distance between `a` and `b`.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The Hamming distance between the two vectors, or 0 if both are empty.
 * @throws An error if the vectors do not have the same length.
 * @example
 * ```ts
 * import { hamming } from '@danyalwe/tools'
 *
 * hamming([1, 0, 1], [1, 1, 1])  // 0.333... (1 of 3 differs)
 * hamming([0, 0], [1, 1])        // 1 (all differ)
 * ```
 * @see {@link https://en.wikipedia.org/wiki/Hamming_distance}
 * @group Distances
 * @complexity O(n) for vectors of length n.
 */
export function hamming(a: number[], b: number[]) {
  if (a.length !== b.length) throw new Error('The vectors should have the same length')

  let result = 0

  for (let i = 0; i < a.length; i++) result += Number(a[i] !== b[i])

  return a.length === 0 ? 0 : result / a.length
}
