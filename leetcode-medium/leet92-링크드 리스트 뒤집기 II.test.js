const { solution, ListNode } = require('./leet92-링크드 리스트 뒤집기 II');

describe('Reverse Linked List II', () => {
	[
		// 노드가 하나뿐이거나 left === right일 때: head 그대로 반환
		{ head: new ListNode(1), left: 1, right: 1, answer: new ListNode(1) },
		{ head: new ListNode(1, new ListNode(2)), left: 1, right: 1, answer: new ListNode(1, new ListNode(2)) },
		{ head: new ListNode(1, new ListNode(2)), left: 2, right: 2, answer: new ListNode(1, new ListNode(2)) },
		
		// left부터 right이 중간에 위치한 경우:
		{ head: new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))), left: 2, right: 3, answer: new ListNode(1, new ListNode(3, new ListNode(2, new ListNode(4, new ListNode(5))))) },
		
		// 첫 노드가 left인 경우:
		{ head: new ListNode(1, new ListNode(2, new ListNode(3))), left: 1, right: 2, answer: new ListNode(2, new ListNode(1, new ListNode(3))) },
		// 끝 노드가 right인 경우:
		{ head: new ListNode(1, new ListNode(2, new ListNode(3))), left: 2, right: 3, answer: new ListNode(1, new ListNode(3, new ListNode(2))) },
		// 처음과 끝 노드가 딱 left와 right인 경우:
		{ head: new ListNode(1, new ListNode(2, new ListNode(3))), left: 1, right: 3, answer: new ListNode(3, new ListNode(2, new ListNode(1))) },
		
		// 예제 테스트: 
		{ head: new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))), left: 2, right: 4, answer: new ListNode(1, new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(5))))) },
		{ head: new ListNode(-500), left: 1, right: 1, answer: new ListNode(-500) },
		
	].forEach(({ head, left, right, answer }) => {
		const originalHeal = head.deepCopy();
		const output = solution(head, left, right);
		it(`should return [${answer.printVals()}] and(but) the output is [${output.printVals()}]. 
		Given: head: [${head.printVals()}], left: ${left}, right: ${right}`, () => {
			expect(output).toEqual(answer);
		});
	});
});