const { solution } = require('./leet424-최장 단일 부분문자열의 길이');

describe('Longest Repeating Character Replacement', () => {
	[
		// // s 길이가 1일 때
		// { s: 'A', k: 0, answer: 1 },
		// { s: 'A', k: 1, answer: 1 },
		
		// // s 길이가 2일 때
		// { s: 'AA', k: 1, answer: 2 },
		// { s: 'AB', k: 1, answer: 2 },
		// { s: 'AB', k: 0, answer: 1 },
		
		// // k가 충분히 커서(s길이 - 1 <= k라서) 1개 빼고 전부 다 바꿔버릴 수 있는 경우: s 길이 전체가 최장 길이가 됨. 
		// { s: 'ABC', k: 2, answer: 3 },
		
		// // s에 중복 문자가 없는 가장 '열악한' 조건일 때: k + 1이 최장 길이가 됨.
		// { s: 'ABCDEF', k: 0, answer: 1 },
		// { s: 'ABCDEF', k: 3, answer: 4 },

		// s에 중복 문자가 일반적(이고 복잡한)인 경우 
		{ s: 'ABCCCDEF', k: 2, answer: 5 },
		// { s: 'ABCCDEFC', k: 2, answer: 4 },

	].forEach(({ s, k, answer }) => {
		const output = solution(s, k);
		it(`should return ${answer} and(but) the output is ${output}. Given: s: "${s}", k: ${k}`, () => {
			expect(output).toBe(answer);
		});
	});
});