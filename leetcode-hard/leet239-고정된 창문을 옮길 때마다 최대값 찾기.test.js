const { solution } = require('./leet239-고정된 창문을 옮길 때마다 최대값 찾기');

describe('Sliding Window Maximum', () => {
	[
		{ nums: [1], k: 1, answer: [1] },
		{ nums: [-10000], k: 1, answer: [-10000] },

		// k=1일 때: nums 그대로가 반환되어야 함.
		{ nums: [-10000, 10000], k: 1, answer: [-10000, 10000] },

		// k=2일 때
		{ nums: [-10000, 10000], k: 2, answer: [10000] },
		{ nums: [-10000, 10000, 0], k: 2, answer: [10000, 10000] },

	].forEach(({ nums, k, answer }) => {
		const output = solution(nums, k);
		it(`should return [${answer}] and(but) the output is [${output}]. Given: nums: [${nums}], k: ${k}`, () => {
			expect(output).toEqual(answer);
		});
	});
});