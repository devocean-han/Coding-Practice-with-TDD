import source from './leet90-서브셋 II';
const { solution } = source;

describe('Subsets II', () => {
	describe('Example 1: nums=[1,2,2]', () => {
		const nums: number[] = [1,2,2];
		it(`should return [[],[1],[1,2],[1,2,2],[2],[2,2]]`, () => {
			expect(solution(nums)).toEqual([[],[1],[1,2],[1,2,2],[2],[2,2]]);
		});
	});
	describe('Example 2: nums=[0]', () => {
		const nums: number[] = [0];
		it(`should return [[],[0]]`, () => {
			expect(solution(nums)).toEqual([[],[0]]);
		});
	});
});