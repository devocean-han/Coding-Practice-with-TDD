/* 141. Linked List Cycle
https://leetcode.com/problems/linked-list-cycle/description/?envType=list&envId=rus4c4ci

Easy

Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

 

Example 1:


Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
Example 2:


Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
Example 3:


Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
 

Constraints:

The number of the nodes in the list is in the range [0, 104].
-105 <= Node.val <= 105
pos is -1 or a valid index in the linked-list.
 

Follow up: Can you solve it using O(1) (i.e. constant) memory?

*/

class ListNode {
	val: number;
	next: ListNode | null;

	constructor(val: number = 0, next: ListNode | null = null) {
		this.val = val;
		this.next = next;
	}

	// (이 아래부터는 편의를 위해 내가 추가한 메소드)
	// 이 노드부터 이어진 노드 끝까지의 값들을 배열로 반환
	printVals(): number[] {
		const vals: number[] = [];
		let pointer: ListNode | null = this;
		while (pointer.next !== null) {
			vals.push(pointer.val);
			pointer = pointer.next;
		}
		vals.push(pointer.val);
		return vals;
	}

	// 이 노드와 이어진 노드들을 깊은 복사하여 반환
	deepCopy(): ListNode {
		const copiedHead: ListNode = new ListNode(this.val);
		let originalPointer: ListNode | null = this;
		let copyPointer: ListNode | null = copiedHead;
		while (originalPointer.next) {
			originalPointer = originalPointer.next;
			copyPointer.next = new ListNode(originalPointer.val);
			copyPointer = copyPointer.next;
		}
		return copiedHead;
	}

	// 값을 받아 다음 노드로 연결하고 방금 만든 노드 반환
	nextVal(num: number): ListNode {
		this.next = new ListNode(num);
		return this.next;
	}
}

// => 주어진 링크드 리스트에 싸이클(순환)이 존재하면 true 반환하기

/**
 * @param {ListNode} head 
 * @returns {boolean}
 */
function solution(head: ListNode): boolean {
	// (순환을 포함하여) 노드가 2개 이하라면 false 반환
	if (!head || !head.next || !head.next.next) return false;

	let tortoise = head;
	let hare = head;
	// 순환하지 않는다면 반드시 null을 만나 끝나게 되고, 순환한다면 토끼와 거북이가 반드시 서로 만나게 된다. 
	while (hare.next && hare.next.next) {
		hare = hare.next.next;
		tortoise = tortoise.next;
		if (hare === tortoise) return true;
	}

	return false;
}

// module.exports = {
// 	solution: solution,
// 	ListNode,
// }

// TypeScript의 기본 모듈 시스템은 ES6:
// export solution;
// export ListNode;
export default {
	solution: solution,
	ListNode,
}

// 다른 해답: 
function solution2(head: ListNode) {
	let fast = head;
	while (fast && fast.next) {
		head = head.next;
		fast = fast.next.next;
		if (head === fast) return true;
	}

	return false;
}