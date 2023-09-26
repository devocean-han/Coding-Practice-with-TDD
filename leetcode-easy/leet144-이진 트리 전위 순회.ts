/*
 * @lc app=leetcode id=144 lang=javascript
 *
 * [144] Binary Tree Preorder Traversal
 *
 * https://leetcode.com/problems/binary-tree-preorder-traversal/description/
 *
 * algorithms
 * Easy (68.10%)
 *
 * Given the root of a binary tree, return the preorder traversal of its nodes'
 * values.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: root = [1,null,2,3]
 * Output: [1,2,3]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: root = []
 * Output: []
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: root = [1]
 * Output: [1]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * The number of nodes in the tree is in the range [0, 100].
 * -100 <= Node.val <= 100
 * 
 * 
 * 
 * Follow up: Recursive solution is trivial, could you do it iteratively?
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
class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
	constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

// 전위 순회: '나'와 두 자식을 기준으로, 나->왼자식->오른자식 순으로 탐색하는 것.
// 그렇게 탐색한 순서대로 숫자를 담아 배열로 반환하기

// iterative solution
function preorderTraversal(root: TreeNode | null): number[] {
    // 트리의 노드가 0개면 곧바로 빈 배열 반환:
    if (!root) return [];

    const traversed: number[] = [];   // 순회 결과를 담을 숫자 배열
    const stack: TreeNode[] = [root]; // DFS를 구현할 자료구조 

    while (stack.length > 0) {
        // 1. 스택에서 노드 추출: 
        //    스택에서 제일 뒤(마지막에 들어온) 노드를 뺴내고 
        const node = stack.pop();

        // 2. 핵심 로직 수행: 
        //    빼낸 노드의 값을 결과 배열에 넣는다.
        traversed.push(node.val);

        // 3. 오른쪽과 왼쪽 자식이 각각 존재하면(null이 아니면) 스택에 차례로 넣는다. 
        node.right && stack.push(node.right);
        node.left && stack.push(node.left);

        // => 전위 탐색이 되는 핵심: 2에서 자기 자신을 가장 먼저 처리하고 있고, 그 후에 3에서 right->left 순서로 스택에 넣은 후 거꾸로 뽑아서 처리하므로 나->왼자식->오른자식 의 순서가 보장된다. 
    }

    return traversed;
};

// recursive solution
function preorderTraversal1(root: TreeNode | null): number[] {
    function dfsPreOrder(node: typeof root, stack: number[] = []) {
        if (node) {
            stack.push(node.val);
            node.left && dfsPreOrder(node.left, stack);
            node.right && dfsPreOrder(node.right, stack);
        }

        return stack;
    }

    return dfsPreOrder(root);
};

export default {
	solution: preorderTraversal,
}