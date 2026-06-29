import { describe, expect, test } from 'bun:test'
import { Tree, TreeLeaf } from 'structures/tree'

function buildTestTree() {
  const tree = new Tree(1)
  const node2 = tree.root.push(2)
  const node3 = tree.root.push(3)
  node2.push(4)
  node2.push(5)
  node3.push(6)
  return tree
}

describe('TreeLeaf', () => {
  test('constructor with data creates leaf with no children', () => {
    const leaf = new TreeLeaf(1)
    expect(leaf.data).toBe(1)
    expect(leaf.leaves).toEqual([])
    expect(leaf.children).toEqual([])
    expect(leaf.height).toBe(0)
  })

  test('push adds child and returns it', () => {
    const leaf = new TreeLeaf(1)
    const child = leaf.push(2)
    expect(child.data).toBe(2)
    expect(leaf.leaves.length).toBe(1)
    expect(leaf.children).toEqual([2])
    expect(child.height).toBe(0)
    expect(leaf.height).toBe(1)
  })

  test('push multiple children', () => {
    const leaf = new TreeLeaf(1)
    leaf.push(2, 3, 4)
    expect(leaf.leaves.length).toBe(3)
    expect(leaf.children).toEqual([2, 3, 4])
  })

  test('height is max child height + 1', () => {
    const root = new TreeLeaf(1)
    const child = root.push(2)
    root.push(3)
    const grandchild = child.push(4)
    expect(grandchild.height).toBe(0)
    expect(child.height).toBe(1)
    expect(root.height).toBe(2)
  })
})

describe('Tree', () => {
  test('constructor creates root with given data', () => {
    const tree = new Tree(42)
    expect(tree.root.data).toBe(42)
    expect(tree.depth).toBe(0)
  })

  test('traverse pre-order', () => {
    const tree = buildTestTree()
    expect(tree.traverse('pre')).toEqual([1, 2, 4, 5, 3, 6])
  })

  test('traverse post-order', () => {
    const tree = buildTestTree()
    expect(tree.traverse('post')).toEqual([4, 5, 2, 6, 3, 1])
  })

  test('traverse in-order', () => {
    const tree = buildTestTree()
    expect(tree.traverse('in')).toEqual([4, 2, 5, 1, 6, 3])
  })

  test('traverse height-order', () => {
    const tree = buildTestTree()
    expect(tree.traverse('height')).toEqual([1, 2, 3, 4, 5, 6])
  })

  test('default traverse is pre-order', () => {
    const tree = buildTestTree()
    expect(tree.traverse()).toEqual(tree.traverse('pre'))
  })

  test('search finds existing node', () => {
    const tree = buildTestTree()
    const found = tree.search(5)
    expect(found).toBeDefined()
    expect(found!.data).toBe(5)
    expect(found!.leaves).toEqual([])
  })

  test('search returns undefined for missing value', () => {
    const tree = buildTestTree()
    expect(tree.search(99)).toBeUndefined()
  })

  test('depth returns tree height', () => {
    const tree = buildTestTree()
    expect(tree.depth).toBe(2)
  })

  test('single node tree depth is 0', () => {
    const tree = new Tree(1)
    expect(tree.depth).toBe(0)
  })
})
