/* 234. Palindrome Linked List
https://leetcode.com/problems/palindrome-linked-list/description/?envType=list&envId=rus4c4ci

* 어떤 연결 리스트가 순환을 포함하는지 검사하는 Floyd's Cycle Detection Algorithm(Tortoise & Hare Algorithm)에 대해 잘 설명한 블로그: https://fierycoding.tistory.com/45
=> 1) 어떤 연결 리스트가 null로 끝나는지 순환되는지(=두 개의 노드가 동시에 가리키는 노드가 있는지) 검사할 수 있다.
=> 2) 순환된다면 순환의 시작점을 찾을 수 있다. 
=> 3) 1을 응용하여, 어떤 배열에서 두 개의 중복되는 수가 존재하는지 검사할 수 있다.(배열 길이-1 이내의 값만 '수'로 가지는 배열일 때만 연결 리스트로 만들어 확인 가능) 배열에 담긴 수를 pointer로 치환하면 된다.

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

// => 주어진 (일방향) 링크드 리스트가 팰린드롬이면 true를 반환하기.


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

// 공간복잡도를 O(1)로 낮추라고..? 어떻게 뒤집은 리스트도, 배열도 안 만들고 순서를 비교할 수 있지. 일단 포인터를 끝으로 보낸다. 가는 동안 몇 개인지 센다. 다시 앞에서부터 반절 위치 노드로 포인터를 보내서 반절을 자른다. 뒤 반절을 뒤집는다. 앞 반절과 뒤 반절이 같은지 확인한다...
// Time complexity: O(N + N/2 + N/2 + N/2) => O(N)
// Space complexity: O(1)
function solution3(head) {
	if (!head.next) return true;

	// 1. 노드 개수를 센다.
	let pointer = head;
	let length = 0;
	while (pointer) {
		length++;
		pointer = pointer.next;
	}

	// 2. 반절을 자를 수 있도록 pointer를 중간 지점으로 보낸다.
	// 	=> 짝수 개인 경우: 총 길이 / 2 + 1 번째 노드로,
	// 	=> 홀수 개인 경우; 총 길이 / 2 올림 번째 노드로. 
	// 	==> 즉, '후 반절'의 시작 노드로 pointer를 이동시키는데 예를 들어 총 노드 개수가 6개라면 4번째 노드부터, 7개라면 4번째 노드부터 '후 반절'로 삼도록 한다.    
	pointer = head;
	for (let i = 0; i < Math.floor(length / 2); i++) {
		pointer = pointer.next;
	}

	// 3. 후 반절을 뒤집는다.
	// (짝수 개인 경우)
	let lastHalfReversed = null;
	while (pointer) {
		let temp = pointer.next;
		pointer.next = lastHalfReversed;
		lastHalfReversed = pointer;
		pointer = temp;
	}

	// 4. '뒤집은 반절'의 길이를 기준으로 전, 후 반절을 비교해나간다.
	// 	 	= (총 노드 개수) / 2 를 올림한 수
	for (let i = 0; i < Math.ceil(length / 2); i++) {
		if (head.val !== lastHalfReversed.val) return false;
		head = head.next;
		lastHalfReversed = lastHalfReversed.next;
	}

	return true;	
}
/*
Status		Language	Runtime	Memory	Time	Notes
Accepted	JavaScript	108 ms	69.1 MB	an hour ago	
Accepted	JavaScript	117 ms	77.6 MB	Aug 19, 2023	
Accepted	JavaScript	116 ms	77.2 MB	Aug 19, 2023	
*/

module.exports = {
	solution: twoPointersSolution,
	ListNode,
}

// 다른 해답: Floyd's Cycle Detection Algorithm의 two pointers 응용
// => '후 반절'의 첫 노드를 찾아 포인터를 위치시키는 방법만 다르고 나머지는 나와 똑같다. 노드 총 개수를 세느라 도는 한 바퀴를 절약할 수 있으므로 solution3보다 O(N)만큼 더 시간이 줄어든다. 그래봤자 결국 시간복잡도가 O(N)인 것은 같지만서도.
// Time complexity: O(N/2 + N/2 + N/2) => O(N)
// Space complexity: O(1)
function twoPointersSolution(head) {
	let slow = fast = head;
	// fast 포인터에게 다음 노드가 존재하는 동안, slow는 한 칸, fast는 두 칸씩 이동한다.
	while (fast && fast.next) {
		slow = slow.next;
		fast = fast.next.next;
	}
	// => fast는 마지막이나 마지막+1번째 노드(null)에서 멈추게 된다.
	// 총 노드가 1개뿐이면 fast와 slow 모두 그대로 head이며,
	// 총 노드가 2개 이상이라면: 
	// 		짝수개일 때 fast는 (총 길이 / 2)번 점프하여 마지막+1번째에, slow는 같은 수만큼 점프하여 (총 길이 / 2) + 1번째 노드에 위치하고
	// 		홀수개일 때 fast는 (총 길이 / 2) 내림 번 점프하여 마지막 노드에, slow는 같은 수만큼 점프하여 정중앙 노드(= 총 길이 / 2 올림)에 위치한다. 
	// => 즉, slow는 현재 내가 푼 풀이3의 pointer와 같이 '후 반절'이 되는 첫 지점(총 노드 개수가 6개라면 4번째, 총 7개라면 4번째 노드)에 위치하게 된다. 
	 
	// lastHalfReversed라는 이름으로 '후 반절'의 첫 노드를 삼고 '후 반절'을 뒤집는다. 
	let lastHalfReversed = null;
	while (slow) {
		let temp = slow.next;
		slow.next = lastHalfReversed;
		lastHalfReversed = slow;
		slow = temp;
	}

	// fast와 slow 포인터를 각 반절의 첫 노드에 두고서 '후 반절'의 개수만큼 서로 비교한다. 
	fast = head;
	slow = lastHalfReversed;
	while (slow) {
		if (fast.val !== slow.val) return false;
		fast = fast.next;
		slow = slow.next;
	}
	// => 링크드 리스트를 반드시 보존하라는 조건이 없으니 head와 lastHalfReversed를 소비하며 비교할 수도 있지만, fast와 slow 포인터를 이미 만들었으므로 재활용해준다. ...
	
	return true;
}

/* 
+-------+----------------+------------+----------+---------+--------------------+
| Index | Status         | Language   | Runtime  | Memory  | Time               |
+-------+----------------+------------+----------+---------+--------------------+
| 0     | Accepted       | JavaScript | 112 ms   | 69.2 MB | a few seconds ago |
| 1     | Accepted       | JavaScript | 108 ms   | 69.1 MB | an hour ago       |
| 2     | Accepted       | JavaScript | 117 ms   | 77.6 MB | Aug 19, 2023      |
| 3     | Accepted       | JavaScript | 116 ms   | 77.2 MB | Aug 19, 2023      |
| 4     | Runtime Error  | JavaScript | N/A      | N/A     | Aug 19, 2023      |
+-------+----------------+------------+----------+---------+--------------------+

*/