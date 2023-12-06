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
});