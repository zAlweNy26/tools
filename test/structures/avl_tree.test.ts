import { AVLNode, AVLTree } from '@structures/avl_tree'
import { describe, expect, test } from 'bun:test'

describe('AVLNode', () => {
  test('constructor creates leaf with height 0', () => {
    const node = new AVLNode(5)
    expect(node.data).toBe(5)
    expect(node.left).toBeNull()
    expect(node.right).toBeNull()
    expect(node.height).toBe(0)
  })

  test('constructor with children', () => {
    const left = new AVLNode(2)
    const right = new AVLNode(8)
    const node = new AVLNode(5, left, right)
    expect(node.left).toBe(left)
    expect(node.right).toBe(right)
  })

  test('height defaults to 0 for any new node', () => {
    const left = new AVLNode(2)
    const node = new AVLNode(5, left)
    expect(left.height).toBe(0)
    expect(node.height).toBe(0)
  })
})

describe('AVLTree', () => {
  test('empty tree properties', () => {
    const tree = new AVLTree<number>()
    expect(tree.size()).toBe(0)
    expect(tree.isEmpty).toBeTrue()
    expect(tree.height).toBe(-1)
    expect(tree.min()).toBeUndefined()
    expect(tree.max()).toBeUndefined()
    expect(tree.traverse()).toEqual([])
    expect([...tree]).toEqual([])
  })

  test('insert maintains sorted in-order', () => {
    const tree = new AVLTree<number>()
    tree.insert(3).insert(1).insert(4).insert(0).insert(2)
    expect(tree.traverse()).toEqual([0, 1, 2, 3, 4])
  })

  test('insert rebalances left-left case (right rotation)', () => {
    const tree = new AVLTree<number>()
    tree.insert(3).insert(2).insert(1)
    expect(tree.traverse()).toEqual([1, 2, 3])
    expect(tree.height).toBe(1)
  })

  test('insert rebalances right-right case (left rotation)', () => {
    const tree = new AVLTree<number>()
    tree.insert(1).insert(2).insert(3)
    expect(tree.traverse()).toEqual([1, 2, 3])
    expect(tree.height).toBe(1)
  })

  test('insert rebalances left-right case (left-right rotation)', () => {
    const tree = new AVLTree<number>()
    tree.insert(3).insert(1).insert(2)
    expect(tree.traverse()).toEqual([1, 2, 3])
    expect(tree.height).toBe(1)
  })

  test('insert rebalances right-left case (right-left rotation)', () => {
    const tree = new AVLTree<number>()
    tree.insert(1).insert(3).insert(2)
    expect(tree.traverse()).toEqual([1, 2, 3])
    expect(tree.height).toBe(1)
  })

  test('insert duplicate overwrites value', () => {
    const tree = new AVLTree<number>()
    tree.insert(5).insert(5)
    expect(tree.size()).toBe(1)
  })

  test('contains and search', () => {
    const tree = new AVLTree<number>()
    tree.insert(5).insert(3).insert(7)
    expect(tree.contains(3)).toBeTrue()
    expect(tree.contains(99)).toBeFalse()
    expect(tree.search(3)).toBe(3)
    expect(tree.search(99)).toBeUndefined()
  })

  test('min and max', () => {
    const tree = new AVLTree<number>()
    tree.insert(5).insert(3).insert(7).insert(1).insert(9)
    expect(tree.min()).toBe(1)
    expect(tree.max()).toBe(9)
  })

  test('delete leaf rebalances', () => {
    const tree = new AVLTree<number>()
    tree.insert(5).insert(3).insert(7).insert(2).insert(4)
    tree.delete(7)
    expect(tree.contains(7)).toBeFalse()
    expect(tree.traverse()).toEqual([2, 3, 4, 5])
  })

  test('delete node with one child', () => {
    const tree = new AVLTree<number>()
    tree.insert(5).insert(3).insert(7).insert(4)
    tree.delete(3)
    expect(tree.contains(3)).toBeFalse()
    expect(tree.traverse()).toEqual([4, 5, 7])
  })

  test('delete node with two children', () => {
    const tree = new AVLTree<number>()
    tree.insert(5).insert(3).insert(7).insert(2).insert(4).insert(6).insert(8)
    tree.delete(3)
    expect(tree.contains(3)).toBeFalse()
    expect(tree.traverse()).toEqual([2, 4, 5, 6, 7, 8])
  })

  test('delete root', () => {
    const tree = new AVLTree<number>()
    tree.insert(5).insert(3).insert(7)
    tree.delete(5)
    expect(tree.contains(5)).toBeFalse()
    expect(tree.traverse()).toEqual([3, 7])
  })

  test('delete non-existent throws', () => {
    const tree = new AVLTree<number>()
    tree.insert(5)
    expect(() => tree.delete(99)).toThrow('Value not found')
  })

  test('constructor with iterable', () => {
    const tree = new AVLTree([3, 1, 2, 5, 4])
    expect(tree.size()).toBe(5)
    expect(tree.traverse()).toEqual([1, 2, 3, 4, 5])
  })

  test('constructor with comparator and iterable', () => {
    const tree = new AVLTree<string>((a, b) => a.localeCompare(b), ['c', 'a', 'b'])
    expect(tree.traverse()).toEqual(['a', 'b', 'c'])
  })

  test('custom comparator (descending)', () => {
    const tree = new AVLTree<number>((a, b) => b - a)
    tree.insert(3).insert(1).insert(2)
    expect(tree.traverse()).toEqual([3, 2, 1])
  })

  test('fluent API', () => {
    const tree = new AVLTree<number>()
    expect(tree.insert(1)).toBe(tree)
    expect(tree.delete(1)).toBe(tree)
    expect(tree.clear()).toBe(tree)
  })

  test('height stays O(log n) for sorted input', () => {
    const tree = new AVLTree<number>()
    for (let i = 0; i < 100; i++) tree.insert(i)
    expect(tree.height).toBeLessThanOrEqual(10)
    expect(tree.size()).toBe(100)
  })

  test('traversal orders', () => {
    const tree = new AVLTree<number>()
    tree.insert(5).insert(3).insert(7).insert(2).insert(4).insert(6).insert(8)
    expect(tree.traverse('in')).toEqual([2, 3, 4, 5, 6, 7, 8])
    expect(tree.traverse('pre')).toEqual([5, 3, 2, 4, 7, 6, 8])
    expect(tree.traverse('post')).toEqual([2, 4, 3, 6, 8, 7, 5])
    expect(tree.traverse('height')).toEqual([5, 3, 7, 2, 4, 6, 8])
  })

  test('height of single node tree is 0', () => {
    const tree = new AVLTree<number>()
    tree.insert(5)
    expect(tree.height).toBe(0)
  })

  test('height after delete updates', () => {
    const tree = new AVLTree<number>()
    tree.insert(5).insert(3).insert(7).insert(2)
    expect(tree.height).toBe(2)
    tree.delete(2)
    expect(tree.height).toBe(1)
  })

  test('clear resets tree', () => {
    const tree = new AVLTree<number>()
    tree.insert(5).insert(3).insert(7)
    tree.clear()
    expect(tree.size()).toBe(0)
    expect(tree.isEmpty).toBeTrue()
  })

  test('isBalanced true for empty and single-node tree', () => {
    const tree = new AVLTree<number>()
    expect(tree.isBalanced()).toBeTrue()
    tree.insert(5)
    expect(tree.isBalanced()).toBeTrue()
  })

  test('isBalanced stays true after sequence of inserts', () => {
    const tree = new AVLTree<number>()
    for (let i = 0; i < 50; i++) {
      tree.insert(i)
      expect(tree.isBalanced()).toBeTrue()
    }
  })

  test('delete triggers right rotation', () => {
    const tree = new AVLTree<number>()
    tree.insert(3).insert(2).insert(4).insert(1)
    tree.delete(4)
    expect(tree.traverse()).toEqual([1, 2, 3])
    expect(tree.traverse('pre')).toEqual([2, 1, 3])
    expect(tree.height).toBe(1)
    expect(tree.isBalanced()).toBeTrue()
  })

  test('delete triggers double rotation (LR)', () => {
    const tree = new AVLTree<number>()
    tree.insert(6).insert(3).insert(7).insert(5)
    tree.delete(7)
    expect(tree.traverse()).toEqual([3, 5, 6])
    expect(tree.traverse('pre')).toEqual([5, 3, 6])
    expect(tree.height).toBe(1)
    expect(tree.isBalanced()).toBeTrue()
  })

  test('delete from empty tree throws', () => {
    const tree = new AVLTree<number>()
    expect(() => tree.delete(1)).toThrow('Value not found')
  })

  test('randomized operations maintain invariants', () => {
    const tree = new AVLTree<number>()
    let state = 42
    const rand = (n: number) => {
      state = (state * 1664525 + 1013904223) | 0
      return (state >>> 0) % n
    }
    const values = Array.from({ length: 100 }, (_, i) => i)

    for (let i = 0; i < 300; i++) {
      const value = values[rand(values.length)]!
      if (rand(10) < 7)
        tree.insert(value)
      else {
        try {
          tree.delete(value)
        }
        catch { /* expected */ }
      }

      const arr = [...tree]
      for (let j = 1; j < arr.length; j++)
        expect(arr[j - 1]).toBeLessThanOrEqual(arr[j]!)
      expect(tree.isBalanced()).toBeTrue()
    }
  })

  test('insert all then delete all', () => {
    const tree = new AVLTree<number>()
    const n = 50
    for (let i = 0; i < n; i++) tree.insert(i)
    expect(tree.size()).toBe(n)
    expect(tree.isBalanced()).toBeTrue()

    for (let i = 0; i < n; i++) {
      tree.delete(i)
      expect(tree.isBalanced()).toBeTrue()
      expect(tree.size()).toBe(n - i - 1)
    }
    expect(tree.isEmpty).toBeTrue()
  })

  test('node height can only be recomputed from its children', () => {
    const node = new AVLNode(2, new AVLNode(1))
    node.updateHeight()
    expect(node.height).toBe(1)
    expect(() => {
      // @ts-expect-error height is read-only
      node.height = 99
    }).toThrow()
  })
})
