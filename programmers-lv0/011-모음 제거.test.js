const { solution } = require('./011-모음 제거')

describe('Vowel Removal', () => {
	[
		{ my_string: 'b', result: 'b' },
		{ my_string: 'a', result: '' },
		{ my_string: 'aa', result: '' },
		{ my_string: 'baa', result: 'b' },
		{ my_string: 'bus', result: 'bs' },

		{ my_string: 'nice to meet you', result: 'nc t mt y' },
		{ my_string: 'it begins and ends with vowels haha', result: 't bgns nd nds wth vwls hh' },
		{ my_string: 'teeth tears whooooo aaaree yoouuouou', result: 'tth trs wh r y' },
	]
		.forEach(({ my_string, result }) => {
			it(`should return "${result}" if given string is "${my_string}"`, () => {
				expect(solution(my_string)).toEqual(result);
			});
		});
})