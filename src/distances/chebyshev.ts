/**
 * Calculates the Chebyshev distance between `a` and `b`.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The Chebyshev distance between the two vectors.
 * @throws An error if the vectors do not have the same length.
 * @see {@link https://en.wikipedia.org/wiki/Chebyshev_distance}
 */
export function chebyshev(a: number[], b: number[]) {
    if (a.length != b.length) throw new Error('The vectors should have the same length')

    const result = Array.from({ length: a.length }, (_, i) => Math.abs(a[i] - b[i]))

    return Math.max(...result)
}