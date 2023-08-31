/* 572. Subtree of Another Tree
https://leetcode.com/problems/subtree-of-another-tree/

Easy

Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

 

Example 1:


Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true
Example 2:


Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
Output: false
 

Constraints:

The number of nodes in the root tree is in the range [1, 2000].
The number of nodes in the subRoot tree is in the range [1, 1000].
-104 <= root.val <= 104
-104 <= subRoot.val <= 104

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

// => "root"의 서브트리 중 "subRoot"과 완전히 같은 트리가 있으면 true 반환하기.

// subRoot이 잎노드에 다다를 때까지 '같았다'면 최종적으로 true 반환.
// root를 훑어 내려간다.
// subRoot의 루트 노드와 같은 값을 발견하면 비교를 시작한다.
// 도중에 달라지는 구석을 발견하면 비교를 멈추고 다음으로 subRoot의 루트 노드와 같은 값을 발견하기까지 기다린다.
// 근데 비교에 들어갔는데, 바로 다음 노드도 루트 노드와 같은 값이면 어떡하지? 일단 이 가능성을 제외하고 생각하자...
// 완전히 같다고 판단하는 때는, subRoot의 노드가 전부 다 닳았을 때이다.

// 둘이 포함관계인 트리인지 알고 싶다. -> 현재 노드 이하 노드가 전부 같아야 한다. => 노드 두 개를 줬을 때 완전히 같은 트리인지를 반환하는 보조 함수를 만든다. root의 전체 노드에 대해 비교를 실시한다....  
function solution1(root: TreeNode | null, subRoot: TreeNode | null): boolean {
	// root의 전체 노드에 대해 isSameTree 비교 실행
	let thisNodeCheck = isSameTree(root, subRoot);
	
	if (thisNodeCheck) return true;
	// 어떻게 전체 노드를 순회할 것인가? 
	if (root) {
		const leftNodeCheck = solution1(root.left, subRoot)
		if (leftNodeCheck) return true;
		const rightNodecheck = solution1(root.right, subRoot)
		if (rightNodecheck) return true;
	}

	return false;
	
	// 주어진 두 노드 이하 서브 트리를 전체 비교하여 같으면 true 반환
	function isSameTree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
		if (!root && !subRoot) return true;
		if (!root || !subRoot) return false;
		if (root.val !== subRoot.val) return false;
	
		// otherwise, 
		// if (root.val === subRoot.val) return true;
		const leftTree = isSameTree(root.left, subRoot.left);
		const rightTree = isSameTree(root.right, subRoot.right);
		
		// 둘 중 하나라도 false면 전체 false 반환
		return leftTree && rightTree;
	}
} 

// solution1을 리팩토링한 버전1: 재귀 함수를 더 간결하게 작성하기
// 시간복잡도: 각 노드마다 isSameTree 함수를 한 번씩 호출하므로...
// 공간복잡도: 재귀 호출의 경우 호출 스택에 저장되는 공간이 추가로 필요하게 되므로... 
// Time complexity: O(N*S) (N: root length, S: subRoot length)
// Space complexity: O(H) (H: height of root)
function solution2(root: TreeNode | null, subRoot: TreeNode | null): boolean {
	if (!root) return false;

	if (isSameTree(root, subRoot)) return true;

	return solution2(root.left, subRoot) || solution2(root.right, subRoot);
}
// solution2의 보조함수
function isSameTree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
	if (!root && !subRoot) return true;
	if (!root || !subRoot) return false;
	if (root.val !== subRoot.val) return false;

	return isSameTree(root.left, subRoot.left) && isSameTree(root.right, subRoot.right);
}

// 다른 해답: solution1과 로직은 같되 root을 탐색할 때 스택을 이용하여 DFS 순회
function solution3(root: TreeNode | null, subRoot: TreeNode | null): boolean {
	if (!root) return false;

	const stack = [root];

	while (stack.length > 0) {
		const node = stack.pop(); // stack이므로 pop. 

		if (node) {
			if (isSameTree(node, subRoot)) return true;
			stack.push(node.left);
			stack.push(node.right);
		}
	}

	return false;
}

export default {
	solution: solution4,
	TreeNode,
}

// 다른 해답: BFS?!
// Time complexity: O(N)? 
// => O(루트 이하 노드 수=N) + O(루트.left 이하 노드 수) + O(루트.right 이하 노드 수) + ... O(1)*(잎 노드 수)인데 대략 완전 이진 트리라고 가정하면: 0레벨에 O(N) + 1레벨에 O(N-1 = N-(2^0)) + 2레벨에 O(N-3 = N-(2^0+2^1)) + 3레벨에 O(N - (2^0 + 2^1 + 2^2)) + ... + H-1(=마지막-1)레벨에 O(N - (2^0 + 2^1 + .. + 2^(H-2))) + H레벨(마지막 레벨)에 O(N - (2^0 + 2^1 + ... + 2^(H-2) + 2^(H-1)))
// Space complexity: O(N) + O(N)?
function solution4(root: TreeNode | null, subRoot: TreeNode | null): boolean {
	if (!root && !subRoot) return true;
	if (!root || !subRoot) return false;

	console.log(root.printTreeLevels().join('\n'), '\n', JSON.stringify(root));
	let queue = [root];
	while (queue.length) {
		let node = queue.shift();

		if (JSON.stringify(node) === JSON.stringify(subRoot)) return true;

		if (node?.left) queue.push(node.left);
		if (node?.right) queue.push(node.right);
	}

	return false;
}

/* DFS와 BFS에 대하여
1. 트리나 그래프와 같은 자료구조에서 노드를 탐색하는 방법:
DFS: Depth-First Search(깊이 우선 탐색)
	- 한 경로를 끝까지 탐색
	- 스택 또는 재귀함수로 구현
	- 전위, 중위, 후위 트리 순회 전부가 다 DFS의 일종임.
BFS: Breadth-First Search(너비 우선 탐색)
	- 각 레벨별로 노드들을 탐색
	- 큐를 이용하여 구현
	- 가까운 노드부터 탐색하므로 최단 경로를 찾는데 유용함
	
2. 트리 순회 방식
Preorder Traversal(전위 순회):
	- 현재 노드, 왼쪽 자식, 오른쪽 자식 노드 순서로 순회
	- 트리 구조를 복원하거나 복제하는데 사용
Inorder Traversal(중위 순회):
	- 왼쪽 자식, 현재 노드, 오른쪽 자식 노드 순서로 순회
	- 이진 탐색 트리에서 노드 값을 오름차순으로 정렬된 리스트로 얻을 때 사용하면 유용함
Postorder Traversal(후위 순회):
	- 왼쪽 자식, 오른쪽 자식, 현재 노드 순서로 순회
	- 후위 표현식 계산에 사용됨
*/