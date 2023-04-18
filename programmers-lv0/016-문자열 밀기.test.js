const { solution } = require('./016-문자열 밀기')

describe('String push', () => {
	[
		{ A: 'a', B: 'a', result: 0 },

		{ A: 'ab', B: 'ab', result: 0 },
		{ A: 'ab', B: 'ba', result: 1 },

		{ A: 'abc', B: 'abc', result: 0 },
		{ A: 'abc', B: 'cab', result: 1 },
		{ A: 'abc', B: 'bca', result: 2 },
		{ A: 'abc', B: 'cba', result: -1 },

		{ A: 'hello', B: 'ohell', result: 1 },
		{ A: 'apple', B: 'elppa', result: -1 },
		{ A: 'atat', B: 'tata', result: 1 },
		
		{ A: 'Alex, listen. Theres only one way for us to win this.', B: 'ten. Theres only one way for us to win this.Alex, lis', result: 44 },

	].forEach(({ A, B, result }) => {
		it(`should return ${result} when string A and target B are [${A}, ${B}]`, () => {
			expect(solution(A, B)).toBe(result);
		})
		
	})
})