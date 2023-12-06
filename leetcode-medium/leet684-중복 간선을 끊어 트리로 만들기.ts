/*
 * @lc app=leetcode id=684 lang=typescript
 *
 * [684] Redundant Connection
 *
 * https://leetcode.com/problems/redundant-connection/description/
 *
 * algorithms
 * Medium (62.51%)
 * Total Accepted:    319.9K
 * Total Submissions: 511.3K
 * Testcase Example:  '[[1,2],[1,3],[2,3]]'
 *
 * In this problem, a tree is an undirected graph that is connected and has no
 * cycles.
 * 
 * You are given a graph that started as a tree with n nodes labeled from 1 to
 * n, with one additional edge added. The added edge has two different vertices
 * chosen from 1 to n, and was not an edge that already existed. The graph is
 * represented as an array edges of length n where edges[i] = [ai, bi]
 * indicates that there is an edge between nodes ai and bi in the graph.
 * 
 * Return an edge that can be removed so that the resulting graph is a tree of
 * n nodes. If there are multiple answers, return the answer that occurs last
 * in the input.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: edges = [[1,2],[1,3],[2,3]]
 * Output: [2,3]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
 * Output: [1,4]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * n == edges.length
 * 3 <= n <= 1000
 * edges[i].length == 2
 * 1 <= ai < bi <= edges.length
 * ai != bi
 * There are no repeated edges.
 * The given graph is connected.
 * 
 * 
 */

// => 주어진 edges 중 한 간선을 끊어서(없애서) 해당 그래프가 'tree'가 되도록 만들기. tree란 무 방향의 사이클 없는 그래프를 말한다.

/* edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
	이렇게 생긴 간선들이 있으면, 일단 앞에서부터 훑으면서 3번 이상 나오는 노드 번호를 찾는다. 위의 예시에서는 [1,5]에서 1이 3번째 등장하게 된다. 
	그렇다고 [1,5]를 끊어버리면 안된다. 5가 떨어져버리기 때문. 즉, 한 노드는 최소 1번 이상 등장하도록 놔둬야 한다. 
	그렇다면,
	1) 2번째 등장한 노드 번호들의 위치를 전부 기억해놓는다. 
	2) 어떤 노드가 3번째 등장했을 때, 만약
		2-1) 짝이 되는 노드도 2번째 등장이면 이 간선을 끊는다. 
		2-2) 짝이 되는 노드가 처음 등장한 거면 이 간선은 놔두고 전에 기억해둔 2번째 등장 위치를 찾는다. 문제 조건에 의해 이 간선은 반드시 다른 2번째 등장 노드와 짝지어 있다(아마도).
	=> 아니다... 세 번 등장이 문제가 아니라, 사이클이 없도록 하는 게 문제다. 

	즉, 사이클을 찾아서 그 간선 중 edges의 가장 마지막에 등장하는 간선을 반환한다. 
	사이클은 다음과 같이 찾자:
	1) 모든 간선을 순회하며 각 노드가 연결된 목록을 따로 작성한다. 
		{1: [2,4,5]}
		{2: [1,3]}
		{3: [2,4]}
		{4: [1,3]}
		{5: [1]}
	2) 각 노드를 시작점으로 삼아서 간선을 타고 가다가 자기 자신으로 돌아올 수 있는 루트를 찾는다. 사이클에 포함된 모든 노드가 두 번 yes를 외칠 것이다. 처음 등장한 사이클을 찾자마자 '사이클 찾기 루프'를 벗어나도록 한다. 
	3) edges의 끝에서부터 살피면서 [a,b]가 모두 사이클에 포함되는 노드가 되는 간선을 찾아 반환한다. 
*/
function findRedundantConnection(edges: number[][]): number[] {
	if (edges.length === 3) return edges[2];
	
	// 1. 각 노드가 연결된 다른 노드 목록을 만든다
	const linkedNodes: { [key: number]: number[] } = {};
	for (let i = 0; i < edges.length; i++) { // i = nodeNum
		const [a,b] = edges[i];
		if (!linkedNodes[a]) linkedNodes[a] = [];
		if (!linkedNodes[b]) linkedNodes[b] = [];
		linkedNodes[a].push(b);
		linkedNodes[b].push(a);
	}
	console.dir(linkedNodes);

	// 2. 각 노드를 시작점으로 삼는 사이클이 있는지(=간선을 타고 가다 자기 자신으로 돌아올 수 있는 루트가 있는지) 탐색한다
	for (let key of Object.keys(linkedNodes)) {
		let stack = [key];
		let unvisited = new Set(edges);
		// edsges의 순서쌍을 그대로 set의 요소로 만들어서, 그 참조(edges[0])로 set 내부에서도 삭제하는 것이다!
		if (key === '1') {
			console.dir(unvisited);
			unvisited.delete(edges[0]);
			console.dir(unvisited);
		}
	}
	// 2. 어차피 linkedNodes만큼 도나 edges 개수만큼 도나 딱 노드 개수만큼이므로, edges를 돌도록 한다. linkedNodes에서 삭제가 용이하도록...
	for (let i = 0; i < edges.length; i++) {
	// ex. edges=[[1,2],[2,3],[3,4],[1,4],[1,5]]	
		// [a,b] 중 먼저 a를 시작점으로 갈 때까지 가보며 edges에서 지워낸다. 그러면 [a,b]가 사라져 있든지 아직 남아서 b를 시작점으로 한 번 더 돌아봐야 할 지 나올 것
		const edge = edges[i]; // [1,2]
		let nodeStack = [edge[0]]; // [1,2] 중 노드 1을 먼저 넣어줌
		let unvisitedEdges = new Set(edges);
		while (nodeStack.length && unvisitedEdges.has(edge)) {
			const node = nodeStack.pop();

		}
	}


	// (재귀 함수 포기)타고타고 가다가 처음 번호를 만나면 true를, 그렇지 않은 모든 경우는 false를 반환
	function canReturnToInitialNode(initialNode:number, thisNode:number) {
		if (initialNode === thisNode)
			return true;
		// '뒤돌아 오지 않은 것이면서 최초 노드와 같은 데를 만나는지'를 검사하려면..?
		// 1안: linkedNodes 자체를 처음부터 중복되지 못하게 만든다.
		/*  {
				'1': [ 2, 4, 5 ],
				'2': [ 1, 3 ],
				'3': [ 2, 4 ],
				'4': [ 3, 1 ],
				'5': [ 1 ]
			}
			를, 
			{
				'1': [ 2, 4, 5 ],
				'2': [ 3 ],
				'3': [ 4 ],
				'4': [ ],
				'5': [ ]
			}
			로 만든다... => 1->2->3->4 에서 다시 ->1로 돌아올 방법이 없기 때문에 이 방법은 글렀다.
		*/
		// 2안: '방문한 노드' 목록을 만든다. 
		// 3안: ...아니, '사용한 간선' 목록을 만들면 되겠다!
		for (let node of linkedNodes[thisNode]) {
			// '다음 
			canReturnToInitialNode(initialNode, node)
		}
		return false;
	}

	// edges의 끝에서부터 살피면서 [a,b]가 모두 사이클에 포함되는 노드가 되는 간선을 찾아 반환한다. 

};

// 위의 문제 이해를 바탕으로 한 다른 풀이:
// = 주어진 그래프에서 사이클을 찾고 그 사이클을 제거하여 트리를 만들기
function findRedundantConnection2(edges: number[][]): number[] {
	const nodes = {};
	const parent: { [key: number]: number } = {};

	// 1. 각 노드의 최상위 부모 노드 찾기:
	for (let i = 0; i < edges.length; i++) {
		const [a, b] = edges[i];
		parent[a] = a;
		parent[b] = b;
	}
	// 주어진 node의 최상위 부모 노드를 찾아 parent[node]의 값으로 저장한다
	function findFarthestParent(node: number) {
		if (parent[node] !== node) {
			parent[node] = findFarthestParent(parent[node]);
		}
		return parent[node];
	}

	// 2. 두 노드를 연결
	function union(node1: number, node2: number) { 
		let root1 = findFarthestParent(node1);
		let root2 = findFarthestParent(node2);

		if (root1 === root2)
			return false;
		
		parent[root1] = root2;
		return true;
	}

	// 3. 모든 간선(edge)에 대해 union 연산을 수행
	for (let i = 0; i < edges.length; i++) {
		const [a, b] = edges[i];
		if (!union(a, b)) {
			return [a, b];
		}
	}

	return [];
} 
export default {
	solution: findRedundantConnection2,
}