/**
 * Computes the Canberra distance between `a` and `b`
 * @param a the first vector
 * @param b the second vector
 * @returns the Canberra distance between the two vectors
 * @see {@link https://en.wikipedia.org/wiki/Canberra_distance}
 */
export function canberra(a: number[], b: number[]) {
    if (a.length != b.length) throw new Error('The vectors should have the same length')

    let distance = 0

    for (let i = 0; i < a.length; i++) {
        const num = Math.abs(a[i] - b[i])
        const den = Math.abs(a[i]) + Math.abs(b[i])

        if (den !== 0) distance += num / den
    }

    return distance
}