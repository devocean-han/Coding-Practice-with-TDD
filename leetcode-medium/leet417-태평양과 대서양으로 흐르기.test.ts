import source from './leet417-태평양과 대서양으로 흐르기';
const { solution } = source;

describe('Pacific Atlantic Water Flow', () => {
	describe('Simple case: heights=[[0]]', () => {
		let heights: number[][];
		it(`should return [[0,0]]`, () => {
			heights = [[0]];
			const output = new Set(solution(heights));
			expect(new Set(output)).toEqual(new Set([[0, 0]]));
		});
	});
	describe('One line heights(row) always flow to both: heights=[[0,1,2,3,4,5]]', () => {
		let heights: number[][];
		it(`should return [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5]]`, () => {
			heights = [[0,1,2,3,4,5]];
			const output = new Set(solution(heights));
			expect(new Set(output)).toEqual(new Set([[0,0],[0,1],[0,2],[0,3],[0,4],[0,5]]));
		});
	});
	describe('One line heights(col) always flow to both: heights=[[0],[1],[2],[3],[4],[5]]', () => {
		let heights: number[][];
		it(`should return [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0]]`, () => {
			heights = [[0],[1],[2],[3],[4],[5]];
			const output = new Set(solution(heights));
			expect(new Set(output)).toEqual(new Set([[0,0],[1,0],[2,0],[3,0],[4,0],[5,0]]));
		});
	});

	describe('Bottom line never reach top: heights=[[5,5,5],[0,0,0]]', () => {
		let heights: number[][];
		it(`should return [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]]`, () => {
			heights = [[5,5,5],[0,0,0]];
			const output = new Set(solution(heights));
			expect(new Set(output)).toEqual(new Set([[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]]));
		});
	});
	describe('Bottom line never reach top: heights=[[5,5,5],[1,0,0]]', () => {
		let heights: number[][];
		it(`should return [[0,0],[0,1],[0,2],[1,0]]`, () => {
			heights = [[5,5,5],[1,0,0]];
			const output = new Set(solution(heights));
			expect(new Set(output)).toEqual(new Set([[0,0],[0,1],[0,2],[1,0]]));
		});
	});

	describe('Example 1: heights=[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', () => {
		let heights: number[][];
		it(`should return [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]`, () => {
			heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]];
			const output = new Set(solution(heights));
			expect(new Set(output)).toEqual(new Set([[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]));
		});
	});

});