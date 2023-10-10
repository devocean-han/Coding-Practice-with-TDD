/* 230. Kth Smallest Element in a BST
https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/

Medium

Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

 

Example 1:


Input: root = [3,1,4,null,2], k = 1
Output: 1
Example 2:


Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
 

Constraints:

The number of nodes in the tree is n.
1 <= k <= n <= 104
0 <= Node.val <= 104
 

Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?

*/

import { TreeNode } from "../Class 모음";

// 시작하기 전에 엄청난 힌트를 얻어버렸다. BST는 inorder로 순회하면 작은 수부터 큰 수까지 차례로 순회할 수 있다! 
// 따라서 inorder로 순회해서 k번째로 처리되는 수를 반환하면 된다.
// inorder는 DFS(깊이 우선 탐색)의 일종이고 이는 재귀를 이용하거나 stack을 이용한 순회로 구현하는 방식이 있는데 일단 stack을 사용해보겠다: 
function solution(root: TreeNode | null, k: number): number {
	
	// 각 노드(값)가 고유하다는 가정 하에 성립하는 treeMap이다
	// const treeMap: Map<number, TreeNode> = new Map();
	const treeMap: Map<TreeNode, boolean> = new Map();

	const stack: TreeNode[] = [root];
	while (stack.length) {
		const node = stack[stack.length - 1];

		if (node.left && !treeMap.has(node.left)) {
			// 왼 자식을 처리 대기시켜야 한다.
			stack.push(node.left);
		}
		else {
			// '나'를 처리하고 오른 자식을 처리 대기시킨다.
			// '나'를 처리함 = 이번이 k번째 처리라면 곧바로 그 수를 리턴시키고 아니면 k를 하나 줄인다
			if (k === 1) return node.val;
			else {
				k--
				stack.pop();
				treeMap.set(node, true);
			}
			node.right && stack.push(node.right);
		}
	}
	
	return -1;
}
//? 만약 tree 자체에 삽입과 삭제가 빈번하게 일어난다면, 그런 상황에 어떻게 k번째 작은 수를 찾는 것을 더 적합하게(빠르게) 만들 수 있겠는가? 
//^ 	=> 그래도 이 방법이 최선이다. 최소값에서 몇 번째 수를 정확히 찾아가는 방법은, 가장 작은 수인 노드부터 확실하게 세나가는 수밖에 없다. 


// Map보다 Object이 더 빠른지 테스트하기 위한, 거의 똑같은 풀이: 
function solution2(root: TreeNode | null, k: number): number {
	
	// 각 노드(값)가 고유하다는 가정 하에 성립하는 treeMap이다
	const treeMap: { [key: number]: TreeNode } = {};

	const stack: TreeNode[] = [root];
	while (stack.length) {
		const node = stack[stack.length - 1];

		if (node.left && !treeMap[node.left.val]) {
			// 1. 왼 자식을 처리 대기시켜야 한다.
			stack.push(node.left);
		}
		else {
			// 2. '나'를 처리하고 
			// 3. 오른 자식을 처리 대기시킨다.
			// '나'를 처리함 = 이번이 k번째 처리라면 곧바로 그 수를 리턴시키고 아니면 k를 하나 줄인다
			if (k === 1) return node.val;
			else {
				k--
				stack.pop();
				treeMap[node.val] = node;
			}
			node.right && stack.push(node.right);
		}
	}
	
	return -1;
}

// 재귀를 이용한 풀이: 
function solution3(root: TreeNode | null, k: number): number {
	// inorder 결과를 배열에 담아 반환하는 재귀 함수는 다음과 같았다: 
	function inorderArr(node: TreeNode | null): number[] {
		if (!node) return [];
		return [...inorderArr(node.left), node.val, ...inorderArr(node.right)];
	}
	return inorderArr(root)[k - 1];
}

// Morris Traversla(모리스 순회): 중위 순회를 수행하는 공간 효율적인 알고리즘. 재귀나 Stack을 사용하지 않고도 이진 트리를 순회할 수 있어 공간 복잡도 O(1)로 완성이 가능하다.
// stack을 이용한 풀이에서와 같은 용어로 주석을 달았다:
// '처리' = 방문하는 것. stack에서 뽑아서 사용하는 것
// '처리 대기' = 나중에 방문할 수 있도록 stack에 담아두는 것
function solution4(root: TreeNode | null, k: number): number {
	let pointer = root;
	while (pointer !== null) {
		// 1. 현재 노드의 왼 자식이 있다면 왼 자식을 '처리 대기'시켜야 한다.
		if (pointer.left !== null) {
			const left = pointer.left; // 왼 자식을 저장해둔다. 
			pointer.left = null; // 원래 왼 자식의 자리를 비운다.
			
			// rightmost라는 포인터를 하나 만들어서 더 이동할 수 없을 때까지 오른 자식으로 이동한다.
			let rightmost = left;
			while (rightmost.right !== null) {
				rightmost = rightmost.right;
			}
			rightmost.right = pointer; // 마지막 오른 자식에게 포인터(root)를 오른 자식으로 붙여준다.
			pointer = left; // 과정을 반복하도록 포인터가 다시 아까 저장해둔 left를 가리키도록 만든다. 
		} else {
			// 2. '나'를 '처리'한다. (이번이 k번째 처리라면 곧바로 그 수를 리턴시키고 아니면 k를 하나 줄인다)
			if (--k !== 0) pointer = pointer.right;
			else break;
		}
	}
	
	return pointer.val;
}

export default {
	solution: solution3,
}