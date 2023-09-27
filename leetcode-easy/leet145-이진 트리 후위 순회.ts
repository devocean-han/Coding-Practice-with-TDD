/*
 * @lc app=leetcode id=145 lang=javascript
 *
 * [145] Binary Tree Postorder Traversal
 *
 * https://leetcode.com/problems/binary-tree-postorder-traversal/description/
 *
 * algorithms
 * Easy (69.37%)
 * 
 * Given the root of a binary tree, return the postorder traversal of its
 * nodes' values.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: root = [1,null,2,3]
 * Output: [3,2,1]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: root = []
 * Output: []
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: root = [1]
 * Output: [1]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * The number of the nodes in the tree is in the range [0, 100].
 * -100 <= Node.val <= 100
 * 
 * 
 * 
 * Follow up: Recursive solution is trivial, could you do it iteratively?
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

// iterative solution
function postorderTraversal1(root: TreeNode | null): number[] {
	if (!root) return [];

	const resultMap: Map<TreeNode, number> = new Map();
	const stack: TreeNode[] = [root];

	while (stack.length) {
		// 지금 노드를 '본다'
		const node = stack[stack.length - 1];
		
		// 왼쪽 노드가 있고 아직 '처리'하지 않았다면 왼쪽 자식을 스택에 추가한다. 
		if (node.left && !resultMap.has(node.left)) stack.push(node.left);
		// 그렇지 않고(?) 오른쪽 노드가 있고 아직 '처리'하지 않았다면 오른 자식을 스택에 추가한다. 
		else if (node.right && !resultMap.has(node.right)) stack.push(node.right);
		// 그렇지 않다면(양 자식이 없거나 모두 처리된 경우) 현재 노드를 스택에서 뽑고, result에 넣는다. 
		else {
			stack.pop();
			resultMap.set(node, node.val);
		}
	}

	return [...resultMap.values()];
}


// recursive solution
function postorderTraversal2(root: TreeNode | null): number[] {
	if (!root) return [];
	return [...postorderTraversal2(root.left), ...postorderTraversal2(root.right), root.val];
}

export default {
	solution: postorderTraversal1,
}
