import source from './leet215-배열에서 k번째로 큰 수';
const { solution } = source;

describe('Kth Largest Element in an Array', () => {
	describe('Simple case: nums=[1], k=1', () => {
		let nums: number[] = [1];
		let k: number = 1;
		it(`should return 1`, () => {
			expect(solution(nums, k)).toBe(1);
		});
	});
	
	describe('Simple case: nums=[2,1], k=1', () => {
		let nums: number[] = [2,1];
		let k: number = 1;
		it(`should return 2`, () => {
			expect(solution(nums, k)).toBe(2);
		});
	});

	describe('Simple case: nums=[2,1,2,2], k=3', () => {
		let nums: number[] = [2,1,2,2];
		let k: number = 3;
		it(`should return 2`, () => {
			expect(solution(nums, k)).toBe(2);
		});
	});

	describe('Eample case1: nums=[3,2,1,5,6,4], k=2', () => {
		let nums: number[] = [3,2,1,5,6,4];
		let k: number = 2;
		it(`should return 5`, () => {
			expect(solution(nums, k)).toBe(5);
		});
	});

	describe('Eample case2: nums=[3,2,3,1,2,4,5,5,6], k=4', () => {
		let nums: number[] = [3,2,3,1,2,4,5,5,6];
		let k: number = 4;
		it(`should return 4`, () => {
			expect(solution(nums, k)).toBe(4);
		});
	});

	// Big nums test:
	const bigNums: number[] = [];
	for (let i = 0; i < 99; i++)
		bigNums[i] = 0;
	bigNums[99] = 1;
	const biggerNums: number[] = [];
	for (let i = 0; i < 999; i++)
		biggerNums[i] = 0;
	biggerNums[999] = 1;
	bigNums[99] = 1;
	const biggestNums: number[] = [];
	for (let i = 0; i < 9999; i++)
		biggestNums[i] = 0;
	biggestNums[9999] = 1;
	const biggestNums2: number[] = [];
	for (let i = 0; i < 9999; i++)
		biggestNums2[i] = 9999;
	biggestNums2[9999] = 10000;

	describe('Long nums test: nums=[0*99,1], k=1', () => {
		it(`should return 1`, () => {
			expect(solution(bigNums, 1)).toBe(1);
		});
	});
	describe('Long nums test: nums=[0*999,1], k=1', () => {
		it(`should return 1`, () => {
			expect(solution(biggerNums, 1)).toBe(1);
		});
	});
	describe('Long nums test: nums=[0*9999,1], k=1', () => {
		it(`should return 1`, () => {
			expect(solution(biggestNums, 1)).toBe(1);
		});
	});
	describe('Long nums test: nums=[9999*9999,10000], k=1', () => {
		it(`should return 10000`, () => {
			expect(solution(biggestNums2, 1)).toBe(10000);
		});
	});
});