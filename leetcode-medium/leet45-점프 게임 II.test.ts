import source from './leet45-점프 게임 II.ts';
const { solution } = source;

describe('Jump Game II', () => {
	describe('Example 1: nums=[2,3,1,1,4]', () => {
		let nums: number[] = [2, 3, 1, 1, 4];
		it(`should return 2`, () => {
			expect(solution(nums)).toBe(2);
		});
	});
	
	describe('Example 2: nums=[2,3,0,1,4]', () => {
		let nums: number[] = [2, 3, 0, 1, 4];
		it(`should return 2`, () => {
			expect(solution(nums)).toBe(2);
		});
	});
	
	describe('Test case 73/109 (Runtime Error: JavaScript heap out of memory): nums=[5,6,4,4,6,9,4,4,7,4,4,8,2,6,8,1,5,9,6,5,2,7,9,7,9,6,9,4,1,6,8,8,4,4,2,0,3,8,5]', () => {
		let nums: number[] = [5,6,4,4,6,9,4,4,7,4,4,8,2,6,8,1,5,9,6,5,2,7,9,7,9,6,9,4,1,6,8,8,4,4,2,0,3,8,5];
		it(`should return 5`, () => {
			expect(solution(nums)).toBe(5);
		});
	});

});