import source from './leet695-최대 섬의 넓이';
const { solution } = source;

describe('Max Area of Island', () => {
	describe('Simple case: grid=[[1]]', () => {
		let grid: number[][];
		it(`should return 1`, () => {
			grid = [[1]];
			expect(solution(grid)).toBe(1);
		});
	});
	describe('Simple case: grid=[[0]]', () => {
		let grid: number[][];
		it(`should return 0`, () => {
			grid = [[0]];
			expect(solution(grid)).toBe(0);
		});
	});
	describe('Simple case: 1 line grid', () => {
		let grid: number[][];
		it(`grid=[[0,1,0,1]]: should return 1`, () => {
			grid = [[0,1,0,1]];
			expect(solution(grid)).toBe(1);
		});
		it(`grid=[[0,0,0,0]]: should return 0`, () => {
			grid = [[0,0,0,0]];
			expect(solution(grid)).toBe(0);
		});
		it(`grid=[[0,1,1,1]]: should return 3`, () => {
			grid = [[0,1,1,1]];
			expect(solution(grid)).toBe(3);
		});
		it(`grid=[[1,1,0,1]]: should return 2`, () => {
			grid = [[1,1,0,1]];
			expect(solution(grid)).toBe(2);
		});
	});
	describe('Simple case: 2 lines grid', () => {
		let grid: number[][];
		it(`grid=
		[[0,1,0,1],
		[1,0,1,0]]
		: should return 1`, () => {
			grid = [[0,1,0,1],[1,0,1,0]];
			expect(solution(grid)).toBe(1);
		});
		it(`grid=
		[[0,1,0,1],
		[1,1,1,0]]
		: should return 4`, () => {
			grid = [[0,1,0,1],[1,1,1,0]];
			expect(solution(grid)).toBe(4);
		});
		it(`grid=
		[[0,1,0,1],
		[0,1,0,1]]
		: should return 2`, () => {
			grid = [[0,1,0,1],[0,1,0,1]];
			expect(solution(grid)).toBe(2);
		});
	});
	describe('Example case 1: ', () => {
		let grid: number[][];
		it(`grid=
		[[0,0,1,0,0,0,0,1,0,0,0,0,0],
		[0,0,0,0,0,0,0,1,1,1,0,0,0],
		[0,1,1,0,1,0,0,0,0,0,0,0,0],
		[0,1,0,0,1,1,0,0,1,0,1,0,0],
		[0,1,0,0,1,1,0,0,1,1,1,0,0],
		[0,0,0,0,0,0,0,0,0,0,1,0,0],
		[0,0,0,0,0,0,0,1,1,1,0,0,0],
		[0,0,0,0,0,0,0,1,1,0,0,0,0]]
		: should return 1`, () => {
			grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]];
			expect(solution(grid)).toBe(6);
		});
	});
});