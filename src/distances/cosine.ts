/**
 * Calculates the cosine distance (not similarity) between `a` and `b`.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The cosine distance between the two vectors.
 * @throws An error if the vectors do not have the same length.
 * @example
 * ```ts
 * import { cosine } from '@danyalwe/tools'
 *
 * cosine([1, 0], [0, 1])     // ~1.571 (orthogonal)
 * cosine([1, 2], [2, 4])     // 0 (same direction)
 * ```
 * @see {@link https://en.wikipedia.org/wiki/Cosine_similarity#Cosine_distance}
 * @group Distances
 */
export function cosine(a: number[], b: number[]) {
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

  return Math.acos(product / (sqrtA * sqrtB))
}
