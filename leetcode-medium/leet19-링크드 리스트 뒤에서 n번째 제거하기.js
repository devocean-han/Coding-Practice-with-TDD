/* 19. Remove Nth Node From End of List
https://leetcode.com/problems/remove-nth-node-from-end-of-list/

Medium

Given the head of a linked list, remove the nth node from the end of the list and return its head.

 

Example 1:


Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
Example 2:

Input: head = [1], n = 1
Output: []
Example 3:

Input: head = [1,2], n = 1
Output: [1]
 

Constraints:

The number of nodes in the list is sz.
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz
 

Follow up: Could you do this in one pass?
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
		return this;
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

/* 뒤에서 n번째 노드를 제거한 링크드 리스트 반환하기: 
뒤에서 size번째면 첫 번째 노드를 제거하는 것이다. 
뒤에서 size-1번째면 두 번째 노드를 제거하는 것이다.
뒤에서 2번째면 끝에서 2번째 노드를 제거하고
뒤에서 1번째면 마지막 노드를 제거하는 것이다. 

전체 사이즈를 어떻게 알고 뒤에서 n번째 노드를 제거할까? 
=> 포인터 '정찰조' 1번을 먼저 전진시킨다. n번만큼 전진시킨다. 최소 n개의 노드가 있는 것이 보장되고, 최소 n-1번은 전진시킬 수 있다. 
	n-1노드를 지나 n번째 노드에 도달하게 될 때 두 번째 '타겟' 포인터를 1번 노드에 진입시킨다. 
	이제부터 '정찰조 1번' 포인터가 마지막 노드에 도달할 때까지 '타겟 2번' 포인터를 똑같이 한 칸씩 전진시킨다. 정찰조 1번이 마지막 노드에 도달한 순간에 타겟 2번이 위치한 노드가 제거해야 할 대상이 된다. 
	그러려면 타겟 2번의 전 노드에서 next를 바꿔야 한다. 즉, '타겟 2번' 노드를 기존의 방법보다 한 칸 전에 두도록 한다.  

이상을 정리하면: 
 1. 포인터 '정찰조 1번'을 먼저 n번째 노드에 도달하도록 전진시킨다. 최소 n번째 노드가 있다는 것은 보장된다. 
 2. 이 다음에 노드가 있다면, '정찰조 1번'을 한 칸 전진시키고 '타겟 2번' 포인터를 1번 노드에 진입시킨다. (정찰조 1번 다음에 노드가 없다면 첫번째 노드를 제거 대상으로 삼는다.) 즉, '정찰조 1번'이 n+1번 노드에 도달했을 때 '타겟 2번'이 1번 노드에 진입하도록 간격을 둔다. 
 3. 이후로는 '정찰조 1번'이 마지막 노드에 도달할 때까지 '타겟 2번' 포인터도 똑같이 한 칸씩 전진시킨다. '정찰조 1번'이 마지막 노드에 도달하면, 그 때 '타겟 2번'의 다음 노드가 제거 대상이 된다. 즉, '정찰조 1번'의 다음 노드가 null이 될 때까지 두 포인터를 전진시킨다. 
 2+3. 2번과 3번을 합치면 이렇게 된다: '정찰조 1번ㅇ' 마지막 노드에 도달했을 때 '타겟 2번'이 아직 1번 노드에 진입하지 못한 상태라면(=링크드 리스트 전체 길이가 n의 값과 같았음) 첫 번째 노드가 제거 대상이다. 그렇지 않고 '타겟 2번'이 어딘가를 가리키고 있다면 그 다음 노드가 제거 대상이다. 
 4. '타겟 2번' 노드를 그 다음다음 노드에 연결시킨다. 
 5. head를 반환한다. 

이것은 n이 주어진 링크드 리스트의 길이와 같을 때에도 문제없이 적용된다: 
ex) head[1,2,3,4], n=4 
	1. '정찰조 1번' 포인터가 4번째이자 마지막인 노드 [4]에 도달한다. 
	2+3. '타겟 2번' 노드가 아직 null이기 때문에, 첫 번째 노드인 [1]이 제거 대상이 된다. 
	4+5. 'head'를 두 번째 노드인 [2]에 연결시키고 반환한다.  

n이 더 작아도 물론 문제없이 작동되며: 
ex) head[1,2,3,4], n=3
	1. '정찰조 1번' 포인터가 3번째 노드 [3]에 도달한다. 
	2+3. 아직 '정찰조 1번'의 다음 노드가 존재하기 때문에, 끝까지 도달하도록 '타겟 2번'과 함께 전진시키고 나면 '정찰조 1번'은 노드 [4]에, '타겟 2번'은 노드 [1]에 위치해있게 된다. 그 다음 노드인 [2]가 제거 대상이 되고,
	4. 따라서 '정찰조 2번'이 가리키는 노드 [1]을 다음다음 노드인 [3]에 연결짓는다. 
	5. 그렇게 수정된 head를 그대로 반환한다. 

주어진 링크드 리스트 길이가 가장 작을 때(= 1일 때)도 잘 작동한다:
ex) head[1], n=1
	1. '정찰조 1번'이 n번째 노드이자 마지막 노드가 되는 [1]에 도착한다. 
	2+3. 아직 '타겟 2번' 포인터가 null이기 때문에,
	4+5. 'head'를 두 번째 노드인 null에 연결시키면 head=null이 되고, 이를 반환하면 된다. 
*/

