import source from './leet685-중복 간선을 끊어 트리로 만들기 II';
const { solution } = source;

describe('Reduntant Connection II', () => {
	// describe('Simple Case: n=3', () => {
	// 	let edges: number[][];
	// 	it(`should return the last edge`, () => {
	// 		edges = [[1,2],[1,3],[2,3]];
	// 		expect(solution(edges)).toEqual([2, 3]);
	// 	});
	// });

	// // 예제 2번 변형:
	// describe('Example 2: "사이클"이 하나 존재하는 경우', () => {
	// 	let edges: number[][];
	// 	it(`edges=[[1,2],[2,3],[3,4],[4,1],[1,5]]: should return [4,1]`, () => {
	// 		edges = [[1,2],[2,3],[3,4],[4,1],[1,5]];
	// 		expect(solution(edges)).toEqual([4,1]);
	// 	});
	// });

	// // 규칙 총정리: 
	// describe('1. "사이클"만 하나 형성된 경우: 사이클을 이루는 마지막 간선을 끊기', () => {
	// 	let edges: number[][];
	// 	it(`edges=[[1,2],[2,3],[3,4],[1,5],[4,1]]: should return [4,1]`, () => {
	// 		edges = [[1,2],[2,3],[3,4],[1,5],[4,1]];
	// 		expect(solution(edges)).toEqual([4,1]);
	// 	});
	// 	it(`edges=[[4,1],[1,2],[2,3],[3,4],[1,5]]: should return [3,4]`, () => {
	// 		edges = [[4,1],[1,2],[2,3],[3,4],[1,5]];
	// 		expect(solution(edges)).toEqual([3,4]);
	// 	});
	// });
	// describe('2. "사이클"을 이루지 못하고 "두 부모" 관계만 형성한 경우: 두 부모 중 마지막 하나를 끊기', () => {
	// 	let edges: number[][];
	// 	it(`edges=[[1,2],[2,3],[3,4],[1,5],[4,5]]: should return [4,5]`, () => {
	// 		edges = [[1,2],[2,3],[3,4],[1,5],[4,5]];
	// 		expect(solution(edges)).toEqual([4,5]);
	// 	});
	// });
	describe('3. "사이클"도 이루고 "두 부모"도 됨: 두 부모 중 사이클을 이루는 공통 간선을 끊기', () => {
		let edges: number[][];
		// it(`(공통 간선: 마지막 두 부모 & 마지막 사이클) edges=[[1,2],[2,3],[3,4],[1,5],[4,2]]: should return [4,2]`, () => {
		// 	edges = [[1,2],[2,3],[3,4],[1,5],[4,2]];
		// 	expect(solution(edges)).toEqual([4,2]);
		// });
		// it(`(공통 간선: 첫 두 부모 & 마지막 사이클) edges=[[1,2],[2,3],[3,4],[4,1],[5,1]]: should return [4,1]`, () => {
		// 	edges = [[1,2],[2,3],[3,4],[4,1],[5,1]];
		// 	expect(solution(edges)).toEqual([4,1]);
		// });
		it(`(공통 간선: 첫 두 부모 & 마지막이 아닌 사이클) edges=[[2,1],[3,1],[4,2],[1,4]]: should return [2,1]`, () => {
			edges = [[2,1],[3,1],[4,2],[1,4]];
			expect(solution(edges)).toEqual([2,1]);
		});
		it(`(공통 간선: 마지막 두 부모 & 마지막이 아닌 사이클) edges=[[3,1],[2,1],[4,2],[1,4]]: should return [2,1]`, () => {
			edges = [[3,1],[2,1],[4,2],[1,4]];
			expect(solution(edges)).toEqual([2,1]);
		});
	});

	// describe('Error case: edges=[[5,2],[5,1],[3,1],[3,4],[3,5]]', () => {
	// 	let edges: number[][];
	// 	it(`should return [3,1]: '이미 등장한 부모가 자식으로 다시 등장하는 간선'을 찾는 것으로는 사이클을 보장하지 못함`, () => {
	// 		edges = [[5,2],[5,1],[3,1],[3,4],[3,5]];
	// 		expect(solution(edges)).toEqual([3, 1]);			
	// 	});
	// });
});