const { solution } = require('./leet76-최소 충분 부분문자열');

describe('Minimum Window Substring', () => {
	[
		// { s: "a", t: "a", answer: "a" },

		// // 중복되는 t값 중 누락된 경우: ""반환
		// { s: "a", t: "aa", answer: "" },
		// { s: "aaa", t: "aa", answer: "aa" },

		{ s: "ADOBECODEBANC", t: "ABC", answer: "BANC" },
		// // C가 여러 곳에 분포되었고 평범하게 더 짧은 범위를 골라야 하는 경우
		// { s: "ACOBCOCDEBANCC", t: "ABCCC", answer: "ACOBCOC" },
		// // t의 순서만 다른 경우도 같은 결과를 내야 함
		// { s: "ACOBCOCDEBANCC", t: "CCCBA", answer: "ACOBCOC" },
		// // t에는 C가 6개이지만 s에는 5개 뿐임: ""반환
		// { s: "ACOBCOCDEBANCC", t: "ABCCCCCC", answer: "" },
		// // 위와 똑같은데 t의 C가 5개로 줄어 s의 첫 C부터 끝 C까지 반환하는 경우  
		// { s: "ACOBCOCDEBANCC", t: "ABCCCCC", answer: "COBCOCDEBANCC" },

	].forEach(({ s, t, answer }) => {
		const output = solution(s, t);
		it(`should return "${answer}" and(but) the output is "${output}". Given: s: "${s}", t: "${t}"`, () => {
			expect(output).toEqual(answer);
		});
	});
});