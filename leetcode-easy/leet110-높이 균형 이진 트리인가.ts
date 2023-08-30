/* 110. Balanced Binary Tree
https://leetcode.com/problems/balanced-binary-tree/

Easy

Given a binary tree, determine if it is 
height-balanced
.

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: true
Example 2:


Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
Example 3:

Input: root = []
Output: true
 

Constraints:

The number of nodes in the tree is in the range [0, 5000].
-104 <= Node.val <= 104

*/

import { first } from "cheerio/lib/api/traversing"

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

// => 주어진 트리가 '(높이)균형 이진 트리'인지를 검사하여 반환하기.
// *균형 트리: 어느 노드의 자식 트리를 비교해도 깊이가 1 이상 차이나지 않는 트리. 즉, 모든 서브트리의 높이가 최대 1만큼 차이나는 트리.
/*  예를 들어 
	 1
	/
   2
  /
 3
과 같은 트리에서 1의 왼쪽 서브트리는 높이가 2, 오른쪽 서브 트리는 높이가 0이라고 할 수 있으며, 이 때 높이 차가 2가 되어 균형 트리가 아니라고 판단할 수 있다. 
*/


// (실패함)(문제 이해를 잘못하여 접근)
// 1. 배열로 만든다. [1,2,2,3,3,null,null,4,4]
// 2. 각 레벨 범위에서 null이 하나라도 존재할 때, 그 다음 레벨 범위에 노드가 존재하면 false를 반환한다. => BFS 탐색으로 어차피 queue에 저장해야겠다. => '각 레벨 범위' = [1], [2,3], [4,5,6,7], [8,9,10,11,12,13,14,15], [16,...31], [32,...63], [64,...127] ... 즉, root 레벨을 0이라고 할 때 [2^레벨, ...2^(레벨+1) - 1]의 범위를 가짐.
//  	=> 총 2개 노드까지는 무조건 true가 되겠다. 
function solution(root: TreeNode | null): boolean {
	// 전체 노드가 0개 혹은 1개인 경우: true 반환
	if (!root || !(root.left || root.right)) return true;

	// BFS 탐색
	// 1) queue.shift()로 currentNode를 뽑아와 할 거 다 한 다음에
	// 2) .left가 있으면 queue에 넣는다.
	// 3) .right이 있으면 queue에 넣는다. 
	// 4) queue에 남은 노드가 없어지기까지 계속한다. 

	// queue[[각 노드, 완전 이진 트리 기준 노드 위치 번호]]
	const queue: Array<[TreeNode, number]> = [[root, 1]];
	let firstNullLevel = null;
	// let prevNotNullIndex = 0;

	while (queue.length > 0) {
		const [node, index] = queue.shift(); // undefined가 반환되면... 그럴 일이 없다. 값이 있는 노드면 [1, 1]같이 반환될 것이고 값이 없는 노드면 [null, 2]같이 반환될 것이므로 구조분해 할당은 제대로 이루어짐.
		
		// 현재 노드의 (가상)인덱스가 몇 레벨에 속하는지: root 노드를 0레벨로 삼았을 때, 'log2(N) 내림'과 같음.
		const level = Math.floor(Math.log2(index));
		// 만약 이전에 첫 발견한 null이 이미 있고 지금 null이 아닌 노드의 레벨이 첫 null 발견 레벨 + 1 (이상)이면 균형 트리가 아니라고 판단할 수 있다. 
		// console.log('firstNull, node, index, level: ', firstNullLevel, node, index, level);
		if (firstNullLevel && node && level - firstNullLevel >= 1) return false;

		// 현재 노드가 null이고 이게 첫 발견한 null이면
		// => null이 아닌 노드만 queue에 넣었는데, null인 노드를 어떻게 처음으로 찾아내지..? 인덱스가 처음으로 끊기는 부분. 
		if (!node && !firstNullLevel) {
		// if (index - prevNotNullIndex > 1 && !firstNullLevel) {
			// firstNullLevel = Math.floor(Math.log2(prevNotNullIndex));
			firstNullLevel = level;
			// console.log('++prev & index가 서로 달라, firstNullLevel이 정말 세팅되었나? ', prevNotNullIndex, index, firstNullLevel);
		}

		// 부모가 null이 아니면 자식이 null이어도 queue에 넣어준다. 그러면 무한루프가 멈출까? 일단 null이 아닌 부모의 자식들가지는 전부 들어가게 되고, 그렇게 들어가 자식 null이 도마에 올라왔을 때 그 자식은 들어가지 않게 된다... 그러면 언젠가는 자기 자신이 null인 '부모'들로 전부 교체되고, 그 자식들은 queue에 들어가지 앟으면서, 루프가 종료될 수 있다. 
		if (node) {
			queue.push([node.left, index * 2]);
		}
		// queue.push([node ? node.left : null, index * 2]);
		if (node) {
			queue.push([node.right, (index * 2) + 1]);
		}
		// queue.push([node ? node.right : null, (index * 2) + 1]);

		// 현재 노드가 null이 아닐 때만 prevIndex를 업데이트한다...
		// prevNotNullIndex = node ? index : prevNotNullIndex;
	}
	
	return true;
}

