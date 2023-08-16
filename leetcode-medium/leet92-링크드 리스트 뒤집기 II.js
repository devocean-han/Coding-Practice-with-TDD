/* 92. Reverse Linked List II
https://leetcode.com/problems/reverse-linked-list-ii/

Medium

Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.

 

Example 1:


Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]
Example 2:

Input: head = [5], left = 1, right = 1
Output: [5]
 

Constraints:

The number of nodes in the list is n.
1 <= n <= 500
-500 <= Node.val <= 500
1 <= left <= right <= n
 

Follow up: Could you do it in one pass?
Accepted
668.5K
Submissions
1.5M
Acceptance Rate
45.6%

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
}

// => left번째 노드부터 right번째 노드를 뒤집어 연결한 전체 링크드 리스트를 반환하기.

/**
 * @param {ListNode} head 
 * @param {number} left 
 * @param {number} right 
 * @returns {ListNode}
 */
// (성공!) 
function solution(head, left = 1, right = 1) {
	// 0. 주어진 링크드 리스트에 노드가 1개이거나 left와 right 숫자가 같으면 head를 그대로 반환시켜준다.
	if (!head.next || left === right) return head;

	// 리스트를 뒤집는다...
	// head가 right을 가리키게 만들고, 
	// right.next를 기리키는 임시 포인터를 만들어두고,
	// **right은 right-1을 가리키게 만든다. left에 도달하기까지 반복하고
	// 마지막으로 임시 저장해둔 right.next를 붙인다. 
	
	// => right이 right-1을 가리키게 만드는 법... 새로운 head를 만드는 방법뿐인가? 새 head를 만들더라도 차지하는 공간은 별 차이 없으려나? 
	// 새롭게 resultHead를 만든다. left 직전 노드까지 .next로 이어준다. 아니 잠깐만... left는 숫자잖아. 그래 그러면
	// 1) resultHead = head로 초기화하고
	// 2) resultHead.next = head.next...하지 말고 그냥 resultHead 순환 포인터 resultPointer를 left-1번째 노드에 도착하도록 하면 되겠다. 즉, 처음에 resultHead를 가리키고 있는 상태에서 resultPointer를 .next로 옮기기를 left-2번 반복한다. 
	// left-1번 노드에 도착하면 resultHead.next를 right노드로 연결시킨다. 다시 right이 right-1을 가리키게 만드는 방법이 필요한데... 아! 처음부터 꼬리인 right을 붙이지 않고, 오리지널 head를 순회하는 포인터는 머리부터 꼬리까지 순회하게 하는 것이다. 그리고 result 리스트에 옮길 때 꼬리에 붙도록... 하면... 음.. 일단 오리지널 head의 두 번째 노드를 포인터로 기억하게 한다. 그리고 오리지널 head에 다음 노드로 resultHead를 붙인다. 그리고 그걸 새로운 resultHead로 삼고, head는 아까전 저장한 두 번째 노드를 가리키게 만든다. 그러면 매번 오리지널 리스트의 첫 노드가 ... 어쨌든 거꾸로 붙게 된다. 
	
	// 1. 그러니까 일단 resultHead를 만들어서 1~left-1번 노드까지 있도록 하고,
	// 2. reversePart를 만들어서 left~right까지의 노드를 대상으로
	// 		1) reversePart을 null로 둔다.
	// 		2) 오리지널의 둘째 노드를 기억해두고
	// 		3) 오리지널 첫째 노드(=left)가 next로 reversePart을 가지게 한다. 
	// 		4) 리스트의 두 번째로 밀려난 reversePart이 다시 첫 노드를 가리키도록 reversePart = left로 지정한다. 
	// 		5) 원래의 left가 아까 기억해둔 둘째 노드를 가리키게 만든다. 
	// 		6) left가 null이 될때까지 반복한다. => 근데 사실 left가 null이 될 수 없다. 딱 right까지만 뒤집으려면, 횟수를 지정해서 루프 돌려야 한다. 
	// 의 방법으로 거꾸로 뒤집어서 저장하고선 1번의 resultHead에 덧붙이고, 
	// 3. right+1~끝 노드까지 마지막으로 덧붙여준다. 
	
	// 음... 될까? 
	
	// Part 1: resultHead를 만들어서 1 ~ left-1 번 노드까지 저장한다.
	let resultHead = head;
	let originalPointer = head;
	let resultPointer = resultHead;
	// 		첫 노드에 이미 도착하고 시작했으므로 left-2번 .next로 이동하기: 루프가 끝나면 두 포인터가 전부 left - 1번 노드를 가리키고 있게 됨
	// 아니다 첫 번쨰 노드부터 '뒤집어야 하는 left번째 노드'가 될 수 있으니까, resultPointer와 originalPointer 모두 임시 -1번째 노드를 만들어 가리키게 만들자. 그리고 left-1번 next로 이동시킨다. 
	resultHead = new ListNode(0, head);
	originalPointer = resultHead;
	resultPointer = resultHead;
	// Q. 두 포인터를 지금부터 나눠서 전진시킬 필요가 없다..! 수정하기.

	for (let i = 0; i < left - 1; i++) {
		originalPointer = originalPointer.next;
		resultPointer = resultPointer.next;
	}

	// Part 2: reversePart을 만들어서... left ~ right까지의 노드를 뒤집어 저장하고 resultHead 뒤에 붙인다.
	// => originalPointer는 정방향(오른쪽)으로 순회하면 됨. 
	// ... 일단 무식하게 reversePart을 따로 만들고, reversePart의 끝까지 도달하도록 또 pointer를 right-left번 옮겨주는 방식으로 하자: 
	let reversePart = null;
	leftHead = originalPointer.next; // left 노드에 도달시킴. 이제부턴 originalPointer가 left이자 partial head의 두 번째 노드를 기억하는 역할을 한다. 
	let originalLeft = leftHead;
	for (let i = 0; i <= right - left; i++) { 
		originalPointer = leftHead.next;
		leftHead.next = reversePart;
		reversePart = leftHead;
		leftHead = originalPointer;
	}
	// ex) [1,2,3,4,5] => left=2, right=3일 때 => [1,3,2,4,5]를 만들어야 함.
	// 		따라서 for문은 i=0,1일 때 반복하게 되며
	// 		i=0일 때 결과: reversePart=[2], leftHead=[3,4,5]
	// 		i=1일 때 결과: reversePart=[3,2], leftHead=[4,5]
	// 이 되어 잘 완료되게 됨. 반복 횟수를 맞게 지정했다. 
	
	// => for 루프가 끝나고 나면: 
	// resultHead: [1번노드, ..., left-1번노드]
	// reversePart: [right번, right-1번, ... left번노드]
	// originalPointer: right+1번 노드
	// resultPointer: resultHead의 left-1번 노드
	
	// Q. 오리지널 head와 originalPointer, leftHead를 통일해볼 수 있을 것 같다.
	// Q. reversePart을 따로 만들어서 pointer를 끝까지 옮겨줘야 하는 대신, resultPOinter를 이용해볼 수 없을까? 아 잠깐... new ListNode를 만들지 않는 이상 기존의 링크를 부수고 연결한 것이 된다. 즉, 기존의 head가 다 부서졌다는 얘기. 즉, 같은 노드를 가리키기만 하면 resultHead의 포인터든 originaHead의 포인터든 같은 노드가 된다는 얘기..! 즉, originalPointer가 제대로 right+1을 가리키고 있기만 하다면 resultHead한테 덧붙여줄 수... 아니 right 노드를 가리키고 있어야... 아니, 기존의 left 노드를 가리키고 있는 포인터가 있어야 현재 right+1을 가리키고 있는 originalPointer를 통쨰로 붙여줄 수 있다. => 'originalLeft'를 만들어 처음 left지점을 기억하게 했다. 이러면 아무리 지지고 볶아서 노드 위치가 바뀐다고 해도, 그 노드를 가리키고 있다는 사실 자체는 바뀌지 않는다. 즉, 뒤집기를 한 후에 originalLeft는 마지막 노드를 가리키는 포인터가 되며, 여기에 .next로 originalPointer를 붙여주면 된다!
	
	console.log(`resultHead: [${resultHead.printVals()}], reversePart: [${reversePart.printVals()}], originalPointer: [${originalPointer?.printVals()}]`)
	// 2-1. 붙인다. 
	resultPointer.next = reversePart;
	// 3. 붙인다. 
	originalLeft.next = originalPointer;

	// 4. 반환
	return resultHead.next;
}



