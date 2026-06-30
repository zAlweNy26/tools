/**
 * Calculates the angular distance between `a` and `b`.
 * Defined as `acos(cosine_similarity) / π`, bounded in [0, 1].
 * @param a The first vector.
 * @param b The second vector.
 * @returns The angular distance between the two vectors.
 * @throws An error if the vectors do not have the same length.
 * @see {@link https://en.wikipedia.org/wiki/Cosine_similarity#Angular_distance_and_similarity}
 * @group Distances
 */
export function angular(a: number[], b: number[]) {
  if (a.length !== b.length) throw new Error('The vectors should have the same length')

  let product = 0

  for (let i = 0; i < a.length; i++) product += a[i] * b[i]

  const normA = Math.sqrt(a.reduce((p, c) => p + c ** 2, 0))
  const normB = Math.sqrt(b.reduce((p, c) => p + c ** 2, 0))

  if (normA === 0 || normB === 0) return 1

  return Math.acos(product / (normA * normB)) / Math.PI
}
