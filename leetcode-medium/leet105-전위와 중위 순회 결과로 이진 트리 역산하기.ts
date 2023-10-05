/*
 * @lc app=leetcode id=105 lang=javascript
 *
 * [105] Construct Binary Tree from Preorder and Inorder Traversal
 *
 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 *
 * algorithms
 * Medium (62.50%)
 * Total Accepted:    1.1M
 * Total Submissions: 1.7M
 * Testcase Example:  '[3,9,20,15,7]\n[9,3,15,20,7]'
 *
 * Given two integer arrays preorder and inorder where preorder is the preorder
 * traversal of a binary tree and inorder is the inorder traversal of the same
 * tree, construct and return the binary tree.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * Output: [3,9,20,null,null,15,7]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: preorder = [-1], inorder = [-1]
 * Output: [-1]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= preorder.length <= 3000
 * inorder.length == preorder.length
 * -3000 <= preorder[i], inorder[i] <= 3000
 * preorder and inorder consist of unique values.
 * Each value of inorder also appears in preorder.
 * preorder is guaranteed to be the preorder traversal of the tree.
 * inorder is guaranteed to be the inorder traversal of the tree.
 * 
 * 
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

import { TreeNode } from "../Class 모음";

// preorder 결과만으로는 정확한 모양을 유추할 수 없는 건가?
// 새로 만든 노드가 부모의 왼 자식인지 오른 자식인지는 inorder도 참고하면 알 수 있다.
// 예를 들어 inorder의 첫 값이 preorder 첫 값, 즉 root와 같다면 root에게 왼 자식이 없음을 알 수 있다.
/* 
일단 같은 자리에 [3,9], [9,3]이렇게 순서만 바뀐 노드가 오는 때는 반드시 [3,9,null]의 부모-왼자식 관계가 확정된다.
노드를 2개씩 짝지어 서브 트리를 그려 가능한 경우의 수를 짝지어 전체 트리를 그려봤지만 일관되게 설명하기엔 복잡하다.
일단 preorder 배열의 연이은 두 값이 만들 수 있는 관계는 뒤의 값을 기준으로:
1. 왼쪽 자식이 된다
2. 외동 오른 자식이 된다
3. 왼 형제가 있는 오른 형제가 된다
의 세 가지가 가능하고, inorder 배열의 연이은 두 값은 역시나 뒤의 값을 기준으로: 
1. 오른 자식이 된다
2. 왼 자식의 부모가 된다
3. 오른 자식의 n대 왼 자손이 된다
이렇게 세 가지가 가능하다.
*/
// 막무가내 풀이
function buildTree1(preorder: number[], inorder: number[]): TreeNode | null {
	if (!preorder.length) return null;

	const treeMap: Map<number, TreeNode> = new Map();
	let root: TreeNode = new TreeNode(preorder[0]);
	treeMap.set(preorder[0], root);
	// preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
	// tree: [3,9,20,null,null,15,7]
	// 룰1: inorder에서 왼쪽에 위치하면, 왼쪽 자식이다.
	// 룰2: inorder에서 오른쪽에 위치하면, 오른 자손의 가장 가까운 공통 조상의 첫 오른 자식이다. 
	
	for (let i = 1; i < preorder.length; i++) {
		const preVal = preorder[i - 1];
		const curVal = preorder[i];
		
		for (let j = 0; j < inorder.length; j++) {
			const inVal = inorder[j];
			if (inVal === curVal) { // 왼쪽에서 발견
				const preValNode = treeMap.get(preVal);
				preValNode.left = new TreeNode(curVal);
				treeMap.set(curVal, preValNode.left);
				break;
			} 
			if (inVal === preVal) { // 오른쪽에서 발견
				let leftLimit = preVal;
				let rightLimit = null;	
				let pointer;
				// 가장 가까운(preVal보다 curVal에 가까운) leftLimit 찾기:
				while (inorder[j] !== curVal) {
					if (treeMap.has(inorder[j])) leftLimit = inorder[j];
					j++;
				}
				// 가장 가까운 rightLimit 찾기(있으면): 
				while (j < inorder.length) {
					if (treeMap.has(inorder[j])) {
						rightLimit = inorder[j];
						break;
					}
					j++;
				}
				// leftLimit과 rightLimit을 기준으로 딱 맞는 노드 위치 찾기:
				// rightLimit이 있든 없든 그냥 가장 가까운 leftLimit의 직속 오른 자식이 되도록 배치한다. 
				pointer = treeMap.get(leftLimit);
				pointer.right = new TreeNode(curVal);
				treeMap.set(curVal, pointer.right);
				
				break; 
			}
		}
	}
    
	return root;
};

