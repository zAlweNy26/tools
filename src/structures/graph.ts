import { GraphStructure } from './base'

/**
 * An undirected, unweighted graph.
 * @template N The type of the nodes in the graph.
 * @example
 * ```ts
 * import { Graph } from '@danyalwe/tools'
 *
 * const graph = new Graph<string>('A')
 * graph.addEdge('A', 'B').addEdge('A', 'C')
 * graph.isAdjacent('B', 'A')  // true
 * graph.neighbors('A')        // ['B', 'C']
 * ```
 * @category Graphs
 * @group Structures
 */
export class Graph<N> extends GraphStructure<N, N> {
  readonly directed = false

  /**
   * Adds an edge between `v1` and `v2`. A missing `v2` is added to the graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @returns The graph instance.
   * @throws An error if `v1` is not in the graph or the edge already exists.
   */
  addEdge(v1: N, v2: N) {
    return this._addEdge(v1, v2, 1)
  }

  protected _target(edge: N) {
    return edge
  }

  protected _edge(target: N) {
    return target
  }

  protected _weight() {
    return 1
  }
}
