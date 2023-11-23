import source from './leet200-섬 개수';
const { solution } = source;

describe('Number of Islands', () => {
	describe('Simple case: grid=[[1]]', () => {
		let grid: string[][] = [['1']];
		it(`should return 1`, () => {
			expect(solution(grid)).toBe(1);
		});
	});
	describe('Simple case: grid=[[0]]', () => {
		let grid: string[][] = [['0']];
		it(`should return 0`, () => {
			expect(solution(grid)).toBe(0);
		});
	});
	describe('Simple case: 1 line grid', () => {
		let grid: string[][]
		it(`grid=[[0,1,0,1]]: should return 2`, () => {
			grid = [['0','1','0','1']];
			expect(solution(grid)).toBe(2);
		});
		it(`grid=[[0,1,1,1]]: should return 1`, () => {
			grid = [['0','1','1','1']];
			expect(solution(grid)).toBe(1);
		});
		it(`grid=[[0,1,1,0]]: should return 1`, () => {
			grid = [['0','1','1','0']];
			expect(solution(grid)).toBe(1);
		});
		it(`grid=[[1,0,0,1]]: should return 2`, () => {
			grid = [['1','0','0','1']];
			expect(solution(grid)).toBe(2);
		});
		it(`grid=[[1,1,1,1]]: should return 1`, () => {
			grid = [['1','1','1','1']];
			expect(solution(grid)).toBe(1);
		});
		it(`grid=[[0,0,0,0]]: should return 0`, () => {
			grid = [['0','0','0','0']];
			expect(solution(grid)).toBe(0);
		});
	});

	describe('Simple case: 2 lines grid', () => {
		let grid: string[][];
		it(`grid=
		[[0,0,0,0],
		[0,0,0,0]]
		: should return 0`, () => {
			grid = [['0','0','0','0'],['0','0','0','0']];
			expect(solution(grid)).toBe(0);
		});
		it(`grid=
		[[1,0,0,0],
		[1,0,0,0]]
		: should return 1`, () => {
			grid = [['1','0','0','0'],['1','0','0','0']];
			expect(solution(grid)).toBe(1);
		});
	});

	describe('Example 1: ', () => {
		let grid: string[][];
		it(`grid = [
			["1","1","1","1","0"],
			["1","1","0","1","0"],
			["1","1","0","0","0"],
			["0","0","0","0","0"]
		  ]
		: should return 1`, () => {
			grid = [["1","1","1","1","0"],
			["1","1","0","1","0"],
			["1","1","0","0","0"],
			["0","0","0","0","0"]];
			expect(solution(grid)).toBe(1);
		});
	});
	describe('Example 2: ', () => {
		let grid: string[][];
		it(`grid = [
			["1","1","0","0","0"],
			["1","1","0","0","0"],
			["0","0","1","0","0"],
			["0","0","0","1","1"]
		  ]
		: should return 3`, () => {
			grid = [ ["1","1","0","0","0"],
			["1","1","0","0","0"],
			["0","0","1","0","0"],
			["0","0","0","1","1"]];
			expect(solution(grid)).toBe(3);
		});
	});
});