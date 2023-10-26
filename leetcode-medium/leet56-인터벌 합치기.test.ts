import source from './leet56-인터벌 합치기';
const { solution } = source;

describe('Merge Intervals', () => {
	describe('Example 1: intervals=[[1,3],[2,6],[8,10],[15,18]]', () => {
		let intervals: number[][];
		it(`should return [[1,6],[8,10],[15,18]]`, () => {
			intervals = [[1,3],[2,6],[8,10],[15,18]];
			expect(solution(intervals)).toEqual([[1, 6], [8, 10], [15, 18]]);
		});
	});
	
	describe('Example 2: intervals=[[1,4],[4,5]]', () => {
		let intervals: number[][];
		it(`should return [[1,5]]`, () => {
			intervals = [[1,4],[4,5]];
			expect(solution(intervals)).toEqual([[1,5]]);
		});
	});

	describe('Simple Edge Case: intervals=[[0,10000]]', () => {
		let intervals: number[][];
		it(`should return [[0,10000]]`, () => {
			intervals = [[0,10000]];
			expect(solution(intervals)).toEqual([[0,10000]]);
		});
	});

	describe('Simple Case: intervals=[[0,0],[0,0],[1,1],[1,1],[0,10000]]', () => {
		let intervals: number[][];
		it(`should return [[0,10000]]`, () => {
			intervals = [[0,0],[0,0],[1,1],[1,1],[0,10000]];
			expect(solution(intervals)).toEqual([[0,10000]]);
		});
	});
});