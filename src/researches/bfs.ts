import { Graph, Queue } from "structures"

export function breadthFirstSearch<T>(graph: Graph<T>) {
    const visited = new Set()
    const queue = new Queue<T>(graph.nodes)
    const result = []

    while (!queue.isEmpty) {
        const node = queue.dequeue()
        if (node && !visited.has(node)) {
            visited.add(node)
            result.push(node)
            for (const neighbor of graph.getEdges(node)) {
                if (!visited.has(neighbor)) queue.enqueue(neighbor)
            }
        }
    }

    return result
}