// 위의 풀이를 더 정리한 해답: 포인터를 하나로 통일시키고, 필요한 지점(left 직전 노드, 뒤집은 리스트의 끝 노드)마다 포인터를 만들어 기억하도록 하였음.
// 로직: 
	// 1. 그러니까 일단 resultHead를 만들어서 1~left-1번 노드까지 있도록 하고,
	// 2. reversePart를 만들어서 left~right까지의 노드를 대상으로
	// 		1) reversePart을 null로 둔다.
	// 		2) 오리지널의 둘째 노드를 기억해두고
	// 		3) 오리지널 첫째 노드(=left)가 next로 reversePart을 가지게 한다. 
	// 		4) 리스트의 두 번째로 밀려난 reversePart이 다시 첫 노드를 가리키도록 reversePart = left로 지정한다. 
	// 		5) 원래의 left가 아까 기억해둔 둘째 노드를 가리키게 만든다. 
	// 		6) left가 null이 될때까지 반복한다. => 근데 사실 left가 null이 될 수 없다. 딱 right까지만 뒤집으려면, 횟수를 지정해서 루프 돌려야 한다. 
	// 의 방법으로 거꾸로 뒤집어서 저장하고선 1번의 resultHead에 덧붙이고, 
	// 3. right+1~끝 노드까지 마지막으로 덧붙여준다. 
