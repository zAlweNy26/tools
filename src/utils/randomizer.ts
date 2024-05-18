import { Matrix } from "structures/matrix"
import { linearSpace } from "./linear_space"

/**
 * A Mersenne Twister random number generator.
 */
export class Randomizer {
    protected _seed!: number
    protected _pN = 624
    protected _pM = 397
    protected _cMat = 0x9908b0df
    protected _upperMask = 0x80000000
    protected _lowerMask = 0x7fffffff
    protected _sVec = new Array<number>(this._pN)
    protected _init = this._pN + 1
    protected _gVal?: number = undefined

    /**
     * A Mersenne Twister random number generator.
     * @param seed The seed for the random number generator. If `seed` is `null` then the actual time gets used.
     */
    constructor(seed?: number) {
        this.seed = seed ?? new Date().getTime()
    }

    /**
     * Gets the current seed value.
     * @returns The current seed value.
     */
    get seed() {
        return this._seed
    }

    /**
     * Setter for the seed property of the Randomizer class.
     * @param seed The seed value to set.
     */
    set seed(seed: number) {
        this._seed = seed
        this._sVec[0] = seed >>> 0
        for (this._init = 1; this._init < this._pN; this._init += 1) {
            const s = this._sVec[this._init - 1] ^ (this._sVec[this._init - 1] >>> 30)
            this._sVec[this._init] = ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253 + this._init;
            this._sVec[this._init] = this._sVec[this._init] >>> 0;
        }
    }

    /**
     * Generates a random integer between 0 and MAX_INTEGER.
     * @returns A random integer.
     */
    randomInt() {
        const mag = [0x0, this._cMat]
        let y = 0

        if (this._init >= this._pN) {
            const nrm = this._pN - this._pM, mrn = this._pM - this._pN
            let k = 0

            for (; k < nrm; ++k) {
                y = (this._sVec[k] & this._upperMask) | (this._sVec[k + 1] & this._lowerMask)
                this._sVec[k] = this._sVec[k + this._pM] ^ (y >>> 1) ^ mag[y & 0x1]
            }
            for (; k < this._pN - 1; ++k) {
                y = (this._sVec[k] & this._upperMask) | (this._sVec[k + 1] & this._lowerMask)
                this._sVec[k] = this._sVec[k + mrn] ^ (y >>> 1) ^ mag[y & 0x1]
            }

            y = (this._sVec[this._pN - 1] & this._upperMask) | (this._sVec[0] & this._lowerMask)
            this._sVec[this._pN - 1] = this._sVec[this._pM - 1] ^ (y >>> 1) ^ mag[y & 0x1]

            this._init = 0
        }

        y = this._sVec[(this._init += 1)]
        y ^= y >>> 11
        y ^= (y << 7) & 0x9d2c5680
        y ^= (y << 15) & 0xefc60000
        y ^= y >>> 18

        return y >>> 0
    }

    /**
     * Returns a random integer between 0 and MAX_INTEGER using the current time as the seed.
     * @returns A random integer.
     */
    static randomInt() {
        return new Randomizer(new Date().getTime()).randomInt() 
    }

    /**
     * Generates a random number between 0 (inclusive) and 1 (exclusive).
     * Uses the randomInt() method to generate a random integer and scales it to a float between 0 and 1.
     * @returns A random number between 0 (inclusive) and 1 (exclusive).
     */
    random() {
        return this.randomInt() * (1.0 / 4294967296.0)
    }

    /**
     * Returns a random number between 0 (inclusive) and 1 (exclusive) generated using the current time as the seed.
     * @returns A random number between 0 (inclusive) and 1 (exclusive).
     */
    static random() {
        return new Randomizer(new Date().getTime()).random() 
    }

    /**
     * Generates a random number using the Box-Muller transform to approximate a Gaussian distribution.
     * @returns A random number with a Gaussian distribution.
     */
    randomGauss() {
        let x, y, r
        if (this._gVal != undefined) {
            x = this._gVal
            this._gVal = undefined
            return x
        } else {
            do {
                x = 2 * this.random() - 1
                y = 2 * this.random() - 1
                r = x * x + y * y
            } while (!r || r > 1)
        }
        const c = Math.sqrt(-2 * Math.log(r) / r)
        this._gVal = y * c // cache this for next function call for efficiency
        return x * c
    }

    /**
     * Returns a random number using the Box-Muller transform to approximate a Gaussian distribution.
     * @returns A random number with a Gaussian distribution.
     */
    static randomGauss() {
        return new Randomizer(new Date().getTime()).randomGauss() 
    }

    /**
     * Returns an array of `n` random samples from the given data.
     * @param data - The matrix or 2D array to sample from.
     * @param n - The number of samples to return.
     * @returns An array of `n` rows from the input data, randomly selected.
     * @throws An error if `n` is greater than the number of rows in the input data.
     */
    samples(data: Matrix | number[][], n: number) {
        const mat = data instanceof Matrix ? data : Matrix.from(data)
        if (n > mat.rows) throw new Error('The number of samples can\'t be bigger than the number of rows of the matrix')
        const samples = new Array<number>(n)
        const indexList = linearSpace(0, mat.rows - 1)
        for (let i = 0, l = indexList.length; i < n; ++i, --l) {
            samples[i] = indexList.splice(this.randomInt() % l, 1)[0]
        }
        return samples.map(v => mat.getRow(v))
    }

    /**
     * Returns a random sample of size `n` from the given data.
     * @param data The data to sample from.
     * @param n The size of the sample to return.
     * @returns A random sample of size `n` from the given data.
     */
    static samples(data: Matrix | number[][], n: number) {
        return new Randomizer(new Date().getTime()).samples(data, n)
    }
}