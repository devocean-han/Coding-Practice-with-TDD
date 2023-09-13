import source from './leet199-오른쪽에서 본 이진 트리';
const { solution } = source;
import { TreeNode } from '../Class 모음';

describe('Binary Tree Right Side View', () => {
	describe('Number of nodes check: Must be in the range [0, 100]', () => {
		let root: TreeNode | null;

		it(`should return [] when given tree has 0 node`, () => {
			root = null;
			expect(solution(root)).toEqual([]);
		});

		it(`should return [-100] when given tree has 1 node: [-100]`, () => {
			root = new TreeNode(-100);
			expect(solution(root)).toEqual([-100]);
		});

		it(`should return [-100,0] when given tree has 2 nodes: [-100,0]`, () => {
			root = new TreeNode(-100, new TreeNode(0));
			expect(solution(root)).toEqual([-100,0]);
		});

		it(`should return [-100,100] when given tree has 2 nodes: [-100,null,100]`, () => {
			root = new TreeNode(-100, null, new TreeNode(100));
			expect(solution(root)).toEqual([-100,100]);
		});

		// some big tree test....
	});

	describe('Sample test cases:', () => {
		let root: TreeNode | null;

		it(`should return [1,3,4] when given tree is [1,2,3,null,5,null,4]`, () => {
			root = new TreeNode(1);
			root.left = new TreeNode(2, null, new TreeNode(5));
			root.right = new TreeNode(3, null, new TreeNode(4));
			expect(solution(root)).toEqual([1,3,4]);
		});

		it(`should return [1,3] when given tree is [1,null,3]`, () => {
			root = new TreeNode(1, null, new TreeNode(3));
			expect(solution(root)).toEqual([1,3]);
		});
	});

	describe('Other test cases:', () => {
		let root: TreeNode | null;
		
		it(`should return [1,3,4,10] when given tree is [1,2,3,6,5,0,4,7,8,null,null,9,null,10]`, () => {
			root = new TreeNode(1);
			root.left = new TreeNode(2, new TreeNode(6), new TreeNode(5));
			root.right = new TreeNode(3, new TreeNode(0), new TreeNode(4));
			root.left.left.left = new TreeNode(7);
			root.left.left.right = new TreeNode(8);
			root.right.left.left = new TreeNode(9);
			root.right.right.left = new TreeNode(10);
			expect(solution(root)).toEqual([1,3,4,10]);
		});

		it(`should return [1,2,4,8] when given tree has only left nodes: [1,2,null,4,null,8]`, () => {
			root = new TreeNode(1, new TreeNode(2));
			root.left.left = new TreeNode(4, new TreeNode(8));
			expect(solution(root)).toEqual([1,2,4,8]);
		});

	});
});