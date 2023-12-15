import source from './leet133-그래프 복제';
const { solution, Node } = source;

describe('Clone Graph', () => {
	describe('Simple case: zero node=null', () => {
		let node: any;
		it(`should return empty null`, () => {
			node = null
			expect(solution(node)).toEqual(null);
		});
	});
	describe('Example 1: one node=[[]]', () => {
		let node: any;
		it(`should return empty array: Node(1,[])`, () => {
			node = new Node(1);
			const result = new Node(1);
			expect(solution(node)).toEqual(result); // 내용물은 같야야 함
			expect(solution(node)).not.toBe(result); // 참조는 달라야 함
		});
	});
	describe('Simple case: adjList=[[2,4],[1,3],[2,4],[1,3]]', () => {
		let node: any;
		it(`should return... Node(1,[])?`, () => {
			node = new Node(1);
			const node2 = new Node(2);
			const node3 = new Node(3);
			const node4 = new Node(4);
			node.neighbors = [node2, node4];
			node2.neighbors = [node, node3];
			node3.neighbors = [node2, node4];
			node4.neighbors = [node, node3];
			const result = new Node(1);
			const result2 = new Node(2);
			const result3 = new Node(3);
			const result4 = new Node(4);
			result.neighbors = [result2, result4];
			result2.neighbors = [result, result3];
			result3.neighbors = [result2, result4];
			result4.neighbors = [result, result3];
			expect(solution(node)).toEqual(result); // 내용물은 같야야 함
			expect(solution(node)).not.toBe(result); // 참조는 달라야 함
		});
	});
})