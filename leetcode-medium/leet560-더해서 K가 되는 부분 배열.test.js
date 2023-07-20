const { solution } = require('./leet560-더해서 K가 되는 부분 배열');

describe('Subarray Sum Equals K', () => {
	[
		{ nums: [0], k: 0, answer: 1 },
		{ nums: [-1000], k: 0, answer: 0 },
		{ nums: [1000], k: 10000000, answer: 0 },

		{ nums: [0, 1], k: 0, answer: 1 },
		{ nums: [0, 1], k: 1, answer: 2 },
		{ nums: [0, 1, -1, 1, 0], k: 1, answer: 8 },
		
		{ nums: [1,1,1], k: 2, answer: 2 },
		{ nums: [1,2,3], k: 3, answer: 2 },

	].forEach(({ nums, k, answer }) => {
		const output = solution(nums, k);
		it(`should return ${answer} and(but) the output is ${output}. Given: nums: [${nums}], K: ${k}`, () => {
			expect(output).toBe(answer);
		});
	});
});