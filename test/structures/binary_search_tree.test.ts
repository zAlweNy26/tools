import { BinarySearchTree, BSTNode } from '@structures/binary_search_tree'
import { describe, expect, test } from 'bun:test'

describe('BSTNode', () => {
  test('constructor with data creates node with null children', () => {
    const node = new BSTNode(5)
    expect(node.data).toBe(5)
    expect(node.left).toBeNull()
    expect(node.right).toBeNull()
  })

  test('constructor with children', () => {
    const left = new BSTNode(2)
    const right = new BSTNode(8)
    const node = new BSTNode(5, left, right)
    expect(node.left).toBe(left)
    expect(node.right).toBe(right)
  })

  test('height of leaf node is 0', () => {
    const node = new BSTNode(5)
    expect(node.height).toBe(0)
  })

  test('height with one child', () => {
    const left = new BSTNode(2)
    const node = new BSTNode(5, left)
    expect(node.height).toBe(1)
  })

  test('height with two children', () => {
    const left = new BSTNode(2)
    const right = new BSTNode(8)
    const node = new BSTNode(5, left, right)
    expect(node.height).toBe(1)
  })

  test('height with deeper subtree', () => {
    const grandchild = new BSTNode(1)
    const left = new BSTNode(2, grandchild)
    const node = new BSTNode(5, left)
    expect(node.height).toBe(2)
  })
})

