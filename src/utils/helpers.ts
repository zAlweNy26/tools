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
 * @complexity O(min(a, b)) for strings of lengths a and b.
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
 * A method decorator that measures the execution time of a method and logs it to the console.
 * Works with both standard (TC39) decorators and legacy `experimentalDecorators`.
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
export function measure<This, Args extends unknown[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
): (this: This, ...args: Args) => Return
export function measure(target: unknown, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor
export function measure(target: unknown, contextOrKey: unknown, descriptor?: PropertyDescriptor) {
  const timed = (method: (...args: unknown[]) => unknown) => function (this: unknown, ...args: unknown[]) {
    const timeStart = performance.now()
    const result = method.apply(this, args)
    const timeEnd = performance.now()
    console.log(`Execution time: ${timeEnd - timeStart} ms`)
    return result
  }

  // legacy decorators receive (target, key, descriptor); standard ones receive (method, context)
  if (descriptor) {
    descriptor.value = timed(descriptor.value)
    return descriptor
  }
  return timed(target as (...args: unknown[]) => unknown)
}
