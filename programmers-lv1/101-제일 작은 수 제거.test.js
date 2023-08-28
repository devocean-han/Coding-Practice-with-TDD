const { solution } = require('./101-제일 작은 수 제거');

describe('Remove Minimum', () => {
	[
		{ arr: [1], result: [-1] },
		{ arr: [1, 2], result: [2] },
		{ arr: [-1], result: [-1] },
		{ arr: [-2, -1], result: [-1] },

		{ arr: [4, 3, 2, 1], result: [4, 3, 2] },
		{ arr: [10], result: [-1] },
		{ arr: [10, 2, -1, -10, 13], result: [10, 2, -1, 13] },
	]
		.forEach(({ arr, result }) => {
			it(`should return [${result.join(', ')}] when given array is [${arr.join(', ')}]`, () => {
				expect(solution(arr)).toEqual(result);
			});
		});
})