import { WeightedGraph } from '@structures/weighted_graph'

/**
 * Finds the minimum spanning tree of a weighted graph using Kruskal's algorithm.
 * @param graph The weighted graph to find the MST for.
 * @returns The minimum spanning tree, or a spanning forest if the graph is disconnected.
 * @example
 * ```ts
 * import { WeightedGraph, kruskal } from '@danyalwe/tools'
 *
 * const graph = new WeightedGraph('A')
 * graph.addEdge('A', 'B', 2).addEdge('A', 'C', 3)
 * graph.addEdge('B', 'C', 1).addEdge('B', 'D', 4)
 *
 * const mst = kruskal(graph)
 * // MST edges: B-C (1), A-B (2), B-D (4)
 * ```
 * @group Traversals
 */
export function kruskal<T>(graph: WeightedGraph<T>) {
  const edges: [T, T, number][] = []
  for (const node of graph.nodes) {
    for (const [neighbor, weight] of graph.getEdges(node)!)
      edges.push([node, neighbor, weight])
  }

  edges.sort((a, b) => a[2] - b[2])

  const parent = new Map<T, T>()
  const rank = new Map<T, number>()

  function find(x: T): T {
    if (!parent.has(x)) parent.set(x, x)
    if (!rank.has(x)) rank.set(x, 0)
    const p = parent.get(x)!
    if (p !== x) parent.set(x, find(p))
    return parent.get(x)!
  }

  function union(x: T, y: T): boolean {
    const rx = find(x)
    const ry = find(y)
    if (rx === ry) return false
    const rr = rank.get(rx)!
    const rry = rank.get(ry)!
    if (rr < rry) parent.set(rx, ry)
    else if (rr > rry) parent.set(ry, rx)
    else {
      parent.set(ry, rx)
      rank.set(rx, rr + 1)
    }
    return true
  }

  // every node is kept, so isolated nodes and disconnected components yield a spanning forest
  const [first, ...rest] = graph.nodes
  const mst = new WeightedGraph<T>(first)
  for (const node of rest) mst.addNode(node)

  for (const [u, v, w] of edges)
    if (union(u, v)) mst.addEdge(u, v, w)

  return mst
}
