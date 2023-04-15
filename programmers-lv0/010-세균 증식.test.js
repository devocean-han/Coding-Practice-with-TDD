const { solution } = require('./010-세균 증식')

describe('Bacterial Growth', () => {
	[
		{ n: 1, t: 1, result: 2 },
		{ n: 1, t: 2, result: 4 },
		{ n: 1, t: 3, result: 8 },

		{ n: 2, t: 1, result: 4 },
		{ n: 2, t: 2, result: 8 },
		{ n: 2, t: 3, result: 16 },

		{ n: 2, t: 10, result: 2048 },
		{ n: 7, t: 15, result: 229376 },

		{ n: 3, t: 1, result: 6 },
		{ n: 3, t: 2, result: 12 },
		{ n: 3, t: 3, result: 24 },
	]
	.forEach(({ n, t, result }) => {
		it(`should return ${result} when given [n, t] is [${n}, ${t}]`, () => {
			expect(solution(n, t)).toBe(result);
		});	
	})
})