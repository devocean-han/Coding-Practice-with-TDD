import source from './leet46-순열';
const { solution } = source;

describe('Permutations', () => {
	describe('Example 1: nums=[1,2,3]', () => {
		const nums: number[] = [1, 2, 3];
		it(`should return [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`, () => {
			expect(solution(nums)).toEqual([[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]);
		});
	});
	describe('Example 2: nums=[0,1]', () => {
		const nums: number[] = [0,1];
		it(`should return [[0,1],[1,0]]`, () => {
			expect(solution(nums)).toEqual([[0,1],[1,0]]);
		});
	});
});