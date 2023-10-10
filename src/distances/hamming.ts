/**
 * Calculates the Hamming distance between `a` and `b`.
 * @param a - The first vector.
 * @param b - The second vector.
 * @returns The Hamming distance between the two vectors.
 * @throws An error if the vectors do not have the same length.
 * @see {@link https://en.wikipedia.org/wiki/Hamming_distance}
 */
export function hamming(a: number[], b: number[]) {
    if (a.length != b.length) throw new Error('The vectors should have the same length')

    // slower:
    // const result = Array.from({ length: a.length }, (_, i) => i).reduce((p, c) => p + Number(a[c] != b[c]), 0)

    let result = 0
    
    for (let i = 0; i < a.length; i++) result += Number(a[i] != b[i])

    return result / a.length
}