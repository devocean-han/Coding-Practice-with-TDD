/* 2. Add Two Numbers
https://leetcode.com/problems/add-two-numbers/

Medium

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

 

Example 1:


Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
Example 2:

Input: l1 = [0], l2 = [0]
Output: [0]
Example 3:

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
 

Constraints:

The number of nodes in each linked list is in the range [1, 100].
0 <= Node.val <= 9
It is guaranteed that the list represents a number that does not have leading zeros.

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
}

// => '거꾸로' 한 자리씩 풀어헤쳐진 두 개의 큰 수를 표현하는 링크드 리스트 2개(l1, l2)를 받아 그 두 수를 더한 결과를 역시 '거꾸로' 한 자리씩 표현한 링크드 리스트의 head를 반환하기.
// => 이미 '거꾸로' 표현되어 있으므로 자리를 맞출 필요 없이 앞 노드부터 쌍으로 더해가면 된다. 둘을 더해 10이 넘으면 다음 노드쌍을 더할 때 +1을 추가해준다. 한 쪽 노드가 다 닳면 전 노드쌍에서 +1 해줄 게 있었으면 그것만 더하고 홀로 있는 노드 그대로 값을 매긴다. 더 긴 링크드 리스트의 남은 끝까지 그렇게 한다.

//

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

// 1. 두 링크드 리스트는 첫 자리는 무조건 있다. 두 수를 더한다.
// 2. '두 링크드 리스트 모두' 다음 노드가 있는 동안, ...

// 3. 둘 중 한 링크드 리스트가 모두 닳면 ||로 더해준다... 물론 +1이 있었는지를 체크해야 한다. 
function solution(l1, l2) {
	let sum = l1.val + l2.val;
	let plusOne = false;
	if (sum >= 10) {
		plusOne = true;
		sum -= 10;
	}

	// 더한 값을 저장할 링크드 리스트 이름을 sumHead로 명명하고 l1과 l2의 첫 노드쌍 합을 val 값으로 저장한 노드를 배정한다. 
	let sumHead = new ListNode(sum);
	// let sumHead = { val: -1, next: null };
	let pointer = sumHead;

	// l1과 l2 모두 남은 노드가 있는 동안
	while (l1.next && l2.next) {
		// (첫 노드를 이미 소모했으므로) 다음 노드쌍으로 가서 더해준다. 
		l1 = l1.next;
		l2 = l2.next;
		let sum = l1.val + l2.val + plusOne;
		// 더해줄 때 이전 '자릿수(노드쌍)'에서 올림 된 1이 있으면 더해주고, 그렇게 더해준 이번 '자릿수' 합계가 10을 넘으면 다음 노드쌍으로 1을 올림해주고 이번 합계(sum)에서는 10을 빼준다. 
		if (sum >= 10) {
			plusOne = true;
			sum -= 10;
			// pointer.next = new ListNode(1);
			// sum -= 10;
		} else {
			plusOne = false;
		}
		// 포인터에 다음 노드를 만들고 연결시켜준다. 
		// pointer[val] = pointer[val] + sum;
		pointer.next = new ListNode(sum);
		pointer = pointer.next;
	}

	// // => 그냥 l1과 l2 둘 중 하나 노드만 있어도 통용되게끔 sum합계만 잘 구하면 될 것 같은데...
	// while (l1.next || l2.next) {
	// 	// 문제: l1자체가 null이면 null.next를 호출할 때 에러남.
	// 	// => 아마... l1자체를 null체크하는 방식으로 while조건을 바꾸면 도움이 될 듯... while(l1 || l2) 하면 일단 에러는 안 내고 null인지 체크는 가능하니까. 
	// }
	// // => 이상은 '더 깔끔한' 해답에 정리됨.
	// while (l1 || l2) {
	// 	// 이렇게 하려면 첫 노드쌍을 먼저 계산한 상태라면 먼저 l1.next와 l2.next를 하고 들어와야 한다.
	// 	// 그러면 l1이 null이거나 값을 가진 노드인 상태가 된다. null.val을 부르면 역시 Uncaught typeError가 나므로 여러 처리가 필요하다: 
	// 	// 		1) 먼저 l1이 null인 경우: li?.val => undefined가 뜨게 됨.
	// 	// 		2) undefined + 3를 해야 하는 경우: (undefined ?? 0) + 3으로 처리한다. (안 그러면 NaN이 결과로 나옴)
	// 	// 	=> 결과적으로, "l1노드가 null이면 undefined로, 거기서 다시 0으로 교체하여 계산하겠다"를 코드로 나타내면 다음과 같이 된다(이는 l1과 l2를 null로만 만들어 다음 루프로 넘겨주면 계속해서 안전한 장치가 됨): 
	// 	let sum = (l1?.val ?? 0) + (l2?.val ?? 0) + plusOne; 
	// 	if (sum >= 10);// 생략
	// 	l1 = l1?.next ? l1.next : null; // 현재 l1노드가 null이면 다음 노드를 null로, 아니면 그냥 l1.next를 다음 노드로 삼겠다(l1.next가 null이어도 괜찮음)
	// 	l2 = l2?.next ? l2.next : null;
	// }

	// l1만 노드가 남은 경우
	while (l1.next) {
		l1 = l1.next;
		let sum = l1.val + plusOne;
		if (sum >= 10) {
			plusOne = true;
			sum -= 10;
		} else {
			plusOne = false;
		}
		pointer.next = new ListNode(sum);
		pointer = pointer.next;
	}
	
	// 그렇지 않고 l2만 노드가 남은 경우
	while (l2.next) {
		l2 = l2.next;
		let sum = l2.val + plusOne;
		if (sum >= 10) {
			plusOne = true;
			sum -= 10;
		} else {
			plusOne = false;
		}
		pointer.next = new ListNode(sum);
		pointer = pointer.next;
	}

	// l1도 l2도 다 닳았을 때 마지막으로 +1 올림이 있는 경우 추가해주기: 
	if (plusOne) pointer.next = new ListNode(1);

	return sumHead;
}
/* 
첫 시도: 
83 ms
47.5 MB
*/

