/**
 * Compares two values by their natural order using `<` and `>`, which works for numbers and strings.
 * It is the default comparator of every structure and sort that accepts one.
 * @param a The first value.
 * @param b The second value.
 * @returns -1 if `a` comes first, 1 if `b` comes first, 0 otherwise.
 * @example
 * ```ts
 * import { defaultCompare } from '@danyalwe/tools'
 *
 * defaultCompare(1, 2)       // -1
 * defaultCompare('b', 'a')   // 1
 * ```
 * @group Utils
 */
export function defaultCompare<T>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0
}
