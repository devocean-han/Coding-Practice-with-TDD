/* 1448. Count Good Nodes in Binary Tree

Medium

Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

Return the number of good nodes in the binary tree.

 

Example 1:



Input: root = [3,1,4,3,null,1,5]
Output: 4
Explanation: Nodes in blue are good.
Root Node (3) is always a good node.
Node 4 -> (3,4) is the maximum value in the path starting from the root.
Node 5 -> (3,4,5) is the maximum value in the path
Node 3 -> (3,1,3) is the maximum value in the path.
Example 2:



Input: root = [3,3,null,4,2]
Output: 3
Explanation: Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.
Example 3:

Input: root = [1]
Output: 1
Explanation: Root is considered as good.
 

Constraints:

The number of nodes in the binary tree is in the range [1, 10^5].
Each node's value is between [-10^4, 10^4].

*/

import { TreeNode } from "../Class 모음";

// => 루트로부터 모든 노드에 이르기까지의 길 중 해당 노드가 최대값인 경우(중복 허용)에 해당하는 노드가 몇 개인지 반환하기

function solution(root: TreeNode | null): number {
	// 현재 노드 값이 루트로부터 현재 노드까지의 max값 이상이면 '착한'노드로 카운트하여 true를 반환한다. 
	function aug(node: TreeNode | null, maxVal: number): boolean {
		if (!node) return true;

		return (node.val >= maxVal) &&
			aug(node.left, Math.max(maxVal, node.val)) &&
			aug(node.right, Math.max(maxVal, node.val));
	}
	let isGood = aug(root, -Infinity);

	return ;
}

export default {
	solution: solution,
}

