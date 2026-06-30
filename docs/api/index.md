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
| [DimRed](classes/DimRed.md) | A class for performing dimensionality reduction on a matrix of data. |
| [TSNE](classes/TSNE.md) | Implementation of the t-Distributed Stochastic Neighbor Embedding (t-SNE) algorithm. |

## Distances

| Function | Description |
| ------ | ------ |
| [canberra](functions/canberra.md) | Calculates the Canberra distance between `a` and `b`. |
| [chebyshev](functions/chebyshev.md) | Calculates the Chebyshev distance between `a` and `b`. |
| [cosine](functions/cosine.md) | Calculates the cosine distance (not similarity) between `a` and `b`. |
| [euclidean](functions/euclidean.md) | Calculates the Euclidean distance between `a` and `b`. |
| [euclideanSquared](functions/euclideanSquared.md) | Calculates the squared Euclidean distance between `a` and `b`. |
| [hamming](functions/hamming.md) | Calculates the Hamming distance between `a` and `b`. |
| [manhattan](functions/manhattan.md) | Calculates the Manhattan distance between `a` and `b`. |

## Researches

| Function | Description |
| ------ | ------ |
| [breadthFirstSearch](functions/breadthFirstSearch.md) | Performs a breadth-first search traversal on a graph. |
| [depthFirstSearch](functions/depthFirstSearch.md) | Performs a depth-first search traversal on a graph. |
| [kruskal](functions/kruskal.md) | Finds the minimum spanning tree of a weighted graph using Kruskal's algorithm. |

## Sortings

| Function | Description |
| ------ | ------ |
| [countingSort](functions/countingSort.md) | Sorts an array of numbers using the counting sort algorithm. |
| [mergeSortNum](functions/mergeSortNum.md) | Sorts an array of numbers using the merge sort algorithm. |
| [mergeSortStr](functions/mergeSortStr.md) | Sorts an array of strings using the merge sort algorithm. |
| [quickSortNum](functions/quickSortNum.md) | Sorts an array of numbers using the quick sort algorithm. |
| [quickSortStr](functions/quickSortStr.md) | Sorts an array of strings using the quick sort algorithm. |

## Structures

| Name | Description |
| ------ | ------ |
| [BaseLinkedList](classes/BaseLinkedList.md) | Abstract base class for linked list implementations. |
| [CircularQueue](classes/CircularQueue.md) | A circular queue data structure. |
| [DoublyLinkedList](classes/DoublyLinkedList.md) | A doubly linked list data structure. |
| [DoublyListNode](classes/DoublyListNode.md) | Represents a node in a doubly linked list. |
| [FixedArray](classes/FixedArray.md) | A fixed-capacity array that extends the built-in Array class. |
| [Graph](classes/Graph.md) | A graph data structure. |
| [GraphStructure](classes/GraphStructure.md) | Abstract class representing a graph structure. |
| [LinkedList](classes/LinkedList.md) | A singly linked list data structure. |
| [ListNode](classes/ListNode.md) | Represents a node in a singly linked list. |
| [ListStructure](classes/ListStructure.md) | Abstract class representing a list structure. |
| [Matrix](classes/Matrix.md) | A matrix data structure. |
| [Queue](classes/Queue.md) | A queue data structure. |
| [Stack](classes/Stack.md) | A stack data structure. |
| [Tree](classes/Tree.md) | Represents a tree data structure. |
| [TreeLeaf](classes/TreeLeaf.md) | Represents a leaf in a tree data structure. |
| [WeightedGraph](classes/WeightedGraph.md) | A weighted graph data structure. |
| [Edge](type-aliases/Edge.md) | An edge represented as a tuple of a vertex and its weight. |
| [Weight](type-aliases/Weight.md) | Weight value type used in weighted graphs. |

## Utils

| Name | Description |
| ------ | ------ |
| [Randomizer](classes/Randomizer.md) | A Mersenne Twister random number generator. |
| [getLCP](functions/getLCP.md) | Returns the length of the longest common prefix between two strings. |
| [isArray2D](functions/isArray2D.md) | Type guard function that checks if an array is a 2D array of a specific type. |
| [isOfType](functions/isOfType.md) | Type guard function that checks if a value is of a certain type. |
| [isRightArray](functions/isRightArray.md) | Type guard function that checks if an array is of type T[]. |
| [linearSpace](functions/linearSpace.md) | Returns an array of linearly spaced numbers between `start` and `end`. |
| [measure](functions/measure.md) | A decorator function that measures the execution time of a method and logs it to the console. |
| [measureTime](functions/measureTime.md) | Measures the time it takes for a function to execute. |
| [pipe](functions/pipe.md) | Creates a pipeline of functions where the output of one function is passed as the input to the next. |
