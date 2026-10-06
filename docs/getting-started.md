# Getting Started

## Installation

::: code-group

```sh [npm]
$ npm add @danyalwe/tools
```

```sh [pnpm]
$ pnpm add @danyalwe/tools
```

```sh [yarn]
$ yarn add @danyalwe/tools
```

```sh [bun]
$ bun add @danyalwe/tools
```

```sh [deno]
$ deno add npm:@danyalwe/tools
```

:::

## Import

```ts
import {
  Heap,
  Stack,
  Queue,
  FixedArray,
  euclidean,
  cosine,
  manhattan,
  quickSort,
  mergeSort,
  countingSort,
  Graph,
  breadthFirstSearch,
  depthFirstSearch,
  TSNE,
  Randomizer,
  linearSpace,
  measureTime,
} from '@danyalwe/tools'
```

## Conventions

Every structure follows the same rules:

- **Shared API**: `size` and `isEmpty` properties, `clear()` (which returns the structure), `toArray()`, and `for...of` iteration.
- **Constructors**: collections take `(items?, options?)`, like `new Set(iterable)`. Options hold `capacity` for Stack and Queue, or `compare` for ordered structures.
- **Comparators**: anything that orders elements accepts an `Array.prototype.sort`-style comparator, `(a, b) => number`. The default, `defaultCompare`, orders numbers and strings.
- **Missing vs invalid**: reading or removing something that isn't there returns `undefined` (or `false` for removals), e.g. `pop()` on an empty stack. Invalid input throws, e.g. an out-of-range index or pushing onto a full stack.
- **Complexity**: every method's time complexity is listed under *Complexity* in the [API reference](/api/).

## Data Structures

```ts
// Stack
const stack = new Stack([1, 2])
stack.push(3)
stack.pop() // 3
stack.peek() // 2

// Queue, limited to 5 elements
const queue = new Queue<string>([], { capacity: 5 })
queue.enqueue('a').enqueue('b')
queue.dequeue() // 'a'

// Heap with a custom comparator (max-heap)
const heap = new Heap([3, 1, 2], { compare: (a, b) => b - a })
heap.peek() // 3

// FixedArray
const arr = new FixedArray<number>(3)
arr.push(10)
arr.push(20)
arr.push(30)
// arr.push(40) // throws: Array is full
```

## Distance Functions

```ts
euclidean([0, 0], [3, 4])  // 5
cosine([1, 0], [0, 1])     // 1
manhattan([0, 0], [3, 4])  // 7
```

## Sorting Algorithms

```ts
quickSort([3, 1, 4, 1, 5, 9]) // [1, 1, 3, 4, 5, 9]
mergeSort(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
countingSort([4, 2, 2, 8, 3, 3, 1]) // [1, 2, 2, 3, 3, 4, 8]
```

## Graph Algorithms

```ts
const graph = new Graph(1)
graph.addEdge(1, 2)
graph.addEdge(1, 3)
graph.addEdge(2, 4)

breadthFirstSearch(graph) // [1, 2, 3, 4]
depthFirstSearch(graph)   // [1, 2, 4, 3]
```

## Dimensionality Reduction

```ts
const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
const tsne = new TSNE(data)
const result = tsne.transform(500) // Matrix with reduced dimensions
```

## Utilities

```ts
// Random number generation
const rng = new Randomizer(42)
rng.random() // 0.566...

// Linearly spaced numbers
linearSpace(0, 10, 5) // [0, 2.5, 5, 7.5, 10]

// Execution time measurement
measureTime(quickSort, [3, 1, 4, 1, 5]) // time in ms
```
