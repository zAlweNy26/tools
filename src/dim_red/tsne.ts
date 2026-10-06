import type { TSNEParams } from '@interfaces/dim-red'
import { DimRed } from './dim_red'
import { euclideanSquared } from '@distances/euclidean_squared'
import { Matrix } from '@structures/matrix'

/**
 * Implementation of the t-Distributed Stochastic Neighbor Embedding (t-SNE) algorithm.
 * @example
 * ```ts
 * import { TSNE } from '@danyalwe/tools'
 *
 * const data = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
 * const tsne = new TSNE(data, { perplexity: 30, epsilon: 10, dimensionality: 2 })
 * const projection = tsne.transform()
 *
 * projection.forEach(row => console.log(row)) // 2D coordinates
 * ```
 * @group Dimensionality Reduction
 */
export class TSNE extends DimRed<TSNEParams> {
  // flat row-major buffers: P and Q are n×n, the others n×dimensionality
  protected _p!: Float64Array
  protected _q!: Float64Array
  protected _y!: Float64Array
  protected _yStep!: Float64Array
  protected _gains!: Float64Array
  protected _grad!: Float64Array

  /**
   * t-SNE algorithm for dimensionality reduction.
   * @param data A 2D array or matrix whose dimensionality is to be reduced.
   * @param params Optional parameters for the algorithm.
   */
  constructor(data: Matrix | number[][], params?: Partial<TSNEParams>) {
    super(data, {
      perplexity: 50,
      epsilon: 10,
      dimensionality: 2,
      metric: euclideanSquared,
      seed: 1212,
      ...params,
    })
    this._result = new Matrix(this._data.rows, this.dimensionality, () => this._randomizer.randomGauss() * 1e-4)
  }

  /**
   * Initializes the t-SNE algorithm by computing pairwise distances between data points and
   * computing probabilities for each pair of points. It also initializes the step and gains matrices.
   * @returns The t-SNE instance.
   * @example
   * ```ts
   * import { Matrix } from '@danyalwe/tools'
   *
   * // Using precomputed distances
   * const distances = new Matrix(3, 3, [
   *   [0, 1, 4],
   *   [1, 0, 2],
   *   [4, 2, 0],
   * ])
   * const tsne = new TSNE(distances, { metric: 'precomputed', perplexity: 2 })
   * const projection = tsne.transform()
   * ```
   * @complexity O(n² · d) for n points of dimension d: every pairwise distance is computed, then each row is calibrated by binary search.
   */
  init() {
    const n = this._data.rows
    const dim = this._params.dimensionality
    const metric = this._params.metric
    const rows = this._data.toArray()

    // pairwise distances
    const delta = new Float64Array(n * n)
    for (let i = 0; i < n; ++i) {
      for (let j = i + 1; j < n; ++j) {
        const distance = metric === 'precomputed' ? rows[i][j] : metric(rows[i], rows[j])
        delta[i * n + j] = distance
        delta[j * n + i] = metric === 'precomputed' ? rows[j][i] : distance
      }
    }

    // search for fitting sigma
    const P = new Float64Array(n * n)
    const targetH = Math.log(this._params.perplexity)
    for (let i = 0; i < n; ++i) {
      const offset = i * n
      let betaMin = -Infinity, betaMax = Infinity
      let beta = 1, cnt = 50, done = false
      let pSum = 0, dpSum = 0

      // shifting by the nearest distance leaves P and H unchanged but keeps exp() from underflowing to 0
      let minDist = Infinity
      for (let j = 0; j < n; ++j)
        if (i !== j && delta[offset + j] < minDist) minDist = delta[offset + j]

      // compute entropy and kernel row with beta precision
      while (!done && cnt--) {
        pSum = dpSum = 0
        for (let j = 0; j < n; ++j) {
          const shifted = delta[offset + j] - minDist
          const pj = i !== j ? Math.exp(-shifted * beta) : 0
          dpSum += shifted * pj
          P[offset + j] = pj
          pSum += pj
        }

        // compute entropy
        const H = pSum > 0 ? Math.log(pSum) + (beta * dpSum) / pSum : 0

        if (H > targetH) {
          betaMin = beta
          beta = betaMax === Infinity ? beta * 2 : (beta + betaMax) / 2
        }
        else {
          betaMax = beta
          beta = betaMin === -Infinity ? beta / 2 : (beta + betaMin) / 2
        }

        done = Math.abs(H - targetH) < 1e-4
      }

      // normalize p
      if (pSum > 0) {
        for (let j = 0; j < n; ++j)
          P[offset + j] /= pSum
      }
    }

    // symmetrize the probabilities
    const n2 = n * 2
    for (let i = 0; i < n; ++i) {
      for (let j = i; j < n; ++j) {
        const p = Math.max((P[i * n + j] + P[j * n + i]) / n2, 1e-100)
        P[i * n + j] = p
        P[j * n + i] = p
      }
    }

    this._p = P
    this._q = new Float64Array(n * n)
    this._y = Float64Array.from(this._result.toArray().flat())
    this._yStep = new Float64Array(n * dim)
    this._gains = new Float64Array(n * dim).fill(1)
    this._grad = new Float64Array(n * dim)
    return this
  }

  protected next() {
    const { dimensionality: dim, epsilon } = this._params
    const n = this._data.rows
    const P = this._p
    const Q = this._q
    const Y = this._y
    const yStep = this._yStep
    const gains = this._gains
    const grad = this._grad
    const iter = ++this._iter
    const pMul = iter < 100 ? 4 : 1

    // Student-t kernel between every pair of embedded points
    let qSum = 0
    for (let i = 0; i < n; ++i) {
      for (let j = i + 1; j < n; ++j) {
        let dSum = 0
        for (let d = 0; d < dim; ++d) {
          const dHere = Y[i * dim + d] - Y[j * dim + d]
          dSum += dHere * dHere
        }
        const qVal = 1 / (1 + dSum)
        Q[i * n + j] = qVal
        Q[j * n + i] = qVal
        qSum += 2 * qVal
      }
    }

    // gradient; the i === j term is always zero, so it is skipped
    grad.fill(0)
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < n; ++j) {
        if (i === j) continue
        const qVal = Q[i * n + j]
        const Qij = Math.max(qVal / qSum, 1e-100)
        const preMult = 4 * (pMul * P[i * n + j] - Qij) * qVal
        for (let d = 0; d < dim; ++d)
          grad[i * dim + d] += preMult * (Y[i * dim + d] - Y[j * dim + d])
      }
    }

    // perform gradient step
    const resMean = new Float64Array(dim)
    const mVal = iter < 250 ? 0.5 : 0.8
    for (let i = 0; i < n; ++i) {
      for (let d = 0; d < dim; ++d) {
        const k = i * dim + d
        const gId = grad[k]
        const sId = yStep[k]

        const newGain = Math.max(Math.sign(gId) === Math.sign(sId) ? gains[k] * 0.8 : gains[k] + 0.2, 0.01)
        gains[k] = newGain

        const sIdNew = mVal * sId - epsilon * newGain * gId
        yStep[k] = sIdNew
        Y[k] += sIdNew
        resMean[d] += Y[k]
      }
    }

    // re-center the embedding and publish it
    for (let i = 0; i < n; ++i) {
      for (let d = 0; d < dim; ++d) {
        Y[i * dim + d] -= resMean[d] / n
        this._result.set(i, d, Y[i * dim + d])
      }
    }

    return this._result
  }
}
