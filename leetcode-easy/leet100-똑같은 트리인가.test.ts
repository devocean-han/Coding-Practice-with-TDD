import source from './leet100-똑같은 트리인가';
const { solution, TreeNode } = source;

describe(`Same Tree`, () => {
	describe('The number of nodes check: is in the range [0, 100]', () => {
		let tree1: any;
		let tree2: any;
		beforeEach(() => {
			tree1 = null;
			tree2 = null;
		})
		it(`should return true when both trees have 0 node`, () => {
			expect(solution(tree1, tree2)).toBe(true);
		});

		it(`should return false when each tree has 0 and 1 node`, () => {
			tree2 = new TreeNode(2);
			expect(solution(tree1, tree2)).toBe(false);
		});

		it(`should return false when each tree has 1 node(and has different value)`, () => {
			tree1 = new TreeNode(1);
			expect(solution(tree1, tree2)).toBe(false);
		});

		it.each(Array.from({ length: 5 }, (_, index) => index + 1))(
			`Both trees with %p nodes are the same`, (numNodes) => {
				tree1 = generateCompleteTree(numNodes);
				tree2 = generateCompleteTree(numNodes);
				expect(solution(tree1, tree2)).toBe(true);
				console.log(tree1.printTreeLevels().join('\n'));
			}
		);
		// Array.from(arrayLike, mapFn?, thisArg?)
		// => arrayLike: 배열 형태로 변환하려는 유사 배열 객체 혹은 이터러블 객체. 'length' 프로퍼티만 가지는 유사 배열 객체 { length: 5 }를 배열로 변환하였다.
		// => mapFn: 배열의 각 요소를 변형하기 위한 매핑 함수. '_' 파라미터는 unknown이라고 하며 사용할 수 없는 값이다... 'index'에 0부터 4까지의 값이 전달되고, 결과적으로 [1,2,3,4,5]와 같이 생긴 배열이 생성된다. 

		// test.each(data)(name, fn)
		// => data: 반복할 데이터 세트. 배열로 줘야 하고, 각 데이터는 'name' 문자열과 'fn' 함수의 파라미터로 각각 전달된다. 
		// => name: 각 데이터 세트에 대한 테스트 케이스의 이름을 나타내는 문자열. data 배열에서 각 요소 값을 '%p'같은 플레이스홀더에 하나씩 전달받는다. 
		// => fn: 실제 테스트 로직을 담은 함수. data 배열에서 전달받은 각 요소 값을 매개변수로 전달받는다. 

		// 플레이스홀더(placeholder): 변수의 이름을 동적으로 생성하는 데 사용되는 문법. %기호 다음에 붙는 문자가 특정 값으로 대체된다. test.each()와 플레이스홀더를 이용해 테스트 케이스의 이름을 동적으로 생성하는 기존의 [].forEach(({tree1, tree2, answer}) => { it(...) }) 방법을 대신할 수 있겠다!
		// 예시:
		test.each([
			[1, 1, 2],
			[1, 2, 3],
		])(
			'test.each()와 플레이스홀더 예시 테스트: Adding %i and %i equals %p',
			(a, b, expected) => {
				expect(a + b).toBe(expected);
			}
		);
		
		it(`print tree test`, () => {
			tree1 = generateCompleteTree(16);
			expect(solution(tree1, tree2)).toBe(false);
			console.log(tree1.printTreeLevels().join('\n'));
		})
	});

	// 1~numNodes 값을 가지는 완전 이진 트리 생성 
	function generateCompleteTree(numNodes: number) {
		if (numNodes === 0) {
			return null;
		}

		const root = new TreeNode(1);
		const queue = [root];
		let count = 1;
		while (count < numNodes) {
			const current = queue.shift()!;

			current.left = new TreeNode(++count);
			queue.push(current.left);

			if (count < numNodes) {
				current.right = new TreeNode(++count);
				queue.push(current.right);
			}
		}

		return root;
	}
	describe('Different trees check: Should return false when...', () => {
		let tree1: any;
		let tree2: any;
		
		it(`both trees have 2 nodes with different structures: [0,1,null] / [0,null,2]`, () => {
			tree1 = new TreeNode(0, new TreeNode(1));
			tree2 = new TreeNode(0, null, new TreeNode(2));
			expect(solution(tree1, tree2)).toBe(false);
		});

		it(`bothe tress have 3 nodes with different values: [0,1,3] / [0,1,2]`, () => {
			tree1.right = new TreeNode(3);
			tree2.left = new TreeNode(1);
			expect(solution(tree1, tree2)).toBe(false);
		});
	});

	describe('Same trees check: Should return true when...', () => {
		let tree1: any;
		let tree2: any;

		it(`both trees have 2 nodes: [0,1,null] / [0,1,null]`, () => {
			tree1 = new TreeNode(0, new TreeNode(1));
			tree2 = new TreeNode(0, new TreeNode(1));
			expect(solution(tree1, tree2)).toBe(true);
		});

		it(`bothe tress have 3 nodes: [0,1,3] / [0,1,3]`, () => {
			tree1.right = new TreeNode(3);
			tree2.right = new TreeNode(3);
			expect(solution(tree1, tree2)).toBe(true);
		});

		it(`both trees have 5 nodes: [0,1,3,2,null,4] / [0,1,3,2,null,4]`, () => {
			tree1.left.left = new TreeNode(2);
			tree1.right.left = new TreeNode(4);
			tree2.left.left = new TreeNode(2);
			tree2.right.left = new TreeNode(4);
			console.log(tree1.printTreeLevels().join('\n'));
			expect(solution(tree1, tree2)).toBe(true);
		});

		it(`sample test to draw trees`, () => {
			tree1.left.left = new TreeNode(2);
			tree1.right.left = new TreeNode(4);
			tree1.right.left.right = new TreeNode(0);
			tree1.right.left.right.left = new TreeNode(7);
			tree1.left.left.right = new TreeNode(8, null, new TreeNode(9));
			console.log(tree1.printTreeLevels().join('\n'));
		});
	});
});