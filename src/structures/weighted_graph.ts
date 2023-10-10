import { GraphStructure } from "./interfaces"

export type Weight = number
export type Edge<V> = [V, Weight]

/**
 * A weighted graph data structure.
 * @template K The type of the vertices in the graph.
 */
export class WeightedGraph<K> extends GraphStructure<K, Edge<K>> {
    /**
     * Adds an edge between two vertices with an optional weight.
     * @param v1 The first vertex.
     * @param v2 The second vertex.
     * @param weight The weight of the edge (default is 0).
     * @throws An error if the first vertex is not found or if the edge already exists.
     * @returns The updated weighted graph.
     */
    addEdge(v1: K, v2: K, weight = 0) {
        const list = this.map.get(v1)
        if (list) {
            list.push([v2, weight])
            const edge = this.map.get(v2)
            if (edge?.map(e => e[0])?.includes(v1)) throw new Error('Edge already present')
            else if (edge) edge.push([v1, weight]) 
            else this.map.set(v2, [[v1, weight]])
        } else throw new Error('First vertex not found')
        return this
    }

    removeEdge(v1: K, v2: K) {
        const list = this.map.get(v1)
        if (list) {
            const index = list.findIndex(e => e[0] == v2)
            if (index != -1) list.splice(index, 1)
            else throw new Error('Edge not found')
        
            const edge = this.map.get(v2)
            if (edge) {
                const index = edge.findIndex(e => e[0] == v1)
                if (index != -1) edge.splice(index, 1)
            }
        } else throw new Error('Vertex not found')
        return this
    }

    removeVertex(vertex: K) {
        if (this.map.delete(vertex)) {
            for (const list of this.map.values()) {
                const index = list.findIndex(e => e[0] == vertex)
                if (index != -1) list.splice(index, 1)
            }
        } else throw new Error('Vertex not found')
        return this
    }

    getEdges(vertex: K) {
        const list = this.map.get(vertex)
        if (!list) throw new Error('Vertex not found')
        return [...list.map(e => e[0])] as readonly K[]
    }

    /**
     * Returns the weight of the edge between the first vertex and the second vertex,
     * and optionally additional vertices if provided.
     * @param v1 The first vertex.
     * @param v2 The second vertex.
     * @param vn Additional vertices (optional).
     * @returns The weight of the edge between the vertices.
     * @throws Error if the first or second vertex is not found.
     */
    getWeight(v1: K, v2: K, ...vn: K[]) {
        const list = this.map.get(v1)
        if (!list) throw new Error('First vertex not found')
        const edge = list.find(e => e[0] == v2)
        if (!edge) throw new Error('Second vertex not found')
        let weight = edge[1]
        if (vn.length) weight += this.getWeight(v2, vn[0], ...vn.slice(1))
        return weight
    }

    isAdjacent(v1: K, v2: K) {
        const list = this.map.get(v1)
        if (!list) throw new Error('First vertex not found')
        return list.map(e => e[0]).includes(v2)
    }
}