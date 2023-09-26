import source from './leet145-이진 트리 후위 순회';
const { solution } = source;
import { TreeNode } from '../Class 모음';

describe('Binary Tree Postorder traversal', () => {
	describe('Simple tree tests: ', () => {
		let root: TreeNode | null;

		it(`should return [] when given root has 0 node`, () => {
			root = null;
			expect(solution(root)).toEqual([]);
		});

		it(`should return [1] when given root has 1 node: [1]`, () => {
			root = new TreeNode(1);
			expect(solution(root)).toEqual([1]);
		});

		it(`should return [2,1] when given root has 2 nodes: [1,2]`, () => {
			root = new TreeNode(1, new TreeNode(2));
			expect(solution(root)).toEqual([2, 1]);
		});

		it(`should return [2,3,1] when given root has 2 nodes: [1,2,3]`, () => {
			root = new TreeNode(1, new TreeNode(2), new TreeNode(3));
			expect(solution(root)).toEqual([2, 3, 1]);
		});
	});

	describe('Sample test cases: ', () => {
		let root: TreeNode | null;

		it(`should return [3,2,1] when given tree is: [1,null,2,3]`, () => {
			root = new TreeNode(1);
			root.right = new TreeNode(2, new TreeNode(3));
			expect(solution(root)).toEqual([3, 2, 1]);
		});

		it(`should return [8,6,4,7,5,2,3,1] when given tree is: [1,2,3,4,5,null,null,6,null,null,7,null,8]`, () => {
			root = new TreeNode(1);
			root.left = new TreeNode(2, new TreeNode(4), new TreeNode(5));
			root.right = new TreeNode(3);
			root.left.left.left = new TreeNode(6, null, new TreeNode(8));
			root.left.right.right = new TreeNode(7);
			expect(solution(root)).toEqual([8,6,4,7,5,2,3,1]);
		});
	});
});