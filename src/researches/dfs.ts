import type { Graph } from '@structures/graph'
import { Stack } from '@structures/stack'

/**
 * Performs a depth-first search traversal on a graph.
 * @param graph The graph to traverse.
 * @returns An array of nodes in DFS order.
 * @group Researches
 */
export function depthFirstSearch<T>(graph: Graph<T>) {
  const visited = new Set()
  const stack = new Stack<T>(graph.nodes)
  const result = []

  while (!stack.isEmpty) {
    const node = stack.pop()
    if (node && !visited.has(node)) {
      visited.add(node)
      result.push(node)
      for (const neighbor of graph.getEdges(node))
        if (!visited.has(neighbor)) stack.push(neighbor)
    }
  }

  return result
}
