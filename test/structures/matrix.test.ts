import { describe, expect, test } from 'bun:test'
import { Matrix } from 'structures/matrix'

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
})
