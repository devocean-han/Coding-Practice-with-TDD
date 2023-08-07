/* 143. Reorder List
https://leetcode.com/problems/reorder-list/

Medium

You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln
Reorder the list to be on the following form:

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
You may not modify the values in the list's nodes. Only nodes themselves may be changed.

 

Example 1:


Input: head = [1,2,3,4]
Output: [1,4,2,3]
Example 2:


Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]
 

Constraints:

The number of nodes in the list is in the range [1, 5 * 104].
1 <= Node.val <= 1000

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

/** 
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
*/
// '제자리에서' '순서 변경하기'. 
function solution(head) {
	
	if (head.next === null || head.next.next === null) return head;

	// 링크드 리스트 길이가 3개 이상일 때 자리 교환이 발생함.
	// [1, 2, 10] => [1, 10, 2]
	// temp = head.next (두번째 노드)
	// head.next = tail
	// => tail을 다짜고짜 소비해버릴 수는 없다. 그 전에, 끝에 도달해버리기 전에 참조 포인터를 남겨놔야 한다. 
	
	// [1,2,3,4,5,6,7,8,9]
	// 1. 우선 [1,3,5,7,9]와 [2,4,6,8]로 나눈다. 
	// 2. [2,4,6,8] 을 뒤집는다. 
	// 3. 다시 [1,3,5,7,9]와 [8,6,4,2]를 왼쪽 리스트 먼저 왼-오-왼-오... 하고 연결한다. 
	// 기존의 head가 변경된 결과값 head를 가리키게 확정하고, 리턴값은 주지 않는다. 
	
	// 1. 인덱스(?) 짝, 홀로 나누기 :
	// [1,2,3,4,5,6,7,8,9] => 짝[1,3,5,7,9] / 홀[2,4,6,8]
	let pointer = head.next.next;
	let oddListHead = head; // [1]번 노드
	let evenListHead = head.next; // [2]번 노드
	let oddListPointer = oddListHead;
	let evenListPointer = evenListHead;

	while (pointer) { // [3]번 이상으로 노드 끝까지...
		console.log(pointer.val);
		oddListPointer.next = pointer; // [3]번 노드 할당
		oddListPointer = oddListPointer.next;

		evenListPointer.next = pointer?.next; // [4]번 노드 할당. 만약 null일 시 그냥 null이 evenList의 다음 노드로 할당되게 되므로 괜찮다.
		evenListPointer = evenListPointer.next;
		
		pointer = pointer.next?.next;
	}
	pointer = null;
	console.log(`odd: [${oddListHead.printVals()}], even: [${evenListHead.printVals()}]`);

	// let pointer = head; // pointer가 [1]번 노드를 가리킴
	// let oddListHead = evenListHead = oddListPointer = evenListPointer = null;
	// while (pointer !== null) {
	// 	oddListHead =
	// }

	// 2. 짝수 인덱스(?)를 뒤집는다 : 짝[2,4,6,8] => 짝[8,6,4,2]
	let inversedEvenHead = null;
	while (evenListHead !== null) {
		const tempSecondNode = evenListHead.next;
		evenListHead.next = inversedEvenHead;
		inversedEvenHead = evenListHead;
		evenListHead = tempSecondNode;
	}

	console.log(`inversed even: [${inversedEvenHead.printVals()}]`)

	// 3. 홀수 인덱스와 뒤집은 짝수 인덱스를 번갈아 합친다 :
	// 홀-짝-홀-짝...의 순서로, [1,8,3,6,5,4,7,2,9]가 되도록.
	oddListPointer = oddListHead;
	evenListPointer = inversedEvenHead;
	
	head = oddListPointer; // [1] 배정
	pointer = head; 
	// pointer.next = evenListPointer;
	// pointer.next.next = oddListPointer;
	// console.log(`result: [${head.printVals()}]`)
	// while (oddListHead !== null) {
	while (evenListPointer) { // 짝,홀 한 쌍씩 담아서, 짝 리스트가 동나도록 순회한다. 
		pointer.next = evenListPointer;
		pointer.next.next = oddListPointer;
		
		pointer = pointer.next?.next;
		oddListPointer = oddListPointer?.next;
		evenListPointer = evenListPointer?.next;
	}
	console.log(`pointer: ${pointer.val}, result: [${head.printVals()}]`)
	oddListPointer = evenListPointer = null;
	oddListHead = evenListHead = null;
	
	return head;
}

