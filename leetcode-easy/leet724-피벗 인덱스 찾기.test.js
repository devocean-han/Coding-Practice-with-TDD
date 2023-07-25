const { solution } = require('./leet724-피벗 인덱스 찾기');

describe('Find Pivot Index', () => {
	[
		{ nums: [1, 1, 1], answer: 1 },

	].forEach(({ nums, answer }) => {
		const output = solution(nums);
		it(`should return ${answer} and(but) the output is ${output}. Given: nums:[${nums}]`, () => {
			expect(output).toBe(answer);
		});
	});
});