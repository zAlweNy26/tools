/**
 * Calculates the angular distance between `a` and `b`.
 * Defined as `acos(cosine_similarity) / π`, bounded in [0, 1].
 * @param a The first vector.
 * @param b The second vector.
 * @returns The angular distance between the two vectors.
 * @throws An error if the vectors do not have the same length.
 * @example
 * ```ts
 * import { angular } from '@danyalwe/tools'
 *
 * angular([1, 0], [0, 1]) // 0.5 (orthogonal vectors)
 * angular([1, 2], [2, 4]) // 0 (identical direction)
 * ```
 * @see {@link https://en.wikipedia.org/wiki/Cosine_similarity#Angular_distance_and_similarity}
 * @group Distances
 */
export function angular(a: number[], b: number[]) {
  if (a.length !== b.length) throw new Error('The vectors should have the same length')

  let product = 0, normA = 0, normB = 0

  for (let i = 0; i < a.length; i++) {
    product += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  const sqrtA = Math.sqrt(normA)
  const sqrtB = Math.sqrt(normB)

  if (sqrtA === 0 || sqrtB === 0) return 1

  return Math.acos(product / (sqrtA * sqrtB)) / Math.PI
}
