const { solution } = require('./leet81-회전된 정렬 배열에서 수 찾기II');

describe('Search in Rotated Sorted Array II', () => {
	[
		{ nums: [0], target: 0, answer: true },
		{ nums: [0], target: 1, answer: false },
		{ nums: [-1, 0, -2], target: 1, answer: false },
		{ nums: [-1, 0, -2], target: 0, answer: true },
		{ nums: [-1, 0, -2], target: -2, answer: true },

		{ nums: [2,5,6,0,0,1,2], target: 0, answer: true },
		{ nums: [2,5,6,0,0,1,2], target: 3, answer: false },

		// error cases
		{ nums: [1,0,1,1,1], target: 0, answer: true },
		{ nums: [1,1,1,1,1,1,1,1,1,13,1,1,1,1,1,1,1,1,1,1,1,1], target: 13, answer: true },

	].forEach(({ nums, target, answer }) => {
		const output = solution(nums, target);
		it(`should return ${answer} and(but) the output is ${output}. Given array: [${nums}]`, () => {
			expect(output).toBe(answer);
		});
	});
});