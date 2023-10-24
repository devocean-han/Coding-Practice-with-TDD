import source from './leet57-인터벌 삽입하기';
const { solution } = source;

describe('Insert Interval', () => {
	describe('Intervals=[] cases: ', () => {
		let intervals: number[][] = [];
		let newInterval: number[];
		it(`should return whatever the newInterval is`, () => {
			newInterval = [0, 0];
			expect(solution(intervals, newInterval)).toEqual([newInterval]);
			newInterval = [0, 1];
			expect(solution(intervals, newInterval)).toEqual([newInterval]);
			newInterval = [0, 100000];
			expect(solution(intervals, newInterval)).toEqual([newInterval]);
		});
	});
	
	describe('Intervals=[[0,0]] cases: ', () => {
		let intervals: number[][];
		let newInterval: number[];
		beforeEach(() => {
			intervals = [[0, 0]];
		});
		// 왜 beforeEach()에 넣지 앟으면 intervals가 이전 테스트에서의 newInterval로 변한 채가 되는 거지?

		it(`should return whatever the newInterval is when newInterval starts at 0(=OVERLAPPING happens)`, () => {
			newInterval = [0, 0];
			// expect(solution(intervals, newInterval)).toEqual([newInterval]);
			expect(solution(intervals, newInterval)).toEqual([[0,0]]);
			newInterval = [0, 1];
			expect(solution(intervals, newInterval)).toEqual([[0,1]]);
			newInterval = [0, 100000];
			expect(solution(intervals, newInterval)).toEqual([[0,100000]]);
		});
		it(`should return [[0,0],newInterval] if newInterval doesn't start at 0`, () => {
			newInterval = [1, 1];
			expect(solution(intervals, newInterval)).toEqual([[0,0],[1,1]]);
			newInterval = [10, 1000];
			expect(solution(intervals, newInterval)).toEqual([[0,0],[10,1000]]);
			newInterval = [9999, 100000];
			expect(solution(intervals, newInterval)).toEqual([[0,0],[9999,100000]]);
		});
	});

	describe('Intervals=[[0,10]] cases: ', () => {
		let intervals: number[][];
		let newInterval: number[];
		beforeEach(() => {
			intervals = [[0,10]];
		});
		
		it(`when newStart is the same & newEnd is within(0,9 or 0,10): should return [0,10]`, () => {
			newInterval = [0,9];
			expect(solution(intervals, newInterval)).toEqual([[0,10]]);
			newInterval = [0,10];
			expect(solution(intervals, newInterval)).toEqual([[0,10]]);
		});
		it(`when newStart is the same & newEnd exceed(0,11): should return [0,11]`, () => {
			newInterval = [0,11];
			expect(solution(intervals, newInterval)).toEqual([[0,11]]);
		});
		// it(`when newStart is the same & newEnd inner(0,9): should return [0,10]`, () => {
		// 	newInterval = [0,9];
		// 	expect(solution(intervals, newInterval)).toEqual([0,10]);
		// });
		// it(`when newStart is the same & newEnd inner(0,9): should return [0,10]`, () => {
		// 	newInterval = [0,9];
		// 	expect(solution(intervals, newInterval)).toEqual([0,10]);
		// });
		// it(`should return [[0,0],newInterval] if newInterval doesn't start at 0`, () => {
		// 	newInterval = [1, 1];
		// 	expect(solution(intervals, newInterval)).toEqual([[0,0],newInterval]);
		// 	newInterval = [10, 1000];
		// 	expect(solution(intervals, newInterval)).toEqual([[0,0],newInterval]);
		// 	newInterval = [9999, 100000];
		// 	expect(solution(intervals, newInterval)).toEqual([[0,0],newInterval]);
		// });
	});

	describe('Example case 1: Intervals=[[1,3],[6,9]], newInterval=[2,5]', () => {
		let intervals: number[][] = [[1,3],[6,9]];
		let newInterval: number[] = [2,5];

		it(`should return [[1,5],[6,9]]`, () => {
			expect(solution(intervals, newInterval)).toEqual([[1,5],[6,9]]);
		});
	});

	describe('Example case 2: Intervals=[[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval=[4,8]', () => {
		let intervals: number[][] = [[1,2],[3,5],[6,7],[8,10],[12,16]];
		let newInterval: number[] = [4,8];

		it(`should return [[1,2],[3,10],[12,16]]`, () => {
			expect(solution(intervals, newInterval)).toEqual([[1,2],[3,10],[12,16]]);
		});
	});

	describe('Error case 1: Intervals=[[1,5]], newInterval=[0,3]', () => {
		let intervals: number[][] = [[1,5]];
		let newInterval: number[] = [0,3];

		it(`should return [[0,5]]`, () => {
			expect(solution(intervals, newInterval)).toEqual([[0,5]]);
		});
	});

	describe('Error case 2: Intervals=[[1,5]], newInterval=[0,0]', () => {
		let intervals: number[][] = [[1,5]];
		let newInterval: number[] = [0,0];

		it(`should return [[0,0],[1,5]]`, () => {
			expect(solution(intervals, newInterval)).toEqual([[0,0],[1,5]]);
		});
	});

});