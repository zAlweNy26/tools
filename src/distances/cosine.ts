/**
 * Calculates the cosine distance (not similarity) between `a` and `b`.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The cosine distance between the two vectors.
 * @throws An error if the vectors do not have the same length.
 * @see {@link https://en.wikipedia.org/wiki/Cosine_similarity#Cosine_distance}
 */
export function cosine(a: number[], b: number[]) {
    if (a.length != b.length) throw new Error('The vectors should have the same length')

    // slower:
    // const product = Array.from({ length: a.length }, (_, i) => a[i] * b[i]).reduce((p, c) => p + c, 0)

    let product = 0
    
    for (let i = 0; i < a.length; i++) product += a[i] * b[i]

    const normA = Math.sqrt(a.reduce((p, c) => p + c**2, 0))
    const normB = Math.sqrt(b.reduce((p, c) => p + c**2, 0))

    if (normA == 0 || normB == 0) return 1

    return Math.acos(product / (normA * normB))
}