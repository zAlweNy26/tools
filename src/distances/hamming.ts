/**
 * Computes the Hamming distance between `a` and `b`
 * @param a the first vector
 * @param b the second vector
 * @returns the Hamming distance between the two vectors
 * @see {@link https://en.wikipedia.org/wiki/Hamming_distance}
 */
export function hamming(a: number[], b: number[]) {
    if (a.length != b.length) throw new Error('The vectors should have the same length')

    const result = Array.from({ length: a.length }, (_, i) => i).reduce((p, c) => p + Number(a[c] != b[c]), 0)

    return result / a.length
}