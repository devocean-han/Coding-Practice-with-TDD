import source from './leet994-썩어가는 오렌지';
const { solution } = source;

describe('Rotting Oranges', () => {
	describe('Simple case: grid=[[0]]', () => {
		let grid: number[][];
		it(`should return 0`, () => {
			grid = [[0]];
			expect(solution(grid)).toBe(0);
		});
	});
	describe('Simple case: grid=[[1]]', () => {
		let grid: number[][];
		it(`should return -1`, () => {
			grid = [[1]];
			expect(solution(grid)).toBe(-1);
		});
	});
	describe('Simple case: grid=[[2]]', () => {
		let grid: number[][];
		it(`should return 0`, () => {
			grid = [[2]];
			expect(solution(grid)).toBe(0);
		});
	});

	describe('One line grid: should return 0,', () => {
		let grid: number[][];
		it(`when there is no fruit at all: grid=[[0,0,0]]`, () => {
			grid = [[0,0,0]];
			expect(solution(grid)).toBe(0);
		});
		it(`when there are only rotten oranges: grid=[[0,2,2,0]]`, () => {
			grid = [[0,2,2,0]];
			expect(solution(grid)).toBe(0);
		});
	});
	describe('One line grid: should return -1,', () => {
		let grid: number[][];
		it(`when there are only fresh oranges: grid=[[0,1,1,0]]`, () => {
			grid = [[0,1,1,0]];
			expect(solution(grid)).toBe(-1);
		});
		it(`when there are both oranges but fresh ones are isolated: grid=[[2,2,0,1,1]]`, () => {
			grid = [[2,2,0,1,1]];
			expect(solution(grid)).toBe(-1);
		});
	});
	describe('One line grid: when there are both fresh and rotten oranges,', () => {
		let grid: number[][];
		it(`should return 2 when grid=[[1,2,2,1,1]]`, () => {
			grid = [[1,2,2,1,1]];
			expect(solution(grid)).toBe(2);
		});
	});

	// describe('Example 1: grid=[[2,1,1],[1,1,0],[0,1,1]]', () => {
	// 	let grid: number[][];
	// 	it(`should return 4`, () => {
	// 		grid = [[2,1,1],[1,1,0],[0,1,1]];
	// 		expect(solution(grid)).toBe(4);
	// 	});
	// });

	// describe('Example 1: grid=[[2,1,1],[0,1,1],[1,0,1]]', () => {
	// 	let grid: number[][];
	// 	it(`should return -1`, () => {
	// 		grid = [[2,1,1],[0,1,1],[1,0,1]];
	// 		expect(solution(grid)).toBe(-1);
	// 	});
	// });
});