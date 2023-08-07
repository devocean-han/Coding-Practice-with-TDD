/* 21. Merge Two Sorted Lists
https://leetcode.com/problems/merge-two-sorted-lists/

Easy

You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

 

Example 1:


Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
Example 2:

Input: list1 = [], list2 = []
Output: []
Example 3:

Input: list1 = [], list2 = [0]
Output: [0]
 

Constraints:

The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both list1 and list2 are sorted in non-decreasing order.

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
	next(listNode) {
		this.next = listNode;
		// return 
	}

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
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function solution(list1, list2) {
	// 1. result의 첫 노드 정하기
	let resultHead;
	if (list1 === null && list2 === null) resultHead = new ListNode(null);
	else if (list1 === null) resultHead = list2, list2 = list2.next;
	else if (list2 === null) resultHead = list1, list1 = list1.next;
	else resultHead = (list1.val <= list2.val ? list1 : list2);

	let pointer = resultHead;
	// console.log(resultHead.printVals());
	// 2. list1과 list2가 정렬되어있다고 하니까, 먼저 첫 수를 비교해서 더 작은 쪽을 result의 첫 노드로 삼는다. 근데 list1=[]이고 list2=[0]이면 val 비교에서 등가가 나오게 되므로 null과 0의 구분이 필요하다.
	// while (list1 !== null) { // 일단 list1의 첫 수는 null이 아니라고 박고 들어감. 
	while (list1 !== null) { // 일단 list1의 첫 수는 null이 아니라고 박고 들어감. 
		// 그리고서 list2의 첫 수가 null이든 말든 list1의 첫 수가 크거나 같은지 확인한다. list2가 null이면 list1이 0부터 모든 수가 가능하게 되고, list2가 null이 아닌 0 포함 어떤 수더라도 list1이 0부터 모든 수가 가능하게 된다. 
		if (list2 === null || list1.val <= list2.val) {
			// 그렇다면 result의 첫 노드를 list1의 첫 수로 삼는다. list1을 하나 소비했으므로 list1의 head가 다음 노드를 가리키게 만든다. 
			pointer.next = list1;
			list1 = list1.next;
		} else {
			// 그게 아니면 (1)list2의 현재 노드가 null이 아니고 list1의 현재 노드보다 큼. 즉, list2의 현재 노드값은 무조건 1이상임. 이 때 (2)list1의 현재 노드가 null인 경우도 있을 텐데 초기 while루프의 조건에서 이 경우는 제외됨. 즉, list1의 현재 노드가 null이 아닌 아직 '남아있는' 노드를 가리키고 있을 때 list2가 null이든 아니든 비교하고 있는 것.
			// 그렇다면 (1)의 논리에 따라 result에 list2의 현재 노드를 추가하고 list2의 head가 다음 노드를 가리키게 만든다. 
			pointer.next = list2;
			list2 = list2.next;
		}
		pointer = pointer.next;
		// console.log(resultHead.printVals());
	}
	pointer.next = list1 || list2;

	return resultHead;
}

module.exports = {
	solution: solution2,
	ListNode,
}

// 
function solution2(list1, list2) {
	// 새로이 반환할 링크드 리스트의 head를 만들고 덧붙이는 노드들을 가리킬 포인터가 head를 가리키게 만든다. 
	let resultHead = { val: -1, next: null };
	let pointer = resultHead;

	// list1과 list2가 노드를 가지는 동안
	while (list1 && list2) {
		// list2의 값이 더 작으면 반환할 링크드 리스트에 list2의 현재 노드를 덧붙이고 list2의 head는 list2의 다음 노드를 가리키게 한다.
		if (list1.val > list2.val) {
			pointer.next = list2;
			list2 = list2.next;
		} else {
		// list1의 값이 더 작으면 반환할 링크드 리스트에 list1의 현재 노드를 덧붙이고 list1의 head는 list1의 다음 노드를 가리키게 한다.
			pointer.next = list1;
			list1 = list1.next;
		}
		// 새로이 만드는 링크드 리스트의 맨 뒤에 다음 노드를 붙일 수 있도록 '덧붙이는 노드들을 가리키는' 포인터가 next를 가리키게 만든다. 
		pointer = pointer.next;
	}

	// 두 list 중 남은 노드를 몽땅 붙여준다. 
	pointer.next = list1 || list2;

	return resultHead.next;
}
