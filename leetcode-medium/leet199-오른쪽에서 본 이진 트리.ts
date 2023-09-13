/* 199. Binary Tree Right Side View
https://leetcode.com/problems/binary-tree-right-side-view/description/

Medium


Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.
 

Example 1:


Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
Example 2:

Input: root = [1,null,3]
Output: [1,3]
Example 3:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100

*/

import { TreeNode } from "../Class 모음";

// => 주어진 이진 트리를 오른쪽으로 뉘여서 보았을 때 가장 윗면에 노출되는 노드를 root쪽부터 순서대로 배열에 담아서 반환하기. 
// ==> 즉, 주어진 트리의 오른쪽 가장자리 노드들을 root부터 아래로 순서대로 배열에 담아서 반환하기. = 각 레벨의 가장 오른쪽 노드를 추출하기.   

// BFS(너비우선탐색)을 이용한 해답: 
function solution(root: TreeNode | null): number[] {
	if (!root) return [];
	
	const result: number[] = [];
	const queue: Array<[TreeNode, number]> = [[root, 1]];

	while (queue.length) {
		const [node, level] = queue.shift();
		// 나 자신이 몇 레벨인지 어떻게 알 수 있을까? 
		// => queue에 노드와 해당 레벨을 함께 넣어준다. 

		// 다음 노드가 다음 레벨이면 현재 노드를 '마지막 오른쪽' 노드로 볼 수 있을 것이다. 다만 '나'가 queue의 마지막 노드였다면 다음 노드의 level 정보를 어떻게 불러올 것인가. null이라고 불러오자. 
		const nextLevel = queue[0] ? queue[0][1] : null;
		if (level !== nextLevel) result.push(node.val);

		if (node.left) queue.push([node.left, level + 1]);
		if (node.right) queue.push([node.right, level + 1]);
	}

	return result;
}

export default {
	solution: solution,
}