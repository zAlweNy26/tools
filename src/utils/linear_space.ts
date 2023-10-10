/**
 * Returns an array of linearly spaced numbers between `start` and `end`.
 * @param start - The starting number of the sequence.
 * @param end - The ending number of the sequence.
 * @param num - The number of samples to generate. Defaults to the maximum of 1 and `end - start` rounded.
 * @returns An array of `num` linearly spaced numbers between `start` and `end`.
 */
export function linearSpace(start: number, end: number, num?: number) {
    if (!num) num = Math.max(Math.round(end - start) + 1, 1)
    if (num < 2) return num === 1 ? [start] : []
    const result = new Array<number>(num)
    num -= 1
    for (let i = num; i >= 0; --i) {
        result[i] = (i * end + (num - i) * start) / num
    }
    return result
}