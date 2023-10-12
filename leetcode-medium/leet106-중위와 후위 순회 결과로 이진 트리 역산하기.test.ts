import { TreeNode } from '../Class 모음';
import source from './leet106-중위와 후위 순회 결과로 이진 트리 역산하기';
const { solution } = source;

describe('Construct Binary Tree from Inorder and Postorder Traversal', () => {
	describe('Small case: inorder=[1], postorder=[1]', () => {
		let inorder: number[] = [1];
		let postorder: number[] = [1];
		it(`should return root[1]`, () => {
			expect(solution(inorder, postorder)).toEqual(new TreeNode(1));
		});
	});
	describe('Small case2: inorder=[-1,1], postorder=[-1,1]', () => {
		let inorder: number[] = [-1,1];
		let postorder: number[] = [-1,1];
		it(`should return root[1,-1]`, () => {
			expect(solution(inorder, postorder)).toEqual(new TreeNode(1, new TreeNode(-1)));
		});
	});

	describe('Example 1: inorder=[9,3,15,20,7], postorder=[9,15,7,20,3]', () => {
		let inorder: number[] = [9,3,15,20,7];
		let postorder: number[] = [9, 15, 7, 20, 3];
		let root: TreeNode;
		it(`should return root[3,9,20,null,null,15,7]`, () => {
			root = new TreeNode(3, new TreeNode(9));
			root.right = new TreeNode(20, new TreeNode(15), new TreeNode(7));
			expect(solution(inorder, postorder)).toEqual(root);
		});
	});

	describe('Left-tilted tree: inorder=[10,9,8,7,5,4,6,11,3,2,1], postorder=[10,9,8,7,5,11,6,4,3,2,1]', () => {
		let inorder: number[] = [10,9,8,7,5,4,6,11,3,2,1];
		let postorder: number[] = [10,9,8,7,5,11,6,4,3,2,1];
		let root: TreeNode;
		it(`should return root[1,2,null,3,null,4,null,5,6,7,null,null,null,8,null,9,null,10]`, () => {
			root = new TreeNode(1, new TreeNode(2));
			root.left.left = new TreeNode(3, new TreeNode(4));
			root.left.left.left.right = new TreeNode(6, null, new TreeNode(11));
			root.left.left.left.left = new TreeNode(5, new TreeNode(7));
			root.left.left.left.left.left.left = new TreeNode(8, new TreeNode(9, new TreeNode(10)));
			expect(solution(inorder, postorder)).toEqual(root);
		});
	});
});