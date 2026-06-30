import { breadthFirstSearch } from '@researches/bfs'
import { Graph } from '@structures/graph'
import { describe, expect, test } from 'bun:test'

describe('breadthFirstSearch', () => {
  test('traverses connected graph in BFS order', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('A', 'C')
    g.addEdge('B', 'D')
    expect(breadthFirstSearch(g)).toEqual(['A', 'B', 'C', 'D'])
  })

  test('handles single-node graph', () => {
    const g = new Graph<string>('A')
    expect(breadthFirstSearch(g)).toEqual(['A'])
  })

  test('handles disconnected graph', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('A', 'C')
    g.removeEdge('A', 'C')
    g.addEdge('C', 'D')
    const result = breadthFirstSearch(g)
    expect(result).toHaveLength(4)
    expect(new Set(result).size).toBe(4)
  })

  test('includes all nodes without duplicates in cyclic graph', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('B', 'C')
    g.addEdge('C', 'A')
    const result = breadthFirstSearch(g)
    expect(result).toHaveLength(3)
    expect(new Set(result).size).toBe(3)
  })
})
