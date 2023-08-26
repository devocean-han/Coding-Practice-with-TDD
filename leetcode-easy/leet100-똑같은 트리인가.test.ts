import source from './leet100-똑같은 트리인가';
const { solution, TreeNode } = source;

describe(`Same Tree`, () => {
	describe('The number of nodes check: is in the range [0, 100]', () => {
		let p: any = null;
		let q: any = null;
		it(`should return true when both trees have 0 node`, () => {
			expect(solution(p, q)).toBe(true);
		})
	});
});