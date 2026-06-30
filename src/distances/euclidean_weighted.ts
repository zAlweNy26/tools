/**
 * Returns a function that calculates the weighted Euclidean distance between `a` and `b`
 * using the given per-dimension weight vector.
 * @param weights The weight vector. Each weight `w_i` is applied to the squared difference `(a_i - b_i)^2`.
 * @returns A distance function `(a: number[], b: number[]) => number`.
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_distance#Weighted_Euclidean_distance}
 * @group Distances
 */
export function euclideanWeighted(weights: number[]): (a: number[], b: number[]) => number {
  return (a: number[], b: number[]): number => {
    if (a.length !== b.length) throw new Error('The vectors should have the same length')
    if (a.length !== weights.length) throw new Error('The weights vector should have the same length as the input vectors')

    let sum = 0

    for (let i = 0; i < a.length; i++) {
      const diff = a[i] - b[i]
      sum += weights[i] * diff * diff
    }

    return Math.sqrt(sum)
  }
}
