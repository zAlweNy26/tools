import { Matrix } from '@structures/matrix'
import { Randomizer } from '@utils/randomizer'
import { describe, expect, test } from 'bun:test'

describe('Randomizer', () => {
  test('creates a new instance with a given seed', () => {
    const rng = new Randomizer(42)
    expect(rng.seed).toBe(42)
  })

  test('creates a new instance with Date.now() when no seed is given', () => {
    const rng = new Randomizer()
    expect(rng.seed).toBeGreaterThan(0)
  })

  test('can change the seed after construction', () => {
    const rng = new Randomizer(42)
    rng.seed = 100
    expect(rng.seed).toBe(100)
  })

  test('randomInt matches the MT19937 reference sequence', () => {
    const rng = new Randomizer(5489)
    expect([rng.randomInt(), rng.randomInt(), rng.randomInt(), rng.randomInt(), rng.randomInt()])
      .toEqual([3499211612, 581869302, 3890346734, 3586334585, 545404204])
  })

  test('randomInt matches the MT19937 reference after many regenerations', () => {
    const rng = new Randomizer(5489)
    let value = 0
    for (let i = 0; i < 10000; i++) value = rng.randomInt()
    expect(value).toBe(4123659995)
  })

  test('static shortcuts advance a single stream instead of repeating', () => {
    const values = Array.from({ length: 50 }, () => Randomizer.randomInt())
    expect(new Set(values).size).toBe(values.length)
  })

  test('random returns a float between 0 and 1', () => {
    const rng = new Randomizer(42)
    for (let i = 0; i < 100; i++) {
      const value = rng.random()
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThan(1)
    }
  })

  test('random is deterministic with the same seed', () => {
    const a = new Randomizer(42)
    const b = new Randomizer(42)
    for (let i = 0; i < 10; i++)
      expect(a.random()).toBe(b.random())
  })

  test('static random returns a float between 0 and 1', () => {
    const value = Randomizer.random()
    expect(value).toBeGreaterThanOrEqual(0)
    expect(value).toBeLessThan(1)
  })

  test('randomInt returns a non-negative integer', () => {
    const rng = new Randomizer(42)
    for (let i = 0; i < 100; i++) {
      const value = rng.randomInt()
      expect(Number.isInteger(value)).toBeTrue()
      expect(value).toBeGreaterThanOrEqual(0)
    }
  })

  test('static randomInt returns a non-negative integer', () => {
    const value = Randomizer.randomInt()
    expect(Number.isInteger(value)).toBeTrue()
    expect(value).toBeGreaterThanOrEqual(0)
  })

  test('randomGauss returns a number', () => {
    const rng = new Randomizer(42)
    const value = rng.randomGauss()
    expect(typeof value).toBe('number')
  })

  test('static randomGauss returns a number', () => {
    const value = Randomizer.randomGauss()
    expect(typeof value).toBe('number')
  })

  test('samples returns n rows from the data', () => {
    const rng = new Randomizer(42)
    const data = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
    const result = rng.samples(data, 3)
    expect(result).toHaveLength(3)
    for (const row of result)
      expect(row).toBeArrayOfSize(2)
  })

  test('samples works with Matrix input', () => {
    const rng = new Randomizer(42)
    const mat = Matrix.from([[1, 2], [3, 4], [5, 6], [7, 8]])
    const result = rng.samples(mat, 2)
    expect(result).toHaveLength(2)
    for (const row of result)
      expect(row).toBeArrayOfSize(2)
  })

  test('samples throws when n is greater than rows', () => {
    const rng = new Randomizer(42)
    const data = [[1, 2], [3, 4]]
    expect(() => rng.samples(data, 5)).toThrow('The number of samples can\'t be bigger than the number of rows of the matrix')
  })

  test('static samples returns n rows from the data', () => {
    const data = [[1, 2], [3, 4], [5, 6], [7, 8]]
    const result = Randomizer.samples(data, 2)
    expect(result).toHaveLength(2)
  })
})
