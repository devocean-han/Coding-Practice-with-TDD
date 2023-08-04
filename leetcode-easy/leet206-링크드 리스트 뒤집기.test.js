const { solution } = require('./leet206-링크드 리스트 뒤집기');

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

class LinkedList {
	constructor(listNode) {
		// this.arr = [(ListNode === undefined ? new ListNode() : ListNode)]
		this.head = (listNode === undefined ? new ListNode() : listNode);
	}

	// 꼬리에 노드 추가하고 이 링크드 리스트 반환(꼬리물기를 가능하게 하기 위함)
	push(listNode) {
		let pointer = this.head;
		// 만약 현재 노드가 명시적인 null값을 가지는 상태라면, 현재 위치에 이 주어진 노드를 덮어씌움
		if (pointer.val === null) {
			pointer.val = listNode.val;
			return this;
		}
		// 그게 아니라면 포인터가 가리키는 노드의 '다음' 노드가 null이 되는 순간까지, 즉 꼬리 노드까지 포인터를 이동한 후 다음 노드로 가리키게 만듬
		while (pointer.next !== null) {
			pointer = pointer.next;
		}
		pointer.next = listNode;
		return this;
	}

	// 값이 주어지면 그 값을 노드로 만드렁 꼬리에 추가 후 이 링크드 리스트 반환
	pushVal(val) {
		return this.push(new ListNode(val));
	}

	// 꼬리에서 노드 제거 및 반환
	pop() {
		let pointer = this.head;
		// 마지막에서 두 번째 노드까지 포인터 이동
		while (pointer.next.next !== null) {
			pointer = pointer.next;
		}
		// 멈춰선 현재 노드의 다음 노드를 반환하고 현재.next를 null로 바꾼다.
		const lastNode = pointer.next;
		pointer.next = null;
		return lastNode;
	}

	// head부터 끝까지 노드 '값'들 반환
	printVals() {
		return this.arr.forEach((node) => node.val);
	}
}

describe('Reverse Linked List', () => {
	const node1 = new ListNode(null);
	const node2 = new ListNode(-5000);
	const node3 = new ListNode(5000);

	let linkedList = new LinkedList(node1); 
	// beforeEach(() => {
	// 	linkedList = new LinkedList();
	// 	// linkedList.push(node2)
	// });

	[
		// // [] => []
		// { head: node1, answer: node1 },
		// // [-5000] => [-5000]
		// { head: node2, answer: node2 },
		
		// // [-5000, 5000, 0] => [0, 5000, -5000]
		// // { head: node2, answer: node2 },
		// { head: new LinkedList(new ListNode(null)).pushVal(-5000).pushVal(5000).push(new ListNode(0)).head, answer: new ListNode(0, new ListNode(5000, new ListNode(-5000))) },

		// [1,2,3,4,5] => [5,4,3,2,1]
		{ head: new LinkedList(new ListNode(1)).pushVal(2).pushVal(3).push(new ListNode(4)).pushVal(5).head, answer: new ListNode(5, new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(1))))) },

	].forEach(({ head, answer }) => {
		let originalHead = head;
		const output = solution(head);
		it(`should return [${answer.printVals()}] and(but) the output is [${output.printVals()}]. Given: head: [${originalHead.printVals()}]`, () => {
			expect(output).toEqual(answer);
		});
	});
});

// describe('Reverse Linked List: 링크드 리스트를 통째로 넣어 테스트', () => {
// 	let inputLinkedList = new LinkedList(new ListNode(null)); 
// 	let outputLinkedList = new LinkedList(new ListNode(null)); 
// 	beforeEach(() => {
// 		inputLinkedList = new LinkedList(new ListNode(null)); 
// 		outputLinkedList = new LinkedList(new ListNode(null)); 
// 	});

// 	[
// 		// [] => []
// 		{ head: inputLinkedList, answer: outputLinkedList },
// 		// { head: node2, answer: node2 },
// 		// { head: new ListNode(-5000, node3), answer: new ListNode(5000, node2) },
		
// 		// [1, 2] => [2, 1]
// 		{ head: inputLinkedList.pushVal(1).pushVal(2), answer: outputLinkedList.pushVal(2).pushVal(1) },

// 		// [-5000, 5000, 0] => [0, 5000, -5000]
// 		// { head: inputLinkedList.pushVal(-5000).pushVal(5000).pushVal(0), answer: new LinkedList(new ListNode()).pushVal(5000).pushVal(-5000) },
// 		// { head: inputLinkedList.pushVal(-5000).pushVal(5000).pushVal(0), answer: outputLinkedList.pushVal(0).pushVal(5000).pushVal(-5000) },
// 		// { head: new LinkedList(new ListNode(-5000)).push(new ListNode(5000)).push(new ListNode(0)), answer: new LinkedList(new ListNode()).pushVal(5000).pushVal(-5000) },

// 		// => 이상한 점: 
// 		// 1. beforeEach가 안 먹힌다. 분명 describe 안에 쓰면 그 안의 각 test마다 적용된다는 것 같은데...
// 		// 2. 밑에서 "Given: head: []"로 출력할 때, answer나 output은 전체 노드가 출력 잘 되는데 얘만 첫 노드값만 출력되고 만다. 

// 	].forEach(({ head, answer }) => {
// 		// console.log("input:", head, "answer:", answer);
// 		console.dir(head);
// 		console.dir(answer);
// 		const outputHeadNode = solution(head.head);
// 		test(`should return [${answer.head.printVals()}] and(but) the output is [${outputHeadNode.printVals()}]. Given: head: [${head.head.printVals()}]`, () => {
// 			expect(outputHeadNode).toEqual(answer.head);
// 		});
// 	});
// });

// describe('Reverse Linked List: 링크드 리스트를 통째로 넣어 테스트', () => {
// 	// let inputLinkedList = new LinkedList(new ListNode(null));
// 	// let outputLinkedList = new LinkedList(new ListNode(null));
// 	let inputLinkedList;
// 	let outputLinkedList;
// 	beforeEach(() => {
// 		inputLinkedList = new LinkedList(new ListNode(null));
// 		outputLinkedList = new LinkedList(new ListNode(null));
// 	});

// 	// [] => []
// 	// { head: inputLinkedList, answer: outputLinkedList },
// 	let head = inputLinkedList;
// 	let answer = outputLinkedList;
// 	let outputHeadNode = solution(head.head);
// 	test(`should return [${answer.head.printVals()}] and(but) the output is [${outputHeadNode.printVals()}]. Given: head: [${head.head.printVals()}]`, () => {
// 		// console.dir(inputLinkedList);
// 		expect(outputHeadNode).toEqual(answer.head);
// 	});
	
// 	// [1, 2] => [2, 1]
// 	// { head: inputLinkedList.pushVal(1).pushVal(2), answer: outputLinkedList.pushVal(2).pushVal(1) },
// 	head = inputLinkedList.pushVal(1).pushVal(2);
// 	answer = outputLinkedList.pushVal(2).pushVal(1);
// 	outputHeadNode = solution(head.head);
// 	test(`should return [${answer.head.printVals()}] and(but) the output is [${outputHeadNode.printVals()}]. Given: head: [${head.head.printVals()}]`, () => {
// 		expect(outputHeadNode).toEqual(answer.head);
// 	});
// });