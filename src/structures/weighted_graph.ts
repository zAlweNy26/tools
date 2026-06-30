import { GraphStructure } from './structures'

/** Weight value type used in weighted graphs. @group Structures */
export type Weight = number

/** An edge represented as a tuple of a vertex and its weight. @group Structures */
export type Edge<V> = [V, Weight]

/**
 * A weighted graph data structure.
 * @template N The type of the nodes in the graph.
 * @group Structures
 */
export class WeightedGraph<N> extends GraphStructure<N, Edge<N>> {
  /**
   * Creates a new weighted graph with the given node.
   * @param node The first node to add to the weighted graph.
   */
  constructor(node: N) {
    super(node)
  }

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
    }
    else throw new Error('First node not found')
    return this
  }

  /**
   * Removes an edge between two nodes in the weighted graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @throws An error if either node is not found or if the edge does not exist.
   * @returns The weighted graph instance.
   */
  removeEdge(v1: N, v2: N) {
    const list = this.map.get(v1)
    if (list) {
      const index = list.findIndex(e => e[0] === v2)
      if (index !== -1) list.splice(index, 1)
      else throw new Error('Edge not found')

      const edge = this.map.get(v2)
      if (edge) {
        const index = edge.findIndex(e => e[0] === v1)
        if (index !== -1) edge.splice(index, 1)
      }
    }
    else throw new Error('Node not found')
    return this
  }

  /**
   * Removes a node from the weighted graph and all edges connected to it.
   * @param node The node to remove.
   * @throws An error if the node is not found.
   * @returns The weighted graph instance.
   */
  removeNode(node: N) {
    if (this.map.delete(node)) {
      for (const list of this.map.values()) {
        const index = list.findIndex(e => e[0] === node)
        if (index !== -1) list.splice(index, 1)
      }
    }
    else throw new Error('Node not found')
    return this
  }

  /**
   * Returns an array of edges (as `[node, weight]` tuples) for the given node.
   * @param node The node to get the edges for.
   * @throws An error if the node is not found.
   * @returns An array of edges, each represented as a `[node, weight]` tuple.
   */
  getEdges(node: N) {
    const list = this.map.get(node)
    if (!list) throw new Error('Node not found')
    return [...list]
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
    const edge = list.find(e => e[0] === v2)
    if (!edge) throw new Error('Second node not found')
    let weight = edge[1]
    if (vn.length) weight += this.getWeight(v2, vn[0], ...vn.slice(1))
    return weight
  }

  /**
   * Checks if two nodes are adjacent in the weighted graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @throws An error if the first node is not found.
   * @returns True if the nodes are adjacent, false otherwise.
   */
  isAdjacent(v1: N, v2: N) {
    const list = this.map.get(v1)
    if (!list) throw new Error('First node not found')
    return list.map(e => e[0]).includes(v2)
  }

  /**
   * Checks if the weighted graph contains a cycle using depth-first search.
   * @returns True if a cycle is detected, false otherwise.
   */
  hasCycle() {
    const visited = new Set<N>()

    const dfs = (node: N, parent: N | null): boolean => {
      visited.add(node)
      const edges = this.map.get(node)
      if (edges) {
        for (const [neighbor] of edges) {
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
