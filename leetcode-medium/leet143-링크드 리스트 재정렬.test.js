const { solution, ListNode } = require('./leet143-링크드 리스트 재정렬');

describe('Reorder List', () => {
	[
		// 링크드 리스트의 길이가 1이나 2이면 원래 모양 그대로 반환됨.
		{ head: new ListNode(1), answer: new ListNode(1) },
		{ head: new ListNode(1000), answer: new ListNode(1000) },
		{ head: new ListNode(1, new ListNode(10)), answer: new ListNode(1, new ListNode(10)) },
		
		// 
		{ head: new ListNode(1, new ListNode(2, new ListNode(10))), answer: new ListNode(1, new ListNode(10, new ListNode(2))) },

	].forEach(({ head, answer }) => {
		const output = solution(head);
		it(`should return [${answer.printVals()}] and(but) the output is [${output.printVals()}]. Given: head: [${head.printVals()}]`, () => {
			expect(output.printVals()).toEqual(answer.printVals());
		});
	});
});