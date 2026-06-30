var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
function euclideanSquared(a, b) {
  if (a.length !== b.length) throw new Error("The vectors should have the same length");
  let result = 0;
  for (let i = 0; i < a.length; ++i) {
    const op = a[i] - b[i];
    result += op * op;
  }
  return result;
}
function euclidean(a, b) {
  if (a.length !== b.length) throw new Error("The vectors should have the same length");
  return Math.sqrt(euclideanSquared(a, b));
}
class Matrix {
  /**
   * Creates a new matrix with the specified number of rows and columns.
   * @param rows The number of rows in the matrix.
   * @param cols The number of columns in the matrix.
   * @param value The initial value of the matrix. Can be a number, a function that returns a number, or the string `identity`.
   *
   * If a number is provided, all elements of the matrix will be set to that number.
   *
   * If a function is provided, it will be called for each element of the matrix to determine its initial value.
   *
   * If `identity` is provided, the matrix will be initialized as an identity matrix.
   * @throws An error if the number of rows or columns is less than or equal to 1.
   */
  constructor(rows, cols, value) {
    __publicField(this, "_data", []);
    this.rows = rows;
    this.cols = cols;
    if (rows <= 1 && cols <= 1) throw new Error("Unable to create a matrix of that size");
    if (value === void 0)
      this._data = Array.from({ length: rows }, () => Array.from({ length: cols }));
    else if (value === "identity")
      this._data = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_2, j) => i === j ? 1 : 0));
    else if (typeof value === "number")
      this._data = Array.from({ length: rows }, () => Array.from({ length: cols }).fill(value));
    else if (typeof value === "function")
      this._data = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_2, j) => value(i, j)));
  }
  static from(...params) {
    if (params.length === 1) {
      const array = params[0];
      const rows = array.length;
      if (rows === 0) throw new Error("2D array is empty");
      const cols = array[0].length;
      if (array.some((arr) => arr.length !== cols)) throw new Error("Not all the columns of the matrix have the same length");
      return new Matrix(rows, cols, (r, c) => array[r][c]);
    } else {
      const array = params[0], type = params[1];
      const len = array.length;
      if (len === 0) throw new Error("Array is empty");
      if (type === "col") return new Matrix(1, len, (_, c) => array[c]);
      else if (type === "row") return new Matrix(len, 1, (r) => array[r]);
      else return new Matrix(len, len, (r, c) => r === c ? array[r] : 0);
    }
  }
  /**
   * Returns the value at the specified row and column in the matrix.
   * @param row The row index of the element to retrieve.
   * @param col The column index of the element to retrieve.
   * @returns The value at the specified row and column in the matrix.
   */
  get(row, col) {
    return this._data[row][col];
  }
  /**
   * Sets the value of a specific cell in the matrix.
   * @param row The row index of the cell to set.
   * @param col The column index of the cell to set.
   * @param value The value to set in the cell.
   * @returns The value that was set in the cell.
   */
  set(row, col, value) {
    this._data[row][col] = value;
    return value;
  }
  /**
   * Concatenates two matrices either horizontally or vertically.
   * @param mat The matrix to concatenate with.
   * @param type The type of concatenation to perform. Can be 'horizontal' or 'vertical'. Defaults to 'horizontal'.
   * @returns A new matrix that is the result of the concatenation.
   * @throws An error if the matrices do not have the same number of rows (for horizontal concatenation) or columns (for vertical concatenation).
   */
  concat(mat, type = "horizontal") {
    let data = [];
    if (type === "horizontal") {
      if (this.rows !== mat.rows) throw new Error("The matrices need to have the same number of rows");
      data = this._data.map((arr, i) => arr.concat(mat._data[i]));
    } else if (type === "vertical") {
      if (this.cols !== mat.cols) throw new Error("The matrices need to have the same number of rows");
      data = this._data.concat(mat._data);
    }
    return Matrix.from(data);
  }
  /**
   * Updates the value at the specified row and column index using the provided update function.
   * @param row The row index of the value to update.
   * @param col The column index of the value to update.
   * @param value The update function that takes the old value as input and returns the new value.
   * @returns The new value after the update.
   */
  update(row, col, value) {
    const val = value(this._data[row][col]);
    this._data[row][col] = val;
    return val;
  }
  /**
   * Applies a binary operation to each element of the current matrix and another matrix.
   * @template T The type of the elements in the matrix.
   * @param matrix The matrix to operate with.
   * @param value The binary operation to apply to each element.
   * @returns A new matrix with the result of the operation.
   * @throws If the number of columns of the current matrix is different from the number of rows of the passed matrix.
   */
  operate(matrix, value) {
    const mat = matrix instanceof Matrix ? matrix : Matrix.from(matrix);
    if (this.cols !== mat.cols || this.rows !== mat.rows)
      throw new Error("The number of columns of the current matrix is different from the number of rows of the passed matrix");
    const data = this._data.map((row, i) => row.map((col, j) => value(col, mat.get(i, j))));
    this._data = data;
    return data;
  }
  /**
   * Swaps two rows in the matrix.
   * @param row1 The index of the first row to swap.
   * @param row2 The index of the second row to swap.
   * @returns The updated matrix with the swapped rows.
   */
  swapRows(row1, row2) {
    [this._data[row1], this._data[row2]] = [this._data[row2], this._data[row1]];
    return this;
  }
  /**
   * Sets the values of a row in the matrix.
   * @param row The index of the row to set.
   * @param values The values to set for the row.
   * @returns The updated matrix.
   * @throws If the passed index exceeds the total number of rows in the matrix or if the passed values exceed the total number of rows in the matrix.
   */
  setRow(row, values) {
    if (row >= this.rows) throw new Error("The passed index exceeds the total number of rows in the matrix");
    else if (values.length > this.cols) throw new Error("The passed values exceed the total number of columns in the matrix");
    this._data[row] = values;
    return this;
  }
  /**
   * Returns the row at the specified index.
   * @param row The index of the row to retrieve.
   * @returns The row at the specified index.
   * @throws An error if the passed index exceeds the total number of rows in the matrix.
   */
  getRow(row) {
    if (row >= this.rows) throw new Error("The passed index exceeds the total number of rows in the matrix");
    return this._data[row];
  }
  /**
   * Swaps two columns in the matrix.
   * @param col1 The index of the first column to swap.
   * @param col2 The index of the second column to swap.
   * @returns The updated matrix with the swapped columns.
   */
  swapCols(col1, col2) {
    this._data = this._data.map((row) => {
      [row[col1], row[col2]] = [row[col2], row[col1]];
      return row;
    });
    return this;
  }
  /**
   * Sets the values of a given column in the matrix.
   * @param col The index of the column to set.
   * @param values An array of values to set in the column.
   * @returns The updated matrix.
   * @throws An error if the passed index exceeds the total number of columns in the matrix.
   * @throws An error if the passed values exceed the total number of columns in the matrix.
   */
  setCol(col, values) {
    if (col >= this.cols) throw new Error("The passed index exceeds the total number of columns in the matrix");
    else if (values.length > this.rows) throw new Error("The passed values exceed the total number of rows in the matrix");
    this._data = this._data.map((r, i) => {
      r[col] = values[i];
      return r;
    });
    return this;
  }
  /**
   * Returns an array containing the elements of the specified column in the matrix.
   * @param col The index of the column to retrieve.
   * @returns An array containing the elements of the specified column.
   * @throws An error if the passed index exceeds the total number of columns in the matrix.
   */
  getCol(col) {
    if (col >= this.cols) throw new Error("The passed index exceeds the total number of columns in the matrix");
    return this._data.map((row) => row[col]);
  }
  /**
   * Returns a generator that iterates over the rows of the matrix.
   * @yields The current row after each iteration.
   * @returns A generator that yields each row of the matrix.
   */
  *iterateRows() {
    for (let i = 0; i < this.rows; i++)
      yield this.getRow(i);
  }
  /**
   * Returns a generator that iterates over the columns of the matrix.
   * @yields The current column after each iteration.
   * @returns A generator that yields each column of the matrix.
   */
  *iterateCols() {
    for (let i = 0; i < this.cols; i++)
      yield this.getCol(i);
  }
  /**
   * Returns an iterator that yields each row of the matrix.
   * @yields The current row after each iteration.
   * @returns An iterator that yields each row of the matrix.
   */
  *[Symbol.iterator]() {
    for (const row of this.iterateRows())
      yield row;
  }
  /**
   * Removes all the values present in the matrix.
   * @returns The cleared matrix.
   */
  clear() {
    this._data = new Matrix(this.rows, this.cols)._data;
    return this;
  }
  /**
   * The current number of elements in the matrix.
   */
  size() {
    return this.rows * this.cols;
  }
  /**
   * Returns a new matrix that is the transpose of the current matrix.
   * @returns A new matrix that is the transpose of the current matrix.
   */
  transpose() {
    return new Matrix(this.cols, this.rows, (row, col) => this.get(col, row));
  }
  /**
   * Calculates the inverse of a square matrix.
   * @throws An error if the matrix is not quadratic.
   * @throws An error if the matrix not invertible due to the determinant equal to zero.
   * @returns The inverse of the matrix.
   */
  inverse() {
    if (this.rows !== this.cols) throw new Error("Unable to calculate inverse for non-quadratic matrix");
    else if (this.det() === 0) throw new Error("Matrix not invertible due to the determinant equal to zero");
    const identity = new Matrix(this.rows, this.cols, "identity").items;
    const copy = this.items;
    for (let i = 0; i < this.rows; i++) {
      let diagonalElement = copy[i][i];
      if (diagonalElement === 0) {
        for (let j = i + 1; j < this.rows; j++) {
          if (copy[j][i] !== 0) {
            [copy[i], copy[j]] = [copy[j], copy[i]];
            [identity[i], identity[j]] = [identity[j], identity[i]];
            break;
          }
        }
        diagonalElement = copy[i][i];
      }
      for (let j = 0; j < this.cols; j++) {
        copy[i][j] /= diagonalElement;
        identity[i][j] /= diagonalElement;
      }
      for (let j = 0; j < this.rows; j++) {
        if (j === i) continue;
        const elementToZero = copy[j][i];
        for (let k = 0; k < this.cols; k++) {
          copy[j][k] -= elementToZero * copy[i][k];
          identity[j][k] -= elementToZero * identity[i][k];
        }
      }
    }
    return Matrix.from(identity);
  }
  /**
   * Returns the dot product of the current matrix and the passed matrix.
   * @param matrix The matrix to multiply with the current matrix.
   * @returns A new matrix that is the result of the dot product.
   * @throws An error if the number of columns of the current matrix is different from the number of rows of the passed matrix.
   */
  dot(matrix) {
    const mat = matrix instanceof Matrix ? matrix : Matrix.from(matrix);
    if (this.cols !== mat.rows)
      throw new Error("The number of columns of the current matrix is different from the number of rows of the passed matrix");
    const result = [];
    for (let i = 0; i < this.rows; i++) {
      const newRow = [];
      for (let j = 0; j < mat.cols; j++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) sum += this.get(i, k) * mat.get(k, j);
        newRow.push(sum);
      }
      result.push(newRow);
    }
    return Matrix.from(result);
  }
  /**
   * Returns a new matrix that is a submatrix of the current matrix with the specified row and column removed.
   * @param row The row to remove.
   * @param col The column to remove.
   * @returns A new matrix that is a submatrix of the current matrix with the specified row and column removed.
   */
  sub(row, col) {
    return Matrix.from(this._data.filter((_, i) => i !== row).map((r) => r.filter((_, j) => j !== col)));
  }
  /**
   * Calculates the determinant of a square matrix.
   * @throws An error if the matrix is not quadratic.
   * @returns The determinant of the matrix.
   */
  det() {
    if (this.rows !== this.cols) throw new Error("Unable to calculate determinant for non-quadratic matrix");
    const cofactorSign = (row, col) => (row + col) % 2 === 0 ? 1 : -1;
    const determinant = (matrix) => {
      if (matrix.rows === 1) return matrix.get(0, 0);
      else if (matrix.rows === 2) return matrix.get(0, 0) * matrix.get(1, 1) - matrix.get(0, 1) * matrix.get(1, 0);
      let det = 0;
      for (let col = 0; col < matrix.cols; col++) {
        const cofactor = matrix.get(0, col) * cofactorSign(0, col) * determinant(matrix.sub(0, col));
        det += cofactor;
      }
      return det;
    };
    return determinant(this);
  }
  /**
   * Returns a new matrix that is a clone of the current matrix instance.
   * @returns A new matrix that is a clone of the current matrix instance.
   */
  clone() {
    return Matrix.from(this.items);
  }
  /**
   * Returns an array containing the mean value of each column in the matrix.
   * @returns An array containing the mean value of each column in the matrix.
   */
  get meanCols() {
    return Array.from({ length: this.cols }).map((_, i) => this.getCol(i).reduce((v, c) => v + c, 0) / this.rows);
  }
  /**
   * Returns an array containing the mean value of each row in the matrix.
   * @returns An array containing the mean value of each row in the matrix.
   */
  get meanRows() {
    return this._data.map((arr) => arr.reduce((v, c) => v + c, 0) / arr.length);
  }
  /**
   * Returns the sum of all elements in the matrix.
   * @returns The sum of all elements in the matrix.
   */
  get sum() {
    return this._data.reduce((p, arr) => p + arr.reduce((v, c) => v + c, 0), 0);
  }
  /**
   * Returns an array containing the diagonal elements of the matrix.
   * If the matrix is not square, the diagonal is truncated to the smaller dimension.
   * @returns An array containing the diagonal elements of the matrix.
   */
  get diagonal() {
    return Array.from({ length: Math.min(this.rows, this.cols) }, (_, i) => this.get(i, i));
  }
  /**
   * Returns a copy of the matrix data as a two-dimensional array.
   * @returns A copy of the matrix data.
   */
  get items() {
    return this._data.map((row) => [...row]);
  }
  /**
   * Returns the number of empty spaces in the matrix.
   * @returns The number of empty spaces in the matrix.
   */
  get space() {
    return this._data.reduce((p, arr) => p + arr.reduce((v, c) => v + (typeof c === "undefined" ? 1 : 0), 0), 0);
  }
  /**
   * Returns a boolean indicating whether the matrix has room for more elements.
   * @returns True if the matrix has room for more elements, false otherwise.
   */
  get hasRoom() {
    return this.space !== 0;
  }
  /**
   * Returns a boolean indicating whether the matrix is empty or not.
   * @returns True if the matrix is empty, false otherwise.
   */
  get isEmpty() {
    return this.space === this.size();
  }
  /**
   * Returns a boolean indicating whether the matrix is full or not.
   * @returns True if the matrix is full, false otherwise.
   */
  get isFull() {
    return this.space === 0;
  }
}
function linearSpace(start, end, num) {
  if (!num) num = Math.max(Math.round(end - start) + 1, 1);
  if (num < 2) return num === 1 ? [start] : [];
  const result = Array.from({ length: num });
  num -= 1;
  for (let i = num; i >= 0; --i)
    result[i] = (i * end + (num - i) * start) / num;
  return result;
}
class Randomizer {
  /**
   * A Mersenne Twister random number generator.
   * @param seed The seed for the random number generator. If `seed` is `null` then the actual time gets used.
   */
  constructor(seed) {
    __publicField(this, "_seed");
    __publicField(this, "_pN", 624);
    __publicField(this, "_pM", 397);
    __publicField(this, "_cMat", 2567483615);
    __publicField(this, "_upperMask", 2147483648);
    __publicField(this, "_lowerMask", 2147483647);
    __publicField(this, "_sVec", Array.from({ length: this._pN }));
    __publicField(this, "_init", this._pN + 1);
    __publicField(this, "_gVal");
    this.seed = seed ?? Date.now();
  }
  /**
   * Gets the current seed value.
   * @returns The current seed value.
   */
  get seed() {
    return this._seed;
  }
  /**
   * Setter for the seed property of the Randomizer class.
   * @param seed The seed value to set.
   */
  set seed(seed) {
    this._seed = seed;
    this._sVec[0] = seed >>> 0;
    for (this._init = 1; this._init < this._pN; this._init += 1) {
      const s = this._sVec[this._init - 1] ^ this._sVec[this._init - 1] >>> 30;
      this._sVec[this._init] = (((s & 4294901760) >>> 16) * 1812433253 << 16) + (s & 65535) * 1812433253 + this._init;
      this._sVec[this._init] = this._sVec[this._init] >>> 0;
    }
  }
  /**
   * Generates a random integer between 0 and MAX_INTEGER.
   * @returns A random integer.
   */
  randomInt() {
    const mag = [0, this._cMat];
    let y = 0;
    if (this._init >= this._pN) {
      const nrm = this._pN - this._pM, mrn = this._pM - this._pN;
      let k = 0;
      for (; k < nrm; ++k) {
        y = this._sVec[k] & this._upperMask | this._sVec[k + 1] & this._lowerMask;
        this._sVec[k] = this._sVec[k + this._pM] ^ y >>> 1 ^ mag[y & 1];
      }
      for (; k < this._pN - 1; ++k) {
        y = this._sVec[k] & this._upperMask | this._sVec[k + 1] & this._lowerMask;
        this._sVec[k] = this._sVec[k + mrn] ^ y >>> 1 ^ mag[y & 1];
      }
      y = this._sVec[this._pN - 1] & this._upperMask | this._sVec[0] & this._lowerMask;
      this._sVec[this._pN - 1] = this._sVec[this._pM - 1] ^ y >>> 1 ^ mag[y & 1];
      this._init = 0;
    }
    y = this._sVec[this._init += 1];
    y ^= y >>> 11;
    y ^= y << 7 & 2636928640;
    y ^= y << 15 & 4022730752;
    y ^= y >>> 18;
    return y >>> 0;
  }
  /**
   * Returns a random integer between 0 and MAX_INTEGER using the current time as the seed.
   * @returns A random integer.
   */
  static randomInt() {
    return new Randomizer(Date.now()).randomInt();
  }
  /**
   * Generates a random number between 0 (inclusive) and 1 (exclusive).
   * Uses the randomInt() method to generate a random integer and scales it to a float between 0 and 1.
   * @returns A random number between 0 (inclusive) and 1 (exclusive).
   */
  random() {
    return this.randomInt() * (1 / 4294967296);
  }
  /**
   * Returns a random number between 0 (inclusive) and 1 (exclusive) generated using the current time as the seed.
   * @returns A random number between 0 (inclusive) and 1 (exclusive).
   */
  static random() {
    return new Randomizer(Date.now()).random();
  }
  /**
   * Generates a random number using the Box-Muller transform to approximate a Gaussian distribution.
   * @returns A random number with a Gaussian distribution.
   */
  randomGauss() {
    let x, y, r;
    if (this._gVal !== void 0) {
      x = this._gVal;
      this._gVal = void 0;
      return x;
    } else {
      do {
        x = 2 * this.random() - 1;
        y = 2 * this.random() - 1;
        r = x * x + y * y;
      } while (!r || r > 1);
    }
    const c = Math.sqrt(-2 * Math.log(r) / r);
    this._gVal = y * c;
    return x * c;
  }
  /**
   * Returns a random number using the Box-Muller transform to approximate a Gaussian distribution.
   * @returns A random number with a Gaussian distribution.
   */
  static randomGauss() {
    return new Randomizer(Date.now()).randomGauss();
  }
  /**
   * Returns an array of `n` random samples from the given data.
   * @param data - The matrix or 2D array to sample from.
   * @param n - The number of samples to return.
   * @returns An array of `n` rows from the input data, randomly selected.
   * @throws An error if `n` is greater than the number of rows in the input data.
   */
  samples(data, n) {
    const mat = data instanceof Matrix ? data : Matrix.from(data);
    if (n > mat.rows) throw new Error("The number of samples can't be bigger than the number of rows of the matrix");
    const samples = Array.from({ length: n });
    const indexList = linearSpace(0, mat.rows - 1);
    for (let i = 0, l = indexList.length; i < n; ++i, --l)
      samples[i] = indexList.splice(this.randomInt() % l, 1)[0];
    return samples.map((v) => mat.getRow(v));
  }
  /**
   * Returns a random sample of size `n` from the given data.
   * @param data The data to sample from.
   * @param n The size of the sample to return.
   * @returns A random sample of size `n` from the given data.
   */
  static samples(data, n) {
    return new Randomizer(Date.now()).samples(data, n);
  }
}
class DimRed {
  /**
   * Constructs a new instance of the DimRed class.
   * @param data The matrix of data to perform dimensionality reduction on.
   * @param params Optional parameters for the algorithm.
   */
  constructor(data, params) {
    __publicField(this, "_params");
    __publicField(this, "_randomizer");
    __publicField(this, "_initialized", false);
    __publicField(this, "_iter", 0);
    __publicField(this, "_projection");
    __publicField(this, "_data");
    __publicField(this, "_result");
    this._data = data instanceof Matrix ? data : Matrix.from(data);
    this._params = {
      dimensionality: 2,
      metric: euclidean,
      seed: 1212,
      ...params
    };
    this._randomizer = new Randomizer(this.seed);
    this._result = new Matrix(this.dimensionality, this.dimensionality);
  }
  /**
   * Checks if the class has been initialized and initializes it if it hasn't.
   */
  checkInit() {
    if (!this._initialized) {
      this.init();
      this._initialized = true;
    }
  }
  /**
   * Transforms the data by performing dimensionality reduction on it.
   * @param iterations The number of iterations to perform. Default to 500.
   * @returns The projection of the data after dimensionality reduction.
   */
  transform(iterations = 500) {
    this.checkInit();
    for (let i = 0; i < iterations; ++i)
      this.next();
    return this._projection;
  }
  /**
   * A generator function that yields the projection of the data after each iteration.
   * @param iterations The number of iterations to perform. Default to 500.
   * @yields The projection of the data after each iteration.
   * @returns The projection of the data after dimensionality reduction.
   */
  *generator(iterations = 500) {
    this.checkInit();
    for (let i = 0; i < iterations; ++i) {
      this.next();
      yield this._projection;
    }
    return this._projection;
  }
  /**
   * Gets the dimensionality of the data after dimensionality reduction.
   */
  get dimensionality() {
    return this._params.dimensionality;
  }
  /**
   * Gets the metric used for calculating distances between data points.
   */
  get metric() {
    const metr = this._params.metric;
    return typeof metr === "string" ? metr : metr.name;
  }
  /**
   * Gets the seed used for generating random numbers.
   */
  get seed() {
    return this._params.seed;
  }
  /**
   * Gets the parameters used for the algorithm.
   */
  get parameters() {
    const { metric, seed, dimensionality, ...rest } = this._params;
    return rest;
  }
}
class TSNE extends DimRed {
  /**
   * t-SNE algorithm for dimensionality reduction.
   * @param data A 2D array or matrix whose dimensionality is to be reduced.
   * @param params Optional parameters for the algorithm.
   */
  constructor(data, params) {
    super(data, {
      perplexity: 50,
      epsilon: 10,
      dimensionality: 2,
      metric: euclideanSquared,
      seed: 1212,
      ...params
    });
    __publicField(this, "_yStep");
    __publicField(this, "_gains");
    this._result = new Matrix(this._data.rows, this.dimensionality, () => this._randomizer.randomGauss() * 1e-4);
  }
  /**
   * Initializes the t-SNE algorithm by computing pairwise distances between data points and
   * computing probabilities for each pair of points. It also initializes the step and gains matrices.
   * @returns The t-SNE instance.
   */
  init() {
    const data = this._data;
    const n = data.rows;
    const metric = this._params.metric;
    let delta = data.clone();
    if (this.metric !== "precomputed") {
      delta = new Matrix(n, n, 0);
      for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
          const distance = metric(data.getRow(i), data.getRow(j));
          delta.set(i, j, distance);
          delta.set(j, i, distance);
        }
      }
    }
    this._yStep = new Matrix(data.rows, data.cols, 0);
    this._gains = new Matrix(data.rows, data.cols, 1);
    const P = new Matrix(n, n, 0);
    const targetH = Math.log(this._params.perplexity);
    for (let i = 0; i < n; ++i) {
      const nDist = delta.getRow(i);
      const pRow = P.getRow(i);
      let betaMin = -Infinity, betaMax = Infinity;
      let beta = 1, cnt = 50, done = false;
      let pSum = 0, dpSum = 0;
      while (!done && cnt--) {
        pSum = dpSum = 0;
        nDist.forEach((v, j) => {
          const pj = i !== j ? Math.exp(-v * beta) : 0;
          dpSum += v * pj;
          pRow[j] = pj;
          pSum += pj;
        });
        const H = pSum > 0 ? Math.log(pSum) + beta * dpSum / pSum : 0;
        if (H > targetH) {
          betaMin = beta;
          beta = betaMax === Infinity ? beta * 2 : (beta + betaMax) / 2;
        } else {
          betaMax = beta;
          beta = betaMin === -Infinity ? beta / 2 : (beta + betaMin) / 2;
        }
        done = Math.abs(H - targetH) < 1e-4;
      }
      for (let j = 0; j < n; ++j)
        pRow[j] /= pSum;
    }
    const n2 = n * 2;
    for (let i = 0; i < n; ++i) {
      for (let j = i; j < n; ++j) {
        const p = Math.max((P.get(i, j) + P.get(j, i)) / n2, 1e-100);
        P.set(i, j, p);
        P.set(j, i, p);
      }
    }
    this._projection = P;
    return this;
  }
  next() {
    const { dimensionality: dim, epsilon } = this._params;
    const n = this._data.rows;
    const proj = this._projection;
    const yStep = this._yStep;
    const gains = this._gains;
    const res = this._result;
    const iter = ++this._iter;
    const pMul = iter < 100 ? 4 : 1;
    const Qu = new Matrix(n, n, 0);
    let qSum = 0;
    for (let i = 0; i < n; ++i) {
      for (let j = i + 1; j < n; ++j) {
        let dSum = 0;
        for (let d = 0; d < dim; ++d) {
          const dHere = res.get(i, d) - res.get(j, d);
          dSum += dHere * dHere;
        }
        const qVal = 1 / (1 + dSum);
        Qu.set(i, j, qVal);
        Qu.set(j, i, qVal);
        qSum += 2 * qVal;
      }
    }
    const Q = new Matrix(n, n, 0);
    for (let i = 0; i < n; ++i) {
      for (let j = i + 1; j < n; ++j) {
        const val = Math.max(Qu.get(i, j) / qSum, 1e-100);
        Q.set(i, j, val);
        Q.set(j, i, val);
      }
    }
    const grad = new Matrix(n, dim, 0);
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < n; ++j) {
        const Qij = Q.get(i, j);
        const preMult = 4 * (pMul * proj.get(i, j) - Qij) * Qij;
        for (let d = 0; d < dim; ++d)
          grad.update(i, d, (o) => o + preMult * (res.get(i, d) - res.get(j, d)));
      }
    }
    const resMean = Array.from({ length: dim }).fill(0);
    for (let i = 0; i < n; ++i) {
      for (let d = 0; d < dim; ++d) {
        const gId = grad.get(i, d);
        const sId = yStep.get(i, d);
        const gainId = gains.get(i, d);
        let newGain = 0;
        if (newGain < 0.01) newGain = 0.01;
        else if (Math.sign(gId) === Math.sign(sId)) newGain = gainId * 0.8;
        else newGain = gainId + 0.2;
        gains.set(i, d, newGain);
        const mVal = iter < 250 ? 0.5 : 0.8;
        const sIdNew = mVal * sId - epsilon * newGain * gId;
        yStep.set(i, d, sIdNew);
        resMean[d] += res.update(i, d, (o) => o + sIdNew);
      }
    }
    for (let i = 0; i < n; ++i) {
      for (let d = 0; d < dim; ++d)
        res.update(i, d, (o) => o - resMean[d] / n);
    }
    return this._result;
  }
}
function canberra(a, b) {
  if (a.length !== b.length) throw new Error("The vectors should have the same length");
  let distance = 0;
  for (let i = 0; i < a.length; i++) {
    const num = Math.abs(a[i] - b[i]);
    const den = Math.abs(a[i]) + Math.abs(b[i]);
    if (den !== 0) distance += num / den;
  }
  return distance;
}
function chebyshev(a, b) {
  if (a.length !== b.length) throw new Error("The vectors should have the same length");
  const result = Array.from({ length: a.length }, (_, i) => Math.abs(a[i] - b[i]));
  return Math.max(...result);
}
function cosine(a, b) {
  if (a.length !== b.length) throw new Error("The vectors should have the same length");
  let product = 0;
  for (let i = 0; i < a.length; i++) product += a[i] * b[i];
  const normA = Math.sqrt(a.reduce((p, c) => p + c ** 2, 0));
  const normB = Math.sqrt(b.reduce((p, c) => p + c ** 2, 0));
  if (normA === 0 || normB === 0) return 1;
  return Math.acos(product / (normA * normB));
}
function hamming(a, b) {
  if (a.length !== b.length) throw new Error("The vectors should have the same length");
  let result = 0;
  for (let i = 0; i < a.length; i++) result += Number(a[i] !== b[i]);
  return result / a.length;
}
function manhattan(a, b) {
  if (a.length !== b.length) throw new Error("The vectors should have the same length");
  let result = 0;
  for (let i = 0; i < a.length; i++) result += Math.abs(a[i] - b[i]);
  return result;
}
class FixedArray extends Array {
  /**
   * Creates a new fixed-capacity array.
   * @param capacity The maximum capacity (as a number) or an initial set of items (as an array).
   */
  constructor(capacity) {
    var __super = (...args) => {
      super(...args);
      __publicField(this, "_capacity");
      return this;
    };
    if (typeof capacity === "number") {
      __super();
      this._capacity = capacity;
    } else if (capacity) {
      __super(...capacity);
      this._capacity = capacity.length;
    } else {
      __super();
      this._capacity = 0;
    }
  }
  /**
   * Creates a new fixed-capacity array from an array of items.
   * @param items The items to initialize the array with.
   * @returns A new fixed-capacity array with capacity equal to the number of items.
   */
  static from(items) {
    return new FixedArray(items);
  }
  /**
   * Appends new elements to the end of the fixed-capacity array.
   * @param items The items to add.
   * @throws An error if adding the items would exceed the array's capacity.
   * @returns The new length of the array.
   */
  push(...items) {
    if (this.length + items.length > this._capacity) throw new Error("Array is full");
    return super.push(...items);
  }
}
class ListStructure {
  /**
   * Creates a new list structure with the given size or initial elements.
   * @param size The maximum capacity (as a number) or an array of initial elements.
   */
  constructor(size) {
    __publicField(this, "_data", []);
    __publicField(this, "_capacity", 0);
    if (typeof size === "number") {
      this._data = new FixedArray(size);
      this._capacity = size;
    } else
      this._data = [...size];
  }
  /**
   * An array of all the elements in the list.
   */
  get items() {
    return [...this._data].filter((v) => v !== void 0);
  }
  /**
   * Clears the list.
   */
  clear() {
    this._data = this._capacity > 0 ? new FixedArray(this._capacity) : [];
    return this;
  }
  /**
   * The current number of elements in the list.
   */
  size() {
    return this._data.length;
  }
}
class GraphStructure {
  /**
   * Creates a new graph structure with the given node.
   * @param node The first node to add to the graph.
   */
  constructor(node) {
    __publicField(this, "map", /* @__PURE__ */ new Map());
    this.map.set(node, []);
  }
  /**
   * Clears the graph by removing all nodes and edges.
   */
  clear() {
    this.map.clear();
  }
  /**
   * The current number of elements in the graph.
   */
  size() {
    return this.map.size;
  }
  /**
   * Returns true if the graph contains the given node, false otherwise.
   * @param node The node to check for.
   */
  hasNode(node) {
    return this.map.has(node);
  }
  /**
   * Returns an array of nodes in the graph.
   */
  get nodes() {
    return [...this.map.keys()];
  }
}
class Queue extends ListStructure {
  /**
   * Creates a new queue with the specified size or elements.
   * @param size The size of the queue or an array of elements to initialize the queue with.
   */
  constructor(size) {
    super(size);
    __publicField(this, "_head", 0);
    __publicField(this, "_tail", 0);
    if (!(typeof size === "number"))
      this._tail = size.length;
  }
  /**
   * Adds an element to the end of the queue.
   * @param element The element to add to the queue.
   * @throws An error if the queue is full.
   */
  enqueue(element) {
    if (this.isFull) throw new Error("Queue is full");
    this._data[this._tail] = element;
    this._tail++;
  }
  /**
   * Removes and returns the element at the front of the queue.
   * @returns The element at the front of the queue.
   * @throws An error if the queue is empty.
   */
  dequeue() {
    if (this.isEmpty) throw new Error("Queue is empty");
    const item = this._data[this._head];
    delete this._data[this._head];
    this._head++;
    return item;
  }
  /**
   * Removes all elements from the queue.
   * @returns The queue instance.
   */
  clear() {
    super.clear();
    this._head = 0;
    this._tail = 0;
    return this;
  }
  /**
   * Returns the element at the front of the queue without removing it.
   * @returns The element at the front of the queue or undefined if the queue is empty.
   */
  peek() {
    if (this.isEmpty) return void 0;
    return this._data[this._head];
  }
  /**
   * The current number of elements in the queue.
   */
  size() {
    return this._tail - this._head;
  }
  /**
   * Returns the number of available spaces in the queue.
   * @returns The number of available spaces in the queue.
   */
  get space() {
    return this._capacity > 0 ? this._capacity - this.size() : Infinity;
  }
  /**
   * Returns true if the queue is empty.
   * @returns True if the queue is empty, false otherwise.
   */
  get isEmpty() {
    return this.size() === 0;
  }
  /**
   * Returns true if the queue is full.
   * @returns True if the queue is full, false otherwise.
   */
  get isFull() {
    return this._capacity > 0 && this.size() >= this._capacity;
  }
  /**
   * Returns true if the queue has available space.
   * @returns True if the queue has available space, false otherwise.
   */
  get hasRoom() {
    return !this.isFull;
  }
}
function breadthFirstSearch(graph) {
  const visited = /* @__PURE__ */ new Set();
  const queue = new Queue(graph.nodes);
  const result = [];
  while (!queue.isEmpty) {
    const node = queue.dequeue();
    if (node && !visited.has(node)) {
      visited.add(node);
      result.push(node);
      for (const neighbor of graph.getEdges(node))
        if (!visited.has(neighbor)) queue.enqueue(neighbor);
    }
  }
  return result;
}
class Stack extends ListStructure {
  /**
   * Creates a new stack with the specified size or elements.
   * @param size The size of the stack or an array of elements to initialize the stack with.
   */
  constructor(size) {
    super(size);
  }
  /**
   * Adds an element to the top of the stack.
   * @param element The element to add to the stack.
   * @throws An error if the stack is full.
   */
  push(element) {
    if (this.isFull) throw new Error("Stack is full");
    this._data.push(element);
  }
  /**
   * Removes and returns the element at the top of the stack.
   * @returns The element at the top of the stack.
   * @throws An error if the stack is empty.
   */
  pop() {
    if (this.isEmpty) throw new Error("Stack is empty");
    return this._data.pop();
  }
  /**
   * Returns the element at the top of the stack without removing it.
   * @returns The element at the top of the stack.
   */
  peek() {
    return this._data[this._data.length - 1];
  }
  /**
   * Returns the remaining space in the stack.
   * @returns The remaining space in the stack.
   */
  get space() {
    return this._capacity > 0 ? this._capacity - this.size() : Infinity;
  }
  /**
   * Returns true if the stack is empty, false otherwise.
   * @returns True if the stack is empty, false otherwise.
   */
  get isEmpty() {
    return this.size() === 0;
  }
  /**
   * Returns true if the stack is full, false otherwise.
   * @returns True if the stack is full, false otherwise.
   */
  get isFull() {
    return this._capacity > 0 && this.size() >= this._capacity;
  }
  /**
   * Returns true if the stack has room for more elements, false otherwise.
   * @returns True if the stack has room for more elements, false otherwise.
   */
  get hasRoom() {
    return !this.isFull;
  }
}
function depthFirstSearch(graph) {
  const visited = /* @__PURE__ */ new Set();
  const stack = new Stack(graph.nodes);
  const result = [];
  while (!stack.isEmpty) {
    const node = stack.pop();
    if (node && !visited.has(node)) {
      visited.add(node);
      result.push(node);
      for (const neighbor of graph.getEdges(node))
        if (!visited.has(neighbor)) stack.push(neighbor);
    }
  }
  return result;
}
class WeightedGraph extends GraphStructure {
  /**
   * Creates a new weighted graph with the given node.
   * @param node The first node to add to the weighted graph.
   */
  constructor(node) {
    super(node);
  }
  /**
   * Adds an edge between two nodes with an optional weight.
   * @param v1 The first node.
   * @param v2 The second node.
   * @param weight The weight of the edge (default is 0).
   * @throws An error if the first node is not found or if the edge already exists.
   * @returns The updated weighted graph.
   */
  addEdge(v1, v2, weight = 0) {
    var _a;
    const list = this.map.get(v1);
    if (list) {
      list.push([v2, weight]);
      const edge = this.map.get(v2);
      if ((_a = edge == null ? void 0 : edge.map((e) => e[0])) == null ? void 0 : _a.includes(v1)) throw new Error("Edge already present");
      else if (edge) edge.push([v1, weight]);
      else this.map.set(v2, [[v1, weight]]);
    } else throw new Error("First node not found");
    return this;
  }
  /**
   * Removes an edge between two nodes in the weighted graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @throws An error if either node is not found or if the edge does not exist.
   * @returns The weighted graph instance.
   */
  removeEdge(v1, v2) {
    const list = this.map.get(v1);
    if (list) {
      const index = list.findIndex((e) => e[0] === v2);
      if (index !== -1) list.splice(index, 1);
      else throw new Error("Edge not found");
      const edge = this.map.get(v2);
      if (edge) {
        const index2 = edge.findIndex((e) => e[0] === v1);
        if (index2 !== -1) edge.splice(index2, 1);
      }
    } else throw new Error("Node not found");
    return this;
  }
  /**
   * Removes a node from the weighted graph and all edges connected to it.
   * @param node The node to remove.
   * @throws An error if the node is not found.
   * @returns The weighted graph instance.
   */
  removeNode(node) {
    if (this.map.delete(node)) {
      for (const list of this.map.values()) {
        const index = list.findIndex((e) => e[0] === node);
        if (index !== -1) list.splice(index, 1);
      }
    } else throw new Error("Node not found");
    return this;
  }
  /**
   * Returns an array of edges (as `[node, weight]` tuples) for the given node.
   * @param node The node to get the edges for.
   * @throws An error if the node is not found.
   * @returns An array of edges, each represented as a `[node, weight]` tuple.
   */
  getEdges(node) {
    const list = this.map.get(node);
    if (!list) throw new Error("Node not found");
    return [...list];
  }
  /**
   * Returns the weight of the edge between the first node and the second node,
   * and optionally additional nodes if provided.
   * @param v1 The first node.
   * @param v2 The second node.
   * @param vn Additional nodes (optional).
   * @returns The weight of the edge between the nodes.
   * @throws Error if the first or second node is not found.
   */
  getWeight(v1, v2, ...vn) {
    const list = this.map.get(v1);
    if (!list) throw new Error("First node not found");
    const edge = list.find((e) => e[0] === v2);
    if (!edge) throw new Error("Second node not found");
    let weight = edge[1];
    if (vn.length) weight += this.getWeight(v2, vn[0], ...vn.slice(1));
    return weight;
  }
  /**
   * Checks if two nodes are adjacent in the weighted graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @throws An error if the first node is not found.
   * @returns True if the nodes are adjacent, false otherwise.
   */
  isAdjacent(v1, v2) {
    const list = this.map.get(v1);
    if (!list) throw new Error("First node not found");
    return list.map((e) => e[0]).includes(v2);
  }
  /**
   * Checks if the weighted graph contains a cycle using depth-first search.
   * @returns True if a cycle is detected, false otherwise.
   */
  hasCycle() {
    const visited = /* @__PURE__ */ new Set();
    const dfs = (node, parent) => {
      visited.add(node);
      const edges = this.map.get(node);
      if (edges) {
        for (const [neighbor] of edges) {
          if (!visited.has(neighbor)) {
            if (dfs(neighbor, node)) return true;
          } else if (neighbor !== parent)
            return true;
        }
      }
      return false;
    };
    for (const node of this.map.keys()) {
      if (!visited.has(node)) {
        if (dfs(node, null)) return true;
      }
    }
    return false;
  }
}
function kruskal(graph) {
  const edges = [];
  for (const node of graph.nodes) {
    for (const [neighbor, weight] of graph.getEdges(node))
      edges.push([node, neighbor, weight]);
  }
  edges.sort((a, b) => a[2] - b[2]);
  const parent = /* @__PURE__ */ new Map();
  const rank = /* @__PURE__ */ new Map();
  function find(x) {
    if (!parent.has(x)) parent.set(x, x);
    if (!rank.has(x)) rank.set(x, 0);
    const p = parent.get(x);
    if (p !== x) parent.set(x, find(p));
    return parent.get(x);
  }
  function union(x, y) {
    const rx = find(x);
    const ry = find(y);
    if (rx === ry) return false;
    const rr = rank.get(rx);
    const rry = rank.get(ry);
    if (rr < rry) parent.set(rx, ry);
    else if (rr > rry) parent.set(ry, rx);
    else {
      parent.set(ry, rx);
      rank.set(rx, rr + 1);
    }
    return true;
  }
  const mstAdj = /* @__PURE__ */ new Map();
  for (const [u, v, w] of edges) {
    if (union(u, v)) {
      if (!mstAdj.has(u)) mstAdj.set(u, []);
      if (!mstAdj.has(v)) mstAdj.set(v, []);
      mstAdj.get(u).push([v, w]);
      mstAdj.get(v).push([u, w]);
    }
  }
  if (mstAdj.size === 0) return new WeightedGraph(graph.nodes[0]);
  const first = [...mstAdj.keys()][0];
  const mst = new WeightedGraph(first);
  const added = /* @__PURE__ */ new Set();
  for (const start of mstAdj.keys()) {
    if (added.has(start)) continue;
    if (!mst.hasNode(start)) {
      mst.addEdge(mst.nodes[0], start, 0);
      mst.removeEdge(mst.nodes[0], start);
    }
    const stack = [start];
    while (stack.length > 0) {
      const node = stack.pop();
      if (added.has(node)) continue;
      added.add(node);
      for (const [neighbor, weight] of mstAdj.get(node) ?? []) {
        if (!added.has(neighbor)) {
          mst.addEdge(node, neighbor, weight);
          stack.push(neighbor);
        }
      }
    }
  }
  return mst;
}
function countingSort(array) {
  if (array.length <= 1) return array;
  const max = Math.max(...array);
  const count = Array.from({ length: max + 1 }).fill(0);
  array.forEach((element) => count[element]++);
  for (let i = 1; i < count.length; i++) count[i] += count[i - 1];
  const output = Array.from({ length: array.length });
  for (let i = array.length - 1; i >= 0; i--) {
    output[count[array[i]] - 1] = array[i];
    count[array[i]]--;
  }
  return output;
}
function mergeNumbers(left, right) {
  let result = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left[0]);
      left.shift();
    } else {
      result.push(right[0]);
      right.shift();
    }
  }
  result = [...result, ...left, ...right];
  return result;
}
function mergeStrings(left, right) {
  let result = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left[0]);
      left.shift();
    } else {
      result.push(right[0]);
      right.shift();
    }
  }
  result = [...result, ...left, ...right];
  return result;
}
function mergeSortNum(array) {
  if (array.length <= 1) return array;
  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle);
  left = mergeSortNum(left);
  right = mergeSortNum(right);
  return mergeNumbers(left, right);
}
function mergeSortStr(array) {
  if (array.length <= 1) return array;
  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle);
  left = mergeSortStr(left);
  right = mergeSortStr(right);
  return mergeStrings(left, right);
}
function partitionNumbers(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
function partitionStrings(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
function quickSortNum(array) {
  if (array.length <= 1) return array;
  const result = [...array];
  const qs = (arr, low, high) => {
    if (low < high) {
      const pi = partitionNumbers(arr, low, high);
      qs(arr, low, pi - 1);
      qs(arr, pi + 1, high);
    }
  };
  qs(result, 0, result.length - 1);
  return result;
}
function quickSortStr(array) {
  if (array.length <= 1) return array;
  const result = [...array];
  const qs = (arr, low, high) => {
    if (low < high) {
      const pi = partitionStrings(arr, low, high);
      qs(arr, low, pi - 1);
      qs(arr, pi + 1, high);
    }
  };
  qs(result, 0, result.length - 1);
  return result;
}
class CircularQueue extends Queue {
  /**
   * Creates a new instance of the CircularQueue class.
   * @param size The maximum size of the queue, or an array of elements to initialize the queue with.
   */
  constructor(size) {
    super(size);
    if (!(typeof size === "number"))
      this._capacity = size.length;
  }
  /**
   * Adds an element to the end of the queue.
   * @param element The element to add to the queue.
   */
  enqueue(element) {
    if (this.isFull) this._head++;
    this._data[this._tail % this._capacity] = element;
    this._tail++;
  }
  /**
   * Removes and returns the element at the front of the queue.
   * @returns The element at the front of the queue.
   * @throws An error if the queue is empty.
   */
  dequeue() {
    if (this.isEmpty) throw new Error("Queue is empty");
    const item = this._data[this._head % this._capacity];
    delete this._data[this._head % this._capacity];
    this._head++;
    return item;
  }
  /**
   * Returns the number of available spaces in the queue.
   */
  get space() {
    return this._capacity - this.size();
  }
  /**
   * Returns whether the queue is full.
   */
  get isFull() {
    return this._capacity > 0 && this.size() >= this._capacity;
  }
  /**
   * Returns whether the queue is empty.
   */
  get isEmpty() {
    return this.size() === 0;
  }
}
class Graph extends GraphStructure {
  /**
   * Creates a new graph with the given node.
   * @param node The first node to add to the graph.
   */
  constructor(node) {
    super(node);
  }
  /**
   * Adds an edge between two nodes in the graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @throws An error if the first node is not found or if the edge already exists.
   * @returns The graph instance.
   */
  addEdge(v1, v2) {
    const list = this.map.get(v1);
    if (list) {
      list.push(v2);
      const edge = this.map.get(v2);
      if (edge == null ? void 0 : edge.includes(v1)) throw new Error("Edge already present");
      else if (edge) edge.push(v1);
      else this.map.set(v2, [v1]);
    } else throw new Error("First node not found");
    return this;
  }
  /**
   * Removes an edge between two nodes in the graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @throws An error if either node is not found or if the edge does not exist.
   * @returns The graph instance.
   */
  removeEdge(v1, v2) {
    const list = this.map.get(v1);
    if (list) {
      const index = list.indexOf(v2);
      if (index !== -1) list.splice(index, 1);
      else throw new Error("Edge not found");
      const edge = this.map.get(v2);
      if (edge) {
        const index2 = edge.indexOf(v1);
        if (index2 !== -1) edge.splice(index2, 1);
      }
    } else throw new Error("Node not found");
    return this;
  }
  /**
   * Removes a node from the graph and all edges connected to it.
   * @param node The node to remove.
   * @throws An error if the node is not found.
   * @returns The graph instance.
   */
  removeNode(node) {
    if (this.map.delete(node)) {
      for (const list of this.map.values()) {
        const index = list.indexOf(node);
        if (index !== -1) list.splice(index, 1);
      }
    } else throw new Error("Node not found");
    return this;
  }
  /**
   * Returns an array of nodes adjacent to the given node.
   * @param node The node to get the adjacent nodes for.
   * @throws An error if the node is not found.
   * @returns An array of adjacent nodes.
   */
  getEdges(node) {
    const list = this.map.get(node);
    if (!list) throw new Error("Node not found");
    return [...list];
  }
  /**
   * Checks if two nodes are adjacent in the graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @throws An error if the first node is not found.
   * @returns True if the nodes are adjacent, false otherwise.
   */
  isAdjacent(v1, v2) {
    const list = this.map.get(v1);
    if (!list) throw new Error("First node not found");
    return list.includes(v2);
  }
  /**
   * Checks if the graph contains a cycle using depth-first search.
   * @returns True if a cycle is detected, false otherwise.
   */
  hasCycle() {
    const visited = /* @__PURE__ */ new Set();
    const dfs = (node, parent) => {
      visited.add(node);
      const edges = this.map.get(node);
      if (edges) {
        for (const neighbor of edges) {
          if (!visited.has(neighbor)) {
            if (dfs(neighbor, node)) return true;
          } else if (neighbor !== parent)
            return true;
        }
      }
      return false;
    };
    for (const node of this.map.keys()) {
      if (!visited.has(node)) {
        if (dfs(node, null)) return true;
      }
    }
    return false;
  }
}
class TreeLeaf {
  /**
   * Creates a new TreeLeaf instance.
   * @param data The data to store in the leaf.
   * @param leaves Optional child leaves to add to the leaf.
   */
  constructor(data, leaves) {
    /**
     * The child leaves of this leaf.
     */
    __publicField(this, "leaves", []);
    this.data = data;
    this.leaves = leaves ?? [];
  }
  /**
   * Adds one or more child leaves to this leaf.
   * @param data The data to store in the new leaves.
   * @param datas Additional data to store in new leaves.
   * @returns The last leaf that was added.
   */
  push(data, ...datas) {
    let leaf = new TreeLeaf(data, []);
    this.leaves.push(leaf);
    for (const d of datas) {
      leaf = new TreeLeaf(d, []);
      this.leaves.push(leaf);
    }
    return leaf;
  }
  /**
   * Returns an array of the data stored in the child leaves of this leaf.
   */
  get children() {
    return this.leaves.map((l) => l.data);
  }
  /**
   * Returns the height of the tree rooted at this leaf.
   */
  get height() {
    return this.leaves.length > 0 ? 1 + Math.max(0, ...this.leaves.map((c) => c.height)) : 0;
  }
}
function preOrder(node, list) {
  list.push(node.data);
  for (const child of node.leaves) preOrder(child, list);
}
function postOrder(node, list) {
  for (const child of node.leaves) postOrder(child, list);
  list.push(node.data);
}
function inOrder(node, list) {
  if (node.leaves.length === 0) list.push(node.data);
  else {
    const n = node.leaves.length, nd = Math.round(n / 2);
    for (let i = 0; i < nd; i++)
      inOrder(node.leaves[i], list);
    list.push(node.data);
    for (let i = nd; i < n; i++)
      inOrder(node.leaves[i], list);
  }
}
function heightOrder(node, list, first = true) {
  if (first) list.push(node.data);
  list.push(...node.leaves.map((l) => l.data));
  for (const child of node.leaves) heightOrder(child, list, false);
}
class Tree {
  /**
   * Creates a new tree with the specified data as the root node.
   * @param data The data to be stored in the root node.
   */
  constructor(data) {
    /** The root node of the tree. */
    __publicField(this, "root");
    this.root = new TreeLeaf(data);
  }
  /**
   * Traverses the tree in the specified order and returns an array of the visited nodes' data.
   * @param order The order in which to traverse the tree. Defaults to "pre".
   * @returns An array of the visited nodes' data.
   */
  traverse(order = "pre") {
    const result = [];
    if (order === "pre") preOrder(this.root, result);
    else if (order === "post") postOrder(this.root, result);
    else if (order === "in") inOrder(this.root, result);
    else if (order === "height") heightOrder(this.root, result);
    return result;
  }
  /**
   * Searches the tree for a node with the specified data and returns the node if found.
   * @param value The data to search for.
   * @returns The node with the specified data, or undefined if not found.
   */
  search(value) {
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      if (node.data === value) return node;
      queue.push(...node.leaves);
    }
    return void 0;
  }
  /**
   * Gets the depth of the tree.
   * @returns The depth of the tree.
   */
  get depth() {
    return this.root.height;
  }
}
function isOfType(value) {
  return typeof value === typeof {};
}
function isRightArray(array) {
  return (array == null ? void 0 : array.length) > 0 && isOfType(array[0]);
}
function isArray2D(array) {
  return isRightArray(array) && (array == null ? void 0 : array.every((item) => isRightArray(item)));
}
function getLCP(str1, str2) {
  let lcp = 0;
  while (lcp < Math.min(str1.length, str2.length) && str1[lcp] === str2[lcp]) lcp++;
  return lcp;
}
function measureTime(func, ...params) {
  const timeStart = performance.now();
  func(...params);
  const timeEnd = performance.now();
  return timeEnd - timeStart;
}
function measure(_target, _propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args) {
    const timeStart = performance.now();
    const result = originalMethod.apply(this, args);
    const timeEnd = performance.now();
    console.log(`Execution time: ${timeEnd - timeStart} ms`);
    return result;
  };
  return descriptor;
}
function pipe(fn) {
  function run(a) {
    return fn(a);
  }
  run.pipe = (fn2) => {
    return pipe((a) => fn2(fn(a)));
  };
  return run;
}
export {
  CircularQueue,
  DimRed,
  FixedArray,
  Graph,
  GraphStructure,
  ListStructure,
  Matrix,
  Queue,
  Randomizer,
  Stack,
  TSNE,
  Tree,
  TreeLeaf,
  WeightedGraph,
  breadthFirstSearch,
  canberra,
  chebyshev,
  cosine,
  countingSort,
  depthFirstSearch,
  euclidean,
  euclideanSquared,
  getLCP,
  hamming,
  isArray2D,
  isOfType,
  isRightArray,
  kruskal,
  linearSpace,
  manhattan,
  measure,
  measureTime,
  mergeSortNum,
  mergeSortStr,
  pipe,
  quickSortNum,
  quickSortStr
};
