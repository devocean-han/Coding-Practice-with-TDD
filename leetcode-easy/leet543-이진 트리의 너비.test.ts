import exp from 'constants';
import source from './leet543-이진 트리의 너비';
const { TreeNode, solution } = source;

describe('Diameter of Binary Tree', () => {
	describe('The number of nodes check: Must be in the range [1, 10,000]', () => {
		let root = new TreeNode(1);

		it(`should return 0 when given tree has only 1 node`, () => {
			console.log(root);
			expect(solution(root)).toBe(0);
		});
	});
});