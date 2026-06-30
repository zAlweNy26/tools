import { WeightedGraph } from '@structures/weighted_graph'

/**
 * Finds the minimum spanning tree of a weighted graph using Kruskal's algorithm.
 * @param graph The weighted graph to find the MST for.
 * @returns The minimum spanning tree.
 * @group Researches
 */
export function kruskal<T>(graph: WeightedGraph<T>) {
  const edges: [T, T, number][] = []
  for (const node of graph.nodes) {
    for (const [neighbor, weight] of graph.getEdges(node))
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

  const mstAdj = new Map<T, [T, number][]>()
  for (const [u, v, w] of edges) {
    if (union(u, v)) {
      if (!mstAdj.has(u)) mstAdj.set(u, [])
      if (!mstAdj.has(v)) mstAdj.set(v, [])
      mstAdj.get(u)!.push([v, w])
      mstAdj.get(v)!.push([u, w])
    }
  }

  if (mstAdj.size === 0) return new WeightedGraph<T>(graph.nodes[0])

  const first = [...mstAdj.keys()][0]
  const mst = new WeightedGraph<T>(first)
  const added = new Set<T>()

  for (const start of mstAdj.keys()) {
    if (added.has(start)) continue

    if (!mst.hasNode(start)) {
      mst.addEdge(mst.nodes[0], start, 0)
      mst.removeEdge(mst.nodes[0], start)
    }

    const stack: T[] = [start]
    while (stack.length > 0) {
      const node = stack.pop()!
      if (added.has(node)) continue
      added.add(node)
      for (const [neighbor, weight] of mstAdj.get(node) ?? []) {
        if (!added.has(neighbor)) {
          mst.addEdge(node, neighbor, weight)
          stack.push(neighbor)
        }
      }
    }
  }

  return mst
}
