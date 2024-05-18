import { Matrix } from "./matrix"

/**
 * Interface for data structures.
 */
export interface Structure {
    /**
     * Clears the structure.
     */
    clear: () => void
    /**
     * The available space in the structure.
     */
    space: number
    /**
     * Indicates whether the structure has room for more elements.
     */
    hasRoom: boolean
    /**
     * Indicates whether the structure is empty.
     */
    isEmpty: boolean
    /**
     * Indicates whether the structure is full.
     */
    isFull: boolean
}

/**
 * Interface for a list data structure.
 * @template T The type of elements held in the list.
 */
export interface ListStructure<T> extends Structure {
    /**
     * The number of elements in the list.
     */
    size: number
    /**
     * Returns the first element in the list without removing it.
     * @returns The first element in the list, or undefined if the list is empty.
     */
    peek: () => T | undefined
    /**
     * An array of all the elements in the list.
     */
    items: readonly T[]
}

/**
 * Abstract class representing a graph structure.
 * @template K The type of the vertices in the graph.
 * @template V The type of the values associated with the vertices.
 */
export abstract class GraphStructure<K, V> {
    protected map = new Map<K, V[]>()

    /**
     * Creates a new graph structure with the given vertex.
     * @param vertex The vertex to add to the graph.
     */
    constructor(vertex: K) {
        this.map.set(vertex, [])
    }

    /**
     * Adds an edge between two vertices in the graph.
     * @param v1 The first vertex.
     * @param v2 The second vertex.
     * @returns The graph structure instance.
     */
    abstract addEdge(v1: K, v2: K): this

    /**
     * Removes an edge between two vertices in the graph.
     * @param v1 The first vertex.
     * @param v2 The second vertex.
     * @returns The graph structure instance.
     */
    abstract removeEdge(v1: K, v2: K): this

    /**
     * Returns an array of vertices adjacent to the given vertex.
     * @param vertex The vertex to get the adjacent vertices for.
     * @returns An array of adjacent vertices.
     */
    abstract getEdges(vertex: K): readonly K[]

    /**
     * Returns a boolean indicating if two vertices are adjacent in the graph.
     * @param v1 The first vertex.
     * @param v2 The second vertex.
     * @returns True if the vertices are adjacent, false otherwise.
     */
    abstract isAdjacent(v1: K, v2: K): boolean

    /**
     * Removes a vertex from the graph.
     * @param vertex The vertex to remove.
     * @returns The graph structure instance.
     */
    abstract removeVertex(vertex: K): this

    /**
     * Returns the shortest path between two vertices in the graph.
     * @param v1 The starting vertex.
     * @param v2 The ending vertex.
     * @returns An array of vertices representing the shortest path.
     * @throws An error if the path could not be found.
     */
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

    /**
     * Returns true if the graph contains the given vertex, false otherwise.
     * @param vertex The vertex to check for.
     * @returns True if the graph contains the vertex, false otherwise.
     */
    hasVertex(vertex: K) {
        return this.map.has(vertex)
    }

    /**
     * Returns the graph as an adjacency matrix.
     * @returns A matrix representing the graph.
     */
    get asMatrix() {
        const matrix: number[][] = []
        for (const vertex of this.vertices) {
            const edges = this.getEdges(vertex)
            const row = this.vertices.map(v => edges.includes(v) ? 1 : 0)
            matrix.push(row)
        }
        return Matrix.from(matrix)
    }

    /**
     * Returns an array of vertices in the graph.
     * @returns An array of vertices.
     */
    get vertices() {
        return [...this.map.keys()] as readonly K[]
    }

    /**
     * Returns the number of vertices in the graph.
     * @returns The number of vertices in the graph.
     */
    get size() {
        return this.map.size
    }
}