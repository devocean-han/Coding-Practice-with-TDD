import source from './leet226-이진 트리 뒤집기';
const { solution, TreeNode } = source;

describe('Invert binary Tree', () => {
	describe('The number of nodes check: Must be in the range [0, 100]', () => {
		let root: any;
		let answer: any;
		beforeEach(() => {
			root = null;
			answer = null;
		});

		it(`should return null when given tree has 0 node`, () => {
			expect(solution(root)).toEqual(answer);
		});

		it(`should return tree itself when given tree has 1 node`, () => {
			root = new TreeNode(-100);
			expect(solution(root)).toEqual(new TreeNode(-100));
		});

		it(`should return [1,null,2] when given tree is [1,2]`, () => {
			root = new TreeNode(1, null, new TreeNode(2));
			answer = new TreeNode(1, new TreeNode(2));
			expect(solution(root)).toEqual(answer);
		});

		// for a very large tree...
	});

	describe('Left nodes test', () => {
		let root: any;
		let answer: any;
		beforeEach(() => {
			// root = new TreeNode(0);
			// answer = new TreeNode(0);
			root = new TreeNode(0, new TreeNode(1));
			root.left.left = new TreeNode(1);
			answer = new TreeNode(0, null, new TreeNode(1));
			answer.right.right = new TreeNode(1);
		});

		it(`should return [0,null,1,null,1] when given tree is [0,1,null,1]`, () => {
			console.log(root.printTreeLevels().join('\n'));
			expect(solution(root)).toEqual(answer);
		});

		it(`should return [0,null,1,null,1,null,1] when given tree is [0,1,null,1,null,1]`, () => {
			root.left.left.left = new TreeNode(1);
			answer.right.right.right = new TreeNode(1);
			expect(solution(root)).toEqual(answer);
		});
	});

	describe('Combination nodes test', () => {
		let root: any;
		let answer: any;
		beforeEach(() => {
			// root = new TreeNode(0);
			// answer = new TreeNode(0);
			root = new TreeNode(0, new TreeNode(1));
			root.left.left = new TreeNode(1);
			answer = new TreeNode(0, null, new TreeNode(1));
			answer.right.right = new TreeNode(1);
		});

		it(`should return [0,null,1,null,1,2,1] when given tree is [0,1,null,1,null,1,2]`, () => {
			root.left.left.left = new TreeNode(1);
			root.left.left.right = new TreeNode(2);
			answer.right.right.right = new TreeNode(1);
			answer.right.right.left = new TreeNode(2);
			expect(solution(root)).toEqual(answer);
		});

		it(`should return [0, null,1, 2,1, 2,null,null,1] when given tree is [0, 1,null, 1,2, 1,null,null,2]`, () => {
			root.left.left.left = new TreeNode(1);
			root.left.right = new TreeNode(2);
			root.left.right.right = new TreeNode(2);
			answer.right.right.right = new TreeNode(1);
			answer.right.left = new TreeNode(2);
			answer.right.left.left = new TreeNode(2);
			expect(solution(root)).toEqual(answer);
		});
	});
});