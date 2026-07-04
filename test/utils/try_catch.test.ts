import { tryCatch } from '@utils/try_catch'
import { describe, expect, test } from 'bun:test'

describe('tryCatch', () => {
  test('returns [undefined, result] when promise resolves', async () => {
    const [error, result] = await tryCatch(Promise.resolve(42))
    expect(error).toBeUndefined()
    expect(result).toBe(42)
  })

  test('returns [error] when promise rejects', async () => {
    const [error, result] = await tryCatch(Promise.reject(new Error('oops')))
    expect(error).toBeInstanceOf(Error)
    expect((error as Error).message).toBe('oops')
    expect(result).toBeUndefined()
  })

  test('calls onSuccess callback on resolution', async () => {
    let called = false
    await tryCatch(Promise.resolve('done'), { onSuccess: () => { called = true } })
    expect(called).toBeTrue()
  })

  test('calls onError callback on rejection', async () => {
    let called = false
    await tryCatch(Promise.reject(new Error('fail')), { onError: () => { called = true } })
    expect(called).toBeTrue()
  })

  test('applies transform to the result', async () => {
    const [error, result] = await tryCatch(Promise.resolve(10), { transform: (n: number) => n * 2 })
    expect(error).toBeUndefined()
    expect(result).toBe(20)
  })

  test('catches only specified error types', async () => {
    class CustomError extends Error {
      constructor(message: string) {
        super(message)
        this.name = 'CustomError'
      }
    }

    const [error] = await tryCatch(Promise.reject(new CustomError('custom')), { errorsToCatch: [CustomError] })
    expect(error).toBeInstanceOf(CustomError)
  })

  test('rethrows errors not in errorsToCatch', async () => {
    class CustomError extends Error {
      constructor(message: string) {
        super(message)
        this.name = 'CustomError'
      }
    }

    expect(tryCatch(Promise.reject(new Error('generic')), { errorsToCatch: [CustomError] })).rejects.toThrow('generic')
  })
})
