import source from './leet40-일정 합이 되는 조합 II';
const { solution } = source;

describe('Combination Sum II', () => {
	describe('Example 1: candidates=[10,1,2,7,6,1,5], target=8', () => {
		const candidates: number[] = [10, 1, 2, 7, 6, 1, 5];
		const target: number = 8;
		it(`should return [[1,1,6],
[1,2,5],
[1,7],
[2,6]]`, () => {
			expect(solution(candidates, target)).toEqual([
				[1, 1, 6],
				[1, 2, 5],
				[1, 7],
				[2, 6]
			]);
		});
	});
	describe('Example 2: candidates=[2,5,2,1,2], target=5', () => {
		const candidates: number[] = [2,5,2,1,2];
		const target: number = 5;
		it(`should return [[1,2,2],
[5]]`, () => {
			expect(solution(candidates, target)).toEqual([
				[1,2,2],
[5]
			]);
		});
	});
});