// [1] export default { solution: solution, ListNode }로 내보내서 이렇게 불러오든지:
import ori from "./leet141-링크드 리스트 순환"
const { solution, ListNode } = ori;

// [2] export { solution, ListNode }로 내보내서 이름을 못 바꾸게 불러오든지: 
// import { solution, ListNode } from './leet141-링크드 리스트 순환';

describe('Linked List Cycle', () => {
	[
		{ head: new ListNode(3), answer: false },
		{ head: new ListNode(3, new ListNode(2)), answer: false },

	].forEach(({ head, answer }) => {
		const output: boolean = solution(head);
		it(`should return ${answer} and(but) the output is ${output}. 
		Given: head: [${head.printVals()}]`, () => {
			expect(output).toEqual(answer);
		});
	});
});