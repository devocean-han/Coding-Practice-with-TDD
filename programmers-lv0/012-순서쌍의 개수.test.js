const { solution } = require('./012-순서쌍의 개수');

describe('Pair Count', () => {
	[
		{ n: 1, result: 1 },
		{ n: 2, result: 2 },
		{ n: 3, result: 2 },

		{ n: 4, result: 3 },

		{ n: 5, result: 2 },
		{ n: 6, result: 4 },
		{ n: 7, result: 2 },
		{ n: 8, result: 4 },
		{ n: 9, result: 3 },

		{ n: 20, result: 6 },
		{ n: 100, result: 9 },
	]
		.forEach(({ n, result }) => {
			it(`should return ${result} when given number is ${n}`, () => {
				expect(solution(n)).toBe(result);
			});
		});
})