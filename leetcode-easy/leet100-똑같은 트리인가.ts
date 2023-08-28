/* 100. Same Tree
https://leetcode.com/problems/same-tree/description/

Easy

Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

 

Example 1:


Input: p = [1,2,3], q = [1,2,3]
Output: true
Example 2:


Input: p = [1,2], q = [1,null,2]
Output: false
Example 3:


Input: p = [1,2,1], q = [1,1,2]
Output: false
 

Constraints:

The number of nodes in both trees is in the range [0, 100].
-104 <= Node.val <= 104

*/

import { connect } from "http2"

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
	
	printTree(node: TreeNode | null = this, prefix: string = '', isLeft: boolean, result: string[] = []) {
		if (node === null) {
			return;
		}

		const connector = isLeft ? '/' : '\\';
		console.log(`${prefix}${connector}----${node.val}`);

		const childPrefix = `${prefix}		`;
		this.printTree(node.left, childPrefix, true);
		this.printTree(node.right, childPrefix, false);
	}

	printTreeLevels(node: TreeNode | null = this, isLeftNode: boolean): string[] {
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

			// (낮은 레벨부터 차례로 튀어나올) 노드들이 '지금' (낮은 레벨부터 차례로)그리고 있는 레벨과 같은 동안에는 다음과 같이 한다: 
			// 1) 자식 노드가 하나라도 있으면 connector를 '/'로 삼고, 없으면 ' '로 삼는다. 
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

			// currentLevelString += `${connector}${connector === '/' ? ' ' : '  '}${currentNode.val}`;
			// if (connector == '/  ') currentLevelString += `${currentNode.val}  `;
			// else if (connector == '/\\ ') currentLevelString += `${currentNode.val}`;
			// currentLevelString += `${currentNode.val}  `;
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

// => 주어진 두 트리가 같은지를 검사하여 반환하기.

/**
 * @param {TreeNode} p 
 * @param {TreeNode} q 
 * @returns {boolean}
 */
function solution(p: TreeNode| null, q: TreeNode| null): boolean {
	// 두 노드가 모두 null임 = '둘이 같다'
	if (!p && !q) return true;
	// 둘 중 하나만 null임 = '다름'
	if (!p || !q) return false;
	// 둘 다 값이 존재하지만 서로 다름 = '다름'
	if (p.val !== q.val) return false;

	// 왼쪽과 오른쪽 자식들을 각각 서로 비교 
	// 이를 재귀적으로 반복한다.
	const left = solution(p.left, q.left);
	const right = solution(p.right, q.right);
	// => 왼쪽과 오른쪽 자식의 끝에 다다를 때까지 이 줄까지만 반복된다. 

	// 만약 비교한 "left" 결과가 false라면, 현재 노드의 왼쪽 자식 트리가 서로 달랐다는 의미이므로 false를 결과로 반환한다. "right"도 마찬가지.
	if (!left || !right) return false;
	
	// 그렇지 않다면 왼쪽과 오른쪽 자식 트리가 모두 동일하다는 의미이므로 true를 반환한다. 
	return true;
}

export default {
	solution: solution2,
	TreeNode,
}

// 다른 해답: 위의 풀이를 더 축약한 형태
function solution2(p: TreeNode| null, q: TreeNode| null): boolean {
	if (!p && !q) return true;
	if (!p || !q) return false;
	if (p.val !== q.val) return false;
	return solution2(p.left, q.left) && solution2(p.right, q.right);
}