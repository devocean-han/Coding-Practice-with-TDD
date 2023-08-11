const { solution, ListNode } = require('./leet2-링크드 리스트로 표현된 두 수 더하기');

describe('Add Two Numbers', () => {
	[
		// 0 + 0 = 0
		{ l1: new ListNode(0), l2: new ListNode(0), answer: new ListNode(0) },
		// 1 + 2 = 3
		{ l1: new ListNode(1), l2: new ListNode(2), answer: new ListNode(3) },
		// 10 + 0 = 10
		{ l1: new ListNode(0, new ListNode(1)), l2: new ListNode(0), answer: new ListNode(0, new ListNode(1)) },
		// 10 + 5 = 15
		{ l1: new ListNode(0, new ListNode(1)), l2: new ListNode(5), answer: new ListNode(5, new ListNode(1)) },
		// 11 + 9 = 20
		{ l1: new ListNode(1, new ListNode(1)), l2: new ListNode(9), answer: new ListNode(0, new ListNode(2)) },

		// 342 + 465 = 807
		{ l1: new ListNode(2, new ListNode(4, new ListNode(3))), l2: new ListNode(5, new ListNode(6, new ListNode(4))), answer: new ListNode(7, new ListNode(0, new ListNode(8))) },
		// 9999999 + 9999 = 10009998
		{ l1: new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))))))), l2: new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))), answer: new ListNode(8, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(0, new ListNode(0, new ListNode(0, new ListNode(1)))))))) },

	].forEach(({ l1, l2, answer }) => {
		const output = solution(l1, l2);
		it(`should return [${answer.printVals()}] and(but) the output is [${output.printVals()}]. Given: l1: [${l1.printVals()}], l2: [${l2.printVals()}]`, () => {
			expect(output.printVals()).toEqual(answer.printVals());
		});
	});
});