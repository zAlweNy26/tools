import { WeightedGraph } from '@structures/weighted_graph'
import { describe, expect, test } from 'bun:test'

describe('WeightedGraph', () => {
  test('add edges with weights', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 5)
    g.addEdge('A', 'C', 10)
    expect(g.size).toBe(3)
    expect(g.hasNode('B')).toBeTrue()
  })

  test('getEdges returns full edge tuples', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 5)
    g.addEdge('A', 'C', 10)
    const edges = g.getEdges('A')!
    expect(edges.length).toBe(2)
    expect(edges[0]).toEqual(['B', 5])
    expect(edges[1]).toEqual(['C', 10])
  })

  test('getWeight for single edge', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 7)
    expect(g.getWeight('A', 'B')).toBe(7)
  })

  test('getWeight for path', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 3)
    g.addEdge('B', 'C', 4)
    g.addEdge('C', 'D', 2)
    expect(g.getWeight('A', 'B', 'C', 'D')).toBe(9)
  })

  test('isAdjacent', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 5)
    expect(g.isAdjacent('A', 'B')).toBeTrue()
    expect(g.isAdjacent('A', 'C')).toBeFalse()
  })

  test('remove edge', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 5)
    g.removeEdge('A', 'B')
    expect(g.isAdjacent('A', 'B')).toBeFalse()
    expect(g.isAdjacent('B', 'A')).toBeFalse()
  })

  test('remove node', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 5)
    g.addEdge('B', 'C', 3)
    g.removeNode('B')
    expect(g.hasNode('B')).toBeFalse()
    expect(g.getEdges('A')).toEqual([])
  })

  test('duplicate edge throws', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 5)
    expect(() => g.addEdge('A', 'B', 3)).toThrow('Edge already present')
  })

  test('hasCycle detects no cycle', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 1)
    g.addEdge('B', 'C', 2)
    expect(g.hasCycle()).toBeFalse()
  })

  test('hasCycle detects cycle', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 1)
    g.addEdge('B', 'C', 2)
    g.addEdge('C', 'A', 3)
    expect(g.hasCycle()).toBeTrue()
  })

  test('addEdge throws for unknown first node', () => {
    const g = new WeightedGraph<string>('A')
    expect(() => g.addEdge('Z', 'A')).toThrow('First node not found')
  })

  test('removeEdge returns false for an unknown node', () => {
    const g = new WeightedGraph<string>('A')
    expect(g.removeEdge('Z', 'A')).toBeFalse()
  })

  test('removeEdge returns false for a missing edge', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 5)
    expect(g.removeEdge('A', 'C')).toBeFalse()
  })

  test('removeNode returns false for an unknown node', () => {
    const g = new WeightedGraph<string>('A')
    expect(g.removeNode('Z')).toBeFalse()
  })

  test('isAdjacent returns false for an unknown node', () => {
    const g = new WeightedGraph<string>('A')
    expect(g.isAdjacent('Z', 'A')).toBeFalse()
  })

  test('getEdges returns undefined for an unknown node', () => {
    const g = new WeightedGraph<string>('A')
    expect(g.getEdges('Z')).toBeUndefined()
  })

  test('getWeight returns undefined for an unknown first node', () => {
    const g = new WeightedGraph<string>('A')
    expect(g.getWeight('Z', 'A')).toBeUndefined()
  })

  test('getWeight returns undefined when nodes are not adjacent', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 5)
    expect(g.getWeight('A', 'Z')).toBeUndefined()
  })

  test('hasCycle on line graph', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 1)
    g.addEdge('B', 'C', 1)
    g.addEdge('C', 'D', 1)
    g.addEdge('D', 'E', 1)
    expect(g.hasCycle()).toBeFalse()
  })

  test('hasCycle on branching tree', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 1)
    g.addEdge('A', 'C', 1)
    g.addEdge('B', 'D', 1)
    expect(g.hasCycle()).toBeFalse()
  })

  test('a rejected duplicate edge leaves the graph unchanged', () => {
    const g = new WeightedGraph<number>(1)
    g.addEdge(1, 2, 5)
    expect(() => g.addEdge(1, 2, 7)).toThrow('Edge already present')
    expect(g.getEdges(1)).toEqual([[2, 5]])
    expect(g.getEdges(2)).toEqual([[1, 5]])
  })

  test('getEdges returns copies of the edge tuples', () => {
    const g = new WeightedGraph<number>(1)
    g.addEdge(1, 2, 5)
    g.getEdges(1)![0][1] = 99
    expect(g.getWeight(1, 2)).toBe(5)
    expect(g.getWeight(2, 1)).toBe(5)
  })

  test('getWeight sums a path and returns undefined for a broken one', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 5).addEdge('B', 'C', 3)
    expect(g.getWeight('A', 'B', 'C')).toBe(8)
    expect(g.getWeight('C', 'B', 'A')).toBe(8)
    expect(g.getWeight('A', 'C')).toBeUndefined()
  })
})
