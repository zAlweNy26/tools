import type { Graph } from '@structures/graph'
import { Queue } from '@structures/queue'

/**
 * Performs a breadth-first search traversal on a graph.
 * @param graph The graph to traverse.
 * @returns An array of nodes in BFS order.
 * @example
 * ```ts
 * import { Graph, breadthFirstSearch } from '@danyalwe/tools'
 *
 * const graph = new Graph(1)
 * graph.addEdge(1, 2).addEdge(1, 3).addEdge(2, 4)
 *
 * breadthFirstSearch(graph) // [1, 2, 3, 4]
 * ```
 * @group Researches
 */
export function breadthFirstSearch<T>(graph: Graph<T>) {
  const visited = new Set()
  const queue = new Queue<T>(graph.nodes)
  const result = []

  while (!queue.isEmpty) {
    const node = queue.dequeue()
    if (node && !visited.has(node)) {
      visited.add(node)
      result.push(node)
      for (const neighbor of graph.getEdges(node))
        if (!visited.has(neighbor)) queue.enqueue(neighbor)
    }
  }

  return result
}
