import source from './leet684-중복 간선을 끊어 트리로 만들기';
const { solution } = source;

describe('Redundant Connection', () => {
	describe('Simple case: n=3', () => {
		let edges: number[][];
		it(`should return the last edge`, () => {
			edges = [[1, 2], [2, 3], [1, 3]];
			expect(solution(edges)).toEqual([1, 3]);
		});
	});

	describe('Simple case: n=4', () => {
		let edges: number[][];
		it(`should return [2,4] when edges=[[1,2],[1,3],[3,4],[2,4]]`, () => {
			edges = [[1, 2], [1, 3], [3, 4], [2, 4]];
			expect(solution(edges)).toEqual([2,4]);
		});
		it(`should return [3,4] when edges=[[1,2],[1,3],[1,4],[3,4]]`, () => {
			edges = [[1, 2], [1, 3], [1, 4], [3, 4]];
			expect(solution(edges)).toEqual([3,4]);
		});
		it(`should return [2,4] when edges=[[1,2],[1,4],[2,4],[3,4]]`, () => {
			edges = [[1, 2], [1, 4], [2, 4], [3, 4]];
			expect(solution(edges)).toEqual([2,4]);
		});
	});
	
	describe('Example 2: edges=[[1,2],[2,3],[3,4],[1,4],[1,5]]', () => {
		let edges: number[][];
		it(`should return [1,4]`, () => {
			edges = [[1,2],[2,3],[3,4],[1,4],[1,5]];
			expect(solution(edges)).toEqual([1,4]);
		});
	});
	describe('Example 2: edges=[[1,4],[2,3],[3,4],[1,2],[1,5]]', () => {
		let edges: number[][];
		it(`should return [1,2]`, () => {
			edges = [[1,4],[2,3],[3,4],[1,2],[1,5]];
			expect(solution(edges)).toEqual([1,2]);
		});
	});

	describe('Complex cases: edges=[[1,2],[2,3],[3,4],[1,5],[5,6],[5,7],[7,8],[8,9],[9,10],[10,11]]의 변형', () => {
		let edges: number[][];
		it(`1-1. [4,11] added at the end: should return [4,11]`, () => {
			edges = [[1,2],[2,3],[3,4],[1,5],[5,6],[5,7],[7,8],[8,9],[9,10],[10,11],[4,11]];
			expect(solution(edges)).toEqual([4,11]);
		});
		it(`1-2. [11,4] added at the end: should return [11,4]`, () => {
			edges = [[1,2],[2,3],[3,4],[1,5],[5,6],[5,7],[7,8],[8,9],[9,10],[10,11],[11,4]];
			expect(solution(edges)).toEqual([11,4]);
		});
		it(`1-3. [4,11] added at the middle: should return [10,11]`, () => {
			edges = [[1,2],[2,3],[3,4],[4,11],[1,5],[5,6],[5,7],[7,8],[8,9],[9,10],[10,11]];
			expect(solution(edges)).toEqual([10,11]);
		});

		it(`2-1. [9,4] added at the middle: should return [8,9]`, () => {
			edges = [[1,2],[2,3],[3,4],[9,4],[1,5],[5,6],[5,7],[7,8],[8,9],[9,10],[10,11]];
			expect(solution(edges)).toEqual([8,9]);
		});
	});
});