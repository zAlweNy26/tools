import { GraphStructure } from "./interfaces"

type Weight = number
type Edge<V> = [V, Weight]

export class WeightedGraph<K> extends GraphStructure<K, Edge<K>> {
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