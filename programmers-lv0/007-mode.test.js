const { solution } = require('./007-mode');

describe('Getting Mode', () => {
	[
		// with 1 element
		{ array: [1], result: 1 },
		{ array: [1000], result: 1000 },
		{ array: [0], result: 0 },
		// same result for different orders
		{ array: [1, 1, 2], result: 1 },
		{ array: [2, 1, 1], result: 1 },
		// not 1 element but the kind is one(...)
		{ array: [1, 1, 1], result: 1 },
		// tie
		{ array: [2, 2, 1, 1], result: -1 },
		// random examples
		{ array: [2, 2, 3, 1, 1, 1], result: 1 },
		{ array: [1, 2, 3, 3, 3, 4], result: 3 },
	]
		.forEach(({ array, result }) => {
			it(`should return ${result} for the given array, [${array.join(', ')}]`, () => {
				expect(solution(array)).toBe(result);
			});
		})
})