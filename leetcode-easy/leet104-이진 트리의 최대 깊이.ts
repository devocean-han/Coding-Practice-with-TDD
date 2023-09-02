/* 104. Maximum Depth of Binary Tree
https://leetcode.com/problems/maximum-depth-of-binary-tree/

Easy

Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: 3
Example 2:

Input: root = [1,null,2]
Output: 2
 

Constraints:

The number of nodes in the tree is in the range [0, 104].
-100 <= Node.val <= 100

*/

/**
 * Definition for a binary tree node.
*/
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
	}

	printTreeLevels(node: TreeNode | null = this): string[] {
		const result: string[] = [];
		if (node === null) {
			return result;
		}

		// [각 노드, 노드가 위치한 레벨, 각 노드의 부모 노드]
		const queue: Array<[TreeNode, number, TreeNode]> = [[node, 0, null]];
		let currentLevel = 0; 
		let currentLevelString = '';
		let connectorLine = '';

		while (queue.length > 0) {	
			const [currentNode, level, parentNode] = queue.shift()!; // '!': non-null assertion operator. TypeScript에게 해당 값이 항상 존재한다고 알려줌. shift()의 결과가 undefined이더라도 TypeScript의 strict 모드 경고를 발생시키지 않도록 한다.

			// '지금' 레벨에서 출력해야 하는(=같은 레벨의) 노드가 아니면, result 배열에 현재까지 만든 string을 넣고 string을 초기화한다. 
			if (level !== currentLevel) {
				result.push(currentLevelString);
				result.push(connectorLine);
				currentLevelString = '';
				connectorLine = '';
				currentLevel = level;
			}

			// 현재 레벨의 자식 레벨에 이어지는 '연결 라인' 생성
			// ex) connectorLine = '/\ /\ /\ /\'
			let connector = '';
			if (currentNode.left) {
				connector += `/`;
				if (currentNode.right) {
					connector += '\\ ';
				} else connector += '  ';
			} else if (currentNode.right) {
				connector += ' \\ ';
			} else connector = '  ';
			connectorLine += connector;

			// 현재 레벨의 노드를 나열한 '노드 라인' 생성
			// ex) currentLevelString = '8 9 10 11 12 13 14 15'
			if (!parentNode) currentLevelString += `${currentNode.val}`;
			else if (currentNode && currentNode === parentNode.left) { // 현재 노드가 '왼 자식'
				currentLevelString += `${currentNode.val} `;
			} else if (currentNode) { // 현재 노드가 '오른 자식'
				if (!parentNode.left) {
					currentLevelString += `  `;
				}
				currentLevelString += `${currentNode.val} `;
			} else { // 현재 노드가 null인 가상의 자식. 근데 적용이 안 되는 것 같다.
				currentLevelString += '       ';
			}

			// 현재 노드에 왼쪽 자식 노드가 있으면 queue(의 끝)에 추가
			if (currentNode.left) {
				queue.push([currentNode.left, level + 1, currentNode]);
			}
			// 현재 노드에 오른쪽 자식 노드가 있으면 queue에 추가
			if (currentNode.right) {
				queue.push([currentNode.right, level + 1, currentNode]);
			}
		}

		// 마지막 노드 처리: 현재까지 만들고 있는 string이 빈 문자열 ''이 아니라면 마지막으로 result 배열에 추가해줌. 
		if (currentLevelString) {
			result.push(currentLevelString);
			result.push(connectorLine);
		}

		return result;
	}
}

// =>

// 재귀 호출을 이용한 DFS
// Time complexity: O(N)
// Space complexity: O(H) (H: height of the tree) ~= O(logN)
function solution(root: TreeNode | null): number {
	if (!root) return 0;

	const leftDepth = solution(root.left);
	const rightDepth = solution(root.right);

	return Math.max(leftDepth, rightDepth) + 1;
}

// 스택을 이용해 DFS를 할 수도 있나?
function solution2(root: TreeNode | null): number {
	if (!null) return 0;

	let maxDepth = 0;
	let count = 0;

	const stack: Array<TreeNode> = [root];

	while (stack.length) {
		maxDepth++;
		count = stack.length;

		for (let i = 0; i < count; i++) {
			let node = stack.pop();
			
			if (node.left) stack.push(node.left);
			if (node.right) stack.push(node.right);
			stack.shift();
		}

	}

	return maxDepth;
}

export default {
	solution: solution2,
	TreeNode,
}

