const { solution, ListNode } = require('./leet83-정렬된 링크드 리스트에서 중복 제거');

describe('Remove Duplicates from Sorted List', () => {
	[
		{ head: null, answer: null },
		{ head: new ListNode(), answer: new ListNode(0) },

		// 간단한 중복이 있을 때
		// [1,1] => [1]
		{ head: new ListNode(1, new ListNode(1)), answer: new ListNode(1) },
		// [0,0,1,1] => [0,1]
		{ head: new ListNode(0, new ListNode(0, new ListNode(1, new ListNode(1)))), answer: new ListNode(0, new ListNode(1)) },
		// [1,1,2] => [1,2]
		{ head: new ListNode(1, new ListNode(1, new ListNode(2))), answer: new ListNode(1, new ListNode(2)) },
		// [1,1,2,3,3] => [1,2,3]
		{ head: new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3))))), answer: new ListNode(1, new ListNode(2, new ListNode(3))) },
		
		// [-100,-99,-99,0,0,100] => [-100,-99,0,100]
		{ head: new ListNode(-100, new ListNode(-99, new ListNode(-99, new ListNode(0, new ListNode(0, new ListNode(100)))))), answer: new ListNode(-100, new ListNode(-99, new ListNode(0, new ListNode(100)))) },


	].forEach(({ head, answer }) => {
		const originalHead = head?.deepCopy();
		const output = solution(head);
		it(`should return [${answer?.printVals()}] and(but) the output is [${output?.printVals()}].
		Given: head: [${originalHead?.printVals()}]`, () => {
			expect(output?.printVals()).toEqual(answer?.printVals());
		});
	});
});