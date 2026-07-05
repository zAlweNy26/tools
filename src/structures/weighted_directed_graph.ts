import { WeightedGraph } from './weighted_graph'

/**
 * A directed, weighted graph data structure. Edges go in one direction only with weights.
 * @template N The type of the nodes in the graph.
 * @example
 * ```ts
 * import { WeightedDirectedGraph } from '@danyalwe/tools'
 *
 * const graph = new WeightedDirectedGraph<string>('A')
 * graph.addEdge('A', 'B', 5)
 * graph.getWeight('A', 'B')  // 5
 * graph.isAdjacent('B', 'A') // false
 * ```
 * @category Graphs
 * @group Structures
 */
export class WeightedDirectedGraph<N> extends WeightedGraph<N> {
  /**
   * Creates a new weighted directed graph with the given node.
   * @param node The first node to add to the graph.
   */
  constructor(node: N) {
    super(node)
  }

  /**
   * Adds a node to the graph.
   * @param node The node to add.
   * @returns The graph instance.
   */
  addNode(node: N) {
    if (!this.map.has(node)) this.map.set(node, [])
    return this
  }

  addEdge(v1: N, v2: N, weight = 0) {
    const list = this.map.get(v1)
    if (list) {
      if (list.some(e => e[0] === v2)) throw new Error('Edge already present')
      list.push([v2, weight])
      if (!this.map.has(v2)) this.map.set(v2, [])
    }
    else throw new Error('First node not found')
    return this
  }

  removeEdge(v1: N, v2: N) {
    const list = this.map.get(v1)
    if (list) {
      const index = list.findIndex(e => e[0] === v2)
      if (index !== -1) list.splice(index, 1)
      else throw new Error('Edge not found')
    }
    else throw new Error('Node not found')
    return this
  }

  hasCycle() {
    const state = new Map<N, 0 | 1 | 2>()
    for (const node of this.map.keys()) state.set(node, 0)

    const dfs = (node: N): boolean => {
      state.set(node, 1)
      const edges = this.map.get(node)
      if (edges) {
        for (const [neighbor] of edges) {
          if (state.get(neighbor) === 1) return true
          if (state.get(neighbor) === 0 && dfs(neighbor)) return true
        }
      }
      state.set(node, 2)
      return false
    }

    for (const node of this.map.keys()) {
      if (state.get(node) === 0)
        if (dfs(node)) return true
    }
    return false
  }
}