// 위의 풀이를 더 정리한 버전: 
function solution2(root: TreeNode | null): boolean {
	if (!root) return true;

	const queue: Array<[TreeNode, number]> = [[root, 1]];
	let firstNullIndex = null;

	while (queue.length > 0) {
		// queue에서 뽑는다.
		const [node, index] = queue.shift();

		// 현재 노드의 깊이 레벨을 계산
		const level = Math.floor(Math.log2(index));
		// 처음 발견된 null의 레벨과 1 이상 차이나는 레벨에 null이 아닌 정상적인 노드가 발견되(기만 하)면, 균형 트리가 아니다: 
		if (node && firstNullIndex && level - firstNullIndex >= 1) return false; 

		// (그렇지 않고) 처음 null을 만나면 그 레벨을 기억해둔다.
		if (!firstNullIndex && !node) {
			firstNullIndex = level;
		}

		// 값이 존재하는 노드의 자식들까지만 (null 포함하여) queue에 전부 추가해준다
		if (node) {
			queue.push([node.left, index * 2]);
			queue.push([node.right, (index * 2) + 1]);
		}
	}

	// 끝까지 1레벨 '초과'의 깊이 차이를 발견하지 못했다면 균형 트리가 맞다. 
	return true;
}

export default {
	solution: solution6,
	TreeNode,
}

// (이해 중)다른 BFS 해답:
function solution3(root: any) {
	let isBalanced = true;

	getHeight(root);
	let last = [];
	let children = [root];

	while (true) {
		last = children.concat();
		children = [];
		last.forEach((val) => {
			if (val) {
				let leftHeight = val.left ? val.left.height : 0;
				let rightHeight = val.right ? val.right.height : 0;
				if (Math.abs(leftHeight - rightHeight) > 1) isBalanced = false;
				if (val.left) children.push(val.left);
				if (val.right) children.push(val.right);
			}
		});

		if (!isBalanced) return false;
		if (children.length === 0) break;
	}
	
	return true;
}

function getHeight(node: any): number {
	if (!node) return 0;
	return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
	return node.height;
}

// 다른 해답2: Top down approach
function topDownSolution(root: TreeNode | null): boolean {
	// 현재 노드가 null이면 바로 true를 반환한다.
	if (!root) return true;

	// 왼쪽 자식과 오른쪽 자식 트리의 '깊이'를 구한다. 
	let leftDepth = depth(root.left);
	let rightDepth = depth(root.right);

	// 균형 트리가 되는 조건은:
	// 1) 두 자식 트리의 차가 1보다 작고,
	// 2) 현재 노드의 왼쪽 자식 노드에 대해 이 전체 로직을 동일하게 수행한 결과가 참,
	// 3) 현재 노드의 오른족 자식 노드에 대해 이 전체 로직을 동일하게 수행한 결과도 참
	// 이어야 한다. 
	// => 2번과 3번을 바꿔 말하자면 결국 가능한 모든 노드에 대해서 왼쪽 자식과 오른쪽 자식 트리의 깊이 차가 1 이하여야만 균형 트리가 된다는 것이다. 
	// return Math.abs(leftDepth - rightDepth) <= 1;
	return Math.abs(leftDepth - rightDepth) <= 1 && topDownSolution(root.left) && topDownSolution(root.right);
}

// 주어진 노드 이하 서브 트리의 깊이를 반환.
// 주어진 노드가 null이면 0을,
// 주어진 노드가 자기 자신뿐이면 1을,
// 주어진 노드가 자식이 있으면 2를, 손자가 있으면 3을 반환하는 식이다. 
function depth(node: TreeNode): number {
	// 주어진 노드가 null이면 0을 반환한다.
	if (!node) return 0;
	// 양 자식 중 더 깊은 트리를 택하고 1을 더해 반환한다.
	// 예) node[1,2,3] => 결과: 2
	return Math.max(depth(node.left), depth(node.right)) + 1;
}

// 다른 해답: DFS
function solution5(root: TreeNode | null) {
	return dfsHeight(root) !== -1;
}

// 1) 현재 노드가 null이면 0을 반환하고,
// 2) 현재 노드의 두 '자식 노드'에 대한 재귀호출로 현재 잎 노드부터 자식 노드까지의 판단을 불러온다.
// 2-1) 결과가 어차피 -1이었으면 바로 -1을 반환해주도록 한다.

// '현재 노드'에 대한 판단을 반환한다:
// 3-1) 이전 '자식 노드' 재귀호출에서는 딱 '자식 자기 자신'까지만 포함한 상태로 깊이 판단을 하였을 것이므로, '형제 노드'와의 깊이 비교는 이루어지지 않았을 것이다. 따라서 '현재(부모) 노드'의 두 자식 노드의 깊이를 비교해주고, 2 이상 차이나면 - 1을 반환한다.
// 3-2) 그렇지 않으면(두 자식의 깊이가 1만 차이나거나 같다면) 더 깊은 자식을 골라 1을 더한 현재까지의 깊이를 반환한다.

