/*
 * @lc app=leetcode id=106 lang=typescript
 *
 * [106] Construct Binary Tree from Inorder and Postorder Traversal
 *
 * https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
 *
 * algorithms
 * Medium (61.36%)
 * Total Accepted:    571.4K
 * Total Submissions: 931.1K
 * Testcase Example:  '[9,3,15,20,7]\n[9,15,7,20,3]'
 *
 * Given two integer arrays inorder and postorder where inorder is the inorder
 * traversal of a binary tree and postorder is the postorder traversal of the
 * same tree, construct and return the binary tree.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
 * Output: [3,9,20,null,null,15,7]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: inorder = [-1], postorder = [-1]
 * Output: [-1]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= inorder.length <= 3000
 * postorder.length == inorder.length
 * -3000 <= inorder[i], postorder[i] <= 3000
 * inorder and postorder consist of unique values.
 * Each value of postorder also appears in inorder.
 * inorder is guaranteed to be the inorder traversal of the tree.
 * postorder is guaranteed to be the postorder traversal of the tree.
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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
	// 노드의 값들이 고유하다는 것이 핵심 조건이다.
	// postorder에서 앞뒤로 붙어있는 값들이 inorder에서 한 값을 기준으로 나머지 한 값은 앞 뒤 반절 중 한 곳에 분포하게 된다는 점이 중요하다. 즉, postorder에서 연이은 두 수 [1,2]가 있을 때, 2는 1의 부모가 되거나 ...거나 ...가 될 수 있는데 inorder도 참고하면 2가 1의 이전이나 이후에 존재하게 된다. 에서 규칙을 이끌어내서 풀면 될 것 같다. 
	
	/* 
	* postorder를 거꾸로 순회한다. 
	* Post[2, 1]처럼 연이어 붙어있는 두 수에 대하여, 1의 위치가 확정됐을 때 2의 위치는: 
	* In[앞부분에 위치, 1]일 때: 왼 자식, 왼 형제, 마지막 왼 자손의 공통 조상의 첫 왼 자식이 될 수 있고,
	* In[1, 뒷부분에 위치]일 때: 무조건 오른 자식이어야 한다.
	*
	*/ 
	
	// inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
	// tree: [3,9,20,null,null,15,7]
	// 룰1: inorder에서 오른쪽에 위치하면, 오른 자식이다.
	// 룰2: inorder에서 왼쪽에 위치하면, 마지막 왼 자손의 가장 가까운 공통 조상의 첫 왼 자식이다. 
	if (!postorder.length) return null;
	const treeMap: Map<number, TreeNode> = new Map();
	let root: TreeNode = new TreeNode(postorder[postorder.length - 1]);
	treeMap.set(root.val, root);
	// let closestRightVal: number;
	
	for (let i = postorder.length - 2; i >= 0; i--) {
		const curVal = postorder[i];
		const postVal = postorder[i + 1];

		inorderTraversal:
		for (let j = inorder.length - 1; j >= 0; j--) {
			const inVal = inorder[j];
			if (inVal === curVal) { // 오른편에 위치
				const postValNode = treeMap.get(postVal);
				postValNode.right = new TreeNode(curVal);
				treeMap.set(curVal, postValNode.right);
				break;
			}
			if (inVal === postVal) { // 왼편에 위치
				let closestRightVal: number = postVal;
				
				// 방법2: 
				while (inorder[j] !== curVal) {
					if (treeMap.has(inorder[j])) closestRightVal = inorder[j];
					j--;
				}
				const closestRightNode = treeMap.get(closestRightVal);
				closestRightNode.left = new TreeNode(curVal);
				treeMap.set(curVal, closestRightNode.left);
				break;

				// 방법1: 
				for (; j >= 0; j--) {
					if (inorder[j] === curVal) {
						const closestRightNode = treeMap.get(closestRightVal);
						closestRightNode.left = new TreeNode(curVal);
						treeMap.set(curVal, closestRightNode.left);
						break inorderTraversal;
					}
					if (treeMap.has(inorder[j]))
						closestRightVal = inorder[j];
				}
			}
		}
	}

	return root;
};

