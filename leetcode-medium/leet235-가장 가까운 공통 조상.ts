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
// Time complexity: O(H-1) = O(H)
// Space complexity: O(H)
function solution(root: TreeNode, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
	// if (!root) return root;
	// 두 노드가 현재 노드의 오른쪽 서브트리에 있을 경우
	if (root.val < p.val && root.val < q.val) return solution(root.right, p, q);
	// 두 노드가 현재 노드의 왼쪽 서브트리에 있을 경우
	if (root.val > p.val && root.val > q.val) return solution(root.left, p, q);

	// p와 q가 현재 노드의 양쪽 서브트리에 있거나
	// 현재 노드가 p 또는 q 중 하나와 일치하는 경우
	return root;
}

// BST(이진 검색 트리)란: 
// 각 노드는 값(value)을 가지며, 이 값은 다른 모든 왼쪽 서브트리의 노드 값보다 커야 한다.
// 각 노드는 값(value)을 가지며, 이 값은 다른 모든 오른쪽 서브트리의 노드 값보다 작거나 같아야 한다.
// 왼쪽 서브트리와 오른쪽 서브트리도 모두 이진 검색 트리여야 한다.

export default {
	solution: solution3,
}

// 반복을 이용한 풀이
// Time complexity: O(H-1) = O(H) 
// Space complexity: O(1) ?
function solution2(root: TreeNode, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
	// root가 null이 아닌 동안
	while (root) {
		// p와 q의 value가 모두 root보다 크면 '현재 노드'를 오른 자식으로 이동한다. 
		if (root.val < p.val && root.val < q.val) {
			root = root.right;
		// p와 q의 value가 모두 root보다 작으면 '현재 노드'를 왼 자식으로 이동한다. 
		} else if (root.val > p.val && root.val > q.val) {
			root = root.left;
		// 그렇지 않다면
		// (= p와 q가 현재 노드의 양쪽 서브 트리에 위치하거나)
		// (  현재 노드가 p 또는 q 중 하나와 일치하는 경우)
		// 탐색을 멈추고 현재 노드를 반환한다.  
		} else {
			break;
		}
	}

	return root;
}

// 보조 함수를 이용한 다른 해답: 루트부터 시작해서 p와 q의 조상을 모두 구한 배열 2개에서, 둘이 서로 '달라지는(=공통조상이 갈라지는)' 지점의 직전 노드를 반환한다. 
// Time complexity: O(3H) = O(H)
// Space complexity: O(2H) = O(H)
function solution3(root: TreeNode, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
	function findAncestors(node: TreeNode | null, target: TreeNode | null) {
		if (!node) return [];

		const result = [node]; // 조상을 모아 담을 배열
		while (node.val !== target.val) {
			// 현재 검사하는 노드가 타겟 노드보다 값이 크면 왼 자식으로,
			// 값이 작으면 오른 자식으로 이동한다. 
			if (node.val > target.val) {
				node = node.left;
			} else {
				node = node.right;
			}
			result.push(node);
		}
		
		return result;
	}

	// p와 q의 모든 조상 리스트를 구한다.
	const anscestorP = findAncestors(root, p); // O(H)
	const anscestorQ = findAncestors(root, q); // O(H)

	let leastCommonAnscestor;

	for (let i = 0; i < Math.min(anscestorP.length, anscestorQ.length); i++) { // O(H)
		if (anscestorP[i].val === anscestorQ[i].val) {
			leastCommonAnscestor = anscestorP[i];
		} else {
			break;
		}
	}

	return leastCommonAnscestor;
}