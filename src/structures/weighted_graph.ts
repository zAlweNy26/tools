import { GraphStructure } from "./interfaces"

export type Weight = number
export type Edge<V> = [V, Weight]

/**
 * A weighted graph data structure.
 * @template N The type of the nodes in the graph.
 */
export class WeightedGraph<N> extends GraphStructure<N, Edge<N>> {
    /**
     * Adds an edge between two nodes with an optional weight.
     * @param v1 The first node.
     * @param v2 The second node.
     * @param weight The weight of the edge (default is 0).
     * @throws An error if the first node is not found or if the edge already exists.
     * @returns The updated weighted graph.
     */
    addEdge(v1: N, v2: N, weight = 0) {
        const list = this.map.get(v1)
        if (list) {
            list.push([v2, weight])
            const edge = this.map.get(v2)
            if (edge?.map(e => e[0])?.includes(v1)) throw new Error('Edge already present')
            else if (edge) edge.push([v1, weight]) 
            else this.map.set(v2, [[v1, weight]])
        } else throw new Error('First node not found')
        return this
    }

    removeEdge(v1: N, v2: N) {
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
        } else throw new Error('Node not found')
        return this
    }

    removeNode(node: N) {
        if (this.map.delete(node)) {
            for (const list of this.map.values()) {
                const index = list.findIndex(e => e[0] == node)
                if (index != -1) list.splice(index, 1)
            }
        } else throw new Error('Node not found')
        return this
    }

    getEdges(node: N) {
        const list = this.map.get(node)
        if (!list) throw new Error('Node not found')
        return list.map(e => e[0]) as N[]
    }

    /**
     * Returns the weight of the edge between the first node and the second node,
     * and optionally additional nodes if provided.
     * @param v1 The first node.
     * @param v2 The second node.
     * @param vn Additional nodes (optional).
     * @returns The weight of the edge between the nodes.
     * @throws Error if the first or second node is not found.
     */
    getWeight(v1: N, v2: N, ...vn: N[]) {
        const list = this.map.get(v1)
        if (!list) throw new Error('First node not found')
        const edge = list.find(e => e[0] == v2)
        if (!edge) throw new Error('Second node not found')
        let weight = edge[1]
        if (vn.length) weight += this.getWeight(v2, vn[0], ...vn.slice(1))
        return weight
    }

    isAdjacent(v1: N, v2: N) {
        const list = this.map.get(v1)
        if (!list) throw new Error('First node not found')
        return list.map(e => e[0]).includes(v2)
    }

    hasCycle() {
        return false
    }
}