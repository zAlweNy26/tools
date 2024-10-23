/**
 * Interface for data structures.
 */
export interface Structure {
    /**
     * Clears the structure.
     */
    clear(): void
    /**
     * The current number of elements in the structure.
     */
    size(): number
}

/**
 * Abstract class representing a list structure.
 * @template T The type of elements held in the list.
 */
export abstract class ListStructure<T> implements Structure {
    protected _size: number
    protected _data: T[] = []

    constructor(size: number | T[]) {
        if (typeof size === 'number') {
            this._size = size
            this._data = Array.from({ length: size })
        } else {
            this._size = size.length
            this._data = [...size]
        }
    }

    /**
     * The available space in the structure.
     */
    abstract get space(): number
    /**
     * Indicates whether the structure has room for more elements.
     */
    abstract get hasRoom(): boolean
    /**
     * Indicates whether the structure is empty.
     */
    abstract get isEmpty(): boolean
    /**
     * Indicates whether the structure is full.
     */
    abstract get isFull(): boolean
    /**
     * Gets the next element in the list without removing it.
     */
    abstract peek(): T | undefined

    /**
     * An array of all the elements in the list.
     */
    get items() {
        return this._data.filter<T>(v => v !== undefined)
    }

    /**
     * Clears the list.
     */
    clear() {
        this._data = []
        return this
    }

    /**
     * The current number of elements in the list.
     */
    size() {
        return this._size
    }
}

/**
 * Abstract class representing a graph structure.
 * @template N The type of the nodes in the graph.
 * @template E The type of the values associated with the nodes.
 */
export abstract class GraphStructure<N, E> implements Structure {
    protected map = new Map<N, E[]>()

    /**
     * Creates a new graph structure with the given node.
     * @param node The first node to add to the graph.
     */
    constructor(node: N) {
        this.map.set(node, [])
    }

    /**
     * Clears the graph by removing all nodes and edges.
     */
    clear() {
        this.map.clear()
    }

    /**
     * The current number of elements in the graph.
     */
    size() {
        return this.map.size
    }

    /**
     * Adds an edge between two nodes in the graph.
     * @param v1 The first node.
     * @param v2 The second node.
     * @returns The graph structure instance.
     */
    abstract addEdge(v1: N, v2: N): this

    /**
     * Removes an edge between two nodes in the graph.
     * @param v1 The first node.
     * @param v2 The second node.
     * @returns The graph structure instance.
     */
    abstract removeEdge(v1: N, v2: N): this

    /**
     * Returns an array of nodes adjacent to the given node.
     * @param node The node to get the adjacent nodes for.
     * @returns An array of adjacent nodes.
     */
    abstract getEdges(node: N): N[]

    /**
     * Returns a boolean indicating if two nodes are adjacent in the graph.
     * @param v1 The first node.
     * @param v2 The second node.
     * @returns True if the nodes are adjacent, false otherwise.
     */
    abstract isAdjacent(v1: N, v2: N): boolean

    /**
     * Removes a node from the graph.
     * @param node The node to remove.
     * @returns The graph structure instance.
     */
    abstract removeNode(node: N): this

    abstract hasCycle(): boolean

    /**
     * Returns the shortest path between two nodes in the graph.
     * @param v1 The starting node.
     * @param v2 The ending node.
     * @throws An error if the path could not be found.
     */
    getPath(v1: N, v2: N) {
        const start = this.map.get(v1), end = this.map.get(v2)
        if (!start || !end) throw new Error('One or both the nodes could not be found')
        const visited = new Set<N>()
        const queue: [N, N[]][] = [[v1, []]]
        while (queue.length) {
            const [node, path] = queue.shift()!
            if (visited.has(node)) continue
            visited.add(node)
            const currentPath = [...path, node]
            if (node == v2) return currentPath
            const edges = this.getEdges(node)
            for (const edge of edges) {
                queue.push([edge, currentPath])
            }
        }
        if (queue.length > 1) return queue
        throw new Error('Path not found')
    }

    /**
     * Returns true if the graph contains the given node, false otherwise.
     * @param node The node to check for.
     */
    hasNode(node: N) {
        return this.map.has(node)
    }

    /**
     * Returns an array of nodes in the graph.
     */
    get nodes() {
        return [...this.map.keys()]
    }
}