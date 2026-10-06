import { Graph } from '@structures/graph'
import { depthFirstSearch } from '@traversals/dfs'
import { describe, expect, test } from 'bun:test'

describe('depthFirstSearch', () => {
  test('traverses connected graph in DFS order', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('A', 'C')
    g.addEdge('B', 'D')
    expect(depthFirstSearch(g)).toEqual(['A', 'B', 'D', 'C'])
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
    expect(depthFirstSearch(g)).toEqual(['A', 'B', 'C', 'D'])
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

  test('visits nodes each branch fully before backtracking', () => {
    const g = new Graph(1)
    g.addEdge(1, 2).addEdge(1, 3).addEdge(2, 4).addEdge(3, 5).addEdge(4, 6).addEdge(1, 7)
    expect(depthFirstSearch(g)).toEqual([1, 2, 4, 6, 3, 5, 7])
  })

  test('includes falsy nodes', () => {
    const g = new Graph(0)
    g.addEdge(0, 1).addEdge(1, 2)
    expect(depthFirstSearch(g)).toEqual([0, 1, 2])
  })
})
