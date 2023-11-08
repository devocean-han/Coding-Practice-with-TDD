import source from './leet134-주유소 순회하기';
const { solution } = source;

describe('Gas Station', () => {
	describe('Example 1: gas=[1,2,3,4,5], cost=[3,4,5,1,2]', () => {
		let gas: number[] = [1, 2, 3, 4, 5];
		let cost: number[] = [3, 4, 5, 1, 2];
		it(`should return 3`, () => {
			expect(solution(gas, cost)).toBe(3);
		});
	});
	describe('Example 1: gas=[2,3,4], cost=[3,4,3]', () => {
		let gas: number[] = [2,3,4];
		let cost: number[] = [3,4,3];
		it(`should return -1`, () => {
			expect(solution(gas, cost)).toBe(-1);
		});
	});
	describe('gas=[2,100,0,0,10], cost=[1,0,5,100,5]', () => {
		let gas: number[] = [2,100,0,0,10];
		let cost: number[] = [1,0,5,100,5];
		it(`should return 4`, () => {
			expect(solution(gas, cost)).toBe(4);
		});
	});
	describe('Test Case 34/40: gas=[3,1,1], cost=[1,2,2]', () => {
		let gas: number[] = [3,1,1];
		let cost: number[] = [1,2,2];
		it(`should return 0`, () => {
			expect(solution(gas, cost)).toBe(0);
		});
	});
});