// (해결!)
// Time complexity: O(N)
// Space complexity: O(1?)
function solution(head, n) {
	//  1. 포인터 '정찰조 1번'을 먼저 n번째 노드에 도달하도록 전진시킨다. 최소 n번째 노드가 있다는 것은 보장된다.
	let 정찰조 = head;
	for (let i = 1; i < n; i++) {
		정찰조 = 정찰조.next;
	}

	// 2. 이 다음에 노드가 있다면, '정찰조 1번'을 한 칸 전진시키고 '타겟 2번' 포인터를 1번 노드에 진입시킨다. (정찰조 1번 다음에 노드가 없다면 첫번째 노드를 제거 대상으로 삼는다.) 즉, '정찰조 1번'이 n+1번 노드에 도달했을 때 '타겟 2번'이 1번 노드에 진입하도록 간격을 둔다. 
	//  3. 이후로는 '정찰조 1번'이 마지막 노드에 도달할 때까지 '타겟 2번' 포인터도 똑같이 한 칸씩 전진시킨다. '정찰조 1번'이 마지막 노드에 도달하면, 그 때 '타겟 2번'의 다음 노드가 제거 대상이 된다. 즉, '정찰조 1번'의 다음 노드가 null이 될 때까지 두 포인터를 전진시킨다. 
	// 2+3. 2번과 3번을 합치면 이렇게 된다: '정찰조 1번'이 마지막 노드에 도달했을 때 '타겟 2번'이 아직 1번 노드에 진입하지 못한 상태라면(=링크드 리스트 전체 길이가 n의 값과 같았음) 첫 번째 노드가 제거 대상이다. 그렇지 않고 '타겟 2번'이 어딘가를 가리키고 있다면 그 다음 노드가 제거 대상이다. 
	let 타겟 = null;
	while (정찰조.next !== null) {
		정찰조 = 정찰조.next;
		타겟 = (타겟 === null) ? head : 타겟.next;
	}

	// 4. '타겟 2번' 노드를 그 다음다음 노드에 연결시킨다. 
	if (타겟 === null) head = head.next;
	else 타겟.next = 타겟.next.next;

	// 5. head를 반환한다. 
	return head;
}
// => 한 번에 성공!!

// 위의 풀이를 주석과 변수명을 더 다듬어 쓴 버전: 
function solution2(head, n) {
	//  1. 포인터 '정찰조(scout)'을 먼저 n번째 노드에 도달하도록 전진시킨다. 최소 n번째 노드가 있다는 것은 보장된다.
	let scout = head; 
	for (let i = 1; i < n; i++) {
		scout = scout.next;
	}

	// 2. 이 다음에 노드가 있다면, '정찰조(scout)'을 한 칸 전진시키고 '타겟(target)' 포인터를 1번 노드에 진입시킨다. (정찰조에게 다음 노드가 없다면 첫번째 노드를 제거 대상으로 삼는다.) 즉, '정찰조(scout)'이 n+1번 노드에 도달했을 때 '타겟(target)'이 1번 노드에 진입하도록 간격을 둔다. 
	// 3. 이후로는 '정찰조(scout)'이 마지막 노드에 도달할 때까지 '타겟(target)' 포인터도 똑같이 한 칸씩 전진시킨다. '정찰조(scout)'이 마지막 노드에 도달하면, 그 때 '타겟(target)'의 다음 노드가 제거 대상이 된다. 즉, '정찰조(scout)'의 다음 노드가 null이 될 때까지 두 포인터를 전진시킨다. 
	let target = null;
	while (scout.next !== null) {
		scout = scout.next;
		target = (target === null) ? head : target.next;
	}
	// 4. '정찰조(scout)'이 마지막 노드에 도달했을 때 '타겟(target)'이 아직 1번 노드에 진입하지 못한 상태라면(=링크드 리스트 전체 길이가 n의 값과 같았음) 첫 번째 노드가 제거 대상이다. 그렇지 않고 '타겟(target)'이 어딘가를 가리키고 있다면 그 다음 노드가 제거 대상이다. 즉, 
	// => '타겟(scout)'이 아직 null이라면 head를 그 다음 노드에 연결시키고, null이 아니라면 타겟(scout)이 가리키고 있는 노드를 그 다음다음 노드에 연결시킨다. 
	if (target === null) head = head.next;
	else target.next = target.next.next;

	// 5. head를 반환한다. 
	return head;
}

module.exports = {
	solution,
	NodeList,
}

// 같은 논리 살짝 다른 풀이
function solution3(head, n) {
	let scout = head;
	let target = head;
	for (let i = 0; i < n; i++) {
		scout = scout.next;
	}
	// n이 주어진 링크드 리스트의 길이와 같아서 이미 끝 노드를 지나 null에 도달해버린 경우: 첫 번째 노드가 지워야 할 타겟 노드가 되므로 head.next를 반환하면 된다.
	if (!scout) return head.next;

	// 그렇지 않다는 것은 지금 scout 노드가 null이 아니라는 뜻. 따라서 while 조건문의 유효함이 보장됨. 
	while (scout.next) {
		scout = scout.next;
		target = target.next;
	}

	target.next = target.next.next;
	
	return head;
}