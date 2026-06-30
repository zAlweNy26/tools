import { depthFirstSearch } from '@researches'
import { Graph } from '@structures/graph'
import { describe, expect, test } from 'bun:test'

describe('depthFirstSearch', () => {
  test('traverses connected graph in DFS order', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('A', 'C')
    g.addEdge('B', 'D')
    expect(depthFirstSearch(g)).toEqual(['D', 'B', 'A', 'C'])
  })

  test('handles single-node graph', () => {
    const g = new Graph<string>('A')
    expect(depthFirstSearch(g)).toEqual(['A'])
  })

  test('handles disconnected graph', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('A', 'C')
    g.removeEdge('A', 'C')
    g.addEdge('C', 'D')
    const result = depthFirstSearch(g)
    expect(result).toHaveLength(4)
    expect(new Set(result).size).toBe(4)
  })

  test('includes all nodes without duplicates in cyclic graph', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('B', 'C')
    g.addEdge('C', 'A')
    const result = depthFirstSearch(g)
    expect(result).toHaveLength(3)
    expect(new Set(result).size).toBe(3)
  })
})
