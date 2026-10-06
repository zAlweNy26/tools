/**
 * A matrix data structure.
 * @example
 * ```ts
 * import { Matrix } from '@danyalwe/tools'
 *
 * const m = new Matrix(2, 3, 0)
 * m.set(0, 1, 5)
 * m.get(0, 1)          // 5
 *
 * const id = new Matrix(3, 3, 'identity')  // 3x3 identity matrix
 * ```
 * @category Matrices
 * @group Structures
 */
export class Matrix {
  protected _data: number[][] = []

  /**
   * Creates a new matrix with the specified number of rows and columns.
   * @param rows The number of rows in the matrix.
   * @param cols The number of columns in the matrix.
   * @param value The initial value of the matrix. Can be a number, a function that returns a number, or the string `identity`. Defaults to 0.
   *
   * If a number is provided, all elements of the matrix will be set to that number.
   *
   * If a function is provided, it will be called for each element of the matrix to determine its initial value.
   *
   * If `identity` is provided, the matrix will be initialized as an identity matrix.
   * @throws An error if the number of rows or columns is not a positive integer.
   */
  constructor(public readonly rows: number, public readonly cols: number, value?: ((row: number, col: number) => number) | 'identity' | number) {
    if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 1 || cols < 1)
      throw new Error('Unable to create a matrix of that size')
    if (value === undefined)
      this._data = Array.from({ length: rows }, () => Array.from<number>({ length: cols }).fill(0))
    else if (value === 'identity')
      this._data = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => i === j ? 1 : 0))
    else if (typeof value === 'number')
      this._data = Array.from({ length: rows }, () => Array.from<number>({ length: cols }).fill(value))
    else if (typeof value === 'function')
      this._data = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => value(i, j)))
  }

  /**
   * Creates a new matrix instance from a 2D array.
   * @param array The 2D array to use for the new matrix instance.
   * @returns A new matrix instance.
   * @throws An error if the array is empty or not all the columns of the 2D array have the same length.
   * @complexity O(r · c).
   */
  static from(array: number[][]): Matrix
  /**
   * Creates a new matrix instance from a 1D array with the specified fill method.
   * @param array The 1D array to use for the new matrix instance.
   * @param fill The fill method. Can be `row`, `col`, or `diag`.
   * @returns A new matrix instance.
   * @throws An error if the array is empty.
   * @complexity O(n) for `row` and `col`, O(n²) for `diag`.
   */
  static from(array: number[], fill: 'row' | 'col' | 'diag'): Matrix
  static from(...params: never[]) {
    if (params.length === 1) {
      const array = params[0] as number[][]
      const rows = array.length
      if (rows === 0) throw new Error('2D array is empty')
      const cols = array[0].length
      if (array.some(arr => arr.length !== cols)) throw new Error('Not all the columns of the matrix have the same length')
      return new Matrix(rows, cols, (r, c) => array[r][c])
    }
    else {
      const array = params[0] as number[], type = params[1] as string
      const len = array.length
      if (len === 0) throw new Error('Array is empty')
      if (type === 'col') return new Matrix(1, len, (_, c) => array[c])
      else if (type === 'row') return new Matrix(len, 1, r => array[r])
      else return new Matrix(len, len, (r, c) => (r === c ? array[r] : 0))
    }
  }

  /**
   * Returns the value at the specified row and column in the matrix.
   * @param row The row index of the element to retrieve.
   * @param col The column index of the element to retrieve.
   * @returns The value at the specified row and column in the matrix.
   * @throws A RangeError if the position is outside the matrix.
   * @complexity O(1).
   */
  get(row: number, col: number) {
    this._checkCell(row, col)
    return this._data[row][col]
  }

  /**
   * Sets the value of a specific cell in the matrix.
   * @param row The row index of the cell to set.
   * @param col The column index of the cell to set.
   * @param value The value to set in the cell.
   * @returns The value that was set in the cell.
   * @throws A RangeError if the position is outside the matrix.
   * @complexity O(1).
   */
  set(row: number, col: number, value: number) {
    this._checkCell(row, col)
    this._data[row][col] = value
    return value
  }

  /**
   * Concatenates two matrices either horizontally or vertically.
   * @param mat The matrix to concatenate with.
   * @param type The type of concatenation to perform. Can be 'horizontal', 'vertical', or 'diagonal'. Defaults to 'horizontal'.
   * @returns A new matrix that is the result of the concatenation.
   * @throws An error if the matrices do not have the same number of rows (for horizontal concatenation) or columns (for vertical concatenation).
   * @complexity O((r₁ + r₂) · (c₁ + c₂)).
   */
  concat(mat: Matrix, type: 'horizontal' | 'vertical' | 'diagonal' = 'horizontal') {
    let data: number[][] = []
    if (type === 'horizontal') {
      if (this.rows !== mat.rows) throw new Error('The matrices need to have the same number of rows')
      data = this._data.map((arr, i) => arr.concat(mat._data[i]))
    }
    else if (type === 'vertical') {
      if (this.cols !== mat.cols) throw new Error('The matrices need to have the same number of columns')
      data = this._data.concat(mat._data)
    }
    else {
      return new Matrix(this.rows + mat.rows, this.cols + mat.cols, (r, c) => {
        if (r < this.rows && c < this.cols) return this._data[r][c]
        if (r >= this.rows && c >= this.cols) return mat._data[r - this.rows][c - this.cols]
        return 0
      })
    }
    return Matrix.from(data)
  }

  /**
   * Updates the value at the specified row and column index using the provided update function.
   * @param row The row index of the value to update.
   * @param col The column index of the value to update.
   * @param value The update function that takes the old value as input and returns the new value.
   * @returns The new value after the update.
   * @throws A RangeError if the position is outside the matrix.
   * @complexity O(1).
   */
  update(row: number, col: number, value: (old: number) => number) {
    this._checkCell(row, col)
    const val = value(this._data[row][col])
    this._data[row][col] = val
    return val
  }

  /**
   * Applies a binary operation in place to each element of the current matrix and the matching element of another matrix.
   * @param matrix The matrix to operate with.
   * @param value The binary operation to apply to each element.
   * @returns A copy of the resulting data as a two-dimensional array.
   * @throws If the two matrices do not have the same dimensions.
   * @complexity O(r · c).
   */
  operate(matrix: number[][] | Matrix, value: (left: number, right: number) => number) {
    const mat = matrix instanceof Matrix ? matrix : Matrix.from(matrix)

    if (this.cols !== mat.cols || this.rows !== mat.rows)
      throw new Error('The matrices need to have the same dimensions')

    this._data = this._data.map((row, i) => row.map((col, j) => value(col, mat.get(i, j))))
    return this.toArray()
  }

  /**
   * Swaps two rows in the matrix.
   * @param row1 The index of the first row to swap.
   * @param row2 The index of the second row to swap.
   * @returns The updated matrix with the swapped rows.
   * @complexity O(1).
   */
  swapRows(row1: number, row2: number) {
    [this._data[row1], this._data[row2]] = [this._data[row2], this._data[row1]]
    return this
  }

  /**
   * Sets the values of a row in the matrix.
   * @param row The index of the row to set.
   * @param values The values to set for the row.
   * @returns The updated matrix.
   * @throws If the passed index is outside the matrix or the number of values differs from the number of columns.
   * @complexity O(c).
   */
  setRow(row: number, values: number[]) {
    this._checkRow(row)
    if (values.length !== this.cols) throw new Error('The number of passed values must match the number of columns in the matrix')
    this._data[row] = [...values]
    return this
  }

  /**
   * Returns the row at the specified index.
   * @param row The index of the row to retrieve.
   * @returns A copy of the row at the specified index.
   * @throws An error if the passed index is outside the matrix.
   * @complexity O(c).
   */
  getRow(row: number) {
    this._checkRow(row)
    return [...this._data[row]]
  }

  /**
   * Swaps two columns in the matrix.
   * @param col1 The index of the first column to swap.
   * @param col2 The index of the second column to swap.
   * @returns The updated matrix with the swapped columns.
   * @complexity O(r).
   */
  swapCols(col1: number, col2: number) {
    this._data = this._data.map((row) => {
      [row[col1], row[col2]] = [row[col2], row[col1]]
      return row
    })
    return this
  }

  /**
   * Sets the values of a given column in the matrix.
   * @param col The index of the column to set.
   * @param values An array of values to set in the column.
   * @returns The updated matrix.
   * @throws An error if the passed index is outside the matrix.
   * @throws An error if the number of values differs from the number of rows.
   * @complexity O(r).
   */
  setCol(col: number, values: number[]) {
    this._checkCol(col)
    if (values.length !== this.rows) throw new Error('The number of passed values must match the number of rows in the matrix')
    this._data = this._data.map((r, i) => {
      r[col] = values[i]
      return r
    })
    return this
  }

  /**
   * Returns an array containing the elements of the specified column in the matrix.
   * @param col The index of the column to retrieve.
   * @returns An array containing the elements of the specified column.
   * @throws An error if the passed index is outside the matrix.
   * @complexity O(r).
   */
  getCol(col: number) {
    this._checkCol(col)
    return this._data.map(row => row[col])
  }

  /**
   * Returns a generator that iterates over the rows of the matrix.
   * @yields A copy of the current row after each iteration.
   * @returns A generator that yields each row of the matrix.
   * @complexity O(r · c) to iterate every row.
   */
  * iterateRows() {
    for (let i = 0; i < this.rows; i++)
      yield this.getRow(i)
  }

  /**
   * Returns a generator that iterates over the columns of the matrix.
   * @yields The current column after each iteration.
   * @returns A generator that yields each column of the matrix.
   * @complexity O(r · c) to iterate every column.
   */
  * iterateCols() {
    for (let i = 0; i < this.cols; i++)
      yield this.getCol(i)
  }

  /**
   * Returns an iterator that yields each row of the matrix.
   * @yields A copy of the current row after each iteration.
   * @returns An iterator that yields each row of the matrix.
   * @complexity O(r · c) to iterate every row.
   */
  * [Symbol.iterator]() {
    for (const row of this.iterateRows())
      yield row
  }

  /**
   * Resets every value in the matrix to 0.
   * @returns The cleared matrix.
   * @complexity O(r · c).
   */
  clear() {
    this._data = new Matrix(this.rows, this.cols)._data
    return this
  }

  /**
   * The number of cells in the matrix.
   * @complexity O(1).
   */
  get size() {
    return this.rows * this.cols
  }

  /**
   * Returns a new matrix that is the transpose of the current matrix.
   * @returns A new matrix that is the transpose of the current matrix.
   * @complexity O(r · c).
   */
  transpose() {
    return new Matrix(this.cols, this.rows, (row, col) => this.get(col, row))
  }

  /**
   * Calculates the inverse of a square matrix using LU decomposition with partial pivoting.
   * @throws An error if the matrix is not quadratic.
   * @throws An error if the matrix is singular (its determinant is zero, within floating-point tolerance).
   * @returns The inverse of the matrix.
   * @complexity O(n³) for an n×n matrix.
   */
  inverse() {
    if (this.rows !== this.cols) throw new Error('Unable to calculate inverse for non-quadratic matrix')
    const { lu, perm, singular } = this._decompose()
    if (singular) throw new Error('Matrix not invertible due to the determinant equal to zero')

    const n = this.rows
    const inverse: number[][] = Array.from({ length: n }, () => Array.from<number>({ length: n }).fill(0))
    // solve LU · x = P · eⱼ for every column j of the identity
    for (let col = 0; col < n; col++) {
      const x = Array.from<number>({ length: n }).fill(0)
      for (let i = 0; i < n; i++) {
        let sum = perm[i] === col ? 1 : 0
        for (let k = 0; k < i; k++) sum -= lu[i][k] * x[k]
        x[i] = sum
      }
      for (let i = n - 1; i >= 0; i--) {
        let sum = x[i]
        for (let k = i + 1; k < n; k++) sum -= lu[i][k] * x[k]
        x[i] = sum / lu[i][i]
      }
      for (let i = 0; i < n; i++) inverse[i][col] = x[i]
    }

    return Matrix.from(inverse)
  }

  /**
   * Returns the dot product of the current matrix and the passed matrix.
   * @param matrix The matrix to multiply with the current matrix.
   * @returns A new matrix that is the result of the dot product.
   * @throws An error if the number of columns of the current matrix is different from the number of rows of the passed matrix.
   * @complexity O(r · c · p) for an r×c matrix times a c×p matrix.
   */
  dot(matrix: number[][] | Matrix) {
    const mat = matrix instanceof Matrix ? matrix : Matrix.from(matrix)

    if (this.cols !== mat.rows)
      throw new Error('The number of columns of the current matrix is different from the number of rows of the passed matrix')

    const result: number[][] = Array.from({ length: this.rows }, () => Array.from<number>({ length: mat.cols }).fill(0))

    for (let i = 0; i < this.rows; i++) {
      for (let k = 0; k < this.cols; k++) {
        const aik = this.get(i, k)
        if (aik === 0) continue
        for (let j = 0; j < mat.cols; j++)
          result[i][j] += aik * mat.get(k, j)
      }
    }

    return Matrix.from(result)
  }

  /**
   * Returns a new matrix that is a submatrix of the current matrix with the specified row and column removed.
   * @param row The row to remove.
   * @param col The column to remove.
   * @returns A new matrix that is a submatrix of the current matrix with the specified row and column removed.
   * @complexity O(r · c).
   */
  sub(row: number, col: number) {
    return Matrix.from(this._data.filter((_, i) => i !== row).map(r => r.filter((_, j) => j !== col)))
  }

  /**
   * Calculates the determinant of a square matrix using LU decomposition with partial pivoting.
   * Singular matrices return exactly 0.
   * @throws An error if the matrix is not quadratic.
   * @returns The determinant of the matrix.
   * @complexity O(n³) for an n×n matrix.
   */
  det() {
    if (this.rows !== this.cols) throw new Error('Unable to calculate determinant for non-quadratic matrix')
    const { lu, sign, singular } = this._decompose()
    if (singular) return 0
    let det = sign
    for (let i = 0; i < this.rows; i++) det *= lu[i][i]
    return det
  }

  /**
   * Returns a new matrix that is a clone of the current matrix instance.
   * @returns A new matrix that is a clone of the current matrix instance.
   * @complexity O(r · c).
   */
  clone() {
    return Matrix.from(this.toArray())
  }

  /**
   * Returns an array containing the mean value of each column in the matrix.
   * @returns An array containing the mean value of each column in the matrix.
   * @complexity O(r · c).
   */
  get meanCols() {
    return Array.from({ length: this.cols }).map((_, i) => this.getCol(i).reduce((v, c) => v + c, 0) / this.rows)
  }

  /**
   * Returns an array containing the mean value of each row in the matrix.
   * @returns An array containing the mean value of each row in the matrix.
   * @complexity O(r · c).
   */
  get meanRows() {
    return this._data.map(arr => arr.reduce((v, c) => v + c, 0) / arr.length)
  }

  /**
   * Returns the sum of all elements in the matrix.
   * @returns The sum of all elements in the matrix.
   * @complexity O(r · c).
   */
  get sum() {
    return this._data.reduce((p, arr) => p + arr.reduce((v, c) => v + c, 0), 0)
  }

  /**
   * Returns an array containing the diagonal elements of the matrix.
   * If the matrix is not square, the diagonal is truncated to the smaller dimension.
   * @returns An array containing the diagonal elements of the matrix.
   * @complexity O(min(r, c)).
   */
  get diagonal() {
    return Array.from({ length: Math.min(this.rows, this.cols) }, (_, i) => this.get(i, i))
  }

  /**
   * Returns a copy of the matrix data as a two-dimensional array.
   * @returns A copy of the matrix data.
   * @complexity O(r · c).
   */
  toArray() {
    return this._data.map(row => [...row])
  }

  /**
   * Doolittle LU decomposition with partial pivoting, storing L (unit diagonal, below) and U (on and above) in one matrix.
   * @returns The combined LU matrix, the row permutation, its sign, and whether the matrix is singular.
   */
  private _decompose() {
    const n = this.rows
    const lu = this.toArray()
    const perm = Array.from({ length: n }, (_, i) => i)
    let sign = 1

    // pivots this close to zero, relative to the largest entry, are treated as zero
    let largest = 0
    for (const row of lu) for (const v of row) largest = Math.max(largest, Math.abs(v))
    const tolerance = n * Number.EPSILON * largest

    for (let k = 0; k < n; k++) {
      let pivot = k
      for (let i = k + 1; i < n; i++)
        if (Math.abs(lu[i][k]) > Math.abs(lu[pivot][k])) pivot = i
      if (!(Math.abs(lu[pivot][k]) > tolerance)) return { lu, perm, sign, singular: true }
      if (pivot !== k) {
        [lu[k], lu[pivot]] = [lu[pivot], lu[k]];
        [perm[k], perm[pivot]] = [perm[pivot], perm[k]]
        sign = -sign
      }
      for (let i = k + 1; i < n; i++) {
        const factor = lu[i][k] / lu[k][k]
        lu[i][k] = factor
        for (let j = k + 1; j < n; j++) lu[i][j] -= factor * lu[k][j]
      }
    }

    return { lu, perm, sign, singular: false }
  }

  private _checkRow(row: number) {
    if (!Number.isInteger(row) || row < 0 || row >= this.rows)
      throw new Error('The passed index exceeds the total number of rows in the matrix')
  }

  private _checkCol(col: number) {
    if (!Number.isInteger(col) || col < 0 || col >= this.cols)
      throw new Error('The passed index exceeds the total number of columns in the matrix')
  }

  private _checkCell(row: number, col: number) {
    if (!(row >= 0 && row < this.rows && col >= 0 && col < this.cols))
      throw new RangeError(`Position (${row}, ${col}) is outside the ${this.rows}x${this.cols} matrix`)
  }
}
