import { linearSpace } from './linear_space'
import { Matrix } from '@structures/matrix'

/**
 * A Mersenne Twister random number generator.
 * @example
 * ```ts
 * import { Randomizer } from '@danyalwe/tools'
 *
 * const rng = new Randomizer(42) // seeded for reproducibility
 * const rng2 = new Randomizer()  // seeded with Date.now()
 * ```
 * @group Utils
 */
export class Randomizer {
  protected _seed!: number
  protected _pN = 624
  protected _pM = 397
  protected _cMat = 0x9908B0DF
  protected _upperMask = 0x80000000
  protected _lowerMask = 0x7FFFFFFF
  protected _sVec = Array.from<number>({ length: this._pN })
  protected _init = this._pN + 1
  protected _gVal?: number = undefined
  private static _shared?: Randomizer

  /**
   * A lazily created instance shared by the static shortcuts, so consecutive calls
   * advance one stream instead of reseeding with `Date.now()` every time.
   */
  private static get shared() {
    return (Randomizer._shared ??= new Randomizer())
  }

  /**
   * A Mersenne Twister random number generator.
   * @param seed The seed for the random number generator. If `seed` is `null` then the actual time gets used.
   */
  constructor(seed?: number) {
    this.seed = seed ?? Date.now()
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
   * @param seed The seed value to set. Only its low 32 bits are used to initialize the generator.
   */
  set seed(seed: number) {
    this._seed = seed
    this._sVec[0] = seed >>> 0
    for (this._init = 1; this._init < this._pN; this._init += 1) {
      const s = this._sVec[this._init - 1] ^ (this._sVec[this._init - 1] >>> 30)
      this._sVec[this._init] = ((((s & 0xFFFF0000) >>> 16) * 1812433253) << 16) + (s & 0x0000FFFF) * 1812433253 + this._init
      this._sVec[this._init] = this._sVec[this._init] >>> 0
    }
  }

  /**
   * Generates a random integer between 0 and MAX_INTEGER.
   * @returns A random integer.
   * @complexity O(1) amortized: the internal state is regenerated every 624 draws.
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

    y = this._sVec[this._init++]
    y ^= y >>> 11
    y ^= (y << 7) & 0x9D2C5680
    y ^= (y << 15) & 0xEFC60000
    y ^= y >>> 18

    return y >>> 0
  }

  /**
   * Returns a random integer between 0 and MAX_INTEGER using a shared generator seeded with the current time.
   * @returns A random integer.
   * @example
   * ```ts
   * const rng = new Randomizer(42)
   * rng.randomInt()          // seeded instance
   * Randomizer.randomInt()   // static shortcut with random seed
   * ```
   */
  static randomInt() {
    return Randomizer.shared.randomInt()
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
   * Returns a random number between 0 (inclusive) and 1 (exclusive) generated using a shared generator seeded with the current time.
   * @returns A random number between 0 (inclusive) and 1 (exclusive).
   * @example
   * ```ts
   * const rng = new Randomizer(123)
   * rng.random()          // e.g. 0.528... (seeded)
   * Randomizer.random()   // static shortcut with random seed
   * ```
   */
  static random() {
    return Randomizer.shared.random()
  }

  /**
   * Generates a random number using the Box-Muller transform to approximate a Gaussian distribution.
   * @returns A random number with a Gaussian distribution.
   */
  randomGauss() {
    let x, y, r
    if (this._gVal !== undefined) {
      x = this._gVal
      this._gVal = undefined
      return x
    }
    else {
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
   * @example
   * ```ts
   * const rng = new Randomizer(42)
   * rng.randomGauss()          // e.g. 0.134... (seeded)
   * Randomizer.randomGauss()   // static shortcut
   * ```
   */
  static randomGauss() {
    return Randomizer.shared.randomGauss()
  }

  /**
   * Returns an array of `n` random samples from the given data.
   * @param data - The matrix or 2D array to sample from.
   * @param n - The number of samples to return.
   * @returns An array of `n` rows from the input data, randomly selected.
   * @throws An error if `n` is not a non-negative integer or is greater than the number of rows in the input data.
   * @complexity O(r · n) for a matrix with r rows.
   */
  samples(data: Matrix | number[][], n: number) {
    const mat = data instanceof Matrix ? data : Matrix.from(data)
    if (!Number.isInteger(n) || n < 0) throw new Error('The number of samples must be a non-negative integer')
    if (n > mat.rows) throw new Error('The number of samples can\'t be bigger than the number of rows of the matrix')
    const samples = Array.from<number>({ length: n })
    const indexList = linearSpace(0, mat.rows - 1)
    for (let i = 0, l = indexList.length; i < n; ++i, --l)
      samples[i] = indexList.splice(this.randomInt() % l, 1)[0]

    return samples.map(v => mat.getRow(v))
  }

  /**
   * Returns a random sample of size `n` from the given data.
   * @param data The data to sample from.
   * @param n The size of the sample to return.
   * @returns A random sample of size `n` from the given data.
   * @example
   * ```ts
   * const rng = new Randomizer(42)
   * const data = [[1, 2], [3, 4], [5, 6], [7, 8]]
   * rng.samples(data, 2)          // e.g. [[5, 6], [1, 2]]
   * Randomizer.samples(data, 2)   // static shortcut
   * ```
   */
  static samples(data: Matrix | number[][], n: number) {
    return Randomizer.shared.samples(data, n)
  }
}
