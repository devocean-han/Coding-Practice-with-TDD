/* 61. Rotate List
https://leetcode.com/problems/rotate-list/?envType=list&envId=rus4c4ci

Medium

Given the head of a linked list, rotate the list to the right by k places.

 

Example 1:


Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]
Example 2:


Input: head = [0,1,2], k = 4
Output: [2,0,1]
 

Constraints:

The number of nodes in the list is in the range [0, 500].
-100 <= Node.val <= 100
0 <= k <= 2 * 109

*/

/**
 * 주어진 singly-linked list의 정의는 다음과 같다:
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

// => 주어진 링크드 리스트를 오른쪽으로 k칸 회전하여 반환하기.

// 즉, 뒤에서 k번째 노드를 첫 노드로 삼고, 첫 노드를 앞에서 k+1번째 노드로 삼는 것. 마지막 노드의 .next로 첫 노드르 연결해야 하고, 뒤에서 k+1번째 노드에 .next로 null을 연결해야 한다. head를 뒤에서 k번째 노드로 삼아야 한다. => [1] 이렇게 뒤에서 k+1번째 노드를 찾고 마지막 노드에 포인터를 갖다두는 방식으로 연결연결 하는게 나을까
// [2] 아니면 한 칸 한 칸 회전을 시키는게 나을까? => 일견 '뒤집기'와 비슷하기도 하다. 음... 아닌가. 그냥 꼼수를 쓰자면 노드 번호대로 배열이나 map에 저장해두는 수가 있다. 어차피 마지막 노드에 포인터를 갖다둬야 하니까 오히려 순회하는 수는 줄어들 수 있고, 대신 공간을 n만큼 추가로 잡아먹겠지. 아니다, [n + (n-1) + (n-2) + ... + 2 + 1] = 대강 n^2만큼 잡아먹겠구나... 괜찮을까? => O(N^2)이 아니라 O(N)이라는 결론이 났다. 왜냐면 배열에 노드 하나를 넣을 때 딸린 노드가 다 실제로 들어가는 게 아니고 직후 노드의 주소만 들어가는 방식이 될 거라는 걸 알게 되어서. 즉, 처음에 생각했던대로 n만큼의 추가 공간(만)이 든다. 

/**
 * @param {ListNode} head 
 * @param {number} k 
 * @returns {ListNode}
 */
// [1]과 [2]의 짬뽕으로 푼 해답: 노드를 순회하여 배열에 집어넣고 인덱스로 접근하여 뒤에서 k+1번재 노드에 첫 노드를 연결하는 식의 방법. 
// Time complexity: O(N)
// Space complexity: O(N)
function arraySolution(head, k) {
	// 노드가 없거나 하나뿐이면 k가 어떤 수든 head를 곧바로 반환
	if (!head || !head.next) return head;

	// 노드를 번호순으로 배열에 저장한다
	let nodes = [];
	let pointer = head;
	while (pointer) {
		nodes.push(pointer);
		pointer = pointer.next;
	}

	// 노드 총 개수는: 
	let totalNode = nodes.length;
	// k를 노드 총 개수 이하로 만든다. 
	k %= totalNode; // k: 0 ~ totalNode-1까지의 수를 가지게 됨.
	// k가 노드 총 개수의 배수라면 회전시켜도 원래 head 그대로 되므로, head 그대로 먼저 반환시켜준다: 
	if (!k) return head;

	// 필요한 포인터:
	// 1) 마지막 노드(totalNode번째 노드)
	let initialEndNode = nodes[totalNode - 1];
	// 2) 첫 번째 노드 (그리고 1에서 찾은 노드 뒤에 연결)
	initialEndNode.next = head;
	// 3) 뒤에서 k+1번째 노드(현재 k는 0 아님이 보장됨) -> 찾아서 다음 노드로 null을 배정(뒤이은 노드 끊어버리기)
	let endNode = nodes[totalNode - 1 - k];
	endNode.next = null;
	// 4) 뒤에서 k번째 노드를 찾아 head로 삼기
	head = nodes[totalNode - k];

	return head;
}
/* 왜 양호하지..? 이러면 안되는데..?
Runtime
59ms
Beats 82.80%of users with JavaScript

Memory
43.95mb
Beats 67.89%of users with JavaScript
*/

