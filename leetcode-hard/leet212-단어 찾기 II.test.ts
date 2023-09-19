import source from './leet212-단어 찾기 II';
const { solution } = source;

describe('Word Search II', () => {
	describe('', () => {
		let board: string[][];
		let words: string[];
		
		it(`Example 1 test: should return ["eat", "oath"]`, () => {
			board = [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]];
			words = ["oath", "pea", "eat", "rain"];
			expect(solution(board, words)).toEqual(["eat", "oath"]);
		});
	});
});