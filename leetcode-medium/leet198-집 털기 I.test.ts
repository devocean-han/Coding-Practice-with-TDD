import source from './leet198-집 털기 I';
const { solution } = source;

describe('House Robber', () => {
	describe('Simple case: One House: nums=[0]', () => {
		it(`Max total amount I can rob is 0`, () => {
			expect(solution([0])).toBe(0);
		});
	});
	describe('Simple case: Two Houses: nums=[0, 1]', () => {
		it(`Max total amount I can rob is 1`, () => {
			expect(solution([0,1])).toBe(1);
		});
	});
	describe('Simple case: Three Houses:', () => {
		it(`nums=[0, 0, 1]: Max total amount I can rob is 1`, () => {
			expect(solution([0,0,1])).toBe(1);
		});
		it(`nums=[0, 1, 1]: Max total amount I can rob is 1`, () => {
			expect(solution([0,1,1])).toBe(1);
		});
		it(`nums=[1, 1, 1]: Max total amount I can rob is 2`, () => {
			expect(solution([1,1,1])).toBe(2);
		});
		it(`nums=[1, 10, 1]: Max total amount I can rob is 10`, () => {
			expect(solution([1,10,1])).toBe(10);
		});
		it(`nums=[9, 10, 1]: Max total amount I can rob is 10`, () => {
			expect(solution([9,10,1])).toBe(10);
		});
	});
	describe('Four Houses:', () => {
		it(`nums=[0, 0, 0, 1]: Max total amount I can rob is 1`, () => {
			expect(solution([0, 0, 0, 1])).toBe(1);
		});
		it(`nums=[0, 1, 1, 1]: Max total amount I can rob is 2`, () => {
			expect(solution([0, 1, 1, 1])).toBe(2);
		});
		it(`nums=[2, 1, 1, 10]: Max total amount I can rob is 12`, () => {
			expect(solution([2, 1, 1, 10])).toBe(12);
		});
	});
	describe('Five Houses:', () => {
		it(`nums=[1, 1, 0, 1, 1]: Max total amount I can rob is 2`, () => {
			expect(solution([1,1,0,1,1])).toBe(2);
		});
		it(`nums=[1, 1, 1, 1, 1]: Max total amount I can rob is 3`, () => {
			expect(solution([1,1,1,1,1])).toBe(3);
		});
		it(`nums=[4, 1, 1, 4, 1]: Max total amount I can rob is 8`, () => {
			expect(solution([4,1,1,4,1])).toBe(8);
		});
		it(`nums=[6, 8, 1, 2, 3]: Max total amount I can rob is 11`, () => {
			expect(solution([6,8,1,2,3])).toBe(11);
		});
	});
});