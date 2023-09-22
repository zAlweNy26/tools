/**
 * Computes the cosine distance (not similarity) between `a` and `b`
 * @param a the first vector
 * @param b the second vector
 * @returns the cosine distance between the two vectors
 * @see {@link https://en.wikipedia.org/wiki/Cosine_similarity#Cosine_distance}
 */
export function cosine(a: number[], b: number[]) {
    if (a.length != b.length) throw new Error('The vectors should have the same length')

    const product = Array.from({ length: a.length }, (_, i) => a[i] * b[i]).reduce((p, c) => p + c, 0)
    const normA = Math.sqrt(a.reduce((p, c) => p + c**2, 0))
    const normB = Math.sqrt(b.reduce((p, c) => p + c**2, 0))

    if (normA == 0 || normB == 0) return 1

    return Math.acos(product / (normA * normB))
}