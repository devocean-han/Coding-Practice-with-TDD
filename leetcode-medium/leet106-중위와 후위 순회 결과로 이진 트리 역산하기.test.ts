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
	
	describe('Small case: inorder=[9,3,15,20,7], postorder=[9,15,7,20,3]', () => {
		let inorder: number[] = [9,3,15,20,7];
		let postorder: number[] = [9, 15, 7, 20, 3];
		let root: TreeNode;
		it(`should return root[3,9,20,null,null,15,7]`, () => {
			root = new TreeNode(3, new TreeNode(9));
			root.right = new TreeNode(20, new TreeNode(15), new TreeNode(7));
			expect(solution(inorder, postorder)).toEqual(root);
		});
	});
});