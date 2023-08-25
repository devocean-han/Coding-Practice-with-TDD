/* 142. Linked List Cycle II
https://leetcode.com/problems/linked-list-cycle-ii/description/?envType=list&envId=rus4c4ci

Medium

Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle. Note that pos is not passed as a parameter.

Do not modify the linked list.

 

Example 1:


Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1
Explanation: There is a cycle in the linked list, where tail connects to the second node.
Example 2:


Input: head = [1,2], pos = 0
Output: tail connects to node index 0
Explanation: There is a cycle in the linked list, where tail connects to the first node.
Example 3:


Input: head = [1], pos = -1
Output: no cycle
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

// => 주어진 링크드 리스트에서 순환이 시작하는 지점의 노드를 반환하기. 순환하지 않는다면 null을 반환하기.  
function solution(head: ListNode | null): ListNode | null {
	// if (!head || !head.next || !head.next.next) return null;

	let hare: ListNode = head;
	let tortoise: ListNode = head;

	while (hare && hare.next) {
		hare = hare.next.next;
		tortoise = tortoise.next;
		if (hare === tortoise) {
			tortoise = head;
			while (true) {
				if (hare === tortoise) return hare;
				hare = hare.next;
				tortoise = tortoise.next;
			}
		}
	}

	return null;
}

export default {
	solution: solution,
	ListNode,
}

// 다른 풀이: 재귀 함수 (주어진 리스트 자체를 수정하지는 말라고 했는데 이건 제약사항을 잘 지킨 풀이는 아니다)
function solution2(head: ListNode | null): ListNode | null {
	// 지금 head 노드가 null인지, 혹은 그 값이 100500인지 체크
	if (!head || head.val === 100500) return head;

	// 아니라면 값을 100500으로 수정하고 다음 노드로 이동해 검사한다.
	head.val = 100500;

	return solution2(head.next);
}
