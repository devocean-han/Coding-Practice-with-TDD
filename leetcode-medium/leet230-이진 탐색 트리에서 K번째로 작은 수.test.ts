import { TreeNode } from '../Class 모음';
import source from './leet230-이진 탐색 트리에서 K번째로 작은 수';
const { solution } = source;

describe('Kth Smallest Element in a BST', () => {
	describe('Example 1: root=[3,1,4,null,2], k=1', () => {
		let root: TreeNode;
		let k: number;
		
		it(`sholud return 1`, () => {
			root = new TreeNode(3, new TreeNode(1), new TreeNode(4));
			root.left.right = new TreeNode(2);
			k = 1;
	
			expect(solution(root, k)).toBe(1);
		});
	});

	describe('Example 2: root=[5,3,6,2,4,null,null,1], k=3', () => {
		let root: TreeNode;
		let k: number;
		
		it(`sholud return 3`, () => {
			root = new TreeNode(5, new TreeNode(3), new TreeNode(6));
			root.left.right = new TreeNode(4);
			root.left.left = new TreeNode(2, new TreeNode(1));
			k = 3;
			expect(solution(root, k)).toBe(3);
		});
	});

	describe('Edge case: root=[0], k=1', () => {
		let root: TreeNode;
		let k: number;
		
		it(`sholud return 0`, () => {
			root = new TreeNode(0);
			k = 1;
			expect(solution(root, k)).toBe(0);
		});
	});

});