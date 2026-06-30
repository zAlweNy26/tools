import { WeightedGraph } from '@structures/weighted_graph'
import { describe, expect, test } from 'bun:test'

describe('WeightedGraph', () => {
  test('add edges with weights', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 5)
    g.addEdge('A', 'C', 10)
    expect(g.size()).toBe(3)
    expect(g.hasNode('B')).toBeTrue()
  })

  test('getEdges returns full edge tuples', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 5)
    g.addEdge('A', 'C', 10)
    const edges = g.getEdges('A')
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

  test('removeEdge throws for unknown node', () => {
    const g = new WeightedGraph<string>('A')
    expect(() => g.removeEdge('Z', 'A')).toThrow('Node not found')
  })

  test('removeEdge throws for non-existent edge', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 5)
    expect(() => g.removeEdge('A', 'C')).toThrow('Edge not found')
  })

  test('removeNode throws for unknown node', () => {
    const g = new WeightedGraph<string>('A')
    expect(() => g.removeNode('Z')).toThrow('Node not found')
  })

  test('isAdjacent throws for unknown first node', () => {
    const g = new WeightedGraph<string>('A')
    expect(() => g.isAdjacent('Z', 'A')).toThrow('First node not found')
  })

  test('getEdges throws for unknown node', () => {
    const g = new WeightedGraph<string>('A')
    expect(() => g.getEdges('Z')).toThrow('Node not found')
  })

  test('getWeight throws for unknown first node', () => {
    const g = new WeightedGraph<string>('A')
    expect(() => g.getWeight('Z', 'A')).toThrow('First node not found')
  })

  test('getWeight throws for unknown second node', () => {
    const g = new WeightedGraph<string>('A')
    g.addEdge('A', 'B', 5)
    expect(() => g.getWeight('A', 'Z')).toThrow('Second node not found')
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
})
