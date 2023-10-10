/*
 * @lc app=leetcode id=671 lang=typescript
 *
 * [671] Second Minimum Node In a Binary Tree
 *
 * https://leetcode.com/problems/second-minimum-node-in-a-binary-tree/description/
 *
 * algorithms
 * Easy (44.25%)
 * Total Accepted:    178K
 * Total Submissions: 402.3K
 * Testcase Example:  '[2,2,5,null,null,5,7]'
 *
 * Given a non-empty special binary tree consisting of nodes with the
 * non-negative value, where each node in this tree has exactly two or zero
 * sub-node. If the node has two sub-nodes, then this node's value is the
 * smaller value among its two sub-nodes. More formally, the property root.val
 * = min(root.left.val, root.right.val) always holds.
 * 
 * Given such a binary tree, you need to output the second minimum value in the
 * set made of all the nodes' value in the whole tree.
 * 
 * If no such second minimum value exists, output -1 instead.
 * 
 * 
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: root = [2,2,5,null,null,5,7]
 * Output: 5
 * Explanation: The smallest value is 2, the second smallest value is 5.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: root = [2,2,2]
 * Output: -1
 * Explanation: The smallest value is 2, but there isn't any second smallest
 * value.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * The number of nodes in the tree is in the range [1, 25].
 * 1 <= Node.val <= 2^31 - 1
 * root.val == min(root.left.val, root.right.val) for each internal node of the
 * tree.
 * 
 * 
 */
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

import { TreeNode } from "../Class 모음";

// => 한 노드는 자식이 둘 있거나 없다. 
// 	  한 노드는 두 자식 중 작은 쪽과 값이 같다. = 한 노드의 두 자식은 부모와 같은 값 하나, 더 큰 값 하나로 구성된다. 이 중 전체에서 두 번 째로 작은 수를 찾아야 한다. 후손으로 갈수록 무조건 커지고, 잘해야 시조인 root의 값을 그대로 최소값으로 대물림할 수 있을 뿐. 그렇다면 루트에서 시작해서, 자식이 있다면 두 자식 중 큰 쪽을 최소값 후보로 저장해둔다. 그리고 두 자식 중 작은 쪽으로 내려가서 그것의 두 자식 중 큰 쪽을 이미 있는 후보와 비교한다. 만약 이미 있던 후보보다 크다면, 이미 있던 후보가 두 번째 최솟값 확정이다. 만약 이미 있던 후보보다 작다면, 후보를 이 값으로 교체하고 다시 두 자식 중 작은 값의 두 자식을 비교한다. 이를 반복한다. 
function findSecondMinimumValue(root: TreeNode | null): number {
	// 1. 지금 노드의 두 자식 중 큰 쪽을 이미 있는 '두 번째 최소값 후보'와 비교한다.
	// 1-1. 만약 이미 있던 후보보다 크다면 이미 있던 후보를 반환한다. 
	// 1-2. 만약 이미 있던 후보보다 작거나 같다면 이 값을 후보로 대체하고 다른 편 자식으로 내려가 비교를 계속한다. 
	// 이미 있던 후보보다 커지는 후보가 나오는 순간까지, 혹은 아예 후보가 나올 수 없는 노드까지 내려갈 때까지 계속한다. 즉, 
	// 2. 이미 있던 후보보다 지금 자식 중 하나가 더 커지는 순간이면 이전 후보를 반환한다. 
	// 3. 지금 노드에게 자식이 없으면 마지막 후보를 반환한다. 
	// 마지막 후보를 반환하려는 때, 마지막 후보가 루트와 값이 같다면 -1을 대신 반환한다.
	
	// 0. 노드가 하나뿐이라면 -1 반환
	if (!root.left) return -1;
	
	let pointer = root;
	let secondMin = Infinity;
	
	while (pointer) {
		// 3. 지금 노드에게 자식이 없으면 마지막 후보를 반환한다.
		if (!pointer.left)
			return secondMin === root.val ? -1 : secondMin;
		// 1. 두 자식 중 더 큰 값을 이전 후보와 비교할 새 후보로 지정한다. 
		let bigger, lesser;
		if (pointer.left.val === pointer.val) {
			// 두 자식이 값이 같으면 둘 중 자식이 있는 쪽을 lesser로 삼아 타고 내려간다.
			// 두 자식이 값이 같고 둘 다 자식이 있으면? => 양쪽 모두로 진행해야 하므로 이대로는 더 진행할 수 없고 재귀로 만들어야 한다...
			[bigger, lesser] = [pointer.right, pointer.left];
		}
		else 
			[bigger, lesser] = [pointer.left, pointer.right];
		// 2. 지금 후보가 이전 후보보다 더 큰 수면 이전 후보를 반환한다. 
		if (bigger.val > secondMin)
			return secondMin;
			// return secondMin === root.val ? -1 : secondMin;
		else {
			secondMin = bigger.val === root.val ? secondMin : bigger.val;
			pointer = lesser;
		}
	} 

	return -1;
};

function solution2(root: TreeNode | null): number {
	// 보조 재귀함수로 재귀함수 바깥의 local 변수를 업데이트하도록 한다: 
	let secondMin = Infinity;

	function aug(node: TreeNode | null) {
		// 0. 탈출 조건: '내'가 null이거나, secondMin보다 작지 않다면 종료
		if (!node || node.val >= secondMin)
			// 0-1. '내'가 만약 자식이 없는 잎 노드라면 바로 다음 재귀 호출에서 탈출하게 된다. 
			// 0-2. 만약 '내'가 현재까지의 secondMin보다 크면 내 자손 중 더 작은 secondMin 후보가 나올 가망이 없으므로, 이 루트의 탐색을 종료한다.
			// 0-3. '내'가 현재까지의 secondMin과 값이 같아도 내 자손 중 더 작은 secondMin 후보가 나올 가망은 없다. 똑같이 탈출하도록 한다.
			return; 

		// 1. 아직 탈출하지 않았다면 '내'가 nsecondMi보다 작다는 뜻.
		// 	  만약 '내'가 최솟값인 root.val보다 크다면 secondMin을 업데이트해준다.
		if (node.val > root.val) secondMin = node.val;

		// 2. 두 자식 루트로 진행
		aug(node.left);
		aug(node.right);
	}
	
	aug(root);

	// secondMin이 한 번도 Infinity에서 다른 값으로 업데이트되지 않은 상태라면, -1을 반환하도록 한다.
	return secondMin === Infinity ? -1 : secondMin;
}

export default {
	solution: solution2,
}
