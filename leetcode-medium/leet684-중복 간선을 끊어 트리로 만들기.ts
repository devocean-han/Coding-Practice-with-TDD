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
	// = 주어진 노드의 부모 노드를 parent에서 꺼내와서 반환한다. 
	// = 재귀적으로 주어진 노드의 최상위 부모 노드를 찾아 parent[]에 저장한다.
	function findFarthestParent(node: number) {
		if (parent[node] !== node) {
			parent[node] = findFarthestParent(parent[node]);
		}
		return parent[node];
	}

	// 2. 두 노드를 연결
	function union(node1: number, node2: number) { 
		// 두 노드의 최상위 부모 노드를 찾아서 같은지 다른지 비교한다.
		let root1 = findFarthestParent(node1);
		let root2 = findFarthestParent(node2);

		// 만약 같다면, 이미 같은 집합(사이클)에 속해있다는 뜻이므로 false를 반환
		if (root1 === root2)
			return false;
		
		// 만약 다르다면, 한 쪽의 최상위 부모 노드를 다른 쪽의 최상위 부모 노드로 변경하여(node1과 node2는 연결된 사이이므로) 같은 집합(사이클)에 속하도록 해주고, true를 반환
		parent[root1] = root2;
		return true;
	}

	// 3. 모든 간선(edge)에 대해 union 연산을 수행
	// => 각 집합(사이클)을 클랜, 그 최상위 부모 노드를 가주라고 한다면,
	// 초기에는 자기 자신을 가주로 삼고 각자 클랜을 가지고 있게 된다. 최초의 union() 호출은 그런 클랜들 사이의 관계를 최초로 엮어준다. 즉, 간선 [a,b] 마다 a가 b를 가주로 삼는 클랜에 속하게 만든다. 
	// [[1,2],[2,3],[3,4],[1,4],[1,5]] 이면 1-> 2 -> 3 -> 4 로 가주 자리를 넘겨주고 통합된 뒤, [1,4]라는, 이미 같은 클랜에 속하는 멤버끼리 만나게 된다. 
	// => 이대로라면 사이클을 완성시키는 간선이 등장하자마자 바로 그걸 반환시켜버리게 되는데, 어쨰서지? 
	for (let i = 0; i < edges.length; i++) {
		const [a, b] = edges[i];
		if (!union(a, b)) {
			return [a, b];
		}
	}

	return [];
} 

// 위의 풀이를 더 압축한 버전: 
function findRedundantConnection3(edges: number[][]): number[] {
	let parent = Array.from({ length: edges.length + 1 }, (_, i) => i);
	const find = (x: number): number => {
		return x === parent[x] ? parent[x] : parent[x] = find(parent[x]);
	}
	const union = (x: number, y: number) => {
		return parent[find(y)] = find(x);
	}
	for (let [a, b] of edges) {
		if (find(a) === find(b)) return [a, b];
		union(a, b);
	}
}

// DFS 풀이:
// Time complexity: O(n^2) <- 한 번의 dfs 호출은 최대 O(n)이고, 이를 모든 간선(n)에 대해 수행하므로.
// Space complexity: O(n) <- 'graph' map은 최대 n개를 저장하고 'visited' set도 최대 n개를 저장하므로.
function findRedundantConnection4(edges: number[][]): number[] {
	let graph = new Map(); // {노드 번호: set(연결된 다른 노드 번호들)}
	let curr: number[];

	// 1. 모든 간선을 순회하며 각 노드가 연결된 '연결 정보' map을 만든다. 
	//  (graph에 순서쌍이 추가될 때마다 간선이 실제로 '그어져 연결된다'고 보면 된다. 즉, graph에 정보가 존재하는 노드쌍만이 '연결됐다'.)
	// 	 ex) {1: (2,4,5), 2: (1,3), 3: (2,4), 4: (1,3), 5: (1)}
	for (const [a, b] of edges) {
		// 각 (원시)dfs 호출마다 최대 O(n) 시간이 들고 이를 모든 간선에 대하여 수행하므로, 최종 O(n^2)
		if (dfs(a, b, new Set())) {
			//^ 사이클이 1개만 존재하리라는 전제가 있는 이번 문제는 첫 '사이클이 완성되는 간선'을 찾자마자 바로 반환해도 된다. 
			return [a, b];
			// 그렇지 않고 사이클이 여러 개 예상되는 중에 삭제할 수 있는 마지막 간선을 찾으라고 했다면 다음과 같이 간선을 저장해둔다: 
			curr = [a, b];
		}
		if (!graph.has(a)) graph.set(a, new Set());
		if (!graph.has(b)) graph.set(b, new Set());
		graph.get(a).add(b);
		graph.get(b).add(a);
	}

	// 2. 주어진 노드1을 시작점으로 삼아 간선을 타고 갔을 때, 자기 자신으로 돌아올 수 있는 루트(사이클)인지 여부를 반환한다. 
	// = 노드1의 이웃(의 이웃의 이웃의...) 중 노드2가 존재하는지 
	function dfs(node1: number, node2: number, visited: Set<number>): boolean {
		// 노드 둘을 받아서 1번 노드를 '방문함'에 넣고
		// graph에 1번 노드가 key로 들어있지 않은 경우(=1번 노드가 한 번도 등장한 적이 없어 '연결 정보'가 없는 경우) 그대로 false를 반환하고,
		// 1번 노드가 key로 들어 있는 경우 사이클 찾기 작업 시작: 
		// 1번 노드와 연결된 다른 노드 목록에 2번 노드가 포함되는 경우, 사이클을 찾은 것. true를 반환한다. 
		// 그렇지 않으면 1번 노드와 연결된 모든 이웃 노드를 순회하며 1)'방문한' 적이 없고, 2)그 이웃 노드의 이웃 노드 목록에 2번 노드가 들어 있는 경우 true를 반환한다. 
		/* 즉, 1번 노드의 이웃 노드들의 이웃 노드들의 이웃 노드들을 계속 살피면서 2번 노드를 이웃으로 가지는지를 체크하는 것. 이 때
		 * 1. 우선 '방문함' set에 1번 노드를 저장하고,
		 * 2. 1번 노드와 '연결된' 노드가 하나도 없으면('연결 정보' map에 1번 노드가 아직 등록되지 않은 경우), 곧바로 false를 반환한다. 
		 * 3. 만약 1번 노드에게 2번 노드가 직접 연결되어 있으면 곧바로 true를 반환한다. 
		 * 4. 그렇지 않으면 이웃 노드 중 아직 방문하지 않은 노드를 다시 1번 노드로 삼고 1~3을 반복한다. 그렇게 이웃의 이웃을 탐색하던 중 한 번이라도 3에 걸려서 true가 반환되면 곧바로 모든 조상 호출도 true를 반환시킨다. 
		 * 5. 만약 모든 노드를 '방문'하기까지 그 이웃 노드로 2번 노드를 발견하지 못했다면 마지막으로 false를 반환하도록 한다. 
		*/
		visited.add(node1);

		if (graph.has(node1)) {
			let neighborNodes = graph.get(node1);
			if (neighborNodes.has(node2)) return true;

			// neighborNodes는 최대 n-1개, 그것을 각 노드마다 처리하므로 * n이지만 
			// '방문한' 노드는 다시 방문하지 않으므로 한 간선에 대한 원시 dfs() 호출은 최대 O(n)이다. 
			for (const node of neighborNodes) {
				if (!visited.has(node)) {
					if (dfs(node, node2, visited)) {
						return true;
					}
				}
			}
		}

		return false;
	}

	return curr;
}



