import source from './leet212-단어 찾기 II';
const { solution } = source;

describe('Word Search II', () => {
	describe('', () => {
		let board: string[][];
		let words: string[];
		
		beforeEach(() => {
			board = [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]];
		});

		// it(`Example 1 test: should return ["eat", "oath"]`, () => {
		// 	words = ["oath", "pea", "eat", "rain"];
		// 	expect(new Set(solution(board, words))).toEqual(new Set(["eat", "oath"]));
		// });

		// it(`예를 들어 "상" 칸 자체가 존재하지 않을 때와 그 때 "다음 문자"가 없음일 때는 둘 다 undefined로 나올 텐데, 그러면 undefined === undefined로 취급되어 "상"루트로 진입하게 되려나?`, () => {

		// });

		// it(`한 단어에서 같은 칸을 중용할 수 없다: `, () => {
		// 	words = ["oateo"];
		// 	expect(solution(board, words)).toEqual([]);
		// });

		// it(`Board의 첫 칸이 단어의 첫 문자가 아닌 경우, 시작 지점 찾아가기: `, () => {
		// 	words = ["hi"];
		// 	expect(solution(board, words)).toEqual(["hi"]);
		// });

		it(`Error case #3: `, () => {
			board = [["a", "b", "c"], ["a", "e", "d"], ["a", "f", "g"]];
			words = ["eaafgdcba", "eaabcdgfa"];
			expect(new Set(solution(board, words))).toEqual(new Set(["eaabcdgfa", "eaafgdcba"]));
		})
	});
});