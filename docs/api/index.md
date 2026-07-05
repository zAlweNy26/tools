# API Reference

## Interfaces

| Interface | Description |
| ------ | ------ |
| [DimRedParams](interfaces/DimRedParams.md) | Interface for the parameters used in dimensionality reduction algorithms. |
| [Pipe](interfaces/Pipe.md) | Interface for a pipable function that allows chaining operations. |
| [Structure](interfaces/Structure.md) | Interface for data structures. |
| [TSNEParams](interfaces/TSNEParams.md) | Interface for t-SNE parameters, which extends the base dimensionality reduction parameters. |

## Dimensionality Reduction

| Class | Description |
| ------ | ------ |
| [TSNE](classes/TSNE.md) | Implementation of the t-Distributed Stochastic Neighbor Embedding (t-SNE) algorithm. |

## Distances

| Function | Description |
| ------ | ------ |
| [angular](functions/angular.md) | Calculates the angular distance between `a` and `b`. Defined as `acos(cosine_similarity) / π`, bounded in [0, 1]. |
| [canberra](functions/canberra.md) | Calculates the Canberra distance between `a` and `b`. |
| [chebyshev](functions/chebyshev.md) | Calculates the Chebyshev distance between `a` and `b`. |
| [cosine](functions/cosine.md) | Calculates the cosine distance (not similarity) between `a` and `b`. |
| [euclidean](functions/euclidean.md) | Calculates the Euclidean distance between `a` and `b`. |
| [euclideanSquared](functions/euclideanSquared.md) | Calculates the squared Euclidean distance between `a` and `b`. |
| [euclideanWeighted](functions/euclideanWeighted.md) | Returns a function that calculates the weighted Euclidean distance between `a` and `b` using the given per-dimension weight vector. |
| [hamming](functions/hamming.md) | Calculates the Hamming distance between `a` and `b`. |
| [manhattan](functions/manhattan.md) | Calculates the Manhattan distance between `a` and `b`. |
| [minkowski](functions/minkowski.md) | Returns a function that calculates the Minkowski distance between `a` and `b` using order `p`. When `p = 1` it is equivalent to Manhattan distance, `p = 2` to Euclidean distance, and `p → ∞` to Chebyshev distance. |
| [pearson](functions/pearson.md) | Calculates the Pearson correlation distance between `a` and `b`. Defined as `1 - r`, where `r` is the Pearson correlation coefficient. The result is bounded in [0, 2]; 0 means perfect positive correlation, 2 means perfect negative correlation. |

## Sortings

| Function | Description |
| ------ | ------ |
| [bubbleSort](functions/bubbleSort.md) | Sorts an array using the bubble sort algorithm. |
| [countingSort](functions/countingSort.md) | Sorts an array using the counting sort algorithm. |
| [insertionSort](functions/insertionSort.md) | Sorts an array using the insertion sort algorithm. |
| [mergeSort](functions/mergeSort.md) | Sorts an array using the merge sort algorithm. |
| [quickSort](functions/quickSort.md) | Sorts an array using the quick sort algorithm. |
| [selectionSort](functions/selectionSort.md) | Sorts an array using the selection sort algorithm. |

## Structures

| Name | Description |
| ------ | ------ |
| [BinarySearchTree](classes/BinarySearchTree.md) | A binary search tree data structure. |
| [BSTNode](classes/BSTNode.md) | A node in a binary search tree. |
| [CircularQueue](classes/CircularQueue.md) | A circular queue data structure. |
| [DirectedGraph](classes/DirectedGraph.md) | A directed graph data structure. Edges go in one direction only. |
| [DoublyLinkedList](classes/DoublyLinkedList.md) | A doubly linked list data structure. |
| [DoublyListNode](classes/DoublyListNode.md) | Represents a node in a doubly linked list. |
| [FixedArray](classes/FixedArray.md) | A fixed-capacity array that extends the built-in Array class. |
| [Graph](classes/Graph.md) | A graph data structure. |
| [Heap](classes/Heap.md) | A binary heap data structure. |
| [LinkedList](classes/LinkedList.md) | A singly linked list data structure. |
| [Matrix](classes/Matrix.md) | A matrix data structure. |
| [Queue](classes/Queue.md) | A queue data structure. |
| [Stack](classes/Stack.md) | A stack data structure. |
| [Tree](classes/Tree.md) | Represents a tree data structure. |
| [TreeLeaf](classes/TreeLeaf.md) | Represents a leaf in a tree data structure. |
| [WeightedDirectedGraph](classes/WeightedDirectedGraph.md) | A directed, weighted graph data structure. Edges go in one direction only with weights. |
| [WeightedGraph](classes/WeightedGraph.md) | A weighted graph data structure. |
| [Edge](type-aliases/Edge.md) | An edge represented as a tuple of a vertex and its weight. |
| [Weight](type-aliases/Weight.md) | Weight value type used in weighted graphs. |

## Traversals

| Function | Description |
| ------ | ------ |
| [breadthFirstSearch](functions/breadthFirstSearch.md) | Performs a breadth-first search traversal on a graph. |
| [depthFirstSearch](functions/depthFirstSearch.md) | Performs a depth-first search traversal on a graph. |
| [heightOrder](functions/heightOrder.md) | Traverses a tree by height (level order), visiting the root, then all nodes at each subsequent level. |
| [inOrder](functions/inOrder.md) | Performs an in-order traversal of a tree. Visits children up to `splitAt`, then the root, then remaining children. |
| [kruskal](functions/kruskal.md) | Finds the minimum spanning tree of a weighted graph using Kruskal's algorithm. |
| [postOrder](functions/postOrder.md) | Traverses a tree in post-order (children left-to-right, then root). |
| [preOrder](functions/preOrder.md) | Traverses a tree in pre-order (root first, then children left-to-right). |

## Utils

| Name | Description |
| ------ | ------ |
| [Randomizer](classes/Randomizer.md) | A Mersenne Twister random number generator. |
| [getLCP](functions/getLCP.md) | Returns the length of the longest common prefix between two strings. |
| [linearSpace](functions/linearSpace.md) | Returns an array of linearly spaced numbers between `start` and `end`. |
| [measure](functions/measure.md) | A decorator function that measures the execution time of a method and logs it to the console. |
| [measureTime](functions/measureTime.md) | Measures the time it takes for a function to execute. |
| [pipe](functions/pipe.md) | Creates a pipeline of functions where the output of one function is passed as the input to the next. |
| [tryCatch](functions/tryCatch.md) | Catches errors from a promise. |
