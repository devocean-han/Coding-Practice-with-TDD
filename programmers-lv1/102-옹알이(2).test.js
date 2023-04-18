const { solution } = require('./014-옹알이(2)');

describe('Babbling 2', () => {
	[
		{ babbling: ['no'], result: 0 },
		{ babbling: ['ye'], result: 1 },

		{ babbling: ['yeye'], result: 0 },
		
		{ babbling: ['yeaya'], result: 1 },
		{ babbling: ['yemaye'], result: 1 },

		{ babbling: ["aya", "yee", "u", "maa"], result: 1 },
		{ babbling: ["ayaye", "uuuma", "yeye", "yemawoo", "ayaayaa"], result: 2 },
	]
		.forEach(({ babbling, result }) => {
			it(`should return ${result} when given array is [${babbling.join(', ')}]`, () => {
				expect(solution(babbling)).toBe(result);
			});
		});
})