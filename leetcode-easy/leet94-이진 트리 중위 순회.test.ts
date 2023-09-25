import source from './leet94-이진 트리 중위 순회';
const { solution } = source;
import { TreeNode } from '../Class 모음';

describe('Binary Tree Inorder Traversal', () => {
	describe('Number of nodes check: Should be in the range [0, 100]', () => {
		let root: TreeNode;
		
		it(`should return [] when given tree has 0 node`, () => {
			root = null;
			expect(solution(root)).toEqual([]);
		});

		it(`should return [0] when given tree has 1 node`, () => {
			root = new TreeNode();
			expect(solution(root)).toEqual([0]);
		});

	});

	describe('Simple tree test', () => {
		let root: TreeNode;
		
		it(`should return [2,1] when given tree is: [1,2]`, () => {
			root = new TreeNode(1, new TreeNode(2));
			expect(solution(root)).toEqual([2,1]);
		});
		
		it(`should return [2,1,3] when given tree is: [1,2,3]`, () => {
			root = new TreeNode(1, new TreeNode(2), new TreeNode(3));
			expect(solution(root)).toEqual([2,1,3]);
		});

	});
});