const { solution, ListNode } = require('./leet234-팰린드롬 링크드 리스트');

describe('Palindrome Linked List', () => {
	[
		{ head: new ListNode(0), answer: true },
		{ head: new ListNode(0, new ListNode(0)), answer: true },
		{ head: new ListNode(0, new ListNode(1)), answer: false },
		{ head: new ListNode(0, new ListNode(1, new ListNode(0))), answer: true },
		{ head: new ListNode(0, new ListNode(1, new ListNode(1))), answer: false },

		{ head: new ListNode(1, new ListNode(2)), answer: false },
		{ head: new ListNode(1, new ListNode(2, new ListNode(2, new ListNode(1)))), answer: true },

	].forEach(({ head, answer }) => {
		const originalHead = head.deepCopy();
		const output = solution(head);
		it(`should return ${answer} and(but) the output is ${output}.
		Given: head: [${originalHead.printVals()}]`, () => {
			expect(output).toEqual(answer);
		});
	});
});