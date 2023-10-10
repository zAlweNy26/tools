import { Matrix } from "structures/matrix"
import { DimRedParams } from "./interfaces"
import { euclidean } from "distances/euclidean"
import { Randomizer } from "utils/randomizer"

/**
 * A class for performing dimensionality reduction on a matrix of data.
 * @template P - The type of the parameters for the class.
 */
export abstract class DimRed<P extends DimRedParams> {
    protected _params!: P & DimRedParams
    protected _randomizer!: Randomizer
    protected _initialized = false
    protected _iter = 0
    _projection!: Matrix
    _data!: Matrix
    _result!: Matrix

    /**
     * Constructs a new instance of the DimRed class.
     * @param data - The matrix of data to perform dimensionality reduction on.
     * @param params - Optional parameters for the algorithm.
     */
    constructor(data: Matrix | number[][], params?: Partial<P>) {
        this._data = data instanceof Matrix ? data : Matrix.from(data)
        this._params = {
            dimensionality: 2,
            metric: euclidean,
            seed: 1212,
            ...params,
        } as P & DimRedParams
        this._randomizer = new Randomizer(this.seed)
        this._result = new Matrix(this.dimensionality, this.dimensionality)
    }

    /**
     * Initializes the needed stuff for the algorithm.
     * @returns The instance of the class.
     */
    abstract init(): this

    /**
     * Calculates the next projection of the data.
     * @returns The next projection of the data.
     */
    protected abstract next(): Matrix

    /**
     * Checks if the class has been initialized and initializes it if it hasn't.
     */
    protected checkInit() {
        if (!this._initialized) {
            this.init()
            this._initialized = true
        }
    }

    /**
     * Transforms the data by performing dimensionality reduction on it.
     * @param iterations - The number of iterations to perform. Default to 500.
     * @returns The projection of the data after dimensionality reduction.
     */
    transform(iterations = 500) {
        this.checkInit()
        for (let i = 0; i < iterations; ++i) {
            this.next()
        }
        return this._projection
    }

    /**
     * A generator function that yields the projection of the data after each iteration.
     * @param iterations - The number of iterations to perform. Default to 500.
     * @yields The projection of the data after each iteration.
     * @returns The projection of the data after dimensionality reduction.
     */
    *generator(iterations = 500) {
        this.checkInit()
        for (let i = 0; i < iterations; ++i) {
            this.next()
            yield this._projection
        }
        return this._projection
    }

    /**
     * Gets the dimensionality of the data after dimensionality reduction.
     */
    get dimensionality() {
        return this._params.dimensionality
    }

    /**
     * Gets the metric used for calculating distances between data points.
     */
    get metric() {
        const metr = this._params.metric
        return typeof metr == 'string' ? metr : metr.name
    }

    /**
     * Gets the seed used for generating random numbers.
     */
    get seed() {
        return this._params.seed
    }
}