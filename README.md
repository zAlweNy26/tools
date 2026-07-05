# Alwe's Tools

[![NPM Version](https://img.shields.io/npm/v/@danyalwe/tools)](https://www.npmjs.com/package/@danyalwe/tools)
[![License](https://img.shields.io/npm/l/@danyalwe/tools)](./LICENSE)

A collection of data structures, algorithms, and utilities for TypeScript. Zero dependencies, fully typed.

## Install

```sh
npm add @danyalwe/tools
```

## Quick start

```ts
import {
  breadthFirstSearch,
  euclidean,
  Graph,
  LinkedList,
  quickSortNum,
  Randomizer,
  TSNE,
} from '@danyalwe/tools'

// Data structures
const list = new LinkedList([1, 2, 3])
list.append(4)

// Distances
euclidean([0, 0], [3, 4]) // 5

// Sorting
quickSortNum([3, 1, 4, 1, 5]) // [1, 1, 3, 4, 5]

// Graph algorithms
const graph = new Graph(1)
graph.addEdge(1, 2).addEdge(1, 3)
breadthFirstSearch(graph) // [1, 2, 3]

// Dimensionality reduction
const tsne = new TSNE([[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]])
tsne.transform(500)

// Random numbers
const rng = new Randomizer(42)
rng.random()
```

## Documentation

Full API reference at [alwe.dev/tools](https://alwe.dev/tools).

| Group | Description |
|-------|-------------|
| **Structures** | Stack, Queue, CircularQueue, FixedArray, LinkedList, DoublyLinkedList, Tree, Matrix, Graph, WeightedGraph |
| **Sortings** | Bubble, Counting, Insertion, Merge, Quick, Selection (numeric + string variants) |
| **Distances** | Angular, Canberra, Chebyshev, Cosine, Euclidean, EuclideanSquared, EuclideanWeighted, Hamming, Manhattan, Minkowski, Pearson |
| **Researches** | BFS, DFS, Kruskal's MST |
| **Dimensionality Reduction** | t-SNE |
| **Utils** | Randomizer (Mersenne Twister), pipe, measureTime, linearSpace, tryCatch |

## To-do

- [ ] Add other dimensionality reduction algorithms
- [ ] Add other utils

## Credits

Thanks to [DruidJS](https://github.com/saehm/DruidJS) for some portions of code that I converted to TypeScript and in some way refactored.
