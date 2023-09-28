/*
 * @lc app=leetcode id=105 lang=javascript
 *
 * [105] Construct Binary Tree from Preorder and Inorder Traversal
 *
 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 *
 * algorithms
 * Medium (62.50%)
 * Total Accepted:    1.1M
 * Total Submissions: 1.7M
 * Testcase Example:  '[3,9,20,15,7]\n[9,3,15,20,7]'
 *
 * Given two integer arrays preorder and inorder where preorder is the preorder
 * traversal of a binary tree and inorder is the inorder traversal of the same
 * tree, construct and return the binary tree.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * Output: [3,9,20,null,null,15,7]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: preorder = [-1], inorder = [-1]
 * Output: [-1]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= preorder.length <= 3000
 * inorder.length == preorder.length
 * -3000 <= preorder[i], inorder[i] <= 3000
 * preorder and inorder consist of unique values.
 * Each value of inorder also appears in preorder.
 * preorder is guaranteed to be the preorder traversal of the tree.
 * inorder is guaranteed to be the inorder traversal of the tree.
 * 
 * 
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

import { TreeNode } from "../Class 모음";

// preorder 결과만으로는 정확한 모양을 유추할 수 없는 건가? 
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
	if (!preorder.length) return null;

	let tree: TreeNode = new TreeNode(preorder[0]);
	// preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
	// tree: [3,9,20,null,null,15,7]
	for (let i = 1; i < preorder.length; i++) {
		const node = new TreeNode(preorder[i]);
		// 새로 만든 노드가 부모의 왼 자식인지 오른 자식인지는 inorder도 참고하면 알 수 있다. 
		// 예를 들어 inorder의 첫 값이 preorder 첫 값, 즉 root와 같다면 root에게 왼 자식이 없음을 알 수 있다. 
		if (tree.val === inorder[0]) tree.right = node, tree = tree.right;
		else tree.left = node, tree = tree.left;
	}
    
	return tree;
};

export default {
	solution: buildTree,
}
