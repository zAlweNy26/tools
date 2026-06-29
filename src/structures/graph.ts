import { GraphStructure } from './interfaces'

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
    }
    else throw new Error('First node not found')
    return this
  }

  removeEdge(v1: N, v2: N) {
    const list = this.map.get(v1)
    if (list) {
      const index = list.indexOf(v2)
      if (index !== -1) list.splice(index, 1)
      else throw new Error('Edge not found')

      const edge = this.map.get(v2)
      if (edge) {
        const index = edge.indexOf(v1)
        if (index !== -1) edge.splice(index, 1)
      }
    }
    else throw new Error('Node not found')
    return this
  }

  removeNode(node: N) {
    if (this.map.delete(node)) {
      for (const list of this.map.values()) {
        const index = list.indexOf(node)
        if (index !== -1) list.splice(index, 1)
      }
    }
    else throw new Error('Node not found')
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
    const visited = new Set<N>()

    const dfs = (node: N, parent: N | null): boolean => {
      visited.add(node)
      const edges = this.map.get(node)
      if (edges) {
        for (const neighbor of edges) {
          if (!visited.has(neighbor)) {
            if (dfs(neighbor, node)) return true
          }
          else if (neighbor !== parent)
            return true
        }
      }
      return false
    }

    for (const node of this.map.keys()) {
      if (!visited.has(node))
        if (dfs(node, null)) return true
    }
    return false
  }
}
