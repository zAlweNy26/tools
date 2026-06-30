/**
 * Returns a function that calculates the Minkowski distance between `a` and `b` using order `p`.
 * When `p = 1` it is equivalent to Manhattan distance, `p = 2` to Euclidean distance,
 * and `p → ∞` to Chebyshev distance.
 * @param p The order of the Minkowski distance. Must be ≥ 1.
 * @returns A distance function `(a: number[], b: number[]) => number`.
 * @throws An error if `p < 1`.
 * @see {@link https://en.wikipedia.org/wiki/Minkowski_distance}
 * @group Distances
 */
export function minkowski(p: number): (a: number[], b: number[]) => number {
  if (p < 1) throw new Error('The Minkowski order p must be at least 1')

  return (a: number[], b: number[]): number => {
    if (a.length !== b.length) throw new Error('The vectors should have the same length')

    let sum = 0

    for (let i = 0; i < a.length; i++) sum += Math.abs(a[i] - b[i]) ** p

    return sum ** (1 / p)
  }
}
