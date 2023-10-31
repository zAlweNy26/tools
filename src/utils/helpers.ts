/**
 * Type guard function that checks if a value is of a certain type.
 * @param value - The value to check the type of.
 * @returns A boolean indicating whether the value is of the specified type.
 * @template T - The type to check for.
 */
export function isOfType<T>(value: unknown): value is T {
    return typeof value === typeof ({} as T)
}

/**
 * Type guard function that checks if an array is of type T[].
 * @param array - The array to check.
 * @returns A boolean indicating whether the array is of the specified type.
 * @template T - The type of the elements to check for.
 */
export function isRightArray<T>(array: unknown[]): array is T[] {
    return array?.length > 0 && isOfType<T>(array[0])
}

/**
 * Type guard function that checks if an array is a 2D array of a specific type.
 * @param array - The array to check.
 * @returns  boolean indicating whether the 2D array is of the specified type.
 * @template T - The type of the elements to check for.
 */
export function isArray2D<T>(array: unknown[][]): array is T[][] {
    return isRightArray(array) && array?.every(item => isRightArray(item))
}

/**
 * Returns the length of the longest common prefix between two strings.
 * @param str1 - The first string to compare.
 * @param str2 - The second string to compare.
 * @returns The length of the longest common prefix between the two strings.
 */
export function getLCP(str1: string, str2: string) {
    let lcp = 0
    while (lcp < Math.min(str1.length, str2.length) && str1[lcp] === str2[lcp]) lcp++
    return lcp
}

/**
 * Measures the time it takes for a function to execute.
 * @param func - The function to measure the execution time of.
 * @param params - The parameters to pass to the function.
 * @returns The time it took for the function to execute, in milliseconds.
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
 * @param _target - The target object.
 * @param _propertyKey - The name of the property.
 * @param descriptor - The property descriptor.
 * @returns The updated property descriptor.
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
