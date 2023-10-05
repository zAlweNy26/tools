export class TreeLeaf<T> {
    leaves: TreeLeaf<T>[] = []

    constructor(public data: T, leaves?: TreeLeaf<T>[]) {
        this.leaves = leaves ?? []
    }

    push(data: T, ...datas: T[]) {
        let leaf = new TreeLeaf(data, [])
        this.leaves.push(leaf)
        for (const d of datas) {
            leaf = new TreeLeaf(d, [])
            this.leaves.push(leaf)
        }
        return leaf
    }

    get children() {
        return this.leaves.map(l => l.data)
    }

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

export class Tree<T> {
    root!: TreeLeaf<T>

    constructor(data: T) {
        this.root = new TreeLeaf(data)
    }

    traverse(order: "post" | "pre" | "in" | "height" = "pre") {
        const result: T[] = []

        if (order == "pre") preOrder(this.root, result)
        else if (order == "post") postOrder(this.root, result)
        else if (order == "in") inOrder(this.root, result)
        else if (order == "height") heightOrder(this.root, result)

        return result
    }

    search(value: T) {
        const queue: TreeLeaf<T>[] = [this.root]
        while (queue.length > 0) {
            const node = queue.shift()!
            if (node.data == value) return node
            queue.push(...node.leaves)
        }
        return undefined
    }

    get depth() {
        return this.root.height
    }
}