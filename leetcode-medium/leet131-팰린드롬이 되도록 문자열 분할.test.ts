import source from './leet131-팰린드롬이 되도록 문자열 분할';
const { solution } = source;

describe('Palindrome Partitioning', () => {
	describe('Example 2: s = "a"', () => {
		const s: string = "a";
		it(`should return [["a"]]`, () => {
			expect(solution(s)).toEqual([["a"]]);
		});
	});
	describe('Example 1: s = "aab"', () => {
		const s: string = "aab";
		it(`should return [["a","a","b"],["aa","b"]]`, () => {
			expect(solution(s)).toEqual([["a","a","b"],["aa","b"]]);
		});
	});
});