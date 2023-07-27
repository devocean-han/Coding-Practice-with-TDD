const { solution } = require('./leet3-중복되지 않는 최장 부분 문자열');

describe('Longest Substring Without repeating Characters', () => {
	[
		{ s: '', answer: 0 },
		{ s: 's', answer: 1 },
		{ s: 'ss', answer: 1 },
		{ s: 'ss38', answer: 3 },
		{ s: 'ss38sbb', answer: 4 },

		{ s: 'abcabcbb', answer: 3 },
		{ s: 'bbbbb', answer: 1 },
		{ s: 'pwwkew', answer: 3 },

		// 테스트 케이스 에러: 
		{ s: 'abba', answer: 2 },

	].forEach(({ s, answer }) => {
		const output = solution(s);
		it(`should return ${answer} and(but) the output is ${output}. Given: s: "${s}"`, () => {
			expect(output).toBe(answer);
		});
	});
});