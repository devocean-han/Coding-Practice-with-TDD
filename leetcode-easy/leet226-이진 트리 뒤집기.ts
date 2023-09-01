/* 226. Invert Binary Tree
https://leetcode.com/problems/invert-binary-tree/description/



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

// => 주어진 이진 트리를 뒤집고 그 root를 반환하기.

function solution(root: TreeNode): TreeNode {

	// node(현재 레벨의, 타겟 노드)를 각각 어떻게 지정할 것인가(순회할 것인가)가 문제다. node를 순회할 수만 있으면, 자식들이 null이어도 좌우를 바꾸는 과정에는 문제가 없다. node가 null이 아닌 동안에만 재귀적으로 호출하면 되겠다. node가 null이면 그냥 자기 자신을 반환하도록 하고. node가 null이 아니면 좌우 자식을 바꾸고 자기 자신을 반환한다.
	if (!root) return root;

	let temp: TreeNode;
	temp = solution(root.right);
	root.right = solution(root.left);
	root.left = temp;

	return root;
}

export default {
	solution: solution2,
	TreeNode, 
}

// solution1과 같은 재귀 호출 방법은, 콜 스택이 overflow 되기 십상이므로 더 robust한 방법을 찾아야 한다길래: Queue 자료구조를 이용한 BFS 방식으로 순회함. 각 노드를 (위에서부터)딱 한 번씩만 방문하므로, 너비 우선 탐색도 유효한 순회 방법이다.
function solution2(root: TreeNode | null): TreeNode | null {
	if (!root) return root;

	const queue: Array<TreeNode> = [root];
	while (queue.length) {
		let node = queue.shift();
		let temp = node.left;
		node.left = node.right;
		node.right = temp;

		if (node.left) queue.push(node.left);
		if (node.right) queue.push(node.right);
	} 

	return root;
}

// 똑같은 DFS이지만 스택을 대신 이용한 순회 방법도 있다: 
function solution3(root: TreeNode | null): TreeNode | null {
	if (!root) return root;

	const stack: Array<TreeNode> = [root];
	while (stack.length) {
		let node = stack.pop();
		let temp = node.left;
		node.left = node.right;
		node.right = temp;

		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}

	return root;
} 