// 위의 로직을 얻기 위한 생각의 흐름은 다음과 같다: 
// (1)두 자식 트리의 깊이를 비교해야 한다 -> 두 자식 트리의 깊이를 각각 불러온다
// (2)그렇게 불러온 두 깊이가 2 이상 차이나면 '균형 아님'으로 판단해야 한다 -> 두 깊이가 2 이상 차이나면 -1을 반환하도록 한다.
// (1)+(2)가 '현재 노드'에 대한 판단 로직이고, (1)을 재귀적으로 구할 수 있을 것 같다. 그렇다면 두 깊이가 2 이상 차이날 때 '균형 아님'으로 판단하는 것 뿐만 아니라 반환 결과값이 '현재 노드 이하 트리의 깊이'가 될 수 있도록 숫자값이 되어야 하고, 또 탈출 조건이 필요해진다:
// (3)두 자식 트리의 깊이가 2 이상 차이나면 '균형 아님'으로 -1을 반환하도록 만들고, 반대로 1 이하로 차이나면 '균형임'으로 현재 노드까지의 깊이값을 반환해주면 되겠다 -> 두 자식 트리 깊이가 같을 때 아무 자식의 깊이에 1을 더한 값을, 두 자식 트리 깊이가 1 차이날 때 더 깊은 자식의 깊이에 1을 더한 값을 반환한다. 즉, 두 자식 트리 중 더 깊은 자식의 깊이에 1을 더한 값이 '현재 노드' 레벨까지 추가한 현재 깊이가 된다. 
// (4)탈출 조건은 처음에 깊이 숫자값이 시작되는 지점이기도 해야 한다. 즉, 탈출 반환값이 숫자값이 되어야 한다. 나 자신 노드를 레벨 하나로 셈하므로, 반대로 만약 나 자신 노드가 '없다면' 더해지는 레벨이 0인 것이다. 그렇다면 현재 노드가 null일 때 0을 반환하든지 현재 노드가 잎 노드일 때 1을 반환하든지 하여 탈출 조건을 짜면 되겠다. 
// (5)엇 그런데 최종적으로 반환해야 하는 형태는 true/false의 불리언이다. 지금 만드는 재귀함수는 숫자값을 반환해야 하므로, 결국 본체 solution 함수 외에 보조 재귀함수를 만들어야 한다는 결론이 나온다. 
function solution6(root: TreeNode | null): boolean {

	function subTreeDepth(node: TreeNode | null): number {
		// 0. 탈출 조건: 현재 노드가 잎 노드이면 1을 반환하도록 한다.
		// if (!node.left && !node.right && node) return 1;
		if (!node) return 0;
	
		// 1. 두 자식 트리의 깊이를 각각 불러온다. 
		const leftDepth = subTreeDepth(node.left); // node.left가 null일 때의 대처가 없다.
		const rightDepth = subTreeDepth(node.right);
		// 1-1. 
		if (leftDepth === -1 || rightDepth === -1) return -1;

		// 2. 그렇게 불러온 두 깊이가 2 이상 차이나면 '균형 아님'을, 즉 -1을 반환하도록 한다. 
		if (Math.abs(leftDepth - rightDepth) > 1) return -1;
		// => 둘의 결과값이 -1인 경우에는 '차' 계산값이 이상해진다. 결국 -1의 경우를 따로 취급해줘야 한다. -> 1.1 조건 추가. 
		// 3. 반대로 깊이가 1 이하로 차이나면 '균형임'을, 즉 두 자식 트리 중 더 깊은 자식의 깊이에 '현재 노드'의 레벨까지 +1을 더한 값을 반환한다. 
		return Math.max(leftDepth, rightDepth) + 1;
	}

	return subTreeDepth(root) !== -1;
}

function dfsHeight(node: TreeNode | null): number {
	// 현재 노드가 null이면 0을 반환한다.
	if (!node) return 0;

	// 왼쪽 자식 트리의 깊이를 구한다. 
	let leftDepth = dfsHeight(node.left);
	// 그렇게 구한 깊이가 -1이면 -1을 반환한다.
	if (leftDepth == -1) return -1;
	// 오른쪽 자식 트리의 깊이를 구한다. 
	let rightDepth = dfsHeight(node.right);
	if (rightDepth == -1) return -1;

	// 만약 두 자식 트리의 깊이가 2 이상 차이나면 -1을 반환하고,
	if (Math.abs(leftDepth - rightDepth) > 1) return -1;
	// 그렇지 않으면 두 깊이 중 큰 값에 1을 더해 반환한다. 
	return Math.max(leftDepth, rightDepth) + 1;
}
