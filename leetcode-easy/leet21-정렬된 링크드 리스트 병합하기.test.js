const { solution, ListNode } = require('./leet21-정렬된 링크드 리스트 병합하기');


// -> 테스트가 돌아가지 않는다. 뭔가 메모리 초과 오류가 발생한다. LeetCode 사이트에서 정답을 재출하면 잘 돌아간다('다른 해설' solution2의 경우). 
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