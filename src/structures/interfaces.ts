export interface Structure {
    clear: () => void
    space: number
    hasRoom: boolean
    isEmpty: boolean
    isFull: boolean
}

export interface List<T> extends Structure {
    peek: () => T | undefined
    items: readonly T[]
}