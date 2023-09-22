export function isNumberArray(array: unknown[]): array is number[] {
    return array.every(item => typeof item === 'number')
}

export function isStringArray(array: unknown[]): array is string[] {
    return array.every(item => typeof item === 'string')
}

export function isArray2D(array: unknown[][]): array is unknown[][] {
    if (!Array.isArray(array)) return false
    return array.every(item => Array.isArray(item))
}

export function measureTime<Args extends unknown[], Return>(
    func: (...params: Args) => Return, 
    ...params: Args
): number {
    const timeStart = performance.now()
    func(...params)
    const timeEnd = performance.now()
    return timeEnd - timeStart
}