import { TreeNode } from '../Class 모음';
import source from './leet671-이진 트리에서 두 번째로 작은 수';
const { solution } = source;

describe('Second Minimum Node In a Binary Tree', () => {
	describe('Small case: root=[1]', () => {
		let root: TreeNode = new TreeNode(1);
		it(`should return -1`, () => {
			expect(solution(root)).toBe(-1);
		});
	});
	describe('Small case: root=[1,2]', () => {
		let root: TreeNode = new TreeNode(1, new TreeNode(2));
		it(`should return 2`, () => {
			expect(solution(root)).toBe(2);
		});
	});
	
	describe('Small case: root=[1,2,1,3,2]', () => {
		let root: TreeNode = new TreeNode(1, new TreeNode(2), new TreeNode(1));
		root.left.left = new TreeNode(3);
		root.left.right = new TreeNode(2);
		it(`should return 2`, () => {
			expect(solution(root)).toBe(2);
		});
	});

	describe('Small case: root=[1,1,1]', () => {
		let root: TreeNode = new TreeNode(1, new TreeNode(1), new TreeNode(1));
		it(`should return -1`, () => {
			expect(solution(root)).toBe(-1);
		});
	});

	describe('Example 1: root=[2,2,5,null,null,5,7]', () => {
		let root: TreeNode;
		
		it(`should return 5`, () => {
			root = new TreeNode(2, new TreeNode(2), new TreeNode(5));
			root.right.left = new TreeNode(5);
			root.right.right = new TreeNode(7);
			expect(solution(root)).toBe(5);
		});
	});

	describe('Error case: root=[1,1,2,1,1,2,2]', () => {
		let root: TreeNode;
		
		it(`should return 2`, () => {
			root = new TreeNode(1);
			root.left = new TreeNode(1, new TreeNode(1), new TreeNode(1));
			root.right = new TreeNode(2, new TreeNode(2), new TreeNode(2));
			expect(solution(root)).toBe(2);
		});
	});

	describe('Test case: root=[1,1,3,1,1,3,3,null,null,1,2]', () => {
		let root: TreeNode;
		
		it(`should return 2`, () => {
			root = new TreeNode(1);
			root.left = new TreeNode(1, new TreeNode(1), new TreeNode(1));
			root.right = new TreeNode(3, new TreeNode(3), new TreeNode(3));
			root.left.right.left = new TreeNode(1);
			root.left.right.right = new TreeNode(2);
			expect(solution(root)).toBe(2);
		});
	});

	
});