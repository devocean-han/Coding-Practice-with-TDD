const { solution } = require('./leet347-K개의 최빈값');

describe('Top K Frequency', () => {
	[
		// number of unique nums is equal to k
		{ nums: [1], k: 1, result: [1] },
		{ nums: [1, 1], k: 1, result: [1] },
		{ nums: [1, 1, 2], k: 2, result: [1, 2] },
		{ nums: [1, 1, 2, 7, 3], k: 4, result: [1, 2, 7, 3] },

		{ nums: [2, 1, 1], k: 1, result: [1] },
		{ nums: [1, 2, 2, 1, 2], k: 1, result: [2] },
		
		{ nums: [1, 2, 2, 2, 3, 3], k: 2, result: [2, 3] },
		{ nums: [1, 1, 1, 2, 2, 3], k: 2, result: [1, 2] },
		{ nums: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3], k: 3, result: [1, 2, 3] },
		
		{ nums: [-10000, -9999, -9999, 0, 10000, 1000, 0], k: 2, result: [-9999, 0] },
	]
		.forEach(({ nums, k, result }) => {
			it(`should return [${result}] when given number array and k are [${nums.slice(0, 30)}] and ${k}.`, () => {
				expect(solution(nums, k)).toEqual(result);
			});
		});
})

// testing large array
describe('Top K Frequency (larger array)', () => {
	const arr = []
	for (let i = 0; i < 10000; i++) {
		arr.push(i);
		arr.push(10000 - i);
	}
	arr.push(10000);
	arr.push(10000);

	for (let i = 10000; i > 9996; i--) {
		arr.push(i);
	}

	[
		{ nums: arr, k: 1, result: [10000] },
		{ nums: arr, k: 2, result: [10000, 9999] },
		{ nums: arr, k: 4, result: [10000, 9999, 9998, 9997] },
	]
	.forEach(({ nums, k, result }) => {
		it(`should return [${result}] when given number array and k are [${nums.slice(0, 7)} ... ${nums.slice(-7)}] and ${k}.`, () => {
			expect(solution(nums, k)).toEqual(result);
		});
	});
});