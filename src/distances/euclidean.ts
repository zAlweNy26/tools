import { euclideanSquared } from "./euclidean_squared"

/**
 * Calculates the Euclidean distance between `a` and `b`.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The Euclidean distance between the two vectors.
 * @throws An error if the vectors do not have the same length.
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance}
 */
export function euclidean(a: number[], b: number[]) {
    if (a.length != b.length) throw new Error('The vectors should have the same length')

    return Math.sqrt(euclideanSquared(a, b))
}