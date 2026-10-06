/**
 * Catches errors from a promise.
 * @param promise The promise to handle.
 * @param options Additional options for handling the promise.
 * @returns A tuple with either the error or the result of the promise.
 * @throws Will rethrow the error if it is not in the `errorsToCatch` array. Errors thrown by `transform` or `onSuccess` are not caught.
 * @example
 * ```ts
 * import { tryCatch } from '@danyalwe/tools'
 *
 * const [error, result] = await tryCatch(fetch('https://api.example.com'))
 * if (error) console.error(error)
 * else console.log(result)
 * ```
 * @group Utils
 */
export async function tryCatch<T = any, R = T, E extends new (...args: any[]) => Error = ErrorConstructor>(
  promise: Promise<T>,
  options?: {
    /** An optional array of error constructors to catch */
    errorsToCatch?: E[]
    /** An optional boolean to log the error message */
    logMessage?: boolean
    /** A callback function to execute on success */
    onSuccess?: (result: R) => void
    /** A callback function to execute on error */
    onError?: (error: InstanceType<E>) => void
    /** A function to transform the result of the promise */
    transform?: (data: T) => R
  },
): Promise<[undefined, R] | [InstanceType<E>]> {
  const { errorsToCatch, logMessage, onError, onSuccess, transform } = options ?? {}
  let data: T
  try {
    data = await promise
  }
  catch (error: any) {
    if (errorsToCatch === undefined || errorsToCatch.some(e => error instanceof e)) {
      if (logMessage) console.error('An error occurred while executing a promise:', error)
      onError?.(error)
      return [error]
    }
    throw error
  }

  // outside the try block, so a failing callback is not mistaken for a rejected promise
  const res = transform ? transform(data) : (data as unknown as R)
  onSuccess?.(res)
  return [undefined, res]
}
