import source from './leet17-휴대폰 자판으로 만들 수 있는 문자 조합';
const { solution } = source;

describe('Letter Combinations of a Phone Number', () => {
	describe('Example 1: digits="23"', () => {
		let digits: string = "23";
		it(`should return ["ad","ae","af","bd","be","bf","cd","ce","cf"]`, () => {
			expect(solution(digits)).toEqual(["ad","ae","af","bd","be","bf","cd","ce","cf"]);
		});
	});
	describe('Example 2: digits=""', () => {
		let digits: string = "";
		it(`should return []`, () => {
			expect(solution(digits)).toEqual([]);
		});
	});
	describe('Example 2: digits="2"', () => {
		let digits: string = "2";
		it(`should return ["a","b","c"]`, () => {
			expect(solution(digits)).toEqual(["a","b","c"]);
		});
	});
});