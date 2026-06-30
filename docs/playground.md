# Playground

Try out the library directly in your browser. Type an expression and press <kbd>Enter</kbd> to run it.

All exports are available globally — you don't need to write import statements.

<Repl />

## Quick examples

Copy and paste any of these into the REPL above:

### Data Structures

```ts
const stack = new Stack(5)
stack.push(1)
stack.push(2)
stack.push(3)
console.log(stack.pop())
console.log(stack.peek())
console.log(stack.size())
```

```ts
const q = new Queue(3)
q.enqueue('a')
q.enqueue('b')
console.log(q.dequeue())
```

### Distance Functions

```ts
console.log(euclidean([0, 0], [3, 4]))
console.log(cosine([1, 0], [0, 1]))
console.log(manhattan([1, 2], [4, 6]))
```

### Sorting

```ts
console.log(quickSortNum([3, 1, 4, 1, 5, 9]))
console.log(mergeSortStr(['banana', 'apple', 'cherry']))
```

### Graphs

```ts
const g = new Graph(1)
g.addEdge(1, 2)
g.addEdge(1, 3)
g.addEdge(2, 4)
console.log(breadthFirstSearch(g))
console.log(depthFirstSearch(g))
```

### Utilities

```ts
const rng = new Randomizer(42)
console.log(rng.random())
console.log(linearSpace(0, 10, 5))
```
