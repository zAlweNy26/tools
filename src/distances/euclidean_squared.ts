/**
 * Computes the squared Euclidean distance between `a` and `b`
 * @param a the first vector
 * @param b the second vector
 * @returns the squared Euclidean distance between the two vectors
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance}
 */
export function euclideanSquared(a: number[], b: number[]) {
    if (a.length != b.length) throw new Error('The vectors should have the same length')

    // slower:
    // const result = Array.from({ length: a.length }, (_, i) => a[i] - b[i]).reduce((p, c) => p + (c * c), 0)
    
    let result = 0

    for (let i = 0; i < a.length; ++i) {
        const op = a[i] - b[i]
        result += op * op
    }

    return result
}