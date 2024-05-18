/**
 * Calculates the Canberra distance between `a` and `b`.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The Canberra distance between the two vectors.
 * @throws An error if the vectors do not have the same length.
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