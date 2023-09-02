import source from './leet104-이진 트리의 최대 깊이';
const { TreeNode, solution } = source;

describe('Maximum Depth of Binary Tree', () => {
	describe('The number of nodes check: Must be in the range [0, 10,000]', () => {
		let root: any;
		beforeEach(() => {
			root = new TreeNode(0);
		});

		it(`should return 0 when given tree has 0 node`, () => {
			expect(solution(root)).toBe(0);
		});
	});
	
});