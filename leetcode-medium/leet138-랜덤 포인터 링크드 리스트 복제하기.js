/* 138. Copy List with Random Pointer
https://leetcode.com/problems/copy-list-with-random-pointer/

Medium

A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.

Return the head of the copied linked list.

The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

val: an integer representing Node.val
random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
Your code will only be given the head of the original linked list.


Example 1:

Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]


Example 2:

Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]


Example 3:

Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]


Constraints:

0 <= n <= 1000
-104 <= Node.val <= 104
Node.random is null or is pointing to some node in the linked list.

*/

/**
 * 주어진 '랜덤 포인터를 가진 노드'의 정의는 다음과 같다:
 * val : -10^4 ~ 10^4 사이의 정수
 * next : Node
 * random : null 혹은 0 ~ n-1 사이의 정수 인덱스가 의미하는 Node
*/
class Node {
	constructor(val, next, random) {
		this.val = (val ? val : 0);
		this.next = (next ? next : null);
		this.random = (random !== undefined ? random : null);
	}

	// (이 아래는 편의를 위해 내가 추가한 메소드)
	printVals() {
		const vals = [];
		let pointer = this;
		while (pointer.next !== null) {
			vals.push(`[${pointer.val}, ${pointer.random}]`);
			pointer = pointer.next;
		}
		vals.push(`[${pointer.val}, ${pointer.random}]`);
		return vals;
	}
}

// => 기존의 head와 완전히 분리된 복사본을 만들어 반환하기

// Hash map + Recursion
function solution(head) {

	const map = new Map();

	function copy(node) {
		// head가 null이라면 새 null 반환(?)
		if (node == null) return null;
		// map에서 head로 검색했는데 결과가 있으면 그 결과 반환?
		if (map.get(node) != null) return map.get(node);
	
		// 검색 결과가 없으면 새롭게 node를 만들어 map에 새롭게 저장하고
		const copiedNode = new Node(node.val);
		map.set(node, copiedNode);
	
		// 아직 지정하지 않은 next와 random도 작성해 넣기. 
		copiedNode.next = copy(node.next);
		copiedNode.random = copy(node.random);
		
		return copiedNode;
	}

	return copy(head);
}

// Hash map 방법: 
function solution(head) {
	if (!head) return null;

	const map = new Map();
	let n = head;

	// 각 노드의 val 값을 담은 새 노드를 전부 map에 저장한다. {원조 노드: 새 노드} 
	while (n) {
		map.set(n, new Node(n.val));
		n = n.next;
	}

	// 다시 처음 노드부터 시작하여
	n = head;
	while (n) {
		// 새로운 각 노드의 .next 값과 .random 값을 설정해준다.
		map.get(n).next = map.get(n.next) || null;
		map.get(n).random = map.get(n.random) || null;
		n = n.next;
	}

	// 새롭게 만든 노드 중 첫 번째를 반환한다. 
	return map.get(head);
}

module.exports = {
	solution: solution,
	Node,
}