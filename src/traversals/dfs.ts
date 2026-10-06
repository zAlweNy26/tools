import type { Graph } from '@structures/graph'
import { Stack } from '@structures/stack'

/**
 * Performs a depth-first search traversal on a graph.
 * @param graph The graph to traverse.
 * @returns An array of nodes in DFS (pre-order), starting from the first node and then from each unvisited node in insertion order.
 * @example
 * ```ts
 * import { Graph, depthFirstSearch } from '@danyalwe/tools'
 *
 * const graph = new Graph(1)
 * graph.addEdge(1, 2).addEdge(1, 3).addEdge(2, 4)
 *
 * depthFirstSearch(graph) // [1, 2, 4, 3]
 * ```
 * @group Traversals
 */
export function depthFirstSearch<T>(graph: Graph<T>) {
  const visited = new Set<T>()
  const result: T[] = []

  // Every unvisited node starts a new search, so disconnected components are included too
  for (const root of graph.nodes) {
    if (visited.has(root)) continue
    const stack = new Stack<T>([root])
    while (!stack.isEmpty) {
      const node = stack.pop() as T
      if (visited.has(node)) continue
      visited.add(node)
      result.push(node)
      // Pushed in reverse so the first neighbor is explored first
      const neighbors = graph.getEdges(node)
      for (let i = neighbors.length - 1; i >= 0; i--)
        if (!visited.has(neighbors[i])) stack.push(neighbors[i])
    }
  }

  return result
}
