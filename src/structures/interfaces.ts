import { Matrix } from "./matrix"

export interface Structure {
    clear: () => void
    space: number
    hasRoom: boolean
    isEmpty: boolean
    isFull: boolean
}

export interface ListStructure<T> extends Structure {
    size: number
    peek: () => T | undefined
    items: readonly T[]
}

export abstract class GraphStructure<K, V> {
    protected map = new Map<K, V[]>()

    constructor(vertex: K) {
        this.map.set(vertex, [])
    }

    abstract addEdge(v1: K, v2: K): this

    abstract removeEdge(v1: K, v2: K): this

    abstract getEdges(vertex: K): readonly K[]

    abstract isAdjacent(v1: K, v2: K): boolean

    abstract removeVertex(vertex: K): this

    getPath(v1: K, v2: K) {
        const start = this.map.get(v1), end = this.map.get(v2)
        if (!start || !end) throw new Error('One or both the vertices could not be found')
        const visited = new Set<K>()
        const queue: [K, K[]][] = [[v1, []]]
        while (queue.length) {
            const [vertex, path] = queue.shift()!
            if (visited.has(vertex)) continue
            visited.add(vertex)
            const currentPath = [...path, vertex]
            if (vertex == v2) return currentPath as readonly K[]
            const edges = this.getEdges(vertex)
            for (const edge of edges) {
                queue.push([edge, currentPath])
            }
        }
        throw new Error('Path not found')
    }

    hasVertex(vertex: K) {
        return this.map.has(vertex)
    }

    get asMatrix() {
        const matrix: number[][] = []
        for (const vertex of this.vertices) {
            const edges = this.getEdges(vertex)
            const row = this.vertices.map(v => edges.includes(v) ? 1 : 0)
            matrix.push(row)
        }
        return Matrix.from(matrix)
    }

    get vertices() {
        return [...this.map.keys()] as readonly K[]
    }

    get size() {
        return this.map.size
    }
}