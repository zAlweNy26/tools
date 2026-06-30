/**
 * Calculates the Pearson correlation distance between `a` and `b`.
 * Defined as `1 - r`, where `r` is the Pearson correlation coefficient.
 * The result is bounded in [0, 2]; 0 means perfect positive correlation, 2 means perfect negative correlation.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The Pearson correlation distance between the two vectors.
 * @throws An error if the vectors do not have the same length.
 * @see {@link https://en.wikipedia.org/wiki/Pearson_correlation_coefficient}
 * @group Distances
 */
export function pearson(a: number[], b: number[]) {
  if (a.length !== b.length) throw new Error('The vectors should have the same length')

  const n = a.length

  let sumA = 0
  let sumB = 0

  for (let i = 0; i < n; i++) {
    sumA += a[i]
    sumB += b[i]
  }

  const meanA = sumA / n
  const meanB = sumB / n

  let cov = 0
  let varA = 0
  let varB = 0

  for (let i = 0; i < n; i++) {
    const dA = a[i] - meanA
    const dB = b[i] - meanB

    cov += dA * dB
    varA += dA * dA
    varB += dB * dB
  }

  if (varA === 0 || varB === 0) return 1

  return 1 - cov / Math.sqrt(varA * varB)
}
