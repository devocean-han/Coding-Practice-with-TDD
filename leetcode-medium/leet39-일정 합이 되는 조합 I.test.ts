import source from './leet39-일정 합이 되는 조합 I';
const { solution } = source;

describe('Combination Sum I', () => {
	describe('Example 1: candidates=[2,3,6,7], target=7', () => {
		const candidates: number[] = [2, 3, 6, 7];
		const target: number = 7;
		it(`should return [[2,2,3],[7]]`, () => {
			expect(solution(candidates, target)).toEqual([[2, 2, 3], [7]]);
		});
	});
	describe('Example 2: candidates=[2,3,5], target=8', () => {
		const candidates: number[] = [2,3,5];
		const target: number = 8;
		it(`should return [[2,2,2,2],[2,3,3],[3,5]]`, () => {
			expect(solution(candidates, target)).toEqual([[2,2,2,2],[2,3,3],[3,5]]);
		});
	});
	describe('Example 3: candidates=[2], target=1', () => {
		const candidates: number[] = [2];
		const target: number = 1;
		it(`should return []`, () => {
			expect(solution(candidates, target)).toEqual([]);
		});
	});

	
});
