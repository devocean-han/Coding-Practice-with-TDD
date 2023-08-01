const { solution } = require('./leet567-문자열 안에 순열');

describe('Permutation in String', () => {
	[
		// { s1: 'a', s2: 'b', answer: false },

		// // 2보다 긴 1: 무조건 false
		// { s1: 'aaa', s2: 'a', answer: false },

		// { s1: 'a', s2: 'a', answer: true },
		// { s1: 'a', s2: 'abc', answer: true },
		// { s1: 'ba', s2: 'abcd', answer: true },
		// { s1: 'ba', s2: 'adbc', answer: false },

		// // permutation이 끝 가장자리에 붙어있어도 true를 반환하는지?
		{ s1: 'bbaba', s2: 'adbccbaabb', answer: true },
		// { s1: 'bbaba', s2: 'ababbdbccbaabb', answer: true },

		// // 예시: 
		// { s1: 'ab', s2: 'eidbaooo', answer: true },
		// { s1: 'ab', s2: 'eidboaoo', answer: false },
		// { s1: 'abc', s2: 'aaacb', answer: true },

	].forEach(({ s1, s2, answer }) => {
		const output = solution(s1, s2);
		it(`should return ${answer} and(but) the output is ${output}. Given: s1: "${s1}", s2: "${s2}"`, () => {
			expect(output).toEqual(answer);
		});
	});
});