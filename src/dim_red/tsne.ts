import { Matrix } from "structures"
import { DimRed } from "./dim_red"
import { TSNEParams } from "./interfaces"
import { euclideanSquared } from "distances"

export class TSNE extends DimRed<TSNEParams> {
    protected _yStep!: Matrix
    protected _gains!: Matrix

    constructor(data: Matrix | number[][], params?: Partial<TSNEParams>) {
        super(data, {
            perplexity: 50,
            epsilon: 10,
            dimensionality: 2,
            metric: euclideanSquared,
            ...params
        })
        this._result = new Matrix(this._data.rows, this.dimensionality, () => this._randomizer.randomGauss() * 1e-4)
    }

    init() {
        const n = this._data.rows
        let delta = this._data.clone()

        if (this.metric != "precomputed") {
            delta = new Matrix(n, n, 0)
            for (let i = 0; i < n; ++i) {
                for (let j = i + 1; j < n; ++j) {
                    const distance = this._params.metric(this._data.getRow(i), this._data.getRow(j)) as number
                    delta.set(i, j, distance)
                    delta.set(j, i, distance)
                }
            }
        }

        this._yStep = new Matrix(this._data.rows, this._data.cols, 0)
        this._gains = new Matrix(this._data.rows, this._data.cols, 1)

        const P = new Matrix(n, n, 0)

        // search for fitting sigma
        const targetH = Math.log(this.perplexity)
        for (let i = 0; i < n; ++i) {
            const nDist = delta.getRow(i)
            const pRow = P.getRow(i)
            let betaMin = -Infinity, betaMax = Infinity
            let beta = 1, cnt = 50, done = false
            let pSum = 0, dpSum = 0

            // compute entropy and kernel row with beta precision
            while (!done && cnt--) {
                pSum = dpSum = 0

                nDist.forEach((v, j) => {
                    const pj = i !== j ? Math.exp(-v * beta) : 0
                    dpSum += v * pj
                    pRow[j] = pj
                    pSum += pj
                })

                // compute entropy
                const H = pSum > 0 ? Math.log(pSum) + (beta * dpSum) / pSum : 0
                
                if (H > targetH) {
                    betaMin = beta
                    beta = betaMax === Infinity ? beta * 2 : (beta + betaMax) / 2
                } else {
                    betaMax = beta
                    beta = betaMin === -Infinity ? beta / 2 : (beta + betaMin) / 2
                }

                done = Math.abs(H - targetH) < 1e-4
            }

            // normalize p
            for (let j = 0; j < n; ++j) {
                pRow[j] /= pSum
            }
        }

        // compute probabilities
        const n2 = n * 2
        for (let i = 0; i < n; ++i) {
            for (let j = i; j < n; ++j) {
                const p = Math.max((P.get(i, j) + P.get(j, i)) / n2, 1e-100)
                P.set(i, j, p)
                P.set(j, i, p)
            }
        }

        this._projection = P
        return this
    }

    protected next() {
        const { dimensionality: dim, epsilon } = this._params
        const n = this._data.rows
        const iter = ++this._iter
        const pMul = iter < 100 ? 4 : 1

        // compute Q dist (unnormalized)
        const Qu = new Matrix(n, n, 0)
        let qSum = 0

        for (let i = 0; i < n; ++i) {
            for (let j = i + 1; j < n; ++j) {
                let dSum = 0
                for (let d = 0; d < dim; ++d) {
                    const dHere = this._result.get(i, d) - this._result.get(j, d)
                    dSum += dHere * dHere
                }
                const qVal = 1 / (1 + dSum)
                Qu.set(i, j, qVal)
                Qu.set(j, i, qVal)
                qSum += 2 * qVal
            }
        }

        // normalize Q dist
        const Q = new Matrix(n, n, 0)
        for (let i = 0; i < n; ++i) {
            for (let j = i + 1; j < n; ++j) {
                const val = Math.max(Qu.get(i, j) / qSum, 1e-100)
                Q.set(i, j, val)
                Q.set(j, i, val)
            }
        }

        const grad = new Matrix(n, dim, 0)
        for (let i = 0; i < n; ++i) {
            for (let j = 0; j < n; ++j) {
                const Qij = Q.get(i, j)
                const preMult = 4 * (pMul * this._projection.get(i, j) - Qij) * Qij
                for (let d = 0; d < dim; ++d) {
                    grad.update(i, d, o => o + (preMult * (this._result.get(i, d) - this._result.get(j, d))))
                }
            }
        }

        // perform gradient step
        const resMean = new Array<number>(dim)
        for (let i = 0; i < n; ++i) {
            for (let d = 0; d < dim; ++d) {
                const gId = grad.get(i, d)
                const sId = this._yStep.get(i, d)
                const gainId = this._gains.get(i, d)

                let newGain = 0
                
                if (newGain < 0.01) newGain = 0.01
                else if (Math.sign(gId) === Math.sign(sId)) newGain = gainId * 0.8
                else newGain = gainId + 0.2
                
                this._gains.set(i, d, newGain)

                const mVal = iter < 250 ? 0.5 : 0.8
                const sIdNew = mVal * sId - epsilon * newGain * gId
                this._yStep.set(i, d, sIdNew)

                resMean[d] += this._result.update(i, d, o => o + sIdNew)
            }
        }

        for (let i = 0; i < n; ++i) {
            for (let d = 0; d < dim; ++d) {
                this._result.update(i, d, o => o - (resMean[d] / n))
            }
        }

        return super.next()
    }

    get perplexity() {
        return this._params.perplexity
    }

    get epsilon() {
        return this._params.epsilon
    }
}