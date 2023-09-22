export function numberMergeSort(array: number[]) {
    if (array.length <= 1) return array

    const middle = Math.floor(array.length / 2)
    
    let left = array.slice(0, middle)
    let right = array.slice(middle)

    left = numberMergeSort(left)
    right = numberMergeSort(right)

    const result = mergeNumbers(left, right)

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

export function stringMergeSort(array: string[]) {
    if (array.length <= 1) return array

    const middle = Math.floor(array.length / 2)
    
    let left = array.slice(0, middle)
    let right = array.slice(middle)

    left = stringMergeSort(left)
    right = stringMergeSort(right)

    const result = mergeStrings(left, right)

    return result
}

function mergeStrings(left: string[], right: string[]) {
    let result: string[] = []
    let i = 0, j = 0

    while (i < left.length && j < right.length) {
        const lcp = compareLCP(left[i], right[j])
        if (lcp > 0) {
            if (left[i][lcp] <= right[j][lcp]) {
                result.push(left[i])
                i++
            } else {
                result.push(right[j])
                j++
            }
        } else {
            if (left[i] <= right[j]) {
                result.push(left[i])
                i++
            } else {
                result.push(right[j])
                j++
            }
        }
    }

    result = [...result, ...left.slice(i), ...right.slice(j)]

    return result
}

function compareLCP(str1: string, str2: string) {
    let lcp = 0
    while (lcp < Math.min(str1.length, str2.length) && str1[lcp] === str2[lcp]) {
        lcp++
    }
    return lcp
}