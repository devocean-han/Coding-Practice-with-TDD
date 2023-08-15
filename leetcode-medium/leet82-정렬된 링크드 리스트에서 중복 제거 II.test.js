const { solution, ListNode } = require('./leet82-정렬된 링크드 리스트에서 중복 제거 II');

describe('Remove Deuplicates from Sorted List II', () => {
	[
		{ head: null, answer: null },
		{ head: new ListNode(-100), answer: new ListNode(-100) },

		// 중복이 하나 있을 때
		{ head: new ListNode(-100, new ListNode(-100)), answer: null },
		{ head: new ListNode(-100, new ListNode(-100, new ListNode(-100))), answer: null },

		// 중복이 없고 노드가 셋 이상일 때
		{ head: new ListNode(-100, new ListNode(-1, new ListNode(100))), answer: new ListNode(-100, new ListNode(-1, new ListNode(100))) },
		
		// 중복이 있고 노드가 셋 이상일 때
		{ head: new ListNode(-100, new ListNode(-100, new ListNode(100))), answer: new ListNode(100) },
		{ head: new ListNode(-100, new ListNode(-100, new ListNode(100, new ListNode(100)))), answer: null },
		{ head: new ListNode(-1, new ListNode(100, new ListNode(100))), answer: new ListNode(-1) },

		// pointer가 마지막을 바라볼 때(=노드 하나만 뒤에 남겨두게 된 때), 삭제로 인해 도달한 경우: 
		{ head: new ListNode(1, new ListNode(2, new ListNode(2, new ListNode(3)))), answer: new ListNode(1, new ListNode(3)) },
		// 		+ 마지막 노드도 중복되었어서 지워야 하는 경우:
		{ head: new ListNode(1, new ListNode(2, new ListNode(2, new ListNode(2)))), answer: new ListNode(1) },
		// pointer가 마지막을 바라볼 때, 평범히 '이동해 와서' 도달한 경우: 
		{ head: new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4)))), answer: new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4)))) },
		// 		+ 마지막 노드도 중복되었어서 지워야 하는 경우:
		{ head: new ListNode(1, new ListNode(3, new ListNode(3))), answer: new ListNode(1) },
		
		// 예제 케이스
		{ head: new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3, new ListNode(4, new ListNode(4, new ListNode(5))))))), answer: new ListNode(1, new ListNode(2, new ListNode(5))) },
		{ head: new ListNode(1, new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(3))))), answer: new ListNode(2, new ListNode(3)) },

		
	].forEach(({ head, answer }) => {
		const copyHead = head?.deepCopy();
		const output = solution(head);
		it(`should return [${answer?.printVals()}] and(but) the output is [${output?.printVals()}]. 
		Given: head: [${copyHead?.printVals()}]`, () => {
			expect(output?.printVals()).toEqual(answer?.printVals());
		});
	});
});