// (성공) 굳이 'graph'를 만들어 간선을 차례로 '연결하는' 작업을 하지 않고도, 사실 neighborNodes map만 완성되면 이미 그래프 전체 그림을 추적할 수 있는 셈이니까 이것만으로 사이클을 추적할 수 있지 않을까.
// 1. edges의 간선을 마지막 것부터 순회한다.
// 2. 현재 순서의 간선 [a,b]를 대상으로, a->b를 제외하고 a가 b에 도달할 수 있는 다른 루트가 있는지 조사한다. 있다면, [a,b]를 마지막 등장으로 하는 사이클이 존재하는 것이므로 곧바로 [a,b]를 반환하면 된다.
// 3. '없다면' = "a->b를 제외하고 a->->->b에 도달하지 못하고 모든 가능성 있는(연결된) 노드가 방문되고 끝났다".
// a->b 만 제외하고 재귀 호출하도록 어떻게 지정할 수 있지?

// Time complexity: O(n^2)
// Space complexity: O(n)
function findRedundantConnection5(edges: number[][]): number[] {
	const neighborNodes: { [key: number]: number[] } = {};
	for (let [a, b] of edges) {
		if (!neighborNodes[a]) neighborNodes[a] = [];
		if (!neighborNodes[b]) neighborNodes[b] = [];
		neighborNodes[a].push(b);
		neighborNodes[b].push(a);
	}

	// [a->b] 직접 연결을 제외하고 이웃 노드 탐색하기
	for (let i = edges.length - 1; i >= 0; i--) {
		const [a, b] = edges[i];
		if (dfs(a, b, new Set([a]), 0)) {
			return [a, b];
		}

	}
	
	// Time complexity: O(n)
	// Space complexity: O(n)
	function dfs(curNode: number, targetNode: number, visited: Set<number>, neighborLevel: number): boolean {
		if (curNode === targetNode) {
			// 타겟 노드 b를 만났지만 a에서 직접 연결된 경우: 
			// 주변 이웃을 탐색하지 않고 곧바로 false를 반환시킨다
			if (neighborLevel === 1)
				return false;
			// 그게 아니면, 사이클 찾았음
			return true;
		}

		// 이도 저도 아니면: false를 반환해가며 재귀 반복
		for (let node of neighborNodes[curNode]) {
			// 아직 방문하지 않은 node만 대상으로 재귀 호출:
			if (!visited.has(node)) {
				if (dfs(node, targetNode, new Set([...visited, node]), neighborLevel + 1))
					return true;
			}
			//! => 백트래킹을 하려면 재귀 호출의 인자 중에서...:
			//! 1. Set의 경우, set.add() 자체를 넘겨줘도 하나의 set이 이미 변경된 상태로 넘어가게 됨. 따라서 요소를 하나 추가한 깊은 복사를 해서 인수로 줘야 한다.
			//! 2. 숫자 변수의 경우, a++는 아무런 영향도 주지 못하고 ++는 의도대로 +1한 값을 넘기기는 하지만 백트래킹이 안된다. 따라서 a + 1을 인수로 넘겨줘야 한다. 

			//^ 그러나 Set을 매번 깊은 복사하는 것은 엄청난 시간&공간 낭비를 발생시킨다. 
			// => 따라서 재귀 호출을 할 때, Set을 인수로 넘기는 경우 최초의 Set을 그대로 이용하면서 명시적으로 .add()와 .delete()를 해줌으로써 백트래킹을 구현해준다: 
			if (!visited.has(node)) {
				visited.add(node); // Set에 추가
				if (dfs(node, targetNode, visited, neighborLevel + 1))
					// 최초 Set(visited)를 그대로 활용,
					return true; 
				visited.delete(node); // Set에서 삭제
			}
		}

		return false;
	}
	// 문제에 따르면 여기까지 올 일은 없음 
	return [];
}

export default {
	solution: findRedundantConnection5,
}