// 위 풀이를 더 정리한 버전: 
function solution2(l1, l2) {
	// 1. l1과 l2 첫 노드쌍의 합을 새 '합계' 링크드 리스트의 head로 삼는다. 
	let plusOne = false;
	let sum = l1.val + l2.val;
	// let plusOne = parseInt(sum / 10);
	// sum %= 10;
	if (sum >= 10) {
		plusOne = true;
		sum -= 10;
	}
	let sumHead = new ListNode(sum);
	let pointer = sumHead;
	
	l1 = l1.next;
	l2 = l2.next;
	// 2. l1이나 l2에 노드가 남아있는 동안 두 짝(혹은 한 짝만) 합계를 구하여 sumHead의 다음 노드로 연결한다.
	while (l1 || l2) {
		// "l1노드가 null이면 undefined로, 거기서 다시 0으로 교체하여 계산하겠다"(이는 l1과 l2를 null로만 만들어 다음 루프로 넘겨주면 계속해서 안전한 장치가 됨): 
		let sum = (l1?.val ?? 0) + (l2?.val ?? 0) + plusOne; 
		if (sum >= 10) {
			plusOne = true;
			sum -= 10;
		} else {
			plusOne = false;
		}
		// // (아래처럼도 할 수 있지만 위 코드가 더 직관적이어서 그대로 놔둔다)
		// plusOne = parseInt(sum / 10);
		// sum %= 10;

		pointer.next = new ListNode(sum);
		l1 = l1?.next ? l1.next : null; // 현재 l1노드가 null이면 다음 노드를 null로, 아니면 그냥 l1.next를 다음 노드로 삼겠다(l1.next가 null이어도 괜찮음)
		l2 = l2?.next ? l2.next : null;
		pointer = pointer.next;
	}

	// 3. 두 링크드 리스트의 노드를 모두 소모했는데 마지막 '올림' 자리가 남은 경우 처리: 
	if (plusOne) pointer.next = new ListNode(1);

	// 4. 결과(합계) 링크드 리스트 반환
	return sumHead;
}
// => 성공!
/* 속도는 왜인지... 위의 풀이와 같거나 더 느린 듯 하다. 공간도 확실히 1MB 정도 더 드는 것 같고..
두 번째 시도: 
99 ms
47.8 MB

첫 시도: 
91 ms
47.8 MB

// => plusOne = parseInt(sum / 10)과 sum %= 10으로 고친 후: 
두 번째 시도:
101 ms
48.4 MB

첫 시도:
95 ms
48.3 MB
*/

module.exports = {
	solution: recursiveSolution,
	ListNode,
}

// 다른 풀이: 재귀함수 편
function recursiveSolution(l1, l2) {
	/**
	 * : 현재 노드쌍을 더하여 만들어지는 새 '합계 노드'를 반환.
	 * @param {ListNode} node1: l1에서 가져온 현재 노드
	 * @param {ListNode} node2: l2에서 가져온 현재 노드
	 * @param {1 || 0} plusOne: 1 혹은 0. 현재 node1과 node2를 더할 때 +1을 추가하느냐 마느냐를 결정하는 값. 즉, 이전 노드쌍에서 올라온 '올림수'.
	*/ 
	const iter = (node1, node2, plusOne = 0) => {
		// 탈출조건: node1과 2가 모두 null이고 '올림수(plusOne)'도 0인 경우: null을 반환하며 탈출한다.
		if (!node1 && !node2 && !plusOne) return null;

		const newVal = (node1?.val || 0) + (node2?.val || 0) + plusOne;
		const nextNode = iter(node1?.next, node2?.next, Math.floor(newVal / 10));
		return new ListNode(newVal % 10, nextNode);
	}

	return iter(l1, l2);
}
/* 약간이나마 속도가 가장 빠르다.
두 번째 시도:
82 ms
47.5 MB

첫 시도:
85 ms
47.5 MB
*/