import { TSNE } from '@dim_red/tsne'
import { Matrix } from '@structures/matrix'
import { describe, expect, test } from 'bun:test'

describe('TSNE', () => {
  test('creates a new instance with given data and default params', () => {
    const data = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
    const tsne = new TSNE(data)
    expect(tsne.dimensionality).toBe(2)
    expect(tsne.metric).toBe('euclideanSquared')
  })

  test('creates a new instance with custom params', () => {
    const data = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
    const tsne = new TSNE(data, { perplexity: 4, epsilon: 5, dimensionality: 2, seed: 999 })
    expect(tsne.dimensionality).toBe(2)
    expect(tsne.seed).toBe(999)
    expect(tsne.parameters).toEqual({ perplexity: 4, epsilon: 5 })
  })

  test('creates a new instance from a Matrix', () => {
    const mat = Matrix.from([[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]])
    const tsne = new TSNE(mat)
    expect(tsne.dimensionality).toBe(2)
  })

  test('init does not throw and prepares the algorithm', () => {
    const data = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
    const tsne = new TSNE(data, { perplexity: 4 })
    expect(() => tsne.init()).not.toThrow()
  })

  test('init works with precomputed distances', () => {
    const distances = Matrix.from([
      [0, 1, 2],
      [1, 0, 3],
      [2, 3, 0],
    ])
    const tsne = new TSNE(distances, { metric: 'precomputed', perplexity: 2 })
    expect(() => tsne.init()).not.toThrow()
  })

  test('transform returns a Matrix with the reduced dimensions', () => {
    const data = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
    const tsne = new TSNE(data, { perplexity: 4, dimensionality: 2 })
    const result = tsne.transform(5)
    expect(result).toBeInstanceOf(Matrix)
    expect(result.rows).toBe(5)
    expect(result.cols).toBe(2)
  })

  test('generator yields intermediate projections at each iteration', () => {
    const data = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
    const tsne = new TSNE(data, { perplexity: 4, dimensionality: 2 })
    const gen = tsne.generator(5)
    let count = 0
    for (const intermediate of gen) {
      expect(intermediate).toBeInstanceOf(Matrix)
      expect(intermediate.rows).toBe(5)
      expect(intermediate.cols).toBe(2)
      count++
    }
    expect(count).toBe(5)
  })
})
