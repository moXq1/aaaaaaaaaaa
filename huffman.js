class Heap {
    constructor(fndown = (l, r, p) => {
        if (p > r && r <= l) return 1;
        if (p > l && l <= r) return 2;
        return -1;
    }, fnup = (p, v) => p > v) {
        this.h = [];
        this.length = 0;
        this.compareFn = fndown;
        this.fnUp = fnup;
    }

    insert(value) {
        this.h.push(value);
        this.length++;
        this.heapup(this.length - 1);
    }

    pop() {
        if (this.length === 0) return;
        if (this.length === 1) {
            this.length = 0;
            return this.h.pop();
        }

        const returnVal = this.h[0];
        this.h[0] = this.h.pop();
        this.length--;
        this.heapDown(0);
        return returnVal;
    }

    heapup(index) {
        if (index === 0) return;
        const parentIndex = this.getParent(index);
        if (this.fnUp(this.h[parentIndex], this.h[index])) {
            [this.h[parentIndex], this.h[index]] = [this.h[index], this.h[parentIndex]];
            this.heapup(parentIndex);
        }
    }

    heapDown(index) {
        const leftIndex = this.getLeftChild(index);
        const rightIndex = this.getRightChild(index);
        if (leftIndex >= this.length) return;

        const leftValue = this.h[leftIndex];
        const rightValue = this.h[rightIndex];
        const currentValue = this.h[index];

        if (this.compareFn(leftValue, rightValue, currentValue) === 1) {
            [this.h[rightIndex], this.h[index]] = [this.h[index], this.h[rightIndex]];
            this.heapDown(rightIndex);
        } else if (this.compareFn(leftValue, rightValue, currentValue) === 2) {
            [this.h[leftIndex], this.h[index]] = [this.h[index], this.h[leftIndex]];
            this.heapDown(leftIndex);
        }
    }

    getParent(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChild(index) {
        return (index * 2) + 1;
    }

    getRightChild(index) {
        return (index * 2) + 2;
    }
}

class Node {
    constructor(value, letter) {
        this.value = value;
        this.letter = letter;
        this.left = null;
        this.right = null;
    }
}

const heap = new Heap((l, r, p) => {
    if (p.value > r?.value && r?.value <= l.value) return 1;
    if (p.value > l.value && l.value <= r?.value) return 2;
    return -1;
}, (p, v) => p.value > v.value);

const str = "AABBFDAABD";
const map = new Map();

for (let l of str) {
    map.set(l, (map.get(l) || 0) + 1);
}

for (let [key, value] of map) {
    heap.insert(new Node(value, key));
}

while (heap.length > 1) {
    const l = heap.pop();
    const r = heap.pop();
    const node = new Node(l.value + r.value, "");
    node.left = l;
    node.right = r;
    heap.insert(node);
}

const tree = heap.pop();

function codeToTree(tree) {
    if (!tree) return;
    if (tree.left) tree.left.code = 0;
    if (tree.right) tree.right.code = 1;
    codeToTree(tree.left);
    codeToTree(tree.right);
}
codeToTree(tree);

function traverse(tree, letter, code = "") {
    if (!tree) return "";
    if (tree.letter === letter) return code + (tree.code ?? "");
    return traverse(tree.left, letter, code + (tree.code ?? "")) + traverse(tree.right, letter, code + (tree.code ?? ""));
}

function codeString(str, tree) {
    let result = "";
    for (let s of str) {
        result += traverse(tree, s);
    }
    return result;
}

const encodedString = codeString(str, tree);
console.log(encodedString);