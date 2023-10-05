/**
 * Computes the Manhattan distance between `a` and `b`
 * @param a the first vector
 * @param b the second vector
 * @returns the Manhattan distance between the two vectors
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