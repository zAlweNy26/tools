import { Graph } from '@structures/graph'
import { describe, expect, test } from 'bun:test'

describe('Graph', () => {
  test('add nodes via edges', () => {
    const g = new Graph<string>('A')
    expect(g.size).toBe(1)
    expect(g.hasNode('A')).toBeTrue()

    g.addEdge('A', 'B')
    expect(g.size).toBe(2)
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
    expect(g.size).toBe(0)
  })

  test('a rejected duplicate edge leaves the graph unchanged', () => {
    const g = new Graph<number>(1)
    g.addEdge(1, 2)
    expect(() => g.addEdge(1, 2)).toThrow('Edge already present')
    expect(() => g.addEdge(2, 1)).toThrow('Edge already present')
    expect(g.getEdges(1)).toEqual([2])
    expect(g.getEdges(2)).toEqual([1])
  })

  test('supports self-loops', () => {
    const g = new Graph<number>(1)
    g.addEdge(1, 1)
    expect(g.getEdges(1)).toEqual([1])
    expect(g.hasCycle()).toBeTrue()
  })

  test('can be reused after clear', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.clear()
    g.addNode('X').addEdge('X', 'Y')
    expect(g.nodes).toEqual(['X', 'Y'])
  })

  test('nodes getter', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('B', 'C')
    expect(g.nodes.sort()).toEqual(['A', 'B', 'C'])
  })

  test('getEdges returns undefined for an unknown node', () => {
    const g = new Graph<string>('A')
    expect(g.getEdges('Z')).toBeUndefined()
  })

  test('removeEdge returns false for an unknown node', () => {
    const g = new Graph<string>('A')
    expect(g.removeEdge('Z', 'A')).toBeFalse()
  })

  test('removeEdge returns false for a missing edge', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    expect(g.removeEdge('A', 'C')).toBeFalse()
  })

  test('removeNode returns false for an unknown node', () => {
    const g = new Graph<string>('A')
    expect(g.removeNode('Z')).toBeFalse()
  })

  test('isAdjacent returns false for an unknown node', () => {
    const g = new Graph<string>('A')
    expect(g.isAdjacent('Z', 'A')).toBeFalse()
  })

  test('addEdge throws for unknown first node', () => {
    const g = new Graph<string>('A')
    expect(() => g.addEdge('Z', 'A')).toThrow('First node not found')
  })

  test('hasCycle on line graph without self-loop', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('B', 'C')
    g.addEdge('C', 'D')
    g.addEdge('D', 'E')
    expect(g.hasCycle()).toBeFalse()
  })

  test('hasCycle on fully connected small graph', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('A', 'C')
    g.addEdge('B', 'D')
    expect(g.hasCycle()).toBeFalse()
  })

  test('all prototype methods exercised', () => {
    const g = new Graph<string>('X')
    g.addEdge('X', 'Y')
    expect(g.hasCycle()).toBeFalse()
    expect(g.isAdjacent('X', 'Y')).toBeTrue()
    expect(g.getEdges('X')).toEqual(['Y'])
    g.removeEdge('X', 'Y')
    g.addEdge('X', 'Y')
    g.addEdge('Y', 'Z')
    g.removeNode('Y')
    expect(g.hasNode('Y')).toBeFalse()
    g.clear()
    expect(g.size).toBe(0)
  })

  test('can start empty', () => {
    const g = new Graph<string>()
    expect(g.isEmpty).toBeTrue()
    g.addNode('A').addEdge('A', 'B')
    expect(g.size).toBe(2)
  })

  test('neighbors, toArray and iteration', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B').addEdge('A', 'C')
    expect(g.neighbors('A')).toEqual(['B', 'C'])
    expect(g.neighbors('Z')).toBeUndefined()
    expect(g.toArray()).toEqual(['A', 'B', 'C'])
    expect([...g]).toEqual(['A', 'B', 'C'])
  })

  test('removeEdge removes both directions and returns true', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B')
    expect(g.removeEdge('B', 'A')).toBeTrue()
    expect(g.isAdjacent('A', 'B')).toBeFalse()
    expect(g.isAdjacent('B', 'A')).toBeFalse()
  })

  test('is undirected and clear returns the graph', () => {
    const g = new Graph<string>('A')
    expect(g.directed).toBeFalse()
    expect(g.clear()).toBe(g)
  })

  test('hasCycle handles graphs too deep for recursion', () => {
    const g = new Graph(0)
    for (let i = 0; i < 100_000; i++) g.addEdge(i, i + 1)
    expect(g.hasCycle()).toBeFalse()
    g.addEdge(100_000, 0)
    expect(g.hasCycle()).toBeTrue()
  })

  test('removeNode removes the node from its neighbors', () => {
    const g = new Graph<string>('A')
    g.addEdge('A', 'B').addEdge('B', 'C').addEdge('C', 'A')
    expect(g.removeNode('B')).toBeTrue()
    expect(g.neighbors('A')).toEqual(['C'])
    expect(g.neighbors('C')).toEqual(['A'])
    expect(g.hasCycle()).toBeFalse()
  })

  test('neighbors keep insertion order after removals', () => {
    const g = new Graph<number>(0)
    g.addEdge(0, 1).addEdge(0, 2).addEdge(0, 3)
    g.removeEdge(0, 2)
    g.addEdge(0, 2)
    expect(g.neighbors(0)).toEqual([1, 3, 2])
  })
})
