import source from './leet104-이진 트리의 최대 깊이';
const { TreeNode, solution } = source;

describe('Maximum Depth of Binary Tree', () => {
	describe('The number of nodes check: Must be in the range [0, 10,000]', () => {
		let root: any;
		beforeEach(() => {
			root = null;
		});
		
		it(`should return 0 when given tree has 0 node`, () => {
			expect(solution(root)).toBe(0);
		});
		
		it(`should return 1 when given tree has 1 node`, () => {
			root = new TreeNode(0);
			expect(solution(root)).toBe(1);
		});

		it(`should return 2 when given tree has 2 nodes`, () => {
			root = new TreeNode(0, new TreeNode(1));
			expect(solution(root)).toBe(2);
		});
	});

	describe('Depths with 5 nodes: ', () => {
		let root: any;
		beforeEach(() => {
			root = new TreeNode(1);
		});
		
		it(`should return 3 when given tree structure is [1,2,3,4,5]`, () => {
			root.left = new TreeNode(2, new TreeNode(4), new TreeNode(5));
			root.right = new TreeNode(3);
			expect(solution(root)).toBe(3);
		});
		
		it(`should return 4 when given tree structure is [1,2,3,4,null,null,null,8]`, () => {
			root.left = new TreeNode(2, new TreeNode(4));
			root.right = new TreeNode(3);
			root.left.left.left = new TreeNode(8);
			expect(solution(root)).toBe(4);
		});
		
		it(`should return 5 when given tree structure is all LEFT, that is, [1,2,null,4,null,8,null,16]`, () => {
			root.left = new TreeNode(2);
			root.left.left = new TreeNode(4);
			root.left.left.left = new TreeNode(8);
			root.left.left.left.left = new TreeNode(16);
			expect(solution(root)).toBe(5);
		});
	});

	
});