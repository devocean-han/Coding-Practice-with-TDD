import source from './leet78-가능한 모든 서브셋 구하기';
const { solution } = source;

describe('Subsets', () => {
	describe('Simple case: nums=[0]', () => {
		const nums: Array<number> = [0];
		const result: Array<Array<number>> = [[], [0]];
		it(`should return [[],[0]]`, () => {
			expect(solution(nums)).toEqual(result);
		});
	});
	
	describe('2 Elements: nums=[-10,10]', () => {
		const nums: Array<number> = [-10,10];
		const result: Array<Array<number>> = [[],[-10],[-10,10],[10]];
		it(`should return [[],[-10],[-10,10],[10]]`, () => {
			expect(new Set(solution(nums))).toEqual(new Set(result));
		});
	});
	
	describe('3 elements: nums=[1,2,3]', () => {
		const nums: Array<number> = [1,2,3];
		const result: Array<Array<number>> = [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]];
		it(`should return [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]`, () => {
			expect(new Set(solution(nums))).toEqual(new Set(result));
		});
	});
	
});