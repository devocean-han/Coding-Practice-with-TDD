import source from './leet235-가장 가까운 공통 조상';
const { solution } = source;
import { TreeNode } from '../Class 모음';
import { before } from 'cheerio/lib/api/manipulation';

describe('Lowest Common Ancestor of a Binary Search Tree', () => {
	describe('The number of nodes check: Must be in the range [2, 100,000]', () => {
		let root: TreeNode = new TreeNode(1);
		let p: TreeNode;
		let q: TreeNode;
		beforeEach(() => {
			root.left = new TreeNode(0);
			p = root;
			q = root.left;
		});
		
		it(`should return root when the given tree had 2 nodes`, () => {
			expect(solution(root, p, q)).toEqual(root);
		});
		
	});
	
	describe(`Should return root when one among p and q is root`, () => {
		let root: TreeNode;
		let p: TreeNode;
		let q: TreeNode;
		beforeEach(() => {
			root = new TreeNode(1);
		});
		
		it(`given tree is [1,0,3] and p is root`, () => {
			root.left = new TreeNode(0);
			root.right = new TreeNode(3);
			p = root;
			q = root.left;
			expect(solution(root, p, q)).toEqual(root);
		});
		
		it(`given tree is [1,0,null,-4] and p is root (and q is node 4)`, () => {
			root.left = new TreeNode(0);
			root.left.left = new TreeNode(-4);
			p = root;
			q = root.left.left;
			expect(solution(root, p, q)).toEqual(root);
		});
		
		it(`given tree is [1,-20,3,-40,-5,6,7,-80,-29,-10] and q is root (and p is node 10)`, () => {
			root.left = new TreeNode(-20, new TreeNode(-40), new TreeNode(-5));
			root.right = new TreeNode(3, new TreeNode(6), new TreeNode(7));
			root.left.left.left = new TreeNode(-80);
			root.left.left.right = new TreeNode(-29);
			root.left.right.left = new TreeNode(-10);
			p = root.left.right.left;
			q = root;
			expect(solution(root, p, q)).toEqual(root);
		});
	});

	describe(`Cases where one parent is the common anscestor: `, () => {
		let root: TreeNode;
		let p: TreeNode;
		let q: TreeNode;
		beforeEach(() => {
			root = new TreeNode(6, new TreeNode(2), new TreeNode(8));
			root.left.left = new TreeNode(0);
			root.left.right = new TreeNode(4, new TreeNode(3), new TreeNode(5));
			root.right.left = new TreeNode(7);
			root.right.right = new TreeNode(9);
		});
		
		it(`should return node 2 when p=2 and q=4`, () => {
			p = root.left;
			q = root.left.right;
			console.log('given tree: ', root.printTreeLevels().join('\n'));
			expect(solution(root, p, q)).toEqual(p);
		});
	});
});