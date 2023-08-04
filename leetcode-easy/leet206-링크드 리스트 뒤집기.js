/* 206. Reverse Linked List
https://leetcode.com/problems/reverse-linked-list/

Easy

Given the head of a singly linked list, reverse the list, and return the reversed list.

 

Example 1:


Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
Example 2:


Input: head = [1,2]
Output: [2,1]
Example 3:

Input: head = []
Output: []
 

Constraints:

The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000
 

Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?

*/

/* 정의된 Singly Linked List 클래스는 다음과 같다: 
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * 
 * @param {ListNode} head
 * @return {ListNode}
function solutionSample(head) {
	let newHead = null;
	while (head !== null) {
		let tempSecondNode = head.next;
		head.next = newHead;
		newHead = head;
		head = tempSecondNode;
	}
} 
 */

class ListNode {
	constructor(val, next) {
		this.val = (val === undefined ? 0 : val);
		this.next = (next === undefined ? null : next);
	}

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

// 해법 1: 그냥 배열 뒤집기 메소드를 사용하여. 
function solution(head) {
	// const reversed = head.reverse();
	console.log(`head: [${head}], reversed: [${head.reverse()}]`)
	return head;
}
// => 배열.reverse()는 현재 배열을 변환시키고 바뀐 현재 배열을 반환한다. 즉, 변환과 반환을 둘 다 한다.

// 해법 2: 순회하며 뒤집기
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function solution2(head) {
	let reversedHead = null;
	while (head !== null) {
		const tempSecondNode = head.next;
		head.next = reversedHead;
		reversedHead = head;
		head = tempSecondNode;
	}
	// console.log(reversedHead)

	return reversedHead;
}
/*
Runtime
48ms
Beats 98.13%of users with JavaScript

Memory
43.95mb
Beats 83.52%of users with JavaScript
*/

// 해법 3: 재귀 함수로 할 수 있다는데...
function solution3(head) {
	return reverseEachNode(head, null);
}

function reverseEachNode(head, reversedHead) {
	// 탈출조건: 인자로 받은 head에 노드가 텅텅 비었으면 탈출
	if (head === null) return reversedHead;
	// '다음' 노드를 임시로 연결지어두고
	let nextTemp = head.next;
	// head에게는 '뒤집은 버전'의 head를 연결해준다.
	head.next = reversedHead;
	// 
	return reverseEachNode(nextTemp, head);
}
/* 
Runtime
60ms
Beats 72.79%of users with JavaScript

Memory
44.82mb
Beats 8.30%of users with JavaScript
=> 메모리 사용이 1mb 늘었는데 백분율이 엄청 차이난다고 나온다.  
*/

module.exports = { solution: solution5 }

// 다른 recursive approach(재귀함수) 풀이: 
// ex) head = [1,2,3,4,5] => 
function solution4(head) {
	// 탈출조건: 노드가 0개나 1개뿐이면 현재 head를 그대로 반환
	if (head === null || head.next === null) return head;

	let result = solution4(head.next);
	// 후처리: head를 다음다음 노드로 이동하고 그 다음 노드를 null로 설정
	head.next.next = head;
	head.next = null;
	console.log(`result: ${result.printVals()}, head: ${head.printVals()}`)
	// 1. solution([1,2,3,4,5]) : result = solution([2,3,4,5]), 
	// 2. solution([2,3,4,5]) : result = solution([3,4,5]), 
	// 3. solution([3,4,5]) : result = solution([4,5]), 
	// 4. solution([4,5]) : result = solution([5]), 
	// 5. solution([5]) : result = [5],
	// 
	// 4. solution([4,5]) : result = [5], head=[null] => [null]
	// 3. solution([3,4,5]) : result = solution([4,5]), head=[5] => [5]

	return result;
}

// ES6 문법을 이용한 간단한 해답: 
function solution5(head) {
	// '이전' 노드와 '현재' 노드를 각각 null과 현재 head로 설정한다.
	let [prev, current] = [null, head];

	// current가 null이 아닌 동안(='현재' 노드가 꼬리 끝까지 가는 동안)
	while (current) {
		// '현재' 포함 앞뒤 3개 노드를 자리바꾼다.
		// 즉, '이전' 노드 -> '다음' 노드
		// 		'현재' 노드 -> '이전' 노드
		// 		'다음' 노드 -> '현재' 노드로
		[current.next, prev, current] = [prev, current, current.next]
		// console.log('현재 모양: ', prev.printVals());
	}
	
	return prev;
}