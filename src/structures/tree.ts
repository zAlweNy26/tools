/**
 * Represents a leaf in a tree data structure.
 * @template T The type of data stored in the leaf.
 */
export class TreeLeaf<T> {
    /**
     * The child leaves of this leaf.
     */
    leaves: TreeLeaf<T>[] = []

    /**
     * Creates a new TreeLeaf instance.
     * @param data The data to store in the leaf.
     * @param leaves Optional child leaves to add to the leaf.
     */
    constructor(public data: T, leaves?: TreeLeaf<T>[]) {
        this.leaves = leaves ?? []
    }

    /**
     * Adds one or more child leaves to this leaf.
     * @param data The data to store in the new leaves.
     * @param datas Additional data to store in new leaves.
     * @returns The last leaf that was added.
     */
    push(data: T, ...datas: T[]) {
        let leaf = new TreeLeaf(data, [])
        this.leaves.push(leaf)
        for (const d of datas) {
            leaf = new TreeLeaf(d, [])
            this.leaves.push(leaf)
        }
        return leaf
    }

    /**
     * Returns an array of the data stored in the child leaves of this leaf.
     */
    get children() {
        return this.leaves.map(l => l.data)
    }

    /**
     * Returns the height of the tree rooted at this leaf.
     */
    get height(): number {
        return this.leaves.length > 0 ? 1 + Math.max(0, ...this.leaves.map(c => c.height)) : 0
    }
}

const preOrder = <T>(node: TreeLeaf<T>, list: T[]) => { // root -> leaves
    list.push(node.data)
    for (const child of node.leaves) preOrder(child, list)
}

const postOrder = <T>(node: TreeLeaf<T>, list: T[]) => { // leaves -> root
    for (const child of node.leaves) postOrder(child, list)
    list.push(node.data)
}

const inOrder = <T>(node: TreeLeaf<T>, list: T[]) => { // first half -> root -> second half
    if (node.leaves.length == 0) list.push(node.data)
    else {
        const n = node.leaves.length, nd = Math.round(n / 2)
        for (let i = 0; i < nd; i++) {
            inOrder(node.leaves[i], list)
        }
        list.push(node.data)
        for (let i = nd; i < n; i++) {
            inOrder(node.leaves[i], list)
        }
    }
}

const heightOrder = <T>(node: TreeLeaf<T>, list: T[], first = true) => { // leaves for each height from top to bottom
    if (first) list.push(node.data)
    list.push(...node.leaves.map(l => l.data))
    for (const child of node.leaves) heightOrder(child, list, false)
}

/**
 * Represents a tree data structure.
 * @template T The type of data stored in the tree.
 */
export class Tree<T> {
    /** The root node of the tree. */
    root!: TreeLeaf<T>

    /**
     * Creates a new tree with the specified data as the root node.
     * @param data The data to be stored in the root node.
     */
    constructor(data: T) {
        this.root = new TreeLeaf(data)
    }

    /**
     * Traverses the tree in the specified order and returns an array of the visited nodes' data.
     * @param order The order in which to traverse the tree. Defaults to "pre".
     * @returns An array of the visited nodes' data.
     */
    traverse(order: "post" | "pre" | "in" | "height" = "pre"): T[] {
        const result: T[] = []

        if (order == "pre") preOrder(this.root, result)
        else if (order == "post") postOrder(this.root, result)
        else if (order == "in") inOrder(this.root, result)
        else if (order == "height") heightOrder(this.root, result)

        return result
    }

    /**
     * Searches the tree for a node with the specified data and returns the node if found.
     * @param value The data to search for.
     * @returns The node with the specified data, or undefined if not found.
     */
    search(value: T): TreeLeaf<T> | undefined {
        const queue: TreeLeaf<T>[] = [this.root]
        while (queue.length > 0) {
            const node = queue.shift()!
            if (node.data == value) return node
            queue.push(...node.leaves)
        }
        return undefined
    }

    /**
     * Gets the depth of the tree.
     * @returns The depth of the tree.
     */
    get depth(): number {
        return this.root.height
    }
}