import { DirectedGraph } from '@structures/directed_graph'
import { Graph } from '@structures/graph'
import { WeightedGraph } from '@structures/weighted_graph'
import { breadthFirstSearch } from '@traversals/bfs'
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
    expect(breadthFirstSearch(g)).toEqual(['A', 'B', 'C', 'D'])
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

  test('visits nodes level by level rather than in insertion order', () => {
    const g = new Graph(1)
    g.addEdge(1, 2).addEdge(1, 3).addEdge(2, 4).addEdge(3, 5).addEdge(4, 6).addEdge(1, 7)
    expect(breadthFirstSearch(g)).toEqual([1, 2, 3, 7, 4, 5, 6])
  })

  test('includes falsy nodes', () => {
    const g = new Graph(0)
    g.addEdge(0, 1).addEdge(1, 2)
    expect(breadthFirstSearch(g)).toEqual([0, 1, 2])
  })

  test('works on directed and weighted graphs', () => {
    const directed = new DirectedGraph(1)
    directed.addEdge(1, 2).addEdge(2, 3).addEdge(3, 1)
    expect(breadthFirstSearch(directed)).toEqual([1, 2, 3])

    const weighted = new WeightedGraph('A')
    weighted.addEdge('A', 'B', 4).addEdge('A', 'C', 1).addEdge('B', 'D', 2)
    expect(breadthFirstSearch(weighted)).toEqual(['A', 'B', 'C', 'D'])
  })
})
