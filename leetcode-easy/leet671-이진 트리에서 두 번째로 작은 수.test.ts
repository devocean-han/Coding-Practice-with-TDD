import { TreeNode } from '../Class 모음';
import source from './leet671-이진 트리에서 두 번째로 작은 수';
const { solution } = source;

describe('Second Minimum Node In a Binary Tree', () => {
	describe('Example 1: root=[2,2,5,null,null,5,7]', () => {
		let root: TreeNode;
		
		it(`should return 5`, () => {
			root = new TreeNode(2, new TreeNode(2), new TreeNode(5));
			root.right.left = new TreeNode(5);
			root.right.right = new TreeNode(7);
			expect(solution(root)).toBe(5);
		});
	});
});