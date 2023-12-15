/*
 * @lc app=leetcode id=133 lang=typescript
 *
 * [133] Clone Graph
 *
 * https://leetcode.com/problems/clone-graph/description/
 *
 * algorithms
 * Medium (55.16%)
 * Total Accepted:    1.1M
 * Total Submissions: 2M
 * Testcase Example:  '[[2,4],[1,3],[2,4],[1,3]]'
 *
 * Given a reference of a node in a connected undirected graph.
 * 
 * Return a deep copy (clone) of the graph.
 * 
 * Each node in the graph contains a value (int) and a list (List[Node]) of its
 * neighbors.
 * 
 * 
 * class Node {
 * ⁠   public int val;
 * ⁠   public List<Node> neighbors;
 * }
 * 
 * 
 * 
 * 
 * Test case format:
 * 
 * For simplicity, each node's value is the same as the node's index
 * (1-indexed). For example, the first node with val == 1, the second node with
 * val == 2, and so on. The graph is represented in the test case using an
 * adjacency list.
 * 
 * An adjacency list is a collection of unordered lists used to represent a
 * finite graph. Each list describes the set of neighbors of a node in the
 * graph.
 * 
 * The given node will always be the first node with val = 1. You must return
 * the copy of the given node as a reference to the cloned graph.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
 * Output: [[2,4],[1,3],[2,4],[1,3]]
 * Explanation: There are 4 nodes in the graph.
 * 1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val =
 * 4).
 * 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val =
 * 3).
 * 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val =
 * 4).
 * 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val =
 * 3).
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: adjList = [[]]
 * Output: [[]]
 * Explanation: Note that the input contains one empty list. The graph consists
 * of only one node with val = 1 and it does not have any neighbors.
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: adjList = []
 * Output: []
 * Explanation: This an empty graph, it does not have any nodes.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * The number of nodes in the graph is in the range [0, 100].
 * 1 <= Node.val <= 100
 * Node.val is unique for each node.
 * There are no repeated edges and no self-loops in the graph.
 * The Graph is connected and all nodes can be visited starting from the given
 * node.
 * 
 * 
 */
/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     neighbors: Node[]
 *     constructor(val?: number, neighbors?: Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 */

// => 주어진 무방향 그래프를 깊은 복사하여 반환하기.
// 그래프 node[i] 는 i를 값으로 가지는 노드의 이웃 노드 목록을 뜻한다.
// ex) node=[[2,3],[1],[1]] => 2-1-3 형태로 연결된 그래프임

class Node {
	val: number
	neighbors: Node[]
	constructor(val?: number, neighbors?: Node[]) {
		this.val = (val===undefined ? 0 : val)
		this.neighbors = (neighbors===undefined ? [] : neighbors)
	}
}
// new Node(1, [new Node(2), new Node(4)])
// const a = new Node(1) => {v:1, n:[]}
// a.neighbors.push() // [3];
function cloneGraph(node: Node | null): Node | null {
	if (!node) return null;

	// adjList = [[2,4],[1,3],[2,4],[1,3]]

	const map: Map<number, Node> = new Map(); // 생성한 노드 목록 {노드번호: 노드}
	map.set(1, new Node(1));
	const visited: Set<number> = new Set(); // 이웃 노드 세팅까지 완료한(='방문한') 노드
	const stack: Node[] = [node]; // 다음에 방문할 노드 목록
	
	// DFS
	while (stack.length) {
		const curNode: Node = stack.pop();
		if (visited.has(curNode.val))
			continue;

		visited.add(curNode.val);
		let newNode;
		if (map.has(curNode.val))
			newNode = map.get(curNode.val);
		else {
			newNode = new Node(curNode.val);
			map.set(newNode.val, newNode);
		}

		for (let node of curNode.neighbors) {
			if (map.has(node.val)) {
				newNode.neighbors.push(map.get(node.val));
			} else {
				const newNeighborNode = new Node(node.val);
				map.set(newNeighborNode.val, newNeighborNode);
				newNode.neighbors.push(newNeighborNode);
			}
		}
		// => 'map에 어떤 노드 넘버가 들어있는지 체크해서 없으면 새로 만들어서 넣고, 그 노드로 뭔가를 함'이 반복되고 있음

		console.dir(map);
		stack.push(...curNode.neighbors);
	}

	return map.get(1);
};

// 위의 풀이를 리팩토링: 
function cloneGraph2(node: Node | null): Node | null {
	if (!node) return null;

	// adjList = [[2,4],[1,3],[2,4],[1,3]]

	const map: Map<number, Node> = new Map(); // 생성한 노드 목록 {노드번호: 노드}
	const visited: Set<number> = new Set(); // 이웃 노드 세팅까지 완료한(='방문한') 노드
	const stack: Node[] = [node]; // 다음에 방문해서 이웃 노드 목록을 채워넣을 노드 목록(=아직 이웃 노드 세팅을 완료하지 않은 노드들)
	
	// map에 어떤 노드 넘버가 들어있는지 체크해서 없으면 새로 만들어서 넣고, 그 노드를 반환함
	const getNode = (map: Map<number, Node>, val: number): Node => {
		if (!map.has(val))
			map.set(val, new Node(val));
		return map.get(val);
	}

	// DFS
	while (stack.length) {
		const curNode: Node = stack.pop();
		if (visited.has(curNode.val))
			continue;

		visited.add(curNode.val);
		const newNode = getNode(map, curNode.val);

		for (let neighborNode of curNode.neighbors) {
			newNode.neighbors.push(getNode(map, neighborNode.val));
			// 이웃 중 아직 방문하지 않은 노드만 '방문할' 노드 목록(stack)에 추가 
			if (!visited.has(neighborNode.val)) 
				stack.push(neighborNode)
		}
	}

	return map.get(1);
};

export default {
	solution: cloneGraph2,
	Node,
}
