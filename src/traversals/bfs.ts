import type { Graph } from '@structures/graph'
import { Queue } from '@structures/queue'

/**
 * Performs a breadth-first search traversal on a graph.
 * @param graph The graph to traverse.
 * @returns An array of nodes in BFS order, starting from the first node and then from each unvisited node in insertion order.
 * @example
 * ```ts
 * import { Graph, breadthFirstSearch } from '@danyalwe/tools'
 *
 * const graph = new Graph(1)
 * graph.addEdge(1, 2).addEdge(1, 3).addEdge(2, 4)
 *
 * breadthFirstSearch(graph) // [1, 2, 3, 4]
 * ```
 * @group Traversals
 */
export function breadthFirstSearch<T>(graph: Graph<T>) {
  const visited = new Set<T>()
  const result: T[] = []

  // Every unvisited node starts a new search, so disconnected components are included too
  for (const root of graph.nodes) {
    if (visited.has(root)) continue
    visited.add(root)
    const queue = new Queue<T>([root])
    while (!queue.isEmpty) {
      const node = queue.dequeue() as T
      result.push(node)
      for (const neighbor of graph.getEdges(node)) {
        if (visited.has(neighbor)) continue
        visited.add(neighbor)
        queue.enqueue(neighbor)
      }
    }
  }

  return result
}
