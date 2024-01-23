import source from './leet51-N queens';
const { solution } = source;

describe('N Queens', () => {
	describe('Simple case: n = 1', () => {
		const n: number = 1;
		it(`should return [["Q"]]`, () => {
			expect(solution(n)).toEqual([["Q"]]);
		});
	});
	describe('Simple case: n = 2', () => {
		const n: number = 2;
		it(`should return []`, () => {
			expect(solution(n)).toEqual([]);
		});
	});
	describe('Simple case: n = 3', () => {
		const n: number = 3;
		it(`should return []`, () => {
			expect(solution(n)).toEqual([]);
		});
	});
	describe('Simple case: n = 4', () => {
		const n: number = 4;
		it(`should return [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]`, () => {
			expect(solution(n)).toEqual([[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]);
		});
	});
});