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
	
	if (!postorder.length) return null;

	const treeMap: Map<number, TreeNode> = new Map();
	let root: TreeNode = new TreeNode(postorder[0]);
	treeMap.set(postorder[0], root);
	// inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
	// tree: [3,9,20,null,null,15,7]
	// 룰1: inorder에서 오른쪽에 위치하면, 오른 자식이다.
	// 룰2: inorder에서 왼쪽에 위치하면, 마지막 왼 자손의 가장 가까운 공통 조상의 첫 왼 자식이다. 
	
	for (let i = 1; i < postorder.length; i++) {
		const preVal = postorder[i - 1];
		const curVal = postorder[i];
		
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

export default {
	solution: buildTree,
}
