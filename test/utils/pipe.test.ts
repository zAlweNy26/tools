import { pipe } from '@utils/pipe'
import { describe, expect, test } from 'bun:test'

describe('pipe', () => {
  test('creates a pipeline of functions', () => {
    const addOne = (x: number) => x + 1
    const double = (x: number) => x * 2

    const pipeline = pipe(addOne).pipe(double)
    expect(pipeline(3)).toBe(8)
  })

  test('works with a single function', () => {
    const uppercase = (s: string) => s.toUpperCase()
    const pipeline = pipe(uppercase)
    expect(pipeline('hello')).toBe('HELLO')
  })

  test('chains multiple functions', () => {
    const split = (s: string) => s.split(' ')
    const count = (arr: string[]) => arr.length

    const pipeline = pipe(split).pipe(count)
    expect(pipeline('a b c')).toBe(3)
  })
})
