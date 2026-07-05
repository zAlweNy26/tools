import { DirectedGraph } from '@structures/directed_graph'
import { describe, expect, test } from 'bun:test'

describe('DirectedGraph', () => {
  test('add nodes via edges', () => {
    const g = new DirectedGraph<string>('A')
    expect(g.size()).toBe(1)
    g.addEdge('A', 'B')
    expect(g.size()).toBe(2)
    expect(g.hasNode('B')).toBeTrue()
  })

  test('edges are one-directional', () => {
    const g = new DirectedGraph<string>('A')
    g.addEdge('A', 'B')
    expect(g.isAdjacent('A', 'B')).toBeTrue()
    expect(g.isAdjacent('B', 'A')).toBeFalse()
    expect(g.getEdges('B')).toEqual([])
  })

  test('getEdges returns outgoing edges only', () => {
    const g = new DirectedGraph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('A', 'C')
    g.addEdge('B', 'D')
    expect(g.getEdges('A')).toEqual(['B', 'C'])
    expect(g.getEdges('B')).toEqual(['D'])
    expect(g.getEdges('C')).toEqual([])
  })

  test('remove edge in one direction only', () => {
    const g = new DirectedGraph<string>('A')
    g.addEdge('A', 'B')
    g.removeEdge('A', 'B')
    expect(g.isAdjacent('A', 'B')).toBeFalse()
    expect(g.hasNode('B')).toBeTrue()
  })

  test('remove node', () => {
    const g = new DirectedGraph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('B', 'C')
    g.removeNode('B')
    expect(g.hasNode('B')).toBeFalse()
    expect(g.getEdges('A')).toEqual([])
    expect(g.hasNode('C')).toBeTrue()
  })

  test('duplicate edge throws', () => {
    const g = new DirectedGraph<string>('A')
    g.addEdge('A', 'B')
    expect(() => g.addEdge('A', 'B')).toThrow('Edge already present')
  })

  test('hasCycle detects no cycle (DAG)', () => {
    const g = new DirectedGraph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('A', 'C')
    g.addEdge('B', 'D')
    g.addEdge('C', 'D')
    expect(g.hasCycle()).toBeFalse()
  })

  test('hasCycle detects simple cycle', () => {
    const g = new DirectedGraph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('B', 'C')
    g.addEdge('C', 'A')
    expect(g.hasCycle()).toBeTrue()
  })

  test('hasCycle detects self-loop', () => {
    const g = new DirectedGraph<string>('A')
    g.addEdge('A', 'A')
    expect(g.hasCycle()).toBeTrue()
  })

  test('hasCycle on disconnected DAG', () => {
    const g = new DirectedGraph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('A', 'C')
    g.addNode('D').addEdge('D', 'E')
    expect(g.hasCycle()).toBeFalse()
  })

  test('addNode creates isolated node', () => {
    const g = new DirectedGraph<string>('A')
    g.addNode('B')
    expect(g.hasNode('B')).toBeTrue()
    expect(g.size()).toBe(2)
    expect(g.getEdges('B')).toEqual([])
  })

  test('addNode does nothing for existing node', () => {
    const g = new DirectedGraph<string>('A')
    g.addNode('A')
    expect(g.size()).toBe(1)
  })

  test('nodes getter', () => {
    const g = new DirectedGraph<string>('A')
    g.addEdge('A', 'B')
    g.addEdge('B', 'C')
    expect(g.nodes.sort()).toEqual(['A', 'B', 'C'])
  })

  test('addEdge throws for unknown first node', () => {
    const g = new DirectedGraph<string>('A')
    expect(() => g.addEdge('Z', 'A')).toThrow('First node not found')
  })

  test('removeEdge throws for unknown node', () => {
    const g = new DirectedGraph<string>('A')
    expect(() => g.removeEdge('Z', 'A')).toThrow('Node not found')
  })

  test('removeEdge throws for non-existent edge', () => {
    const g = new DirectedGraph<string>('A')
    g.addEdge('A', 'B')
    expect(() => g.removeEdge('A', 'C')).toThrow('Edge not found')
  })

  test('removeNode throws for unknown node', () => {
    const g = new DirectedGraph<string>('A')
    expect(() => g.removeNode('Z')).toThrow('Node not found')
  })

  test('isAdjacent throws for unknown node', () => {
    const g = new DirectedGraph<string>('A')
    expect(() => g.isAdjacent('Z', 'A')).toThrow('First node not found')
  })

  test('getEdges throws for unknown node', () => {
    const g = new DirectedGraph<string>('A')
    expect(() => g.getEdges('Z')).toThrow('Node not found')
  })
})
