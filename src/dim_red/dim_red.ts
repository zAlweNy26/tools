import { Matrix } from "structures/matrix"
import { DimRedParams } from "./interfaces"
import { euclidean } from "distances/euclidean"
import { Randomizer } from "utils/randomizer"

export class DimRed<P extends DimRedParams> {
    protected _data!: Matrix
    protected _result!: Matrix
    protected _params!: P & DimRedParams
    protected _randomizer!: Randomizer
    protected _initialized = false
    protected _projection!: Matrix
    protected _iter = 0

    constructor(data: Matrix | number[][], params?: Partial<P>) {
        this._data = data instanceof Matrix ? data : Matrix.from(data)
        this._params = {
            dimensionality: 2,
            metric: euclidean,
            seed: 1234,
            ...params
        } as P & DimRedParams
        this._randomizer = new Randomizer(this.seed)
        this._result = new Matrix(this.dimensionality, this.dimensionality)
    }

    init() {
        return this
    }

    protected next() {
        return this._result
    }

    checkInit() {
        if (!this._initialized) {
            this.init()
            this._initialized = true
        }
    }

    transform(iterations = 500) {
        this.checkInit()
        for (let i = 0; i < iterations; i++) {
            this.next()
        }
        return this._projection
    }

    *generator(iterations = 500) {
        this.checkInit()
        for (let i = 0; i < iterations; i++) {
            this.next()
            yield this._projection
        }
        return this._projection
    }

    get dimensionality() {
        return this._params.dimensionality
    }

    get metric() {
        const metr = this._params.metric
        return typeof metr == 'string' ? metr : metr.name
    }

    get seed() {
        return this._params.seed
    }
}