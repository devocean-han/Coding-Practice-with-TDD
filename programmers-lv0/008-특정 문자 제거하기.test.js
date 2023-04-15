const { solution } = require('./008-특정 문자 제거하기');

describe('Remove the Letter', () => {
	[
		{ my_string: 'a', letter: 'b', result: 'a' },
		{ my_string: 'a', letter: 'a', result: '' },
		{ my_string: 'hahaha', letter: 'a', result: 'hhh' },
		{ my_string: 'haHAHA', letter: 'a', result: 'hHAHA' },
	]
	.forEach(({ my_string, letter, result }) => {
		it(`should return "${result}", given my_string="${my_string}" and letter="${letter}".`, () => {
			expect(solution(my_string, letter)).toEqual(result);
		})
	})
})