import source from './leet210-모든 과목을 수강할 수 있는가 II';
const { solution } = source;

describe('Course Schedule II', () => {
	describe('Example 1: n=2, prerequisites=[[1,0]]', () => {
		let n: number = 2;
		let prerequisites: number[][] = [[1,0]];
		it(`should return [0,1]`, () => {
			expect(solution(n, prerequisites)).toEqual([0, 1]);
		});
	});
	describe('Example 2: n=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]', () => {
		let n: number = 4;
		let prerequisites: number[][] = [[1,0],[2,0],[3,1],[3,2]];
		it(`should return [0,2,1,3] or [0,1,2,3]`, () => {
			const result = solution(n, prerequisites);
			try {
				expect(result).toEqual([0,2,1,3]);
			} catch (error1) {
				try {
					expect(result).toEqual([0,1,2,3]);
				} catch (error2) {
					throw error1;
				}
			}
		});
	});
})