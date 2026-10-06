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
   */
  static from(array: number[][]): Matrix
  /**
   * Creates a new matrix instance from a 1D array with the specified fill method.
   * @param array The 1D array to use for the new matrix instance.
   * @param fill The fill method. Can be `row`, `col`, or `diag`.
   * @returns A new matrix instance.
   * @throws An error if the array is empty.
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
   */
  operate(matrix: number[][] | Matrix, value: (left: number, right: number) => number) {
    const mat = matrix instanceof Matrix ? matrix : Matrix.from(matrix)

    if (this.cols !== mat.cols || this.rows !== mat.rows)
      throw new Error('The matrices need to have the same dimensions')

    this._data = this._data.map((row, i) => row.map((col, j) => value(col, mat.get(i, j))))
    return this.items
  }

  /**
   * Swaps two rows in the matrix.
   * @param row1 The index of the first row to swap.
   * @param row2 The index of the second row to swap.
   * @returns The updated matrix with the swapped rows.
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
   */
  getCol(col: number) {
    this._checkCol(col)
    return this._data.map(row => row[col])
  }

  /**
   * Returns a generator that iterates over the rows of the matrix.
   * @yields A copy of the current row after each iteration.
   * @returns A generator that yields each row of the matrix.
   */
  * iterateRows() {
    for (let i = 0; i < this.rows; i++)
      yield this.getRow(i)
  }

  /**
   * Returns a generator that iterates over the columns of the matrix.
   * @yields The current column after each iteration.
   * @returns A generator that yields each column of the matrix.
   */
  * iterateCols() {
    for (let i = 0; i < this.cols; i++)
      yield this.getCol(i)
  }

  /**
   * Returns an iterator that yields each row of the matrix.
   * @yields A copy of the current row after each iteration.
   * @returns An iterator that yields each row of the matrix.
   */
  * [Symbol.iterator]() {
    for (const row of this.iterateRows())
      yield row
  }

  /**
   * Resets every value in the matrix to 0.
   * @returns The cleared matrix.
   */
  clear() {
    this._data = new Matrix(this.rows, this.cols)._data
    return this
  }

  /**
   * The current number of elements in the matrix.
   */
  size() {
    return this.rows * this.cols
  }

  /**
   * Returns a new matrix that is the transpose of the current matrix.
   * @returns A new matrix that is the transpose of the current matrix.
   */
  transpose() {
    return new Matrix(this.cols, this.rows, (row, col) => this.get(col, row))
  }

  /**
   * Calculates the inverse of a square matrix.
   * @throws An error if the matrix is not quadratic.
   * @throws An error if the matrix not invertible due to the determinant equal to zero.
   * @returns The inverse of the matrix.
   */
  inverse() {
    if (this.rows !== this.cols) throw new Error('Unable to calculate inverse for non-quadratic matrix')
    else if (this.det() === 0) throw new Error('Matrix not invertible due to the determinant equal to zero')

    const n = this.rows
    const identity: number[][] = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => i === j ? 1 : 0))
    const copy = this._data.map(row => [...row])

    for (let i = 0; i < n; i++) {
      let diagonalElement = copy[i][i]

      if (diagonalElement === 0) {
        for (let j = i + 1; j < n; j++) {
          if (copy[j][i] !== 0) {
            [copy[i], copy[j]] = [copy[j], copy[i]];
            [identity[i], identity[j]] = [identity[j], identity[i]]
            break
          }
        }
        diagonalElement = copy[i][i]
      }

      for (let j = 0; j < n; j++) {
        copy[i][j] /= diagonalElement
        identity[i][j] /= diagonalElement
      }

      for (let j = 0; j < n; j++) {
        if (j === i) continue

        const elementToZero = copy[j][i]

        for (let k = 0; k < n; k++) {
          copy[j][k] -= elementToZero * copy[i][k]
          identity[j][k] -= elementToZero * identity[i][k]
        }
      }
    }

    return Matrix.from(identity)
  }

  /**
   * Returns the dot product of the current matrix and the passed matrix.
   * @param matrix The matrix to multiply with the current matrix.
   * @returns A new matrix that is the result of the dot product.
   * @throws An error if the number of columns of the current matrix is different from the number of rows of the passed matrix.
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
   */
  sub(row: number, col: number) {
    return Matrix.from(this._data.filter((_, i) => i !== row).map(r => r.filter((_, j) => j !== col)))
  }

  /**
   * Calculates the determinant of a square matrix.
   * @throws An error if the matrix is not quadratic.
   * @returns The determinant of the matrix.
   */
  det() {
    if (this.rows !== this.cols) throw new Error('Unable to calculate determinant for non-quadratic matrix')

    const cofactorSign = (row: number, col: number) => (row + col) % 2 === 0 ? 1 : -1

    const determinant = (matrix: Matrix): number => {
      if (matrix.rows === 1) return matrix.get(0, 0)
      else if (matrix.rows === 2) return (matrix.get(0, 0) * matrix.get(1, 1)) - (matrix.get(0, 1) * matrix.get(1, 0))

      let det = 0

      for (let col = 0; col < matrix.cols; col++) {
        const cofactor = matrix.get(0, col) * cofactorSign(0, col) * determinant(matrix.sub(0, col))
        det += cofactor
      }

      return det
    }

    return determinant(this)
  }

  /**
   * Returns a new matrix that is a clone of the current matrix instance.
   * @returns A new matrix that is a clone of the current matrix instance.
   */
  clone() {
    return Matrix.from(this.items)
  }

  /**
   * Returns an array containing the mean value of each column in the matrix.
   * @returns An array containing the mean value of each column in the matrix.
   */
  get meanCols() {
    return Array.from({ length: this.cols }).map((_, i) => this.getCol(i).reduce((v, c) => v + c, 0) / this.rows)
  }

  /**
   * Returns an array containing the mean value of each row in the matrix.
   * @returns An array containing the mean value of each row in the matrix.
   */
  get meanRows() {
    return this._data.map(arr => arr.reduce((v, c) => v + c, 0) / arr.length)
  }

  /**
   * Returns the sum of all elements in the matrix.
   * @returns The sum of all elements in the matrix.
   */
  get sum() {
    return this._data.reduce((p, arr) => p + arr.reduce((v, c) => v + c, 0), 0)
  }

  /**
   * Returns an array containing the diagonal elements of the matrix.
   * If the matrix is not square, the diagonal is truncated to the smaller dimension.
   * @returns An array containing the diagonal elements of the matrix.
   */
  get diagonal() {
    return Array.from({ length: Math.min(this.rows, this.cols) }, (_, i) => this.get(i, i))
  }

  /**
   * Returns a copy of the matrix data as a two-dimensional array.
   * @returns A copy of the matrix data.
   */
  get items() {
    return this._data.map(row => [...row])
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
