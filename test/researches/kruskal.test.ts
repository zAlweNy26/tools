import { kruskal } from '@researches'
import { WeightedGraph } from '@structures/weighted_graph'
import { describe, expect, test } from 'bun:test'

describe('kruskal', () => {
  test('returns MST for triangle graph', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 1)
    g.addEdge('B', 'C', 2)
    g.addEdge('A', 'C', 3)
    const mst = kruskal(g)
    expect(mst.hasNode('A')).toBeTrue()
    expect(mst.hasNode('B')).toBeTrue()
    expect(mst.hasNode('C')).toBeTrue()
    expect(mst.hasCycle()).toBeFalse()
    expect(mst.getWeight('A', 'B', 'C')).toBe(3)
  })

  test('handles single-node graph', () => {
    const g = new WeightedGraph<string>('A')
    const mst = kruskal(g)
    expect(mst.hasNode('A')).toBeTrue()
    expect(mst.size()).toBe(1)
  })

  test('handles disconnected graph', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 1)
    g.addEdge('A', 'C', 99)
    g.removeEdge('A', 'C')
    g.addEdge('C', 'D', 2)
    const mst = kruskal(g)
    expect(mst.size()).toBe(4)
    expect(mst.hasCycle()).toBeFalse()
  })

  test('picks cheaper edges and avoids cycles', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 1)
    g.addEdge('B', 'C', 2)
    g.addEdge('A', 'C', 4)
    g.addEdge('C', 'D', 3)
    const mst = kruskal(g)
    expect(mst.hasCycle()).toBeFalse()
    expect(mst.getWeight('A', 'B', 'C', 'D')).toBe(6)
  })
})