function solution2(head, left = 1, right = 1) {
	// 주어진 링크드 리스트에 노드가 1개이거나 left와 right 숫자가 같으면 head를 그대로 반환시켜준다.
	if (!head.next || left === right) return head;
	
	// Part 1: resultHead를 만들어서 1 ~ left-1 번 노드까지 저장한다. 
	let resultHead = new ListNode(0, head);
	let pointer = resultHead;
	// 	=> 첫 번쨰 노드부터 '뒤집어야 하는 left번째 노드'가 될 수 있으므로(뒤집는 대상을 next로 가리키는 포인터가 있어야 함), 임시로 -1번째 노드를 만들어 resultHead로 삼고 pointer로 시작하게 만든다. 나중에 resultHead의 2번째 노드를 반환하면 된다.  
	for (let i = 0; i < left - 1; i++) {
	// -1번째 노드부터 pointer를 두고 시작하였으므로, left-1 번 노드까지 도달하도록 하려면 pointer를 n-1번 옮긴다. 
		pointer = pointer.next;
	}
	// 현재 위치 left-1을 기억하는 포인터를 만들어둔다.
	const part1End = pointer;

	// Part 2: part2Head를 만들어서... left ~ right까지의 노드를 뒤집어 저장하고 resultHead 뒤에 붙인다.
	let part2Head = null;
	let leftHead = pointer.next; // left 지점 노드를 부분 리스트[left, left+1, ...,right]의 head로 저장해두고 뒤집기 작업에 사용. 
	const part2End = leftHead; // 뒤집기가 끝나면 '뒤집은 부분 리스트(part2)'의 끝 노드가 될 현재의 head를 가리키는 포인터를 만들어둔다. 
	for (let i = 0; i <= right - left; i++) { 
	// 매 실행마다 leftHead의 첫 노드를 떼어서 part2Head의 끝에 붙이게 됨. 따라서 이를 뒤집어야 하는 노드 개수만큼(=right-left+1번) 처리해주어야 한다. 
		pointer = leftHead.next;
		leftHead.next = part2Head;
		part2Head = leftHead;
		leftHead = pointer;
	}
	leftHead = null;
	// ex) [1,2,3,4,5] => left=2, right=3일 때 => [1,3,2,4,5]를 만들어야 함.
	// 		따라서 for문은 i=0,1일 때 반복하게 되며
	// 		i=0일 때 결과: part2Head=[2], leftHead=[3,4,5]
	// 		i=1일 때 결과: part2Head=[3,2], leftHead=[4,5]
	// 이 되어 잘 완료되게 됨. 반복 횟수를 맞게 지정했다. 
	
	// => for 루프가 끝나고 나면: 
	// resultHead: [1번노드, ..., left-1번노드]
	// part2Head: [right번, right-1번, ... left번노드]
	// pointer: right+1번 노드
	// part2End: resultHead의 left-1 지점 노드
	
	// 편의를 위해 pointer를 새롭게 이름짓는다
	const part3Head = pointer;
	// 붙인다. 
	part1End.next = part2Head;

	// Part 3: 붙인다. 
	part2End.next = part3Head;

	// 4. 반환
	return resultHead.next;
}
// => 쓰이지 않는 leftHead를 마지막에 null로 지정해줬더니 확실하게 1MB 정도 공간 사용이 줄었다. 브라우저의 V8은 가비지 콜렉션이 처리한다던데 그래도 명시적으로 필요 없는 변수를 null로 바꿔주면 도움이 되나보다... 그리고 leftHead = null을 for 루프 직후에 붙일 때 효과가 있었고 return 직전에 해주면 별로 효과가 없었다. 1MB 미만의 차이이긴 했으나 확실히 그런 경향이 있었다. 그건 또 왜그럴까. 함수가 끝나기 전에 가비지 컬렉터가 일할 시간이 있어서 그런가? 리턴 직전에는 음 청소할 틈이 안나서 청소를 못한 채로 공간이 측정돼서 그런가...
// => 마지막에 const part3Head = pointer라고 상수를 하나 더 만들고 아니고는 공간 사용에 거의 차이가 없는 것 같다. 오히려 만든 part3Head를 지우고 pointer를 그대로 사용해 제출했을 때 더 느려지기도 했다.
// => '리턴 직전에 필요없는 포인터를 null로 지정해주는 것은 가비지 컬렉터가 일할 틈이 없기 때문에 공간 사용이 줄어들지 않는다'는 가정을 뒷받침하는 근거 2: part3Head 상수로 저장하고 남은 pointer를 null로 없애줘봤다. 근데 이건 거의 return 직전에 해야 하는 작업이어서, 해줘도 메모리 사용을 감소시키지 못했다. 오히려 더 늘어나는 것 같은 느낌이었음.

// => 시간과 공간 측정할 때 뭔가... 둘이 반비례적인 결과가 나오는 듯한 인상을 받았다. 같은 코드로 계속 돌려서 나오는 편차인데도. 그래프를 그려서 보고 싶다는 생각이 다시금 들었다. 휴... j3인지 뭔지 다시 살펴봐야 하나... 그래봤자 주석에는 이미지 못 다는데.

module.exports = {
	solution: solution2,
	ListNode,
}