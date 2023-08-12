/* 83. Remove Duplicates from Sorted List
문제: https://leetcode.com/problems/remove-duplicates-from-sorted-list/
LeetCode에 포스팅한 풀이법: https://leetcode.com/problems/remove-duplicates-from-sorted-list/solutions/3897799/javascript-solution-with-brief-explanation-time-o-n-space-o-1/

Easy

Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

 

Example 1:


Input: head = [1,1,2]
Output: [1,2]
Example 2:


Input: head = [1,1,2,3,3]
Output: [1,2,3]
 

Constraints:

The number of nodes in the list is in the range [0, 300].
-100 <= Node.val <= 100
The list is guaranteed to be sorted in ascending order.

*/

/**
 * 주어진 singly-linked list의 정의는 다음과 같다:
*/
class ListNode {
	constructor(val, next) {
		this.val = (val === undefined ? 0 : val);
		this.next = (next === undefined ? null : next);
	}

	// (이 아래는 편의를 위해 내가 추가한 메소드)
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
}

// : => 주어진 링크드 리스트에서 중복되는 값을 가진 노드를 전부 지운 링크드 리스트를 반환하기
// 왜 정렬된 링크드 리스트를 줬을까? 중복 제거면 일단 set으로 하면 될까. 보통이라면 set이 필요했겠지만, 정렬된 링크드 리스트라서 set을 쓸 필요가 없을 것 같기도 하다. "다음 노드 확인 -> 이전 노드와 같으면 삭제 / 다르면 다시 다음 노드 확인"을 반복해주면...

/** 
 * @param {ListNode} head
 * @return {ListNode}
 */
function solution(head) {
	// 링크드 리스트 길이가 0일수도 있으므로: 노드가 없거나 1개뿐이라면 그대로 반환해준다. 
	if (!head || !head.next) return head;

	// 1. 첫 노드의 값을 기억한다. 다음 노드들을 확인하면서 중복이면 제거한다. 중복이 아니면 그 노드의 값을 기억한다. 그 다음 노드들을 확인하면서 중복이면 제거하고 아니면 그 때 값을 다시 기억한다... 끝까지 반복하기.
	let currentVal = head.val;
	let pointer = head;
	while (pointer.next) {
		if (pointer.next.val === currentVal) {
			pointer.next = pointer.next.next;
		} else {
			pointer = pointer.next;
			currentVal = pointer.val;
		}
	}

	return head;
}

module.exports = {
	solution,
	ListNode,
}