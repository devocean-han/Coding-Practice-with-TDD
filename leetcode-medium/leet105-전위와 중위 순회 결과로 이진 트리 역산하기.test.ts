import { TreeNode } from '../Class 모음';
import source from './leet105-전위와 중위 순회 결과로 이진 트리 역산하기';
const { solution } = source;

describe('Construct Binary Tree From Preorder and Inorder Traversal', () => {
	describe('Preorder: [1,2,4,6,8,5,7,3], Inorder: [6,8,4,2,5,7,1,3]', () => {
		const preorder = [1, 2, 4, 6, 8, 5, 7, 3];
		const inorder = [6, 8, 4, 2, 5, 7, 1, 3];
		const tree = new TreeNode(1);
		tree.left = new TreeNode(2, new TreeNode(4), new TreeNode(5));
		tree.right = new TreeNode(3);
		tree.left.left.left = new TreeNode(6, null, new TreeNode(8));
		tree.left.right.right = new TreeNode(7);

		it(`should return [1,2,3,4,5,null,null,6,null,null,7,null,8]`, () => {
			const output = solution(preorder, inorder);
			console.log(output.printTreeLevels().join('\n'));
			console.log(tree.printTreeLevels().join('\n'));
			expect(output).toEqual(tree);
		});
	});

	describe('Preorder: [3,9,20,15,7], Inorder: [9,3,15,20,7]', () => {
		const preorder = [3,9,20,15,7];
		const inorder = [9,3,15,20,7];
		const tree = new TreeNode(3, new TreeNode(9));
		tree.right = new TreeNode(20, new TreeNode(15), new TreeNode(7));

		it(`should return [3,9,20,null,null,15,7]`, () => {
			const output = solution(preorder, inorder);
			console.log(output.printTreeLevels().join('\n'));
			console.log(tree.printTreeLevels().join('\n'));
			expect(output).toEqual(tree);
		});
	});

	describe('Preorder: [-1], Inorder: [-1]', () => {
		const preorder = [-1];
		const inorder = [-1];
		const tree = new TreeNode(-1);

		it(`should return [-1]`, () => {
			const output = solution(preorder, inorder);
			console.log(output.printTreeLevels().join('\n'));
			console.log(tree.printTreeLevels().join('\n'));
			expect(output).toEqual(tree);
		});
	});
});