describe('BinarySearchTree', () => {
  test('empty tree properties', () => {
    const bst = new BinarySearchTree<number>()
    expect(bst.size).toBe(0)
    expect(bst.isEmpty).toBeTrue()
    expect(bst.min()).toBeUndefined()
    expect(bst.max()).toBeUndefined()
    expect(bst.search(1)).toBeUndefined()
    expect(bst.contains(1)).toBeFalse()
    expect(bst.traverse()).toEqual([])
    expect([...bst]).toEqual([])
  })

  test('insert and size', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(3).insert(7)
    expect(bst.size).toBe(3)
    expect(bst.isEmpty).toBeFalse()
  })

  test('insert duplicate replaces value', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(5)
    expect(bst.size).toBe(1)
    expect(bst.contains(5)).toBeTrue()
  })

  test('contains and search', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(3).insert(7)
    expect(bst.contains(3)).toBeTrue()
    expect(bst.contains(5)).toBeTrue()
    expect(bst.contains(7)).toBeTrue()
    expect(bst.contains(99)).toBeFalse()
    expect(bst.search(3)).toBe(3)
    expect(bst.search(99)).toBeUndefined()
  })

  test('min and max', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(3).insert(7).insert(1).insert(9)
    expect(bst.min()).toBe(1)
    expect(bst.max()).toBe(9)
  })

  test('in-order traversal (default)', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(3).insert(7).insert(2).insert(4).insert(6).insert(8)
    expect(bst.traverse()).toEqual([2, 3, 4, 5, 6, 7, 8])
    expect(bst.traverse('in')).toEqual([2, 3, 4, 5, 6, 7, 8])
    expect([...bst]).toEqual([2, 3, 4, 5, 6, 7, 8])
  })

  test('pre-order traversal', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(3).insert(7).insert(2).insert(4).insert(6).insert(8)
    expect(bst.traverse('pre')).toEqual([5, 3, 2, 4, 7, 6, 8])
  })

  test('post-order traversal', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(3).insert(7).insert(2).insert(4).insert(6).insert(8)
    expect(bst.traverse('post')).toEqual([2, 4, 3, 6, 8, 7, 5])
  })

  test('height-order traversal', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(3).insert(7).insert(2).insert(4).insert(6).insert(8)
    expect(bst.traverse('height')).toEqual([5, 3, 7, 2, 4, 6, 8])
  })

  test('height-order traversal visits deeper levels in order', () => {
    const bst = new BinarySearchTree<number>()
    for (const v of [8, 4, 12, 2, 6, 10, 14, 1]) bst.insert(v)
    expect(bst.traverse('height')).toEqual([8, 4, 12, 2, 6, 10, 14, 1])
  })

  test('default comparator orders strings', () => {
    const bst = new BinarySearchTree<string>(['b', 'a', 'c'])
    expect(bst.size).toBe(3)
    expect(bst.traverse('in')).toEqual(['a', 'b', 'c'])
  })

  test('search returns the stored value for a key-based comparator', () => {
    interface User { id: number, name: string }
    const users = new BinarySearchTree<User>([{ id: 2, name: 'Bo' }, { id: 1, name: 'Al' }], { compare: (a, b) => a.id - b.id })
    expect(users.search({ id: 2, name: '' })?.name).toBe('Bo')
  })

  test('toArray and iteration return the values in order', () => {
    const bst = new BinarySearchTree([5, 3, 8, 1])
    expect(bst.toArray()).toEqual([1, 3, 5, 8])
    expect([...bst]).toEqual([1, 3, 5, 8])
  })

  test('clear', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(3).insert(7)
    bst.clear()
    expect(bst.size).toBe(0)
    expect(bst.isEmpty).toBeTrue()
    expect(bst.min()).toBeUndefined()
  })

  test('delete leaf node', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(3).insert(7)
    bst.delete(3)
    expect(bst.size).toBe(2)
    expect(bst.contains(3)).toBeFalse()
    expect(bst.traverse()).toEqual([5, 7])
  })

  test('delete node with one child', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(3).insert(4)
    bst.delete(3)
    expect(bst.contains(3)).toBeFalse()
    expect(bst.contains(4)).toBeTrue()
    expect(bst.traverse()).toEqual([4, 5])
  })

  test('delete node with two children', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(3).insert(7).insert(2).insert(4).insert(6).insert(8)
    bst.delete(3)
    expect(bst.contains(3)).toBeFalse()
    expect(bst.size).toBe(6)
    expect(bst.traverse()).toEqual([2, 4, 5, 6, 7, 8])
  })

  test('delete root', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(3).insert(7)
    bst.delete(5)
    expect(bst.contains(5)).toBeFalse()
    expect(bst.contains(3)).toBeTrue()
    expect(bst.contains(7)).toBeTrue()
    expect(bst.size).toBe(2)
  })

  test('delete returns false for a missing value', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5)
    expect(bst.delete(99)).toBeFalse()
    expect(bst.delete(5)).toBeTrue()
    expect(bst.size).toBe(0)
  })

  test('constructor with iterable', () => {
    const bst = new BinarySearchTree([3, 1, 2, 5, 4])
    expect(bst.size).toBe(5)
    expect(bst.traverse()).toEqual([1, 2, 3, 4, 5])
  })

  test('constructor with iterable and comparator', () => {
    const bst = new BinarySearchTree<string>(['c', 'a', 'b'], { compare: (a, b) => a.localeCompare(b) })
    expect(bst.traverse()).toEqual(['a', 'b', 'c'])
  })

  test('custom comparator (descending)', () => {
    const bst = new BinarySearchTree<number>([], { compare: (a, b) => b - a })
    bst.insert(3).insert(1).insert(2)
    expect(bst.traverse()).toEqual([3, 2, 1])
  })

  test('fluent insert returns this', () => {
    const bst = new BinarySearchTree<number>()
    const ret = bst.insert(1)
    expect(ret).toBe(bst)
  })

  test('fluent clear returns this', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(1)
    const ret = bst.clear()
    expect(ret).toBe(bst)
  })

  test('height of empty tree is -1', () => {
    const bst = new BinarySearchTree<number>()
    expect(bst.height).toBe(-1)
  })

  test('height of single node tree is 0', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5)
    expect(bst.height).toBe(0)
  })

  test('height after insert maintains correctly', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(3).insert(7).insert(2).insert(4)
    expect(bst.height).toBe(2)
  })

  test('height after insert (chain)', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(3).insert(1).insert(4).insert(0).insert(2)
    expect(bst.height).toBe(2)
  })

  test('height after delete updates', () => {
    const bst = new BinarySearchTree<number>()
    bst.insert(5).insert(3).insert(7).insert(2)
    expect(bst.height).toBe(2)
    bst.delete(2)
    expect(bst.height).toBe(1)
  })
})
