const { solution } = require('./009-개미 군단')

describe('Ant Legion', () => {
	[
		{ hp: 0, result: 0 },
		{ hp: 1, result: 1 },
		{ hp: 2, result: 2 },

		{ hp: 3, result: 1 },
		{ hp: 4, result: 2 },

		{ hp: 5, result: 1 },
		{ hp: 6, result: 2 },
		{ hp: 7, result: 3 },

		{ hp: 8, result: 2 },

		{ hp: 23, result: 5 },
		{ hp: 24, result: 6 },
		{ hp: 999, result: 201 },
		{ hp: 1000, result: 200 },

	]
	.forEach(({ hp, result }) => {
		it(`should return ${result} when given HP is ${hp}`, () => {
			expect(solution(hp)).toBe(result);
		});
	});
})