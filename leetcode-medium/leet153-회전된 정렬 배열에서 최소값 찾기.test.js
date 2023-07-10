const { solution } = require('./leet153-회전된 정렬 배열에서 최소값 찾기');

describe('Find Minimum in Rotated Sorted Array', () => {
	[
		{ nums: [0], answer: 0 },

		{ nums: [1, 0], answer: 0 },
		{ nums: [0, 3], answer: 0 },
		{ nums: [0, 3, -2, -1], answer: -2 },
		{ nums: [0, 3, 4, -1], answer: -1 },

		{ nums: [3, 4, 5, 1, 2], answer: 1 },
		{ nums: [4, 5, 6, 7, 0, 1, 2], answer: 0 },
		{ nums: [11, 13, 15, 17], answer: 11 },

	]
	.forEach(({ nums, answer }) => {
		const output = solution(nums);
		it(`should return ${answer}, and(but) the output is: ${output}. Given array: [${nums}]`, () => {
			expect(output).toBe(answer);
		});
	});
});