import { getLCP } from "../utils"

/**
 * Sorts an array of numbers using the merge sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 */
export function mergeSortNum(array: number[]) {
    if (array.length <= 1) return array

    const middle = Math.floor(array.length / 2)
    
    let left = array.slice(0, middle)
    let right = array.slice(middle)

    left = mergeSortNum(left)
    right = mergeSortNum(right)

    return mergeNumbers(left, right)
}

/**
 * Sorts an array of strings using the merge sort algorithm.
 * @param array The array to be sorted.
 * @returns The sorted array.
 */
export function mergeSortStr(array: string[]) {
    if (array.length <= 1) return array

    const middle = Math.floor(array.length / 2)
    
    let left = array.slice(0, middle)
    let right = array.slice(middle)

    left = mergeSortStr(left)
    right = mergeSortStr(right)

    return mergeStrings(left, right)
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
        if (getLCP(left[0], right[0]) <= 0) {
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