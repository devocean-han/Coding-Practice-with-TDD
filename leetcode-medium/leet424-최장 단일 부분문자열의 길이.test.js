const { solution } = require('./leet424-최장 단일 부분문자열의 길이');

describe('Longest Repeating Character Replacement', () => {
	const longS = "A".repeat(9999) + "B";
	const veryLongS = "A".repeat(99999) + "B";
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

		// // s에 중복 문자가 일반적(이고 복잡한)인 경우 
		// { s: 'ABCCDEFC', k: 2, answer: 4 },
		
		// // '최선'의 조합이 왼쪽 가장자리를 포함함: 갭[2,0,0,3], k=2
		// { s: 'ABCCCDEF', k: 2, answer: 5 },
		// // '최선'의 조합이 오른쪽 가장자리를 포함함: 갭[2,0,0,3,0], k=3
		// { s: 'ABCCCDEFC', k: 3, answer: 7 },
		// // '최선'의 조합이 왼쪽이나 오른쪽 가장자리를 포함하는 어느것이든 될 수 있음: 갭[2,0,0,3], k=3
		// { s: 'ABCCCDEF', k: 3, answer: 6 },
		// // '최선'의 조합이 양쪽 가장자리를 모두 포함함: 갭[2,0,0,3], k=5
		// { s: 'ABCCCDEF', k: 5, answer: 8 },
		// // '최선'의 조합이 중간에 위치함(어느쪽 가장자리도 포함하지 않음): 갭[2,0,1,0,0,1,0,2], k=2
		// { s: 'ABCCDCCCECCFG', k: 2, answer: 9 },
		
		// // char가 아닌 총 개수보다 k가 더 큼: 갭[2,0,1,0,0,1,0,2], k=8
		// { s: 'ABCCDCCCECCFG', k: 8, answer: 13 },
		
		// // 예제 케이스:
		// { s: 'ABAB', k: 2, answer: 4 },
		// { s: 'AABABBA', k: 1, answer: 4 },
		
		// 엣지 케이스: 둘 다 통과함(출력을 방지하기 위해 주석처리함)
		// { s: longS, k: 2, answer: 10000 },
		// { s: veryLongS, k: 1, answer: 100000 },

		// 에러 케이스:
		{ s: 'BRJRRKNRBFOOKDEEGODTGMHNABMTHFNPTFRHRSEKKTFEQIKSIAJJMSDSLNSCNRNJFNFSIQDNMHDRIJIACLCJKATTFHDASGLRQSFN', k: 10, answer: 15 },

	].forEach(({ s, k, answer }) => {
		const output = solution(s, k);
		it(`should return ${answer} and(but) the output is ${output}. Given: s: "${s}", k: ${k}`, () => {
			expect(output).toBe(answer);
		});
	});
});