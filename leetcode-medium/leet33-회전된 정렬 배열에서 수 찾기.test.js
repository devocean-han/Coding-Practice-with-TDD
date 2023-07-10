const { solution } = require('./leet33-회전된 정렬 배열에서 수 찾기');

describe('Search in Rotated Sorted Array', () => {
	[
		{ nums: [0], target: 0, answer: 0 },
		{ nums: [0], target: 1, answer: -1 },
		{ nums: [0, 1], target: 0, answer: 0 },
		{ nums: [0, 1, 2, 3, 4], target: 3, answer: 3 },
		{ nums: [0, 1, 2, 3, 4, -2, -1], target: -2, answer: 5 },
		{ nums: [0, 1, 2, 3, 4, -2, -1], target: -3, answer: -1 },

		{ nums: [-1,0,3,5,9,12], target: 9, answer: 4 },
		{ nums: [-1,0,3,5,9,12], target: 2, answer: -1 },

		{ nums: [3,1], target: 3, answer: 0 },

	].forEach(({ nums, target, answer }) => {
		const output = solution(nums, target);
		it(`should return ${answer}, and(but) the output is: ${output}. Given array: [${nums}]`, () => {
			expect(output).toBe(answer);
		});
	});
});