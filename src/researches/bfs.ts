import type { Graph } from '@structures'
import { Queue } from '@structures'

/**
 * Performs a breadth-first search traversal on a graph.
 * @param graph The graph to traverse.
 * @returns An array of nodes in BFS order.
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
