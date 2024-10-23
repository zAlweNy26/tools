import { Graph, Stack } from "structures"

export function depthFirstSearch<T>(graph: Graph<T>) {
    const visited = new Set()
    const stack = new Stack<T>(graph.nodes)
    const result = []

    while (!stack.isEmpty) {
        const node = stack.pop()
        if (node && !visited.has(node)) {
            visited.add(node)
            result.push(node)
            for (const neighbor of graph.getEdges(node)) {
                if (!visited.has(neighbor)) stack.push(neighbor)
            }
        }
    }

    return result
}