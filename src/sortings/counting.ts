export function countingSort(array: number[]) {
    if (array.length <= 1) return array

    const max = Math.max(...array)
    const count = Array.from({ length: max + 1 }, () => 0)

    array.forEach(element => count[element]++)

    for (let i = 1; i < count.length; i++) count[i] += count[i - 1]

    const output = Array.from<number>({ length: array.length });
    for (let i = array.length - 1; i >= 0; i--) {
        output[count[array[i]] - 1] = array[i]
        count[array[i]]--
    }

    return output
}

