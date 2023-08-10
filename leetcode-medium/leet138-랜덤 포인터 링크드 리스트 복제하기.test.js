const { solution, Node } = require('./leet138-랜덤 포인터 링크드 리스트 복제하기');

describe('Copy List with Random Pointer', () => {
	[
		{ head: new Node(0, null, null), answer: new Node(0, null, null) },
		{ head: new Node(0, new Node(1), null), answer: new Node(0, new Node(1), null) },
		{ head: new Node(1, new Node(2, null, 1), 1), answer: new Node(1, new Node(2, null, 1), 1) },

	].forEach(({ head, answer }) => {
		const output = solution(head);
		it(`should return [${answer.printVals()}] and(but) the output is [${output.printVals()}]. Given: head: [${head.printVals()}]`, () => {
			expect(output.printVals()).toEqual(answer.printVals());
		});
	});
});