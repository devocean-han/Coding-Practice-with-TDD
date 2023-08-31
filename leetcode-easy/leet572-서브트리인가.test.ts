import { before } from 'cheerio/lib/api/manipulation';
import source from './leet572-서브트리인가';
import { resolveObjectURL } from 'buffer';
const { TreeNode, solution } = source;

describe('Subtree of Another Tree', () => {
	describe(`The number of node check: "root" must be in range [1, 2000], "subRoot" in [1, 1000]`, () => {
		let root: any;
		let subRoot: any;
		beforeEach(() => {
			root = new TreeNode(0);
			subRoot = new TreeNode(0);
		});

		it(`should return true when both root and subRoot has one node with the same value`, () => {
			expect(solution(root, subRoot)).toBeTruthy();
		});

		it(`should return false when both root and subRoot has one node with different value`, () => {
			subRoot = new TreeNode(-10000);
			expect(solution(root, subRoot)).toBeFalsy();
		});

		// a very large tree...
	});

	// 사실 이것까지 체크할 필요는 없는 듯함. 
	// describe(`Valid value check: node value of "root" and "subRoot" must be in the range [-10000, 10000]`, () => {
	// 	let root: any;
	// 	let subRoot: any;
	// 	beforeEach(() => {
	// 		root = new TreeNode(-10000);
	// 		subRoot = new TreeNode(-10000);
	// 	});

	// 	it(`should return false when both subRoot value is out of range`, () => {
	// 		subRoot.val = -10001;
	// 		expect(solution(root, subRoot)).toBeFalsy();
	// 	});
	// });

	describe(`Valid subtree check: Should return true when "subRoot" is a subtree of "root": `, () => {
		let root: any;
		let subRoot: any;
		beforeEach(() => {
			root = new TreeNode(0);
			subRoot = new TreeNode(0);
		});

		it(`one node is the subtree: "root": [0, 1] and "subRoot": [1]`, () => {
			root.left = new TreeNode(1);
			subRoot.val = 1;
			expect(solution(root, subRoot)).toBeTruthy();
		});

		it(`whole subtree: "root": [0, 1] and "subRoot": [0, 1]`, () => {
			root.left = new TreeNode(1);
			subRoot.left = new TreeNode(1);
			expect(solution(root, subRoot)).toBeTruthy();
		});

		it(`duplicate node value: "root": [0, 0] and "subRoot": [0]`, () => {
			root.left = new TreeNode(0);
			expect(solution(root, subRoot)).toBeTruthy();
		});

		it(`bigger whole subtree: "root": [0,1,null,1] and "subRoot": [0,1,null,1]`, () => {
			root.left = new TreeNode(1);
			root.left.left = new TreeNode(1);
			subRoot.left = new TreeNode(1);
			subRoot.left.left = new TreeNode(1);
			expect(solution(root, subRoot)).toBeTruthy();
		});

		it(`bigger duplicate: "root": [0,1,0,0,null,null,null,1,2] and "subRoot": [0,1,2]`, () => {
			root.left = new TreeNode(1);
			root.left.left = new TreeNode(0, new TreeNode(1), new TreeNode(2));
			root.right = new TreeNode(0);
			subRoot.left = new TreeNode(1);
			subRoot.right = new TreeNode(2);
			expect(solution(root, subRoot)).toBeTruthy();
		});
	});

	describe(`Invalid subtree check: Should return false when "subRoot" is never a subtree of "root" where...`, () => {
		let root: any;
		let subRoot: any;
		beforeEach(() => {
			root = new TreeNode(0);
			subRoot = new TreeNode(0);
		});

		it(`child node not exist: "root": [0, 1] and "subRoot": [0]`, () => {
			root.left = new TreeNode(1);
			expect(solution(root, subRoot)).toBeFalsy();
		});

		it(`child node with different value: "root": [0, 1] and "subRoot": [0, 2]`, () => {
			root.left = new TreeNode(1);
			subRoot.left = new TreeNode(2);
			expect(solution(root, subRoot)).toBeFalsy();
		});

		it(`lack of child node: "root": [0, 1, 2] and "subRoot": [0, null, 2]`, () => {
			root.left = new TreeNode(1);
			root.right = new TreeNode(2);
			subRoot.right = new TreeNode(2);
			expect(solution(root, subRoot)).toBeFalsy();
		});
	});
});