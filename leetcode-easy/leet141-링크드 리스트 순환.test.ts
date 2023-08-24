import solution from './leet141-링크드 리스트 순환';
import ListNode from './leet141-링크드 리스트 순환';
// import { solution, ListNode } from "./leet141-링크드 리스트 순환"

// const {solution} = require('./leet141-링크드 리스트 순환');
// const solution = require('./leet141-링크드 리스트 순환')

describe('Linked List Cycle', () => {
	[
		{ head: new ListNode(3, null), answer: false },

	].forEach(({ head, answer }) => {
		const output: boolean = solution(head);
		it(`should return ${answer} and(but) the output is ${output}. 
		Given: head: [${head.printVals()}]`, () => {
			expect(output).toEqual(answer);
		});
	});
});