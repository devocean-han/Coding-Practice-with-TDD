/* 98. Validate Binary Search Tree
https://leetcode.com/problems/validate-binary-search-tree/

Medium

Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

The left 
subtree
 of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
 

Example 1:


Input: root = [2,1,3]
Output: true
Example 2:


Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
-231 <= Node.val <= 231 - 1

*/

import { TreeNode } from "../Class 모음";

// => 주어진 이진 트리가 이진 탐색 트리(BST)인지 여부를 반환하기

function solution(root: TreeNode | null): boolean {

	function check(node: TreeNode | null, min: number, max: number): [boolean, number, number] {
		if (!node) return [true, min, max];
	
		// 왼 자식이 있는데 나(부모)보다 크거나 같으면 false 반환. 
		// 그 외(왼 자식이 없거나 나 자신보다 작음)에는 true로 진행
		if (node.left && node.left.val >= node.val) return [false, min, max];
		if (node.right && node.right.val <= node.val) return [false, min, max];
	
		if (node.val < min) min = node.val;
		if (node.val > max) max = node.val;
		// 내 왼쪽 자식 중 나 자신보다 더 큰 max가 존재했을 경우 BST가 아니게 됨. 
		const [left, leftMin, leftMax] = check(node.left, min, max);
		if (leftMax >= node.val) return [false, min, max];
		const [right, rightMin, rightMax] = check(node.right, min, max);
		if (rightMin <= node.val) return [false, min, max];
	
		return [(left && right), min, max];	
	}

	// 현재 노드 포함 자식 노드 중 최소값과 최대값을 반환
	function check2(node: TreeNode | null, min: number, max: number): [number, number] {
		if (!node) return [min, max];
		
		// 왼 자식이 있는데 나(부모)보다 크거나 같으면 false 반환.
		// 그 외(왼 자식이 없거나 나 자신보다 작음)에는 true로 진행
		if (node.left && node.left.val >= node.val) return [min, max];
		if (node.right && node.right.val <= node.val) return [min, max];
		min = Math.min(min, )
		// 나에게 전달된 min이 나 자신보다 크면 false 반환.
		// => 근데 이게 아니고 내 왼쪽 자식의 값들 중의 min을 봐야하는데...


	}

	return check(root, -Infinity, Infinity)[0];
}

export default {
	solution: solution2,
}

function solution2(root: TreeNode | null, min = -Infinity, max = Infinity): boolean {
	// 현재 노드가 null이면 true를 반환하고
	if (!root) return true;
	// 1) 현재 노드의 값이 max보다 작고 min보다 크고
	// 2) 왼 자식 노드의 값이 현재 노드의 값보다 크고 min보다 작으며
	// 3) 오른 자식 노드의 값이 max보다 크고 현재 노드의 값보다 작으면
	// true를 반환한다. 
	return !(root.val <= min || root.val >= max) &&
		solution2(root.left, min, root.val) &&
		solution2(root.right, root.val, max);
}
