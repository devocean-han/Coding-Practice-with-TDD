import source from './leet79-단어 찾기'
const { solution } = source;

describe('Word Search', () => {
	describe(`Simple case: word='A', board=[['A']]`, () => {
		let word: string = "A";
		let board: string[][] = [["A"]];
		it(`should return true`, () => {
			expect(solution(board, word)).toBe(true);
		});
	})
	describe(`Simple case: word='A', board=[['a']]`, () => {
		let word: string = "A";
		let board: string[][] = [["a"]];
		it(`should return false`, () => {
			expect(solution(board, word)).toBe(false);
		});
	});
	describe(`Simple case: When "word" is one letter`, () => {
		let word: string = "B";
		let board: string[][] = [["A","B"]];
		it(`word="B", board=[["A","B"]] should return true`, () => {
			expect(solution(board, word)).toBe(true);
		});
		it(`word="Z", board=[["A","B"],["C","B"],["A","Z"]] should return true`, () => {
			word = "Z";
			board = [["A","B"],["C","B"],["A","Z"]];
			expect(solution(board, word)).toBe(true);
		});
	});
	describe(`Simple case: When "word" has two letters`, () => {
		let word: string = "AB";
		let board: string[][] = [["A","B"]];
		it(`word="AB", board=[["A","B"]] should return true`, () => {
			expect(solution(board, word)).toBe(true);
		});
		it(`word="Z", board=[["A","B"],["C","B"],["A","Z"]] should return true`, () => {
			word = "Z";
			board = [["A","B"],["C","B"],["A","Z"]];
			expect(solution(board, word)).toBe(true);
		});
	});

	describe(`Example 1: word="ABCCED", 
	board=[
		["A","B","C","E"],
		["S","F","C","S"],
		["A","D","E","E"]]`, () => {
		const word: string = "ABCCED";
		const board: string[][] = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]];
		it(`should return true`, () => {
			expect(solution(board, word)).toBe(true);
		});
	});
});