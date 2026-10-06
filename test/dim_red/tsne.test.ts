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

  test('separates two well-separated clusters', () => {
    const cluster = (offset: number) => Array.from({ length: 20 }, (_, i) => [offset + (i % 5) * 0.1, offset + Math.floor(i / 5) * 0.1])
    const data = [...cluster(0), ...cluster(100)]
    const result = new TSNE(data, { perplexity: 10 }).transform(500)
    const rows = Array.from({ length: result.rows }, (_, i) => result.getRow(i))
    const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1])
    const centroid = (pts: number[][]) => [0, 1].map(d => pts.reduce((s, p) => s + p[d], 0) / pts.length)
    const [a, b] = [rows.slice(0, 20), rows.slice(20)]
    const [ca, cb] = [centroid(a), centroid(b)]
    const spread = Math.max(...a.map(p => dist(p, ca)), ...b.map(p => dist(p, cb)))
    expect(rows.flat().every(Number.isFinite)).toBeTrue()
    expect(dist(ca, cb)).toBeGreaterThan(2 * spread)
  })

  test('stays finite when distances are huge', () => {
    const tsne = new TSNE([[0], [1e10], [2e10], [3e10]], { perplexity: 2 })
    expect(tsne.transform(50).getRow(0).every(Number.isFinite)).toBeTrue()
  })
})