// 재귀로 풀어본:
function buildTree2(preorder: number[], inorder: number[]): TreeNode | null {
	// pre[1,2,4,6,8,5,7,3]
	//  in[6,8,4,2,5,7,1,3]
	
	// inMap{val: inorderIndex}
	const inMap: Map<number, number> = new Map(inorder.map((v, i) => [v, i]));

	// treeMap{inorderIndex: TreeNode}
	const treeMap: Map<number, TreeNode> = new Map();
	treeMap.set(inMap.get(preorder[0]), new TreeNode(preorder[0]));

	// preorder에서 연이은 두 수를 인수로 받아 뒷 수를 tree의 알맞은 자리에 넣는다.
	// preIndex: preorder[]에서 연이은 두 수 중 앞의 수가 inorder[]에서 차지하는 자리(인덱스). 
	// 			 이미 tree에 배치된 수이다.
	// curIndex: preorder[]에서 연이은 두 수 중 뒤의 수가 inorder[]에서 차지하는 자리(인덱스). 
	// 			 지금 알맞은 자리를 찾으려는 대상이 되는 수이다. 
	function aug(preIndex: number, curIndex: number) {
		if (curIndex < preIndex) {
			const curNode = new TreeNode(inorder[curIndex]);
			treeMap.get(preIndex).left = curNode;
			treeMap.set(curIndex, curNode);
			return;
		}
		let i = preIndex + 1;
		while (i < curIndex) {
			if (treeMap.has(i)) {
				aug(i, curIndex);
				return;
			}
			i++;
		}

		const curNode = new TreeNode(inorder[curIndex]);
		treeMap.get(preIndex).right = curNode;
		treeMap.set(curIndex, curNode);
	}

	for (let i = 1; i < preorder.length; i++) {
		aug(inMap.get(preorder[i - 1]), inMap.get(preorder[i]));
	}

	return treeMap.get(inMap.get(preorder[0]));
}

// 다른 재귀 풀이:
function buildTree3(preorder: number[], inorder: number[]): TreeNode | null {
	if (!inorder.length) return null;

	const rootVal = preorder.shift()!;
	const inOrderRootIndex = inorder.findIndex((val) => val === rootVal);
	const inOrderLeftBranch = inorder.slice(0, inOrderRootIndex);
	const inOrderRightBranch = inorder.slice(inOrderRootIndex + 1);
	
	const tree = new TreeNode(rootVal);
	tree.left = buildTree3(preorder, inOrderLeftBranch);
	tree.right = buildTree3(preorder, inOrderRightBranch);

	return tree;
}

// 재귀도, stack 이용도 없는 풀이라는데...
// Time complexity O(N)
// Space complexity O(1)
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
	let root = null;
	let top = null;
	let pop = null;
	let i = 0;

	// preorder를 순회하며
    for (const val of preorder) {
        let node = new TreeNode(val)
		if (pop) {
			// pop이 null이 아니면 pop의 오른 자식으로 등록하고 pop을 null로 설정
			pop.right = node;
			pop = null;
        } else if (top) {
			// pop은 null이고 top이 null이 아니라면 top의 왼 자식으로 등록하고
			top.left = node;
        } else {
			// pop과 top 둘 다 null이면 root 노드로 등록한다.
			// (첫 진입 시에만 root 삼게 됨)
            root = node
		}
		
		// top을 현재 노드의 오른 자식으로 삼고(??) top 포인터는 현재 노드를 가리키게 만든다. 
		node.right = top;
		top = node  // "push"
		// top 포인터가 null이 아니며 그 값이 inorder의 i인덱스와 같을 동안
        while (top && top.val == inorder[i]) {
			// pop 포인터도 top을 가리키게 만들고 top 포인터는 pop의 오른 자식을 가리키게 한다. 그리고 pop의 오른 자식을 null로 지정 후 i 증가
			pop = top;
			top = pop.right;
			pop.right = null;  // "pop"
			++i;
        }
    }
    return root
};

export default {
	solution: buildTree3,
	TreeNode: TreeNode,
}
