import { GraphStructure } from './interfaces'

/**
 * A graph data structure.
 * @template N The type of the nodes in the graph.
 * @group Structures
 */
export class Graph<N> extends GraphStructure<N, N> {
  /**
   * Creates a new graph with the given node.
   * @param node The first node to add to the graph.
   */
  constructor(node: N) {
    super(node)
  }

  /**
   * Adds an edge between two nodes in the graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @throws An error if the first node is not found or if the edge already exists.
   * @returns The graph instance.
   */
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

  /**
   * Removes an edge between two nodes in the graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @throws An error if either node is not found or if the edge does not exist.
   * @returns The graph instance.
   */
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

  /**
   * Removes a node from the graph and all edges connected to it.
   * @param node The node to remove.
   * @throws An error if the node is not found.
   * @returns The graph instance.
   */
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

  /**
   * Returns an array of nodes adjacent to the given node.
   * @param node The node to get the adjacent nodes for.
   * @throws An error if the node is not found.
   * @returns An array of adjacent nodes.
   */
  getEdges(node: N) {
    const list = this.map.get(node)
    if (!list) throw new Error('Node not found')
    return [...list]
  }

  /**
   * Checks if two nodes are adjacent in the graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @throws An error if the first node is not found.
   * @returns True if the nodes are adjacent, false otherwise.
   */
  isAdjacent(v1: N, v2: N) {
    const list = this.map.get(v1)
    if (!list) throw new Error('First node not found')
    return list.includes(v2)
  }

  /**
   * Checks if the graph contains a cycle using depth-first search.
   * @returns True if a cycle is detected, false otherwise.
   */
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
