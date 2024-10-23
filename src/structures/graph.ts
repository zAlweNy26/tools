import { GraphStructure } from "./interfaces"

/**
 * A graph data structure.
 * @template N The type of the nodes in the graph.
 */
export class Graph<N> extends GraphStructure<N, N> {
    addEdge(v1: N, v2: N) {
        const list = this.map.get(v1)
        if (list) {
            list.push(v2)
            const edge = this.map.get(v2)
            if (edge?.includes(v1)) throw new Error('Edge already present')
            else if (edge) edge.push(v1) 
            else this.map.set(v2, [v1])
        } else throw new Error('First node not found')
        return this
    }

    removeEdge(v1: N, v2: N) {
        const list = this.map.get(v1)
        if (list) {
            const index = list.indexOf(v2)
            if (index != -1) list.splice(index, 1)
            else throw new Error('Edge not found')
        
            const edge = this.map.get(v2)
            if (edge) {
                const index = edge.indexOf(v1)
                if (index != -1) edge.splice(index, 1)
            }
        } else throw new Error('Node not found')
        return this
    }

    removeNode(node: N) {
        if (this.map.delete(node)) {
            for (const list of this.map.values()) {
                const index = list.indexOf(node)
                if (index != -1) list.splice(index, 1)
            }
        } else throw new Error('Node not found')
        return this
    }

    getEdges(node: N) {
        const list = this.map.get(node)
        if (!list) throw new Error('Node not found')
        return [...list]
    }

    isAdjacent(v1: N, v2: N) {
        const list = this.map.get(v1)
        if (!list) throw new Error('First node not found')
        return list.includes(v2)
    }

    hasCycle() {
        return false
    }
}