// [2]의 방법(배열에 노드를 저장하는)으로, 이번엔 노드 값만 저장해서 공간 복잡도가 O(N)이 되도록 해보자..! 그 뒤로 n개의 new ListNode를 생성해야 하므로 실은 O(N)이 한 번 더 더해져서 O(2N)이지만!
// => 이 방법은 ListNode에게 next()라는 메소드를 달아준 내 풀이에서만 작동하는 방식이다. 제출시에는 그런 메소드가 정의되어 있지 않으므로 통하지 않을 것.
// Time complexity: O(2N) => O(N)
// Space complexity: (아예 새롭게 만들어 반환하는 링크드 리스트를 포함하면) O(2N) => O(N) 
function arraySolution2(head, k) {
	// 노드가 없거나 한 개뿐이면 head 그대로 반환
	if (!head || !head.next) return head;

	// 노드의 값만을 배열에 순서대로 저장
	let nodeVals = []
	let pointer = head;
	while (pointer) {
		nodeVals.push(pointer.val);
		pointer = pointer.next;
	}

	// 만약 k가 전체 노드 개수의 배수이면 회전시켜도 처음 그대로가 된다: 그런 경우 head를 일찍 반환함
	let totalNodes = nodeVals.length;
	k %= totalNodes;
	if (!k) return head;

	// 뒤에서 k번째 노드부터 끝 노드까지 생성 및 연결
	const newHead = new ListNode(nodeVals[totalNodes - k]);
	pointer = newHead;
	for (let i = totalNodes - k + 1; i < totalNodes; i++) {
		// 뒤에서 k-1번째 노드부터 끝까지
		pointer = pointer.nextVal(nodeVals[i]);
	}
	// 원래의 첫 번째 노드부터 뒤에서 'k+1번째' 노드'까지' 추가로 붙인다.
	for (let i = 0; i < totalNodes - k; i++) {
		pointer = pointer.nextVal(nodeVals[i]);
	}

	// newHead 리턴
	return newHead;
}
/* 3번을 반복했는데 왜 거듭할수록 더 느려지고 공간도 많이 차지하는 걸까? 가장 형편이 좋은 첫 번째 결과도 이전(노드 그대로 넣어 배열을 만들었던) 해답보다 겨우 0.2MB 나아졌다. 사실... 첫 노드를 배열에 넣어서 노드가 줄줄이 딸린 채로 들어간 것 같아도, 메모리상으로는 .next자리에 다음 노드의 주소만 하나 딸랑 들어간 형태인걸까? 딸린 노드들 자체가 다 포함되는 게 아니고? 그러면 val만 하나 뽑아서 넣든 val과 next주소가 든 노드를 넣든 차이가 없는게 말이 된다. 

제출 #3.
60 ms
44.4 MB

제출 #2.
60 ms
44.1 MB

제출 #1.
50 ms
43.8 MB

=> 여러 번 실험한 결과, 배열[노드, 노드, ...]이든 배열[값, 값, ...]이든 실행 시간과 공간에 별 차이가 없음으로 결론 냈다. 두 번째 방식은 더 뚱뚱한 ListNode 클래스를 새롭게 정의해주어야 하는데도 그렇다. 
*/

module.exports = {
	solution: arraySolution2,
	ListNode,
}

// 배열을 사용하지 않고도 할 수 있다는데..! 
function notArraySolution(head, k) {
	if (!head || !head.next) return head;
  
	let totalNode = 0;
	let pointer = head;
	let lastNode;
  
	while (pointer) {
	  totalNode++;
	  lastNode = pointer;
	  pointer = pointer.next;
	}
  
	k %= totalNode;
  
	if (k === 0) return head;
  
	lastNode.next = head;
  
	let newEndNode = head;
	for (let i = 0; i < totalNode - k - 1; i++) {
	  newEndNode = newEndNode.next;
	}
  
	head = newEndNode.next;
	newEndNode.next = null;
  
	return head;
  } 