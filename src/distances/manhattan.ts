/**
 * Calculates the Manhattan distance between `a` and `b`.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The Manhattan distance between the two vectors.
 * @throws An error if the vectors do not have the same length.
 * @see {@link https://en.wikipedia.org/wiki/Manhattan_distance}
 */
export function manhattan(a: number[], b: number[]) {
    if (a.length != b.length) throw new Error('The vectors should have the same length')

    // slower:
    // const result = Array.from({ length: a.length }, (_, i) => Math.abs(a[i] - b[i])).reduce((p, c) => p + c, 0)

    let result = 0
    
    for (let i = 0; i < a.length; i++) result += Math.abs(a[i] - b[i])

    return result
}