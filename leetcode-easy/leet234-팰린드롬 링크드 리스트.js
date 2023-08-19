/* 234. Palindrome Linked List
https://leetcode.com/problems/palindrome-linked-list/description/?envType=list&envId=rus4c4ci

Easy

Given the head of a singly linked list, return true if it is a 
palindrome
 or false otherwise.

 

Example 1:


Input: head = [1,2,2,1]
Output: true
Example 2:


Input: head = [1,2]
Output: false
 

Constraints:

The number of nodes in the list is in the range [1, 105].
0 <= Node.val <= 9
 

Follow up: Could you do it in O(n) time and O(1) space?

*/

class ListNode {
	constructor(val, next) {
		this.val = (val === undefined ? 0 : val);
		this.next = (next === undefined ? null : next);
	}

	// (이 아래부터는 편의를 위해 내가 추가한 메소드)
	// 이 노드부터 이어진 노드 끝까지의 값들을 배열로 반환
	printVals() {
		const vals = [];
		let pointer = this;
		while (pointer.next !== null) {
			vals.push(pointer.val);
			pointer = pointer.next;
		}
		vals.push(pointer.val);
		return vals;
	}

	// 이 노드와 이어진 노드들을 깊은 복사하여 반환
	deepCopy() {
		const copiedHead = new ListNode(this.val);
		let originalPointer = this;
		let copyPointer = copiedHead;
		while (originalPointer.next) {
			originalPointer = originalPointer.next;
			copyPointer.next = new ListNode(originalPointer.val);
			copyPointer = copyPointer.next;
		}
		return copiedHead;
	}

	// 값을 받아 다음 노드로 연결하고 방금 만든 노드 반환
	nextVal(num) {
		this.next = new ListNode(num);
		return this.next;
	}
	// => 알게된 점: Class에 속성(propterty)와 같은 이름의 메소드(method)를 만들 수 없다. 메소드도 본질적으로는 객체에 붙은 속성이기 때문이다. 위와 같이 .next라는 속성과 .next(num)이라는 메소드가 만들어진 경우, 오버라이팅이나 오버로딩되지 않고 처음 만든 속성 .next만 생존하는 것 같다. 
}

// =>

// 뒤집은 리스트를 따로 만들어 서로 비교하는 풀이:
function solution(head) {
	if (!head.next) return true;

	// 1. 뒤집은 리스트 새로 만들기
	const originalHead = head.deepCopy();
	let reversed = null;
	let pointer = head;
	while (head) {
		// reversed.next = new ListNode(pointer.val);
		pointer = head.next;
		head.next = reversed;
		reversed = head;
		head = pointer;
	} // head는 원래 모양을 잃는다.

	// 2. 앞 노드부터 비교하기
	pointer = originalHead;
	let reversedPointer = reversed;
	while (pointer) {
		if (pointer.val !== reversedPointer.val) return false;
		pointer = pointer.next;
		reversedPointer = reversedPointer.next;
	}

	return true;
}

// 리스트를 배열에 저장하고 투 포인터로 비교하는 풀이: 
function solution2(head) {
	if (!head.next) return true;

	// 1. 노드를 차례로 배열에 저장
	const nodes = [];
	while (head) {
		nodes.push(head.val);
		head = head.next;
	}

	// 2. 저장한 배열의 양 끝에서부터 차례로 비교한다.
	for (let i = 0; i < nodes.length / 2; i++) {
		if (nodes[i] !== nodes[nodes.length - i - 1]) return false;
	}

	return true;
}

module.exports = {
	solution: solution2,
	ListNode,
}