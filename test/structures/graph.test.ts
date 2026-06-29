import { Graph } from '@structures/graph'
import { describe, expect, test } from 'bun:test'

describe('Graph', () => {
  test('add nodes via edges', () => {
    const g = new Graph<string>('A')
    expect(g.size()).toBe(1)
    expect(g.hasNode('A')).toBeTrue()

    g.addEdge('A', 'B')
    expect(g.size()).toBe(2)
    expect(g.hasNode('B')).toBeTrue()
  })

  test('edges and adjacency', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('A', 'C')
    expect(g.getEdges('A')).toEqual(['B', 'C'])
    expect(g.getEdges('B')).toEqual(['A'])
    expect(g.isAdjacent('A', 'B')).toBeTrue()
    expect(g.isAdjacent('B', 'A')).toBeTrue()
    expect(g.isAdjacent('A', 'C')).toBeTrue()
    expect(g.isAdjacent('B', 'C')).toBeFalse()
  })

  test('remove edge', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.removeEdge('A', 'B')
    expect(g.isAdjacent('A', 'B')).toBeFalse()
    expect(g.isAdjacent('B', 'A')).toBeFalse()
  })

  test('remove node', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('B', 'C')
    g.removeNode('B')
    expect(g.hasNode('B')).toBeFalse()
    expect(g.isAdjacent('A', 'C')).toBeFalse()
    expect(g.getEdges('A')).toEqual([])
  })

  test('duplicate edge throws', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    expect(() => g.addEdge('A', 'B')).toThrow('Edge already present')
  })

  test('hasCycle detects no cycle (tree)', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('B', 'C')
    expect(g.hasCycle()).toBeFalse()
  })

  test('hasCycle detects cycle', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('B', 'C')
    g.addEdge('C', 'A')
    expect(g.hasCycle()).toBeTrue()
  })

  test('clear removes all', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.clear()
    expect(g.size()).toBe(0)
  })

  test('nodes getter', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('B', 'C')
    expect(g.nodes.sort()).toEqual(['A', 'B', 'C'])
  })

  test('getEdges throws for unknown node', () => {
    const g = new Graph<string>('A')
    expect(() => g.getEdges('Z')).toThrow('Node not found')
  })

  test('removeEdge throws for unknown node', () => {
    const g = new Graph<string>('A')
    expect(() => g.removeEdge('Z', 'A')).toThrow('Node not found')
  })

  test('removeEdge throws for non-existent edge', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    expect(() => g.removeEdge('A', 'C')).toThrow('Edge not found')
  })

  test('removeNode throws for unknown node', () => {
    const g = new Graph<string>('A')
    expect(() => g.removeNode('Z')).toThrow('Node not found')
  })

  test('isAdjacent throws for unknown node', () => {
    const g = new Graph<string>('A')
    expect(() => g.isAdjacent('Z', 'A')).toThrow('First node not found')
  })
})
