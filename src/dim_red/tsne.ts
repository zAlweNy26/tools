import { Matrix } from "structures/matrix";
import { DimRed } from "./dim_red";
import { TSNEParams } from "./interfaces";

export class TSNE extends DimRed<TSNEParams> {
    protected _yStep!: Matrix
    protected _gains!: Matrix

    constructor(data: Matrix | number[][], params?: Partial<TSNEParams>) {
        super(data, {
            perplexity: 50,
            epsilon: 10,
            ...params
        })
        this._result = new Matrix(this._data.rows, this.dimensionality, () => this._randomizer.randomGauss() * 1e-4)
    }

    init() {
        const targetH = Math.log(this.perplexity)
        let delta: Matrix
        if (this.metric == "precomputed") {
            delta = this._data.clone()
        } else {
            delta = new Matrix(this._data.rows, this._data.rows)
            for (let i = 0; i < this._data.rows; ++i) {
                const iRow = this._data.getRow(i)
                for (let j = i + 1; j < this._data.rows; ++j) {
                    const distance = this._params.metric(iRow, this._data.getRow(j)) as number
                    delta.set(i, j, distance)
                    delta.set(j, i, distance)
                }
            }
        }

        const P = new Matrix(this._data.rows, this._data.rows, 0)

        this._yStep = new Matrix(this._data.rows, this._data.cols, 0)
        this._gains = new Matrix(this._data.rows, this._data.cols, 1)

        // search for fitting sigma
        const tol = 1e-4
        const maxtries = 50
        for (let i = 0; i < this._data.rows; ++i) {
            const dist_i = delta.getRow(i)
            const prow = P.getRow(i)
            let betamin = -Infinity, betamax = Infinity
            let beta = 1, cnt = maxtries, done = false
            let psum = 0

            while (!done && cnt--) {
                // compute entropy and kernel row with beta precision
                psum = 0
                let dp_sum = 0
                for (let j = 0; j < this._data.rows; ++j) {
                    const dist = dist_i[j]
                    const pj = i !== j ? Math.exp(-dist * beta) : 0
                    dp_sum += dist * pj
                    prow[j] = pj
                    psum += pj
                }
                // compute entropy
                const H = psum > 0 ? Math.log(psum) + (beta * dp_sum) / psum : 0
                if (H > targetH) {
                    betamin = beta
                    beta = betamax === Infinity ? beta * 2 : (beta + betamax) / 2
                } else {
                    betamax = beta
                    beta = betamin === -Infinity ? beta / 2 : (beta + betamin) / 2
                }
                done = Math.abs(H - targetH) < tol
            }
            // normalize p
            for (let j = 0; j < this._data.rows; ++j) {
                prow[j] /= psum
            }
        }

        // compute probabilities
        for (let i = 0; i < this._data.rows; ++i) {
            for (let j = i; j < this._data.rows; ++j) {
                const p = Math.max((P.get(i, j) + P.get(j, i)) / (this._data.rows * 2), 1e-100);
                P.set(i, j, p)
                P.set(j, i, p)
            }
        }
        this._projection = P
        return this
    }

    protected next() {
        const iter = ++this._iter
        const n = this._data.rows
        const { dimensionality: dim, epsilon } = this._params
        const pmul = iter < 100 ? 4 : 1

        // compute Q dist (unnormalized)
        const Qu = new Matrix(n, n, 0)
        let qsum = 0

        for (let i = 0; i < n; ++i) {
            for (let j = i + 1; j < n; ++j) {
                let dsum = 0
                for (let d = 0; d < dim; ++d) {
                    const dhere = this._result.get(i, d) - this._result.get(j, d)
                    dsum += dhere * dhere
                }
                const qu = 1 / (1 + dsum)
                Qu.set(i, j, qu)
                Qu.set(j, i, qu)
                qsum += 2 * qu
            }
        }

        // normalize Q dist
        const Q = new Matrix(n, n, 0)
        for (let i = 0; i < n; ++i) {
            for (let j = i + 1; j < n; ++j) {
                const val = Math.max(Qu.get(i, j) / qsum, 1e-100)
                Q.set(i, j, val)
                Q.set(j, i, val)
            }
        }

        const grad = new Matrix(n, dim, 0)
        for (let i = 0; i < n; ++i) {
            for (let j = 0; j < n; ++j) {
                const premult = 4 * (pmul * this._projection.get(i, j) - Q.get(i, j)) * Qu.get(i, j)
                for (let d = 0; d < dim; ++d) {
                    grad.update(i, d, o => o + (premult * (this._result.get(i, d) - this._result.get(j, d))))
                }
            }
        }

        // perform gradient step
        const resMean = new Float64Array(dim)
        for (let i = 0; i < n; ++i) {
            for (let d = 0; d < dim; ++d) {
                const gId = grad.get(i, d)
                const sId = this._yStep.get(i, d)
                const gainId = this._gains.get(i, d)

                let newGain = Math.sign(gId) === Math.sign(sId) ? gainId * 0.8 : gainId + 0.2
                if (newGain < 0.01) newGain = 0.01
                this._gains.set(i, d, newGain)

                const mVal = iter < 250 ? 0.5 : 0.8
                const sIdNew = mVal * sId - epsilon * newGain * gId
                this._yStep.set(i, d, sIdNew)

                this._result.update(i, d, o => o + sIdNew)
                resMean[d] += this._result.get(i, d)
            }
        }

        for (let i = 0; i < n; ++i) {
            for (let d = 0; d < dim; ++d) {
                this._result.update(i, d, o => o - resMean[d] / n)
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