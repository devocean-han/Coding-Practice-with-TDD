const { solution, ListNode } = require('./leet82-정렬된 링크드 리스트에서 중복 제거 II');

describe('Remove Deuplicates from Sorted List II', () => {
	[
		// { head: null, answer: null },
		// { head: new ListNode(-100), answer: new ListNode(-100) },

		// 중복이 하나 있을 때
		{ head: new ListNode(-100, new ListNode(-100)), answer: null },
		{ head: new ListNode(-100, new ListNode(-100, new ListNode(-100))), answer: null },

		// 중복이 없고 노드가 셋 이상일 때
		{ head: new ListNode(-100, new ListNode(-1, new ListNode(100))), answer: new ListNode(-100, new ListNode(-1, new ListNode(100))) },
		
		// 중복이 있고 노드가 셋 이상일 때
		{ head: new ListNode(-100, new ListNode(-100, new ListNode(100))), answer: new ListNode(100) },
		{ head: new ListNode(-100, new ListNode(-100, new ListNode(100, new ListNode(100)))), answer: null },
		{ head: new ListNode(-1, new ListNode(100, new ListNode(100))), answer: new ListNode(-1) },

	].forEach(({ head, answer }) => {
		const copyHead = head.deepCopy();
		const output = solution(head);
		it(`should return [${answer?.printVals()}] and(but) the output is [${output?.printVals()}]. 
		Given: head: [${copyHead?.printVals()}]`, () => {
			expect(output?.printVals()).toEqual(answer?.printVals());
		});
	});
});