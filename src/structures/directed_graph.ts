import { GraphStructure } from './base'

/**
 * A directed, unweighted graph. Edges go from the first node to the second only.
 * @template N The type of the nodes in the graph.
 * @example
 * ```ts
 * import { DirectedGraph } from '@danyalwe/tools'
 *
 * const graph = new DirectedGraph<string>('A')
 * graph.addEdge('A', 'B')
 * graph.isAdjacent('A', 'B')  // true
 * graph.isAdjacent('B', 'A')  // false
 * ```
 * @category Graphs
 * @group Structures
 */
export class DirectedGraph<N> extends GraphStructure<N, N> {
  readonly directed = true

  /**
   * Adds an edge from `v1` to `v2`. A missing `v2` is added to the graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @returns The graph instance.
   * @throws An error if `v1` is not in the graph or the edge already exists.
   * @complexity O(1).
   */
  addEdge(v1: N, v2: N) {
    return this._addEdge(v1, v2, 1)
  }

  protected _edge(target: N) {
    return target
  }
}
