/* 94. Binary Tree Inorder Traversal
https://leetcode.com/problems/binary-tree-inorder-traversal/description/

Easy

Given the root of a binary tree, return the inorder traversal of its nodes' values.

 

Example 1:


Input: root = [1,null,2,3]
Output: [1,3,2]
Example 2:

Input: root = []
Output: []
Example 3:

Input: root = [1]
Output: [1]
 

Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
 

Follow up: Recursive solution is trivial, could you do it iteratively?

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

// => 주어진 트리를 중위 순회한 결과 배열을 반환하기(노드의 값을 담아)
// 중위 순회: '나'와 나의 두 자식을 기준으로, 왼 자식 -> 나 -> 오른 자식

// iterative solution
function solution(root: TreeNode): number[] {
	if (!root) return [];

	// 객체로는 TreeNode객체 타입을 key로 가질 수 없어서(node의 주소값이 문자열로 저장될 줄 알았는데 안된다) 대신 Map을 이용하기로 한다. 
	const resultMap: Map<TreeNode, number> = new Map();
	const stack: Array<TreeNode> = [root];

	while (stack.length) {
		// 1. 
		const node = stack[stack.length - 1];
		
		if (node.left && !resultMap.has(node.left)) {
			// 2. 만약 지금 보고 있는 노드에 왼쪽 자식이 있고 이 자식이 resultObj에 들어가있지 않다면 지금 노드를 스택에 그대로 두고 왼 자식을 스택에 추가한다.  
			stack.push(node.left);
		} else {
			// 3. 그렇지 않으면
			// 	  스택에서 뽑고, 지금 노드와 값을 result 맵에 넣고, 오른 자식을 (있다면) 스택에 넣는다. 
			stack.pop();
			resultMap.set(node, node.val);
			node.right && stack.push(node.right);
		}
	}
	
	return [...resultMap.values()];
	/* Tip!
	* Iterable(이터러블): 반복 가능한 객체. 정확히는 Symbol.iterator() 메소드를 가지고 있는 객체를 말한다. 
		^ 1) 대표적인 이터러블 객체: Array, String, Map, Set
		^ 2) 이터러블을 써야하는 문법 예시: 
			~ "for ... of __" 문법에서 __ 자리에. 
			~ Array.from(__) 
			~ 전개구문 중 배열 스프레드(배열 리터럴)에: [...__, ...__,] 
		^ 1)과 2)를 기억하고 있다면 둘을 얼마든지 조합해서 쓸 수 있다. 
	* Iterator(이터레이터): 이터러블 객체를 순회하면서 값을 하나씩 반환하는 객체. next() 메소드를 가진다. 
	*/
	// return Array.from(...resultMap.values()); X
	// return Array.from(resultMap.values()); O
	// return Array.from(Object.values(resultObj)); O
}


// recursive solution
function solution2(root: TreeNode | null): number[] {
	if (!root) return [];
	return [...solution2(root.left), root.val, ...solution2(root.right)];
}

export default {
	solution: solution2,
	TreeNode: TreeNode,
}