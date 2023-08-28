import source from './leet100-똑같은 트리인가';
const { solution, TreeNode } = source;

describe(`Same Tree`, () => {
	describe('The number of nodes check: is in the range [0, 100]', () => {
		let tree1: any;
		let tree2: any;
		beforeEach(() => {
			tree1 = null;
			tree2 = null;
		})
		it(`should return true when both trees have 0 node`, () => {
			expect(solution(tree1, tree2)).toBe(true);
		});

		it(`should return false when each tree has 0 and 1 node`, () => {
			tree2 = new TreeNode(2);
			expect(solution(tree1, tree2)).toBe(false);
		});

		it(`should return false when each tree has 1 node(and has different value)`, () => {
			tree1 = new TreeNode(1);
			expect(solution(tree1, tree2)).toBe(false);
		});

		// it.each(Array.from({ length: 16 }, (_, index) => index + 1))(
		// 	`Both trees with %p nodes are the same`, (numNodes) => {
		// 		tree1 = generateCompleteTree(numNodes);
		// 		tree2 = generateCompleteTree(numNodes);
		// 		expect(solution(tree1, tree2)).toBe(true);
		// 		console.log(tree1.printTreeLevels().join('\n'));
		// 	}
		// );
		it(`print tree test`, () => {
			tree1 = generateCompleteTree(16);
			expect(solution(tree1, tree2)).toBe(false);
			console.log(tree1.printTreeLevels().join('\n'));
		})
	});

	// 1~numNodes 값을 가지는 완전 이진 트리 생성 
	function generateCompleteTree(numNodes: number) {
		if (numNodes === 0) {
			return null;
		}

		const root = new TreeNode(1);
		const queue = [root];
		// if (numNodes <= 3) {
		// 	root.left = new TreeNode(2);
		// 	if (numNodes > 2) {
		// 		root.right = new TreeNode(3);
		// 	}
		// 	return root;
		// }
		let count = 1;
		while (count < numNodes) {
			const current = queue.shift()!;

			current.left = new TreeNode(++count);
			queue.push(current.left);

			if (count < numNodes) {
				current.right = new TreeNode(++count);
				queue.push(current.right);
			}
		}

		// let current = root.left;
		// let prev = root;
		// for (let i = 2; i <= numNodes; i++) {
		// 	if (i % 2 === 0) {
		// 		current.left = new TreeNode(i);
		// 	} else {
		// 		current.right = new TreeNode(i);
		// 		if ()
		// 		current = current.left ? current.left : current;
		// 	}
		// }

		return root;
	}
	describe('Different trees check: Should return false when...', () => {
		let tree1: any;
		let tree2: any;
		
		it(`both trees have 2 nodes with different structures: [0,1,null] / [0,null,2]`, () => {
			tree1 = new TreeNode(0, new TreeNode(1));
			tree2 = new TreeNode(0, null, new TreeNode(2));
			expect(solution(tree1, tree2)).toBe(false);
		});

		it(`bothe tress have 3 nodes with different values: [0,1,3] / [0,1,2]`, () => {
			tree1.right = new TreeNode(3);
			tree2.left = new TreeNode(1);
			expect(solution(tree1, tree2)).toBe(false);
		});
	});

	describe('Same trees check: Should return true when...', () => {
		let tree1: any;
		let tree2: any;

		it(`both trees have 2 nodes: [0,1,null] / [0,1,null]`, () => {
			tree1 = new TreeNode(0, new TreeNode(1));
			tree2 = new TreeNode(0, new TreeNode(1));
			expect(solution(tree1, tree2)).toBe(true);
		});

		it(`bothe tress have 3 nodes: [0,1,3] / [0,1,3]`, () => {
			tree1.right = new TreeNode(3);
			tree2.right = new TreeNode(3);
			expect(solution(tree1, tree2)).toBe(true);
		});

		it(`both trees have 5 nodes: [0,1,3,2,null,4] / [0,1,3,2,null,4]`, () => {
			tree1.left.left = new TreeNode(2);
			tree1.right.left = new TreeNode(4);
			tree2.left.left = new TreeNode(2);
			tree2.right.left = new TreeNode(4);
			console.log(tree1.printTreeLevels().join('\n'));
			expect(solution(tree1, tree2)).toBe(true);
		});

		it(`sample test to draw trees`, () => {
			tree1.left.left = new TreeNode(2);
			tree1.right.left = new TreeNode(4);
			tree1.right.left.right = new TreeNode(0);
			tree1.right.left.right.left = new TreeNode(7);
			tree1.left.left.right = new TreeNode(8, null, new TreeNode(9));
			console.log(tree1.printTreeLevels().join('\n'));
		});
	});
});