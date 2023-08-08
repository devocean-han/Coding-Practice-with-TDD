const { ListNode } = require('./leet143-링크드 리스트 재정렬');
const { solution } = require('./leet19-링크드 리스트 뒤에서 n번째 제거하기');

describe('Remove Nth Node From End of List', () => {
	[
		{ head: new ListNode(1), n: 1, answer: null },

	].forEach(({ head, n, answer }) => {
		const output = solution(head);
		it(`should return [${answer.printVals()}] and(but) the output is [${output.printVals()}]. Given: head: [${head.printVals()}], n: ${n}`, () => {
			expect(output.printVals()).toEqual(answer.printVals());
		});
	});
});