import { Structure } from "./interfaces"

export class Matrix implements Structure {
    protected _data: number[][] = []

    constructor(public rows: number, public cols: number, value?: ((row: number, col: number) => number) | 'identity' | number) {
        if (rows <= 1 && cols <= 1) throw new Error('Unable to create a Matrix of that size')
        if (value === undefined) {
            this._data = Array.from({ length: rows }, () => Array.from({ length: cols }))
        } else if (value == 'identity') {
            this._data = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => i === j ? 1 : 0))
        } else if (typeof value == 'number') {
            this._data = Array.from({ length: rows }, () => Array.from<number>({ length: cols }).fill(value))
        } else if (typeof value == 'function') {
            this._data = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => value(i, j)))
        }
    }

    static from(array: number[][]): Matrix
    static from(array: number[], type: 'row' | 'col' | 'diag'): Matrix
    static from(...params: never[]) {
        if (params.length == 1) {
            const array = params[0] as number[][]
            const rows = array.length, cols = array[0].length
            if (rows == 0) throw new Error('2D array is empty')
            else if (array.some(arr => arr.length != cols)) throw new Error('Not all the columns of the matrix have the same length')
            return new Matrix(rows, cols, (r, c) => array[r][c])
        } else {
            const array = params[0] as number[], type = params[1] as string
            const len = array.length
            if (len == 0) throw new Error('Array is empty')
            if (type == 'col') return new Matrix(1, len, (_, c) => array[c])
            else if (type == 'row') return new Matrix(len, 1, (r) => array[r])
            else return new Matrix(len, len, (r, c) => (r == c ? array[r] : 0))
        }
    }

    get(row: number, col: number) {
        return this._data[row][col]
    }

    set(row: number, col: number, value: number) {
        this._data[row][col] = value
        return value
    }

    concat(mat: Matrix, type: 'horizontal' | 'vertical' = 'horizontal') {
        // TODO: Add diagonal concat
        let data: number[][] = []
        if (type == 'horizontal') {
            if (this.rows != mat.rows) throw new Error('The matrices need to have the same number of rows')
            data = this._data.map((arr, i) => arr.concat(mat._data[i]))
        } else if (type == 'vertical') {
            if (this.cols != mat.cols) throw new Error('The matrices need to have the same number of rows')
            data = this._data.concat(mat._data)
        }
        return Matrix.from(data)
    }

    update(row: number, col: number, value: (old: number) => number) {
        const val = value(this._data[row][col])
        this._data[row][col] = val
        return val
    }

    operate(matrix: number[][] | Matrix, value: (left: number, right: number) => number) {
        const mat = matrix instanceof Matrix ? matrix : Matrix.from(matrix)

        if (this.cols != mat.cols || this.rows != mat.rows) 
            throw new Error('The number of columns of the current matrix is different from the number of rows of the passed matrix')
        
        const data = this._data.map((row, i) => row.map((col, j) => value(col, mat.get(i, j))))
        this._data = data
        return data
    }

    swapRows(row1: number, row2: number) {
        [this._data[row1], this._data[row2]] = [this._data[row2], this._data[row1]]
        return this
    }

    setRow(row: number, values: number[]) {
        if (row >= this.rows) throw new Error('The passed index exceeds the total number of rows in the matrix')
        else if (values.length > this.rows) throw new Error('The passed values exceed the total number of rows in the matrix')
        this._data[row] = values
        return this
    }

    getRow(row: number) {
        if (row >= this.rows) throw new Error('The passed index exceeds the total number of rows in the matrix')
        return this._data[row]
    }

    swapCols(col1: number, col2: number) {
        this._data = this._data.map(row => {
            [row[col1], row[col2]] = [row[col2], row[col1]]
            return row
        })
        return this
    }

    setCol(col: number, values: number[]) {
        if (col >= this.cols) throw new Error('The passed index exceeds the total number of columns in the matrix')
        else if (values.length > this.cols) throw new Error('The passed values exceed the total number of columns in the matrix')
        this._data = this._data.map((r, i) => {
            r[col] = values[i]
            return r
        })
        return this
    }

    getCol(col: number) {
        if (col >= this.cols) throw new Error('The passed index exceeds the total number of columns in the matrix')
        return this._data.map(row => row[col])
    }

    *iterateRows() {
        for (let i = 0; i < this.rows; i++) {
            yield this.getRow(i)
        }
    }

    *iterateCols() {
        for (let i = 0; i < this.cols; i++) {
            yield this.getCol(i)
        }
    }

    *[Symbol.iterator]() {
        for (const row of this.iterateRows()) {
            yield row
        }
    }

    clear() {
        this._data = new Matrix(this.rows, this.cols)._data
        return this
    }

    transpose() {
        return new Matrix(this.cols, this.rows, (row, col) => this.get(col, row))
    }

    inverse() {
        if (this.rows != this.cols) throw new Error('Unable to calculate inverse for non-quadratic matrix')
        else if (this.det() == 0) throw new Error('Matrix not invertible due to the determinant equal to zero')

        const identity = new Matrix(this.rows, this.cols, 'identity').items
        const copy = this.items

        for (let i = 0; i < this.rows; i++) {
            let diagonalElement = copy[i][i]

            if (diagonalElement === 0) {
                for (let j = i + 1; j < this.rows; j++) {
                    if (copy[j][i] !== 0) {
                        [copy[i], copy[j]] = [copy[j], copy[i]];
                        [identity[i], identity[j]] = [identity[j], identity[i]];
                        break
                    }
                }
                diagonalElement = copy[i][i]
            }

            for (let j = 0; j < this.cols; j++) {
                copy[i][j] /= diagonalElement
                identity[i][j] /= diagonalElement
            }

            for (let j = 0; j < this.rows; j++) {
                if (j === i) continue

                const elementToZero = copy[j][i]

                for (let k = 0; k < this.cols; k++) {
                    copy[j][k] -= elementToZero * copy[i][k]
                    identity[j][k] -= elementToZero * identity[i][k]
                }
            }
        }

        return Matrix.from(identity)
    }

    dot(matrix: number[][] | Matrix) {
        const mat = matrix instanceof Matrix ? matrix : Matrix.from(matrix)

        if (this.cols != mat.rows) 
            throw new Error('The number of columns of the current matrix is different from the number of rows of the passed matrix')

        const result: number[][] = []

        for (let i = 0; i < this.rows; i++) {
            const newRow: number[] = []
            for (let j = 0; j < mat.cols; j++) {
                let sum = 0
                for (let k = 0; k < this.cols; k++) sum += this.get(i, k) * mat.get(k, j)
                newRow.push(sum)
            }
            result.push(newRow)
        }

        return Matrix.from(result)
    }

    sub(row: number, col: number) {
        return Matrix.from(this._data.filter((_, i) => i != row).map(r => r.filter((_, j) => j != col)))
    }

    det() {
        if (this.rows != this.cols) throw new Error('Unable to calculate determinant for non-quadratic matrix')

        const cofactorSign = (row: number, col: number) => (row + col) % 2 === 0 ? 1 : -1

        const determinant = (matrix: Matrix) => {
            if (matrix.rows == 1) return matrix.get(0, 0)
            else if (matrix.rows == 2) return (matrix.get(0, 0) * matrix.get(1, 1)) - (matrix.get(0, 1) * matrix.get(1, 0))

            let det = 0

            for (let col = 0; col < matrix.cols; col++) {
                const cofactor = matrix.get(0, col) * cofactorSign(0, col) * determinant(matrix.sub(0, col))
                det += cofactor
            }

            return det
        }

        return determinant(this)
    }

    clone() {
        return Matrix.from(this.items)
    }

    get meanCols() {
        return Array.from({ length: this.cols }).map((_, i) => this.getCol(i).reduce((v, c) => v + c, 0) / this.cols)
    }

    get meanRows() {
        return this._data.map(arr => arr.reduce((v, c) => v + c, 0) / arr.length)
    }

    get sum() {
        return this._data.reduce((p, arr) => p + arr.reduce((v, c) => v + c, 0), 0)
    }

    get diagonal() {
        return Array.from({ length: Math.min(this.rows, this.cols) }, (_, i) => this.get(i, i))
    }

    get items() {
        return this._data.map(row => [...row])
    }

    get space() {
        return this._data.reduce((p, arr) => p + arr.reduce((v, c) => v + (typeof c === 'undefined' ? 1 : 0), 0), 0)
    }

    get hasRoom() {
        return this.space != 0
    }

    get isEmpty() {
        return this.space == this.rows * this.cols
    }

    get isFull() {
        return this.space == 0
    }
}