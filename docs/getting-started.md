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
$ deno add @danyalwe/tools
```

:::

## Data Structures

```ts
// Stack
const stack = new Stack<number>(5)
stack.push(1)
stack.push(2)
stack.pop() // 2
stack.peek() // 1

// Queue
const queue = new Queue<string>(5)
queue.enqueue('a')
queue.enqueue('b')
queue.dequeue() // 'a'

// FixedArray
const arr = new FixedArray<number>(3)
arr.push(10)
arr.push(20)
arr.push(30)
// arr.push(40) // throws: Array is full
```

## Distance Functions

```ts
euclidean([0, 0], [3, 4]) // 5
cosine([1, 0], [0, 1]) // 1
manhattan([0, 0], [3, 4]) // 7
```

## Sorting Algorithms

```ts
quickSortNum([3, 1, 4, 1, 5, 9]) // [1, 1, 3, 4, 5, 9]
mergeSortStr(['banana', 'apple', 'cherry']) // ['apple', 'banana', 'cherry']
countingSort([4, 2, 2, 8, 3, 3, 1]) // [1, 2, 2, 3, 3, 4, 8]
```

## Graph Algorithms

```ts
const graph = new Graph(1)
graph.addEdge(1, 2)
graph.addEdge(1, 3)
graph.addEdge(2, 4)

breadthFirstSearch(graph) // [1, 2, 3, 4]
depthFirstSearch(graph) // [1, 3, 2, 4]
```

## Dimensionality Reduction

```ts
const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
const tsne = new TSNE(data)
tsne.init()
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
measureTime(quickSortNum, [3, 1, 4, 1, 5]) // time in ms
```
