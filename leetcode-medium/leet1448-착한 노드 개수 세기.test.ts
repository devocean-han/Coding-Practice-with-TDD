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
	});
});