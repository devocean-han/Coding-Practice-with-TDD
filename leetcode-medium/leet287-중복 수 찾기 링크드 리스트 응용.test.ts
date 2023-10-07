const { solution } = require('./leet287-중복 수 찾기 링크드 리스트 응용.ts');
// import solution from './leet287-중복 수 찾기 링크드 리스트 응용.ts'

describe('Find the Duplicate Number', () => {
	[
		{ nums: [1, 1], answer: 1 },
		{ nums: [1, 1, 2], answer: 1 },
		{ nums: [1, 2, 1], answer: 1 },
		{ nums: [1, 2, 1, 1], answer: 1 },
		{ nums: [1, 1, 1], answer: 1 },
		{ nums: [1, 2, 5, 3, 4, 1], answer: 1 },
		{ nums: [1, 2, 1, 3, 4, 1], answer: 1 },

		// 예제 케이스:
		{ nums: [1,3,4,2,2], answer: 2 },
		{ nums: [3,1,3,4,2], answer: 3 },
		
		// 중복 수가 없는 경우:
		// { nums: [0,1,2,3,4], answer: -1 },
		

	].forEach(({ nums, answer }) => {
		const output = solution(nums);
		it(`should return ${answer} and(but) the output is ${output}. 
		Given: nums: [${nums}]`, () => {
			expect(output).toBe(answer);
		});
	});
});