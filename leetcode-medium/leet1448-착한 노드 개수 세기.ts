/* 1448. Count Good Nodes in Binary Tree
https://leetcode.com/problems/count-good-nodes-in-binary-tree/

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

function solution1(root: TreeNode | null): number {
	// 현재 노드 값이 루트로부터 현재 노드까지의 max값 이상이면 '착한'노드로 카운트하여 true를 반환한다. 
	function aug(node: TreeNode | null, maxVal: number): boolean {
		if (!node) return true;

		return (node.val >= maxVal) &&
			aug(node.left, Math.max(maxVal, node.val)) &&
			aug(node.right, Math.max(maxVal, node.val));
	}
	let isGood = aug(root, -Infinity);

	// 현재 노드 포함 모든 자식 노드 중 '착한' 노드 개수를 반환한다. 
	function count(node: TreeNode | null, maxVal: number): number {
		// 탈출 조건(Base condition): 현재 노드가 null이면 0을 반환한다. (=> 잎 노드는 양쪽 자식으로부터 0과 0을 반환받게 된다)
		if (!node) return 0;

		// 1) 자기 자신 노드가 '착한'노드인지 여부(+1 혹은 +0) 더하기
		// 2) 왼쪽 자식 트리의 '착한'노드 누적 개수 더하기
		// 3) 오른쪽 자식 트리의 '착한'노드 누적 개수를 더하여 반환한다.
		return +(node.val >= maxVal) +
		// return (node.val >= maxVal ? 1 : 0) +
			count(node.left, Math.max(maxVal, node.val)) +
			count(node.right, Math.max(maxVal, node.val));
	}

	return count(root, root.val);
}

// solution1을 리팩토링한 버전: 
function solution2(root: TreeNode | null): number {
	function count(node: TreeNode | null, maxVal: number): number {
		if (!node) return 0;

		const isGoodNode = node.val >= maxVal;
		const leftGoodNodes = count(node.left, isGoodNode ? node.val : maxVal);
		const rightGoodNodes = count(node.right, isGoodNode ? node.val : maxVal);

		return +isGoodNode + leftGoodNodes + rightGoodNodes;
	}

	return count(root, -Infinity);
}

export default {
	solution: solution3,
}

// 다른 해답: 스택에 최고값도 같이 저장해서 넘겨주는 방식으로 순회(iterative)함.
function solution3(root: TreeNode | null): number {

	const stack: Array<[TreeNode, number]> = [[root, root.val]];
	let count:number = 0;

	while (stack.length) {
		const [node, currentMax] = stack.pop();
		count += (node.val >= currentMax ? 1 : 0);

		for (let child of [node.left, node.right]) {
			if (child) {
				stack.push([child, Math.max(node.val, currentMax)]);
			}
		}
		// 위의 for문은 다음 두 줄과 같다: 
		// if (node.left) stack.push([node.left, Math.max(node.val, currentMax)]);
		// if (node.right) stack.push([node.right, Math.max(node.val, currentMax)]);
	}

	return count;
}
