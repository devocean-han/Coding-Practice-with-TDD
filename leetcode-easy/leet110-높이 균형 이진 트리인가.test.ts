import source from './leet110-높이 균형 이진 트리인가';
const { solution, TreeNode } = source;

describe('Balanaced Binary Tree', () => {
	describe('The number of the nodes check: Should be in the range [0, 5000]', () => {
		let root: any = null;
		
		it(`should always return true when given tree has 0 node`, () => {
			expect(solution(root)).toBeTruthy();
		});
		it(`should always return true when given tree has 1 node`, () => {
			root = new TreeNode(1);
			expect(solution(root)).toBeTruthy();
		});
		it(`should always return true when given tree has 2 node`, () => {
			root.right = new TreeNode(2);
			expect(solution(root)).toBeTruthy();
		});
	});
	
	describe('The value of each node check: Should be in the range [-10000, 10000]', () => {
		let root = null;
		
		
	});
	
	describe('Balanced tree check: Should return true when...', () => {
		let root: any;
		beforeEach(() => {
			root = new TreeNode(1);
		});
		
		it(`given tree is [1,2,3]`, () => {
			root.left = new TreeNode(2);
			root.right = new TreeNode(3);
			expect(solution(root)).toBeTruthy();
		});
		
		it(`given tree is [1,2,3,4]`, () => {
			root.left = new TreeNode(2, new TreeNode(4));
			root.right = new TreeNode(3);
			console.log(root.printTreeLevels().join('\n'));
			expect(solution(root)).toBeTruthy();
		});
		
		it(`given tree is [1,2,3,null,null,null,7]`, () => {
			root.left = new TreeNode(2);
			root.right = new TreeNode(3, null, new TreeNode(7));
			expect(solution(root)).toBeTruthy();
		})
	});

	describe('Unbalanced tree check: Should false when...', () => {
		let root: any;
		beforeEach(() => {
			root = new TreeNode(1);
		});

		it(`given tree is [1,2,null,4]`, () => {
			root.left = new TreeNode(2, new TreeNode(4));
			expect(solution(root)).toBeFalsy();
		});
		
		it(`given tree is [1,2,3,4,null,null,null,8]`, () => {
			root.left = new TreeNode(2, new TreeNode(4, new TreeNode(8)));
			root.right = new TreeNode(3);
			expect(solution(root)).toBeFalsy();
		});
		
		it(`given tree is [1,2,3,null,null,null,7,null,null,null,null,null,null,14]`, () => {
			root.left = new TreeNode(2);
			root.right = new TreeNode(3, null, new TreeNode(7, new TreeNode(14)));
			// console.log(root.printTreeLevels().join('\n'));
			expect(solution(root)).toBeFalsy();
		});
	});

	describe('Failed test cases', () => {
		let root: any;
		beforeEach(() => {
			root = new TreeNode(1);
		});

		it(`should return true when given tree is [1,2,3,4,5,6,null,8]`, () => {
			root.left = new TreeNode(2, new TreeNode(4, new TreeNode(8)), new TreeNode(5));
			root.right = new TreeNode(3, new TreeNode(6), null);
			console.log(root.printTreeLevels().join('\n'))
			expect(solution(root)).toBeTruthy();
		});

		it(`should return true when given tree is [1,2,2,3,null,null,3,4,null,null,4]`, () => {
			root.left = new TreeNode(2, new TreeNode(3));
			root.right = new TreeNode(2, null, new TreeNode(3));
			root.left.left.left = new TreeNode(4);
			root.left.right.right = new TreeNode(4);
			console.log(root.printTreeLevels().join('\n'))
			expect(solution(root)).toBeTruthy();
		});
	})
});
