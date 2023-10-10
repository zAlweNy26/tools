import { isRightArray } from "../utils"

/**
 * Sorts an array of numbers or strings using the merge sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 */
export function mergeSort(array: number[]): number[]
export function mergeSort(array: string[]): string[]
export function mergeSort(array: number[] | string[]) {
    if (array.length <= 1) return array

    const middle = Math.floor(array.length / 2)
    
    let left = array.slice(0, middle) as never
    let right = array.slice(middle) as never

    left = mergeSort(left) as never
    right = mergeSort(right) as never

    let result: number[] | string[] = []

    if (isRightArray<string>(array)) result = mergeStrings(left, right)
    else if (isRightArray<number>(array)) result = mergeNumbers(left, right)

    return result
}

function mergeNumbers(left: number[], right: number[]) {
    let result: number[] = []

    while (left.length > 0 && right.length > 0) {
        if (left[0] <= right[0]) {
            result.push(left[0])
            left.shift()
        } else {
            result.push(right[0])
            right.shift()
        }
    }

    result = [...result, ...left, ...right]

    return result
}

function mergeStrings(left: string[], right: string[]) {
    let result: string[] = []

    while (left.length > 0 && right.length > 0) {
        if (compareLCP(left[0], right[0]) <= 0) {
            result.push(left[0])
            left.shift()
        } else {
            result.push(right[0])
            right.shift()
        }
    }

    result = [...result, ...left, ...right]

    return result
}

function compareLCP(str1: string, str2: string) {
    let lcp = 0
    while (lcp < Math.min(str1.length, str2.length) && str1[lcp] === str2[lcp]) lcp++
    return lcp
}