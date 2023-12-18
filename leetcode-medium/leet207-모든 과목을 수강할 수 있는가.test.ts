import source from './leet207-모든 과목을 수강할 수 있는가';
const { solution } = source;

describe('Course Schedule', () => {
	describe('Simple Case: n=1, prerequisites=[]', () => {
		let n: number = 1;
		let prerequisites: number[][] = [];
		it(`should return true`, () => {
			expect(solution(n, prerequisites)).toBe(true);
		});
	});

	describe('Example 1: n=2, prerequisites=[[1,0]]', () => {
		let n: number = 2;
		let prerequisites: number[][] = [[1, 0]];
		it(`should return true`, () => {
			expect(solution(n, prerequisites)).toBe(true);
		});
	});
	describe('Example 2: n=2, prerequisites=[[1,0],[0,1]]', () => {
		let n: number = 2;
		let prerequisites: number[][] = [[1,0],[0,1]];
		it(`should return false`, () => {
			expect(solution(n, prerequisites)).toBe(false);
		});
	});

	describe('Has the graph no cycle?', () => {
		describe('True(no cycle) cases: ', () => {
			let n: number;
			let prerequisites: number[][];
			it(`One course(node) has no cycle: n=1, prerequisites=[]`, () => {
				n = 1;
				prerequisites = [];
				expect(solution(n, prerequisites)).toBe(true);
			});
			it(`Two courses(nodes) with no prerequisites: n=2, prerequisites=[]`, () => {
				n = 2;
				prerequisites = [];
				expect(solution(n, prerequisites)).toBe(true);
			});
			it(`Two courses(nodes) with one prerequisites: n=2, prerequisites=[[1,0]]`, () => {
				n = 2;
				prerequisites = [[1,0]];
				expect(solution(n, prerequisites)).toBe(true);
			});
			it(`Two courses(nodes) with one prerequisites: n=2, prerequisites=[[1,0]]`, () => {
				n = 2;
				prerequisites = [[1,0]];
				expect(solution(n, prerequisites)).toBe(true);
			});
			it(`3+ courses(nodes) with 1:n and n:1 parent-child relations: n=10, prerequisites=[[1,0],[1,4],[1,5],[1,7],[1,9],[8,9],[7,9],[7,0]]`, () => {
				n = 10;
				prerequisites = [[1,0],[1,4],[1,5],[1,7],[1,9],[8,9],[7,9],[7,0]];
				expect(solution(n, prerequisites)).toBe(true);
			});
		});
		describe('False(has cycle) cases: ', () => {
			let n: number;
			let prerequisites: number[][];
			it(`Two courses(nodes) with two prerequisites: n=2, prerequisites=[[1,0],[0,1]]`, () => {
				n = 2;
				prerequisites = [[1,0],[0,1]];
				expect(solution(n, prerequisites)).toBe(false);
			});
			it(`3+ courses with bi-direction cycle: n=3, prerequisites=[[2,0],[0,2]]`, () => {
				n = 3;
				prerequisites = [[2,0],[0,2]];
				expect(solution(n, prerequisites)).toBe(false);
			});
			it(`3+ courses with circular cycle: n=3, prerequisites=[[2,0],[0,1],[1,2]]`, () => {
				n = 3;
				prerequisites = [[2,0],[0,1],[1,2]];
				expect(solution(n, prerequisites)).toBe(false);
			});
		});
	});

	describe('Error Case(StackOverflow): n=3, prerequisites=[[1,0],[2,0],[0,2]]', () => {
		let n: number = 2;
		let prerequisites: number[][] = [[1,0],[2,0],[0,2]];
		it(`should return false`, () => {
			expect(solution(n, prerequisites)).toBe(false);
		});
	});
});