module.exports = {
	solution: solution2,
	ListNode,
}

// 다른 풀이: 
// 
function solution2(head) {
	let stack = [];
	let pointer = head;

	if (!pointer) return;

	while (pointer) {
		stack.push(pointer);
		pointer = pointer.next
	}
	// console.log(stack);

	pointer = head;
	const len = stack.length;
	for (let i = 0; i < len; i++) { // 왜 stack.length가 for 루프 내에서 변하는 거지? 한 번 for문 헤더에 쓰이면 변경 안되는 걸로 알고 있는데 말이다...
		if (i % 2 === 0) {
			pointer.next = stack.shift() // 배열의 왼쪽 끝 추출
		} else {
			pointer.next = stack.pop() // 배열의 오른쪽 끝 추출
		}
		pointer = pointer.next;
	}

	pointer.next = null; // 이게 있어야 메모리 초과 에러가 나지 않는다. 왜지? 
	return head;
}


// 주어진 리스트를 반절 잘라 엮어내는 방법. 
function solution3(head) {
	// 1. 주어진 리스트를 반절로 자른다. 길이가 홀수라면 앞의 반절이 1개를 더 가져가도록 자르고, 후 반절을 변수에 저장한다. 
	let right = split(head);

	// 2. 저장한 후 반절을 뒤집는다. 
	right = reverse(right);

	// 3. 전 반절과 뒤집은 후 반절을 병합한다. 
	merge(head, right);
	return merge(head, right); // 테스트 코드 실행용 반환 
}

// 1. 링크드 리스트의 head가 되는 ListNode를 받아 반절(길이가 홀수라면 2로 나누고 내림한)로 자르고 후 반절을 반환
function split(node) {
	// 
	let fast = node;
	let slow = node;

	// 한 번에 2개씩 전진하는 포인터와 1개씩 전진하는 포인터를 동시에 진행시키고, 빠르게 전진하는 쪽(fast)가 '끝에 다다르면(=2칸을 전진할 여유가 남지 않게 되는 때에)' 그 때의 slow + 1 노드를 링크드 리스트 '후 반절'의 시작점으로서 반환하도록 한다.  
	while (fast !== null) { 
		// fast에게 '다음 2개의 노드'가 남아있다면
		if (fast.next !== null && fast.next.next !== null) {
			// slow를 한 칸 전진하고 fast는 두 칸 전진해둔다. 
			slow = slow.next;
			fast = fast.next.next;
		// '현재' fast 노드 뒤에 2개 '미만'으로 노드가 남아있다면
		} else {
			// fast를 없앤다. (메모리 초과를 방지하기 위함...)
			fast = null;
		}
	}

	const secondHalf = slow.next;
	slow.next = null;

	return secondHalf;
}

// 2. 링크드 리스트의 head인 Listnode를 받아 순서를 뒤집어 반환한다. 
function reverse(node) {
	let prev = null;
	let curr = node;
	let next = null;

	while (curr !== null) {
		next = curr.next;
		curr.next = prev;
		prev = curr;
		curr = next;
	}
	// curr = next = null;
	return prev;
}

// 3. 두 링크드 리스트를 인자로 받아 왼쪽 리스트부터 한 노드씩 번갈아 연결한 결과 리스트를 반환한다. 
function merge(list1, list2) {
	let temp1 = null;
	let temp2 = null;
	
	while (list2 !== null) {
		temp1 = list1.next;
		temp2 = list2.next;

		list1.next = list2;
		list2.next = temp1;

		list1 = temp1;
		list2 = temp2;
	}
	// temp1 = temp2 = null;

	return list1;
}