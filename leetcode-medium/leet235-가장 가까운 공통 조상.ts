/* 235. Lowest Common Ancestor of a Binary Search Tree
https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

Medium

Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

 

Example 1:


Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
Example 2:


Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
Example 3:

Input: root = [2,1], p = 2, q = 1
Output: 2
 

Constraints:

The number of nodes in the tree is in the range [2, 105].
-109 <= Node.val <= 109
All Node.val are unique.
p != q
p and q will exist in the BST.

*/

class TreeNode {
	val: number
	left: TreeNode | null
	right: TreeNode | null
	constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

// => 주어진 이진탐색트리(BST)에서 주어진 두 노드의 가장 가까운 공통 조상을 찾아서 반환하기. 자기자신도 가장 가까운 공통 조상이 될 수 있다. 

// BST의 중요한 특성은 부모 노드의 값이 왼쪽 서브트리에 있는 모든 노드의 값보다 작고 오른쪽 서브트리에 있는 모든 노드의 값보다 크다는 점이다. 주어진 두 노드 중 하나의 값이 현재 노드의 값보다 작으면 왼쪽 자식 트리로 가고 크면 오른쪽 자식 트리로 가며, 같거나 null이면 null을 반환한다. 
function solution(root: TreeNode, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
	// if (!root) return root;
	// 두 노드가 현재 노드의 오른쪽 서브트리에 있을 경우
	if (root.val < p.val && root.val < q.val) solution(root.right, p, q);
	// 두 노드가 현재 노드의 왼쪽 서브트리에 있을 경우
	if (root.val > p.val && root.val > q.val) solution(root.left, p, q);

	// p와 q가 현재 노드의 양쪽 서브트리에 있거나
	// 현재 노드가 p 또는 q 중 하나와 일치하는 경우
	return root;
}

// BST(이진 검색 트리)란: 
// 각 노드는 값(value)을 가지며, 이 값은 다른 모든 왼쪽 서브트리의 노드 값보다 커야 한다.
// 각 노드는 값(value)을 가지며, 이 값은 다른 모든 오른쪽 서브트리의 노드 값보다 작거나 같아야 한다.
// 왼쪽 서브트리와 오른쪽 서브트리도 모두 이진 검색 트리여야 한다.

export default {
	solution: solution2,
}

// 반복을 이용한 풀이:
function solution2(root: TreeNode, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
	// if (!root) return root;
	while (root) {
		if (root.val < p.val && root.val < q.val) {
			solution(root.right, p, q);
		} else if (root.val > p.val && root.val > q.val) {
			solution(root.left, p, q);
		} else {
			break;
		}
	}

	return root;
}