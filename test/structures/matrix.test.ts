import { Matrix } from '@structures/matrix'
import { describe, expect, test } from 'bun:test'

describe('Matrix', () => {
  test('constructor and get/set', () => {
    const m = new Matrix(2, 3, 0)
    expect(m.rows).toBe(2)
    expect(m.cols).toBe(3)
    expect(m.size()).toBe(6)
    expect(m.get(0, 0)).toBe(0)
    expect(m.set(1, 2, 5)).toBe(5)
    expect(m.get(1, 2)).toBe(5)
  })

  test('identity', () => {
    const m = new Matrix(3, 3, 'identity')
    expect(m.get(0, 0)).toBe(1)
    expect(m.get(0, 1)).toBe(0)
    expect(m.get(1, 1)).toBe(1)
  })

  test('transpose', () => {
    const m = new Matrix(2, 3, (r, c) => r * 3 + c)
    const t = m.transpose()
    expect(t.rows).toBe(3)
    expect(t.cols).toBe(2)
    expect(t.get(0, 0)).toBe(m.get(0, 0))
    expect(t.get(0, 1)).toBe(m.get(1, 0))
    expect(t.get(2, 1)).toBe(m.get(1, 2))
  })

  test('dot product', () => {
    const a = Matrix.from([[1, 2], [3, 4]])
    const b = Matrix.from([[5, 6], [7, 8]])
    const c = a.dot(b)
    expect(c.get(0, 0)).toBe(19)
    expect(c.get(0, 1)).toBe(22)
    expect(c.get(1, 0)).toBe(43)
    expect(c.get(1, 1)).toBe(50)
  })

  test('determinant', () => {
    const m = Matrix.from([[1, 2], [3, 4]])
    expect(m.det()).toBe(-2)
  })

  test('inverse', () => {
    const m = Matrix.from([[4, 7], [2, 6]])
    const inv = m.inverse()
    expect(inv.get(0, 0)).toBeCloseTo(0.6)
    expect(inv.get(0, 1)).toBeCloseTo(-0.7)
    expect(inv.get(1, 0)).toBeCloseTo(-0.2)
    expect(inv.get(1, 1)).toBeCloseTo(0.4)
  })

  test('meanCols divides by rows', () => {
    const m = Matrix.from([[1, 2, 3], [4, 5, 6]])
    const means = m.meanCols
    expect(means[0]).toBe(2.5)
    expect(means[1]).toBe(3.5)
  })

  test('meanRows', () => {
    const m = Matrix.from([[1, 2, 3], [4, 5, 6]])
    const means = m.meanRows
    expect(means[0]).toBe(2)
    expect(means[1]).toBe(5)
  })

  test('sum', () => {
    const m = Matrix.from([[1, 2], [3, 4]])
    expect(m.sum).toBe(10)
  })

  test('diagonal', () => {
    const m = Matrix.from([[1, 2, 3], [4, 5, 6]])
    expect(m.diagonal).toEqual([1, 5])
  })

  test('clone', () => {
    const m = Matrix.from([[1, 2], [3, 4]])
    const c = m.clone()
    c.set(0, 0, 99)
    expect(m.get(0, 0)).toBe(1)
    expect(c.get(0, 0)).toBe(99)
  })

  test('from 1D array row', () => {
    const m = Matrix.from([1, 2, 3], 'row')
    expect(m.rows).toBe(3)
    expect(m.cols).toBe(1)
  })

  test('from 1D array col', () => {
    const m = Matrix.from([1, 2, 3], 'col')
    expect(m.rows).toBe(1)
    expect(m.cols).toBe(3)
  })

  test('from 1D array diag', () => {
    const m = Matrix.from([1, 2, 3], 'diag')
    expect(m.rows).toBe(3)
    expect(m.cols).toBe(3)
    expect(m.get(1, 1)).toBe(2)
    expect(m.get(0, 1)).toBe(0)
  })

  test('from throws for mismatched column lengths', () => {
    expect(() => Matrix.from([[1, 2], [3]])).toThrow('Not all the columns of the matrix have the same length')
  })

  test('from throws for empty 2D array', () => {
    expect(() => Matrix.from([])).toThrow('2D array is empty')
  })

  test('from throws for empty 1D array', () => {
    expect(() => Matrix.from([], 'row')).toThrow('Array is empty')
  })

  test('inverse throws for singular matrix', () => {
    const m = Matrix.from([[1, 2], [2, 4]])
    expect(() => m.inverse()).toThrow('Matrix not invertible due to the determinant equal to zero')
  })

  test('dot throws for mismatched dimensions', () => {
    const a = new Matrix(2, 2, 1)
    const b = new Matrix(3, 2, 1)
    expect(() => a.dot(b)).toThrow('The number of columns of the current matrix is different from the number of rows of the passed matrix')
  })

  test('clear', () => {
    const m = new Matrix(2, 2, 1)
    m.clear()
    expect(m.get(0, 0)).toBeUndefined()
  })

  test('isEmpty and isFull', () => {
    const m = new Matrix(2, 2)
    expect(m.isEmpty).toBeTrue()
    expect(m.isFull).toBeFalse()
    m.set(0, 0, 1)
    m.set(0, 1, 2)
    m.set(1, 0, 3)
    m.set(1, 1, 4)
    expect(m.isFull).toBeTrue()
  })

  test('concat horizontal', () => {
    const a = Matrix.from([[1, 2], [3, 4]])
    const b = Matrix.from([[5, 6], [7, 8]])
    const c = a.concat(b, 'horizontal')
    expect(c.rows).toBe(2)
    expect(c.cols).toBe(4)
    expect(c.get(0, 0)).toBe(1)
    expect(c.get(0, 2)).toBe(5)
    expect(c.get(1, 3)).toBe(8)
  })

  test('concat vertical', () => {
    const a = Matrix.from([[1, 2], [3, 4]])
    const b = Matrix.from([[5, 6], [7, 8]])
    const c = a.concat(b, 'vertical')
    expect(c.rows).toBe(4)
    expect(c.cols).toBe(2)
    expect(c.get(0, 0)).toBe(1)
    expect(c.get(2, 0)).toBe(5)
    expect(c.get(3, 1)).toBe(8)
  })

  test('concat horizontal throws for mismatched rows', () => {
    const a = new Matrix(2, 2, 0)
    const b = new Matrix(3, 2, 0)
    expect(() => a.concat(b, 'horizontal')).toThrow('The matrices need to have the same number of rows')
  })

  test('concat vertical throws for mismatched cols', () => {
    const a = new Matrix(2, 2, 0)
    const b = new Matrix(2, 3, 0)
    expect(() => a.concat(b, 'vertical')).toThrow('The matrices need to have the same number of rows')
  })

  test('concat diagonal', () => {
    const a = Matrix.from([[1, 2], [3, 4]])
    const b = Matrix.from([[5, 6], [7, 8]])
    const c = a.concat(b, 'diagonal')
    expect(c.rows).toBe(4)
    expect(c.cols).toBe(4)
    // top-left
    expect(c.get(0, 0)).toBe(1)
    expect(c.get(0, 1)).toBe(2)
    expect(c.get(1, 0)).toBe(3)
    expect(c.get(1, 1)).toBe(4)
    // bottom-right
    expect(c.get(2, 2)).toBe(5)
    expect(c.get(2, 3)).toBe(6)
    expect(c.get(3, 2)).toBe(7)
    expect(c.get(3, 3)).toBe(8)
    // zero-fills
    expect(c.get(0, 2)).toBe(0)
    expect(c.get(0, 3)).toBe(0)
    expect(c.get(1, 2)).toBe(0)
    expect(c.get(1, 3)).toBe(0)
    expect(c.get(2, 0)).toBe(0)
    expect(c.get(2, 1)).toBe(0)
    expect(c.get(3, 0)).toBe(0)
    expect(c.get(3, 1)).toBe(0)
  })

  test('concat diagonal non-square', () => {
    const a = Matrix.from([[1, 2, 3], [4, 5, 6]])
    const b = Matrix.from([[7, 8]])
    const c = a.concat(b, 'diagonal')
    expect(c.rows).toBe(3)
    expect(c.cols).toBe(5)
    expect(c.get(0, 0)).toBe(1)
    expect(c.get(1, 2)).toBe(6)
    expect(c.get(2, 3)).toBe(7)
    expect(c.get(2, 4)).toBe(8)
    expect(c.get(0, 3)).toBe(0)
    expect(c.get(2, 0)).toBe(0)
  })

  test('update', () => {
    const m = Matrix.from([[1, 2], [3, 4]])
    const val = m.update(0, 0, old => old * 10)
    expect(val).toBe(10)
    expect(m.get(0, 0)).toBe(10)
  })

  test('operate', () => {
    const a = Matrix.from([[1, 2], [3, 4]])
    const b = Matrix.from([[5, 6], [7, 8]])
    const res = a.operate(b, (l, r) => l + r)
    expect(a.get(0, 0)).toBe(6)
    expect(res[0][0]).toBe(6)
    expect(res[1][1]).toBe(12)
  })

  test('operate with 2D array', () => {
    const a = Matrix.from([[1, 2], [3, 4]])
    a.operate([[5, 6], [7, 8]], (l, r) => l * r)
    expect(a.get(0, 0)).toBe(5)
    expect(a.get(1, 1)).toBe(32)
  })

  test('operate throws for mismatched dimensions', () => {
    const a = new Matrix(2, 2, 0)
    const b = new Matrix(3, 2, 0)
    expect(() => a.operate(b, (l, r) => l + r)).toThrow('The number of columns of the current matrix is different from the number of rows of the passed matrix')
  })

  test('swapRows', () => {
    const m = Matrix.from([[1, 2], [3, 4]])
    m.swapRows(0, 1)
    expect(m.get(0, 0)).toBe(3)
    expect(m.get(1, 0)).toBe(1)
  })

  test('setRow', () => {
    const m = Matrix.from([[1, 2], [3, 4]])
    m.setRow(0, [9, 9])
    expect(m.getRow(0)).toEqual([9, 9])
  })

  test('setRow throws for out of bounds row', () => {
    const m = new Matrix(2, 2, 0)
    expect(() => m.setRow(5, [1, 2])).toThrow('The passed index exceeds the total number of rows in the matrix')
  })

  test('setRow throws for too many values', () => {
    const m = new Matrix(2, 2, 0)
    expect(() => m.setRow(0, [1, 2, 3])).toThrow('The passed values exceed the total number of columns in the matrix')
  })

  test('getRow', () => {
    const m = Matrix.from([[1, 2], [3, 4]])
    expect(m.getRow(1)).toEqual([3, 4])
  })

  test('getRow throws for out of bounds', () => {
    const m = new Matrix(2, 2, 0)
    expect(() => m.getRow(5)).toThrow('The passed index exceeds the total number of rows in the matrix')
  })

  test('swapCols', () => {
    const m = Matrix.from([[1, 2], [3, 4]])
    m.swapCols(0, 1)
    expect(m.get(0, 0)).toBe(2)
    expect(m.get(0, 1)).toBe(1)
  })

  test('setCol', () => {
    const m = Matrix.from([[1, 2], [3, 4]])
    m.setCol(0, [5, 6])
    expect(m.getCol(0)).toEqual([5, 6])
  })

  test('setCol throws for out of bounds col', () => {
    const m = new Matrix(2, 2, 0)
    expect(() => m.setCol(5, [1, 2])).toThrow('The passed index exceeds the total number of columns in the matrix')
  })

  test('setCol throws for too many values', () => {
    const m = new Matrix(2, 2, 0)
    expect(() => m.setCol(0, [1, 2, 3])).toThrow('The passed values exceed the total number of rows in the matrix')
  })

  test('getCol', () => {
    const m = Matrix.from([[1, 2], [3, 4]])
    expect(m.getCol(1)).toEqual([2, 4])
  })

  test('getCol throws for out of bounds', () => {
    const m = new Matrix(2, 2, 0)
    expect(() => m.getCol(5)).toThrow('The passed index exceeds the total number of columns in the matrix')
  })

  test('iterateRows', () => {
    const m = Matrix.from([[1, 2], [3, 4]])
    const rows = [...m.iterateRows()]
    expect(rows).toEqual([[1, 2], [3, 4]])
  })

  test('iterateCols', () => {
    const m = Matrix.from([[1, 2], [3, 4]])
    const cols = [...m.iterateCols()]
    expect(cols).toEqual([[1, 3], [2, 4]])
  })

  test('Symbol.iterator', () => {
    const m = Matrix.from([[1, 2], [3, 4]])
    const rows = [...m]
    expect(rows).toEqual([[1, 2], [3, 4]])
  })

  test('sub', () => {
    const m = Matrix.from([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    const s = m.sub(0, 0)
    expect(s.rows).toBe(2)
    expect(s.cols).toBe(2)
    expect(s.get(0, 0)).toBe(5)
    expect(s.get(1, 1)).toBe(9)
  })

  test('space getter', () => {
    const m = new Matrix(2, 3)
    expect(m.space).toBe(6)
    m.set(0, 0, 1)
    expect(m.space).toBe(5)
    m.set(0, 1, 2)
    m.set(0, 2, 3)
    m.set(1, 0, 4)
    m.set(1, 1, 5)
    m.set(1, 2, 6)
    expect(m.space).toBe(0)
  })

  test('hasRoom getter', () => {
    const m = new Matrix(2, 2)
    expect(m.hasRoom).toBeTrue()
    m.set(0, 0, 1)
    m.set(0, 1, 2)
    m.set(1, 0, 3)
    m.set(1, 1, 4)
    expect(m.hasRoom).toBeFalse()
  })
})
