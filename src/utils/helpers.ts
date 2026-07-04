/**
 * Type guard function that checks if a value is of a certain type.
 * @param value The value to check the type of.
 * @returns A boolean indicating whether the value is of the specified type.
 * @template T The type to check for.
 * @example
 * ```ts
 * import { isOfType } from '@danyalwe/tools'
 *
 * isOfType<string>('hello') // true
 * isOfType<number>('hello') // false
 * ```
 * @group Utils
 */
export function isOfType<T>(value: unknown): value is T {
  return typeof value === typeof ({} as T)
}

/**
 * Type guard function that checks if an array is of type T[].
 * @param array The array to check.
 * @returns A boolean indicating whether the array is of the specified type.
 * @template T The type of the elements to check for.
 * @example
 * ```ts
 * import { isRightArray } from '@danyalwe/tools'
 *
 * isRightArray<number>([1, 2, 3]) // true
 * isRightArray<number>(['a', 'b']) // false
 * ```
 * @group Utils
 */
export function isRightArray<T>(array: unknown[]): array is T[] {
  return array?.length > 0 && isOfType<T>(array[0])
}

/**
 * Type guard function that checks if an array is a 2D array of a specific type.
 * @param array The array to check.
 * @returns  boolean indicating whether the 2D array is of the specified type.
 * @template T The type of the elements to check for.
 * @example
 * ```ts
 * import { isArray2D } from '@danyalwe/tools'
 *
 * isArray2D<number>([[1, 2], [3, 4]]) // true
 * isArray2D<number>([[1, 2], ['a', 'b']]) // false
 * ```
 * @group Utils
 */
export function isArray2D<T>(array: unknown[][]): array is T[][] {
  return isRightArray(array) && array?.every(item => isRightArray(item))
}

/**
 * Returns the length of the longest common prefix between two strings.
 * @param str1 The first string to compare.
 * @param str2 The second string to compare.
 * @returns The length of the longest common prefix between the two strings.
 * @example
 * ```ts
 * import { getLCP } from '@danyalwe/tools'
 *
 * getLCP('hello', 'help')   // 3
 * getLCP('abc', 'xyz')      // 0
 * ```
 * @group Utils
 */
export function getLCP(str1: string, str2: string) {
  let lcp = 0
  while (lcp < Math.min(str1.length, str2.length) && str1[lcp] === str2[lcp]) lcp++
  return lcp
}

/**
 * Measures the time it takes for a function to execute.
 * @param func The function to measure the execution time of.
 * @param params The parameters to pass to the function.
 * @returns The time it took for the function to execute, in milliseconds.
 * @example
 * ```ts
 * import { measureTime } from '@danyalwe/tools'
 *
 * const ms = measureTime(() => {
 *   let sum = 0
 *   for (let i = 0; i < 1e6; i++) sum += i
 * })
 * console.log(`Took ${ms}ms`)
 * ```
 * @group Utils
 */
export function measureTime<Args extends unknown[], Return>(
  func: (...params: Args) => Return,
  ...params: Args
): number {
  const timeStart = performance.now()
  func(...params)
  const timeEnd = performance.now()
  return timeEnd - timeStart
}

/**
 * A decorator function that measures the execution time of a method and logs it to the console.
 * @param _target The target object.
 * @param _propertyKey The name of the property.
 * @param descriptor The property descriptor.
 * @returns The updated property descriptor.
 * @example
 * ```ts
 * import { measure } from '@danyalwe/tools'
 *
 * class Example {
 *   @measure
 *   heavyComputation() {
 *     // some heavy work
 *   }
 * }
 * ```
 * @group Utils
 */
export function measure<T>(_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value as (...args: unknown[]) => T

  descriptor.value = function (...args: unknown[]): T {
    const timeStart = performance.now()
    const result = originalMethod.apply(this, args)
    const timeEnd = performance.now()
    console.log(`Execution time: ${timeEnd - timeStart} ms`)
    return result
  }

  return descriptor
}
