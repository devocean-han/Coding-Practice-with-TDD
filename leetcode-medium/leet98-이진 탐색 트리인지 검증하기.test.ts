import source from './leet98-이진 탐색 트리인지 검증하기';
const { solution } = source;
import { TreeNode } from '../Class 모음';

describe('Validate Binary Search Tree', () => {
	describe('The number of noeds check: Must be in the range [1, 10,000]', () => {
		let root: TreeNode;
		beforeEach(() => {
			root = new TreeNode(2);
		});
		
		it(`should return true when given tree has 1 node`, () => {
			expect(solution(root)).toBe(true);
		});
		
		it(`should return false when given tree has 2 nodes: [1,2]`, () => {
			root.left = new TreeNode(2);
			expect(solution(root)).toBe(false);
		});
		
		it(`should return true when given tree has 2 nodes: [1,null,3]`, () => {
			root.right = new TreeNode(3);
			expect(solution(root)).toBe(true);
		});
	});

	describe(`True cases check: Given tree is BST when it is...`, () => {
		let root: TreeNode;
		beforeEach(() => {
			root = new TreeNode(2);
		});
		
		it(`[2,1,3]`, () => {
			root.left = new TreeNode(1);
			root.right = new TreeNode(3);
			expect(solution(root)).toBe(true);
		});
		
		it(`[2,1,3,0,null,null,5]`, () => {
			root.left = new TreeNode(1, new TreeNode(0));
			root.right = new TreeNode(3, null, new TreeNode(5));
			expect(solution(root)).toBe(true);
		});
		
		it(`[5,1,8,null,null,6,10]`, () => {
			root = new TreeNode(5, new TreeNode(1));
			root.right = new TreeNode(8, new TreeNode(6), new TreeNode(10));
			expect(solution(root)).toBe(true);
		});
	});

	describe(`True cases check: Given tree is BST when it is...`, () => {
		let root: TreeNode;
		beforeEach(() => {
			root = new TreeNode(2);
		});
		
		// it(`[2,1,3]`, () => {
		// 	root.left = new TreeNode(1);
		// 	root.right = new TreeNode(3);
		// 	expect(solution(root)).toBe(true);
		// });
		
		// it(`[2,1,3,0,null,null,5]`, () => {
		// 	root.left = new TreeNode(1, new TreeNode(0));
		// 	root.right = new TreeNode(3, null, new TreeNode(5));
		// 	expect(solution(root)).toBe(true);
		// });
		
		// it(`[5,1,8,null,null,6,10]`, () => {
		// 	root = new TreeNode(5, new TreeNode(1));
		// 	root.right = new TreeNode(8, new TreeNode(6), new TreeNode(10));
		// 	expect(solution(root)).toBe(true);
		// });
		
		it(`[5,4,6,null,null,3,7]`, () => {
			root = new TreeNode(5, new TreeNode(4));
			root.right = new TreeNode(6, new TreeNode(3), new TreeNode(7));
			console.log(root.printTreeLevels().join('\n'))
			expect(solution(root)).toBe(false);
		});
	});
})