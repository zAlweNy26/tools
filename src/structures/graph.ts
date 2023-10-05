import { GraphStructure } from "./interfaces"

export class Graph<K> extends GraphStructure<K, K> {
    addEdge(v1: K, v2: K) {
        const list = this.map.get(v1)
        if (list) {
            list.push(v2)
            const edge = this.map.get(v2)
            if (edge?.includes(v1)) throw new Error('Edge already present')
            else if (edge) edge.push(v1) 
            else this.map.set(v2, [v1])
        } else throw new Error('First vertex not found')
        return this
    }

    removeEdge(v1: K, v2: K) {
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
        } else throw new Error('Vertex not found')
        return this
    }

    removeVertex(vertex: K) {
        if (this.map.delete(vertex)) {
            for (const list of this.map.values()) {
                const index = list.indexOf(vertex)
                if (index != -1) list.splice(index, 1)
            }
        } else throw new Error('Vertex not found')
        return this
    }

    getEdges(vertex: K) {
        const list = this.map.get(vertex)
        if (!list) throw new Error('Vertex not found')
        return [...list] as readonly K[]
    }

    isAdjacent(v1: K, v2: K) {
        const list = this.map.get(v1)
        if (!list) throw new Error('First vertex not found')
        return list.includes(v2)
    }
}