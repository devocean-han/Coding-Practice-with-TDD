import source from './leet1448-착한 노드 개수 세기';
const { solution } = source;
import { TreeNode } from '../Class 모음';

describe('Count Good Nodes in Binary tree', () => {
	describe('The number of nodes check: Must be in the range [1, 100,000]', () => {
		let root: TreeNode;
		beforeEach(() => {
			root = new TreeNode(0);
		});

		it(`should return 1 when given tree has 1 node`, () => {
			expect(solution(root)).toBe(1);
		});

		it(`should return 2 when given tree is [0,0]`, () => {
			root.left = new TreeNode(0);
			expect(solution(root)).toBe(2);
		});

		it(`should return 2 when given tree is [0,null,1]`, () => {
			root.right = new TreeNode(1);
			expect(solution(root)).toBe(2);
		});

		it(`should return 1 when given tree is [0,null,-1]`, () => {
			root.right = new TreeNode(-1);
			expect(solution(root)).toBe(1);
		});

		it(`should return 3 when given tree is [0,0,0]`, () => {
			root.left = new TreeNode(0);
			root.right = new TreeNode(0);
			expect(solution(root)).toBe(3);
		});
	});

	describe('Sample cases check:', () => {
		let root: TreeNode;
		beforeEach(() => {
			root = new TreeNode(3);
		});

		it(`should return 4 when given tree is [3,1,4,3,null,1,5]`, () => {
			root.left = new TreeNode(1, new TreeNode(3));
			root.right = new TreeNode(4, new TreeNode(1), new TreeNode(5));
			expect(solution(root)).toBe(4);
		});

		it(`should return 3 when given tree is [3,3,null,4,2]`, () => {
			root.left = new TreeNode(3, new TreeNode(4), new TreeNode(2));
			expect(solution(root)).toBe(3);
		});

	});
});