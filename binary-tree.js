'use strict';

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(data) {
		if (this.root === null) {
			this.root = new Node(data, null, null);
		}
		else {
			var curr = this.root;
			while (curr != null) {
				if (data > curr.data) {
					if (curr.right === null) {
						curr.right = new Node(data, null, null);
						return;
					}
					else {
						curr = curr.right;
					}
				}
				else if (data < curr.data) {
					if (curr.left === null) {
						curr.left = new Node(data, null, null);
						return;
					}
					else {
						curr = curr.left;
					}
				}
				else return;
			}
		}
	}

	contains(data) {
		var curr = this.root;
		while (curr != null) {
				if (data > curr.data) {
					curr = curr.right;
				}
				else if (data < curr.data) {
					curr = curr.left;
				}
				else return true;
			}
		return false;
	}

	removeData(node, data) {

		if (!this.contains(data)) {
			return;
		}

		if (node === null) {
			return;
		}

		if (node.data === data) {
			this.root = null;
			return;
		}

		if (data > node.data && node.right.data != data) {
			this.removeData(node.right, data);
		}
		if (data < node.data && node.left.data != data) {
			this.removeData(node.left, data);
		}

		//если лист
		if (node.right.data === data && node.right.right === null && node.right.left === null) {
			node.right = null;
			return;
		}
		if (node.left.data === data && node.left.right === null && node.left.left === null) {
			node.left = null;
			return;
		}

		//если элемент справа от текущего:
		if (node.right.data === data) {
			//если есть только правый сын:
			if (node.right.right != null && node.right.left === null) {
				node.right = node.right.right;
				return;
			}
			//если есть только левый сын:
			if (node.right.left != null && node.right.right === null) {
				node.right = node.right.left;
				return;
			}
			//если два сына:
			if (node.right.left != null && node.right.right != null) {
				var current = node.right.left;
				while (current.right != null) {
					current = current.right;
				}
				this.removeData(node.right, current.data);
				node.right.data = current.data;
			}
		}

		//если элемент слева от текущего:
		if (node.left.data === data) {
			//если есть только правый сын:
			if (node.left.right != null && node.left.left === null) {
				node.left = node.left.right;
				return;
			}
			//если есть только левый сын:
			if (node.left.left != null && node.left.right === null) {
				node.left= node.left.left;
				return;
			}
			//если два сына:
			if (node.right.left != null && node.right.right != null) {
				var current = node.left.left;
				while (current.rt != null) {
					current = current.right;
				}
				this.removeData(node.left, current.data);
				node.left.data = current.data;
			}
		}
		
	}

	remove(data) {
		this.removeData(this.root, data);
	}

	amount(root) {
		if (root === null) {
			return 0;
		}
		if (root.right === null && root.left === null) {
			return 1;
		}
		return this.amount(root.right) + this.amount(root.left) + 1;
	}

	size() {
		return this.amount(this.root);
	}

	isEmpty() {
		if (this.size() === 0) {
			return true;
		}
		else return false;
	}
}