// 재귀 함수를 이용:
function solution2(inorder: number[], postorder: number[]): TreeNode | null {

	// (postorder에서 연이은 두 수인)'현재 값'과 '이후 값'을 받아 inorder를 순회하며 트리의 적절한 곳에 '현재 값'으로 만든 노드를 배치시키는 보조 함수. '이후 값'은 이미 트리에 배치된 노드이다. 
	// - inorder에서 오른편에 있음이 발견됐을 때, 오른 자식으로 등록한다. 
	// - inorder에서 왼편에 있음이 발견되면 오른편 중 가장 가까운 '이미 발견된 적 있는' 수를 찾아 그 왼 자식으로 등록한다.  
	
	// postorder에서 연이은 두 수를 인수로 받아 앞 수를 tree의 알맞은 자리에 넣는다.
	// curIndex: postorder[]에서 연이은 두 수 중 앞의 수가 inorder[]에서 차지하는 자리(인덱스). 
	// 			 지금 알맞은 자리를 찾으려는 대상이 되는 수이다. 
	// postIndex: postorder[]에서 연이은 두 수 중 뒤의 수가 inorder[]에서 차지하는 자리(인덱스). 
	// 			 이미 tree에 배치된 수이다.
	function aug(curIndex: number, postIndex: number) {
		// inorder에서는 curVal 위치가 postVal의 오른편인 경우:
		// if (이후 값 -- 현재 값) // 오른 자식으로 위치시키고 끝냄
		if (postIndex < curIndex) {
			const postNode = treeMap.get(postIndex);
			postNode.right = new TreeNode(inorder[curIndex]);
			treeMap.set(curIndex, postNode.right)
			return;
		}
		
		// inorder에서 curVal 위치가 postVal의 왼편인 경우: 
		// if (현재 값 -- '이미 봤던 값' -- 이후 값) // '이미 봤던 값'을 이후 값 대신 넣어 재귀호출: aug(현재 값, 이미 봤던 값)
		// 현재 값 인덱스 ~ 이후 값 인덱스 사이의 '이미 봤던 값' 찾기
		let i = postIndex - 1;
		while (i > curIndex) {
			if (treeMap.has(i)) {
				// 현재 검사중인 위치(i)를 '이후 값'으로 
				aug(curIndex, i);
				return;
			}
			i--;
		}
		// 지금 저장돼 있는 '이후 값'이 바로 가장 가까운 '이미 봤던 값'이자 공통 조상이 되므로, 그 왼 자식으로 등록하고 끝낸다.
		const postNode = treeMap.get(postIndex);
		postNode.left = new TreeNode(inorder[curIndex]);
		treeMap.set(curIndex, postNode.left);
	}

	if (!inorder.length) return null;
	const root: TreeNode = new TreeNode(postorder[postorder.length - 1]);
	//^ inMap{val: inorderIndex}: val로 inorder에서의 인덱스에 접근 (사실 inorder.indexOf(val)로 대체할 수 있음)
	const inMap: Map<number, number> = new Map(inorder.map((v, i) => [v, i]));
	//^ treeMap{inorderIndex: TreeNode}: 방문한 적이 있는 노드를 기록하고 inorder에서의 인덱스로 접근
	const treeMap: Map<number, TreeNode> = new Map(); 
	treeMap.set(inMap.get(root.val), root);

	for (let i = postorder.length - 2; i >= 0; i--) {
		aug(inMap.get(postorder[i]), inMap.get(postorder[i + 1]));
	}

	return root;
}

// 위의 solution2를 리팩토링한 풀이: 
function solution3(inorder: number[], postorder: number[]): TreeNode | null {
	function buildTree(inStart: number, inEnd: number, postStart: number, postEnd: number): TreeNode | null {
		if (inStart > inEnd || postStart > postEnd) {
			return null;
		}

		const rootVal = postorder[postEnd];
		const root = new TreeNode(rootVal);
		const inorderIndex = inorder.indexOf(rootVal);

		root.left = buildTree(inStart, inorderIndex - 1, postStart, postStart + inorderIndex - 1 - inStart);
		root.right = buildTree(inorderIndex + 1, inEnd, postStart + inorderIndex - inStart, postEnd - 1);

		return root;

		/* 설명: 
		 * inorder:  [9,3,15,20,7]
		 * postorder:[9,15,7,20,3]
		 * 
		 * 1. post에서 마지막 수 3은 반드시 root임을 확신할 수 있다.
		 * 2. in에서 3의 위치를 찾는다. 
		 * 3. 3이 root이기 떄문에, 조상으로 뻗는 경우의 수는 모두 잘리고 in에서 3의 좌우로 위치하는 수들이 깔끔하게 왼 서브트리와 오른 서브트리로 나뉜다고 확신할 수 있다. 
		 * 4. 3을 root로 놓고 봤을 때, 왼 서브트리 전체는 1개의 노드(3)로 구성되어 있다. 오른 서브트리 전체는 3개의 노드(15,20,7)로 구성되어 있다. 
		 * 5. post를 구성한 원리가 '왼 서브트리 전체->오른 서브트리 전체->나(root)'의 순서임을 생각하면, 그냥 앞에서부터 차례로 세어서 왼 서브트리와 오른 서브트리 전체의 개수만큼 분리할 수 있다. 즉, post에서도 root 3의 왼 서브트리(9)와 오른 서브트리(15,7,20)를 확신있게 분리할 수 있는 것이다.
		 * 
		 * 따라서 재귀호출을 순서대로 따라가보면 다음과 같이 분리된다: 
		 * inorder:  [9,3,15,20,7]
		 * postorder:[9,15,7,20,3]
		 * 
		 * 1) root = 3
		 * inorder:  [9] [] [15,20,7]
		 * postorder:[9] [15,7,20] []
		 * 다음 호출: left([9],[9]) , right([15,20,7],[15,7,20])
		 * 
		 * 2) left root = 9, right root = 20
		 * inorder:  [] [] [[15] [] [7]]
		 * postorder:[] [[15] [7] []] []
		 * 
		 * 3) left root =15, right root = 7
		 * inorder:  [] [] [[] [] []]
		 * postorder:[] [[] [] []] []
		 * => 빈 배열이 주어지는 호출에서 탈출조건에 따라 탈출하게 되는 거라고 보면 된다. (사실 배열 자체가 아니라 인덱스로 인자가 주어짐을 따졌을 때, 시작 인덱스 = 끝 인덱스일 때 [9]처럼 요소 하나가 남게 되고 시작 인덱스 > 끝 인덱스일 때라야 빈 배열[]이 되므로 '빈 배열이 인자로 넘겨지는 호출'이 탈출조건에 부합한다.)
		 */
	}

	if (!inorder.length) return null;
	return buildTree(0, inorder.length - 1, 0, postorder.length - 1);
}

export default {
	solution: solution2,
}
