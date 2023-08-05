const { solution, ListNode } = require('./leet21-정렬된 링크드 리스트 병합하기');

describe('Merge Two Sorted Linked Lists', () => {
	let node1 = new ListNode(null);
	let node2 = new ListNode(0);
	[
		{ list1: node1, list2: node1, answer: node1 },
		// { list1: node1, list2: node2, answer: node2 },

	].forEach(({ list1, list2, answer }) => {
		const output = solution(list1, list2);
		it(`should return [${answer.printVals()}] and(but) the output is [${output.printVals()}]. Given: list1: [${list1.printVals()}], list2: [${list2.printVals()}]`, () => {
			expect(output).toEqual(answer);
		});
	});
});