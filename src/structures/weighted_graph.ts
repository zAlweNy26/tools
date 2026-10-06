import { GraphStructure } from './base'

/**
 * An undirected graph whose edges carry a weight.
 * @template N The type of the nodes in the graph.
 * @example
 * ```ts
 * import { WeightedGraph } from '@danyalwe/tools'
 *
 * const graph = new WeightedGraph<string>('A')
 * graph.addEdge('A', 'B', 5).addEdge('B', 'C', 3)
 * graph.getWeight('A', 'B')       // 5
 * graph.getWeight('A', 'B', 'C')  // 8
 * graph.getEdges('B')             // [['A', 5], ['C', 3]]
 * ```
 * @category Graphs
 * @group Structures
 */
export class WeightedGraph<N> extends GraphStructure<N, [N, number]> {
  readonly directed = false

  /**
   * Adds an edge between `v1` and `v2` with a weight. A missing `v2` is added to the graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @param weight The weight of the edge (default 0).
   * @returns The graph instance.
   * @throws An error if `v1` is not in the graph or the edge already exists.
   * @complexity O(1).
   */
  addEdge(v1: N, v2: N, weight = 0) {
    return this._addEdge(v1, v2, weight)
  }

  /**
   * Returns the total weight of the path through the given nodes.
   * @param v1 The first node.
   * @param v2 The second node.
   * @param vn Further nodes along the path.
   * @returns The summed weight, or undefined if two consecutive nodes are not adjacent.
   * @complexity O(k) for a path of k nodes.
   */
  getWeight(v1: N, v2: N, ...vn: N[]) {
    return this._pathWeight([v1, v2, ...vn])
  }

  protected _edge(target: N, weight: number): [N, number] {
    return [target, weight]
  }
}
