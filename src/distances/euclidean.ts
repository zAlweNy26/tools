import { euclideanSquared } from "./euclidean_squared"

/**
 * Computes the Euclidean distance between `a` and `b`
 * @param a the first vector
 * @param b the second vector
 * @returns the Euclidean distance between the two vectors
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance}
 */
export function euclidean(a: number[], b: number[]) {
    if (a.length != b.length) throw new Error('The vectors should have the same length')

    return Math.sqrt(euclideanSquared(a, b))
}