import { GraphStructure } from './base'

/**
 * A directed graph whose edges carry a weight. Edges go from the first node to the second only.
 * @template N The type of the nodes in the graph.
 * @example
 * ```ts
 * import { WeightedDirectedGraph } from '@danyalwe/tools'
 *
 * const graph = new WeightedDirectedGraph<string>('A')
 * graph.addEdge('A', 'B', 5)
 * graph.getWeight('A', 'B')   // 5
 * graph.isAdjacent('B', 'A')  // false
 * ```
 * @category Graphs
 * @group Structures
 */
export class WeightedDirectedGraph<N> extends GraphStructure<N, [N, number]> {
  readonly directed = true

  /**
   * Adds an edge from `v1` to `v2` with a weight. A missing `v2` is added to the graph.
   * @param v1 The first node.
   * @param v2 The second node.
   * @param weight The weight of the edge (default 0).
   * @returns The graph instance.
   * @throws An error if `v1` is not in the graph or the edge already exists.
   * @complexity O(deg(v1)).
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
   * @complexity O(k · d) for a path of k nodes whose degrees are at most d.
   */
  getWeight(v1: N, v2: N, ...vn: N[]) {
    return this._pathWeight([v1, v2, ...vn])
  }

  protected _target(edge: [N, number]) {
    return edge[0]
  }

  protected _edge(target: N, weight: number): [N, number] {
    return [target, weight]
  }

  protected _weight(edge: [N, number]) {
    return edge[1]
  }
}
