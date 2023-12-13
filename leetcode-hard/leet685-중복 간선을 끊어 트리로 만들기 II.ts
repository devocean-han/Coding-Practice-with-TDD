/*
 * @lc app=leetcode id=685 lang=typescript
 *
 * [685] Redundant Connection II
 *
 * https://leetcode.com/problems/redundant-connection-ii/description/
 *
 * algorithms
 * Hard (34.16%)
 * Total Accepted:    66.3K
 * Total Submissions: 193.7K
 * Testcase Example:  '[[1,2],[1,3],[2,3]]'
 *
 * In this problem, a rooted tree is a directed graph such that, there is
 * exactly one node (the root) for which all other nodes are descendants of
 * this node, plus every node has exactly one parent, except for the root node
 * which has no parents.
 * 
 * The given input is a directed graph that started as a rooted tree with n
 * nodes (with distinct values from 1 to n), with one additional directed edge
 * added. The added edge has two different vertices chosen from 1 to n, and was
 * not an edge that already existed.
 * 
 * The resulting graph is given as a 2D-array of edges. Each element of edges
 * is a pair [ui, vi] that represents a directed edge connecting nodes ui and
 * vi, where ui is a parent of child vi.
 * 
 * Return an edge that can be removed so that the resulting graph is a rooted
 * tree of n nodes. If there are multiple answers, return the answer that
 * occurs last in the given 2D-array.
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
 * Input: edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]
 * Output: [4,1]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * n == edges.length
 * 3 <= n <= 1000
 * edges[i].length == 2
 * 1 <= ui, vi <= n
 * ui != vi
 * 
 * 
 */

// => 간선 [a,b]는 a->b 방향이고 a의 자식이 b임을 나타낸다. 주어진 간선 중 하나를 삭제하여 'rooted tree'로 만들기. rooted tree란 부모가 자식을 가리키는 방향 그래프이며, 정확히 한 노드(root)만 모든 자식의 조상이 될 수 있고 모든 자식은 정확히 하나의 부모 노드를 가진다(root 제외).
// 일단 둘 이상의 부모가 같은 자식을 가리키면 탈락. 그걸 삭제해야 한다.
// 그리고... 한 방향으로 순회해서 자기 자신으로 돌아와도 안 된다. 자기 자신이 root라면 부모가 있어서는 안 되는 것이고, 어떤 다른 노드의 자식이라면 나 자신의 부모가 둘 되는 셈이므로 안 된다.

// 완성된 rooted tree에서 딱 하나만 더 그어 관계를 망쳐놓는 방법:
// 1) 하나의 사이클이 되거나
// 2) 사이클을 이루지 못하고 두 부모 관계를 형성하게 됨
// 3) 사이클도 이루고 두 부모도 됨

// '두 부모'가 형성되면 무조건 둘 중 (마지막)하나를 끊어야 한다.
// '사이클'이 형성되면 사이클을 이루는 간선 중 (마지막)하나를 끊으면 된다.

function findRedundantDirectedConnection(edges: number[][]): number[] {
	if (edges.length === 3) return edges[2];
	// 1. '두 부모'가 되는지 찾기.
	// 	= 서로 다른 두 간선이 같은 '자식'을 갖는지 확인하기
	const visitedChild = new Set();
	for (let i = 0;  i < edges.length; i++) {
		const [parent, child] = edges[i];
		if (visitedChild.has(child)) return [parent, child];
		visitedChild.add(child);
	}

	// 2. '두 부모'가 안 되면 무조건 '사이클'이 하나 있을 것. 찾기.
	//  = 이미 등장한 '부모'가 '자식'으로서 방문되는 순간
	const visitedParent = new Set();
	for (let i = 0; i < edges.length; i++) {
		const [parent, child] = edges[i];
		if (visitedParent.has(child)) return [parent, child];
		visitedParent.add(parent);
	}
};


// => 수정한 규칙:
// 1: 두 부모 관계(만): 마지막 부모를 잇는 간선을 끊는다.
// 2: 하나의 사이클(만): 사이클을 이루는 마지막 간선을 끊는다.
// 3: 사이클과 두 부모 모두 존재: 사이클과 두 부모 모두에 해당하는 간선을 끊는다. <- new!
function findRedundantDirectedConnection2(edges: number[][]): number[] {
	if (edges.length === 3) return edges[2];
	// 3. 통합: '두 부모'가 되는 지점과 '사이클'을 이루는 지점을 저장해둔다. 끝까지 검사하는 동안 
	// 1) '사이클'이 등장하지 않으면 저장된 마지막 부모 간선을 반환,
	// 2) '두 부모'가 등장하지 않으면 저장된 마지막 사이클 간선을 반환,
	// 3) 둘 다 등장하면 공통 간선을 반환한다.
	const visitedChild = new Set();
	const visitedParent = new Set();
	let doubleParent: number[] | undefined;
	let cycle: number[] | undefined;
	for (let i = 0;  i < edges.length; i++) {
		const [parent, child] = edges[i];
		// '두 부모' 간선(같은 '자식'을 갖는 2번째 간선) 기록하기
		if (visitedChild.has(child)) {
			doubleParent = [parent, child];
		}
		visitedChild.add(child);
		// '사이클'을 이루는 간선(이미 등장한 '부모'가 '자식'으로 재등장하는 순간) 기록하기
		if (visitedParent.has(child)) {
			// 이전에 사이클 간선을 기록했다면, 이후 '같은 자식을 갖는(=사이클이면서 동시에 두 부모인) 간선'이 다시 나와도 업데이트하지 말아야 함
			if (!cycle)
				cycle = [parent, child];
		}
		visitedParent.add(parent);
	}
	
	// 둘 중 하나만 등장하는지, 둘 다 등장했는지에 따라 반환
	console.log('doubleParent, cycle: ', doubleParent, cycle)
	if (!cycle) return doubleParent;
	else if (!doubleParent) return cycle;
	else {
		if (doubleParent[0] === cycle[0] &&
			doubleParent[1] === cycle[1])
			return doubleParent;
		else {
			//... 공통간선을 어떻게 찾지?
			// => 현재 저장된 '마지막 두 부모' 말고 '첫 번째 두 부모'가 곧 공통 간선이다!
			for (let [parent, child] of edges) {
				if (child === doubleParent[1]) return [parent, child];
			}
		}
	}

};

// (실패) solution2를 리팩토링: 
// => 수정한 규칙:
// 1: 두 부모 관계(만): 마지막 부모를 잇는 간선을 끊는다.
// 2: 하나의 사이클(만): 사이클을 이루는 마지막 간선을 끊는다.
// 3: 사이클과 두 부모 모두 존재: 사이클과 두 부모 모두에 해당하는 간선을 끊는다. <- new!
// => 실패: 처음에 사이클을 찾는 방법이 잘못됐음. 등장했던 부모가 자식으로 다시 등장하는 경우는 사이클만 있는 게 아님. (반례: edges[[5,2],[5,1],[3,1],[3,4],[3,5]])
function findRedundantDirectedConnection3(edges: number[][]): number[] {	
	// '두 부모'가 되는 간선과 '사이클'을 이루는 간선을 저장해둔다. 
	const visitedChild = new Set();
	const visitedParent = new Set();
	let doubleParent: number[] | undefined;
	let cycle: number[] | undefined;

	for (let i = 0;  i < edges.length; i++) {
		const [parent, child] = edges[i];
		// '두 부모' 간선(같은 '자식'을 갖는 2번째 간선) 기록하기
		if (visitedChild.has(child)) 
			doubleParent = [parent, child];
		visitedChild.add(child);
		// '사이클'을 이루는 간선(이미 등장한 '부모'가 '자식'으로 재등장하는 순간) 기록하기
		if (visitedParent.has(child) && !cycle) 
			cycle = [parent, child];
		visitedParent.add(parent);
	}
	
	// 끝까지 검사하는 동안 
	// 1) '사이클'이 등장하지 않았으면 저장된 마지막 부모 간선을 반환,
	if (!cycle) return doubleParent;
	// 2) '두 부모'가 등장하지 않았으면 저장된 마지막 사이클 간선을 반환,
	else if (!doubleParent) return cycle;
	// 3) 둘 다 등장하면 공통 간선을 반환한다.
	else {
		if (doubleParent[0] === cycle[0] &&
			doubleParent[1] === cycle[1])
			return doubleParent;
		else {
			//... 공통간선을 어떻게 찾지?
			// => 현재 저장된 '마지막 두 부모' 말고 '첫 번째 두 부모'가 곧 공통 간선이다!
			// => 아니다. 사이클을 이루는 간선 중 '두 부모'와 같은 자식을 갖는 그 간선이 공통 간선이다.
			// 		= '사이클 마지막 간선'을 기준으로 다시 돌면서 '마지막 두 부모'와 같은 자식을 가지는 그 간선
			// for (let [parent, child] of edges) {
			// 	if (child === doubleParent[1]) return [parent, child];
			// }
			const [parent, child] = cycle;
			const relations: {[key: number]: number[]} = {};
			for (let [parent, child] of edges) {
				if (!relations[parent]) relations[parent] = [];
				relations[parent].push(child);
			}
			// 여기서 다시 dfs를 해야 한다고!?
			const stack = [[parent,child]];
			while (stack.length) {
				const [parent, child] = stack.pop();
				if (child === doubleParent[1])
					return [parent, child];
				relations[child].forEach((grandchild) => {
					stack.push([child, grandchild]);
				});
			}
		}
	}

};

// (성공)사이클을 dfs로 찾기로 함
function findRedundantDirectedConnection4(edges: number[][]): number[] {
	let covalent: number[] | null = null; // 동시에 '사이클'이고 '두 부모'인 경우, '공통 간선'을 찾아 저장해둘 변수

	// 두 부모를 찾는다. 
	let doubleParent: number[] | undefined;
	const visitedChild: Set<number> = new Set();
	for (let [parent, child] of edges) {
		if (visitedChild.has(child)) doubleParent = [parent, child];
		visitedChild.add(child);
	}

	// 사이클을 찾는다.
	let visitedEdges: { [key: number]: Set<number> } = {};
	let cycle: number[] | undefined;
	for (let [parent, child] of edges) {
		// 조건에 맞으면, 사이클 할당하기
		if (searchCycleDfs(child, parent, new Set())) {
			// 똑같이 true(=사이클 찾음)를 반환받았어도 dfs 도중 covalent가 할당되었다면 그걸 우선적으로 최종 반환하기
			if (covalent !== null) return covalent;
			// 그게 아니면 사이클은 있지만 두 부모는 없다는 의미이므로 현재 간선만 반환하기
			cycle = [parent, child];
			return cycle;
		}
		// 사이클을 완성하지 못하는 간선이라면, '방문함'에 넣기
		if (!visitedEdges[parent]) visitedEdges[parent] = new Set();
		visitedEdges[parent].add(child);
	}

	const stack: number[][] = [edges[0]];
	// 사이클을 이루는 마지막에서 두 번째 간선을 cycle로 지정하고,
	// true를 반환함
	function searchCycleDfs(parent: number, targetChild: number, visited: Set<number>): boolean {
		// 사이클이 되는 조건: 최초의 '목표지점 b'로 연결된 a->b를 제외한 길이 있는가 여부. 방향을 따져야 하니까 오히려 확인할 루트가 적어진다.
		// => 아니다. 최초의 부모를 '목표 자식'으로 삼아 돌아오는 '루트'가 있는가 여부다. 
		// => 아니다. 방문한 간선 중 '현재 내 자식'을 부모르 가질 수 있는 '루트'가 있는가 여부다. 지금 자식을 부모로 삼고, 그 길을 따라 오면 나(부모)에 이를 수 있는가. 
		
		visited.add(parent);
		if (parent === targetChild) {
			// 사이클을 완성하는 순간에, doubleParent가 있었으면 그와 같은 자식을 갖는 사이클 간선을 검색하여 반환, doublePArent가 없으면 완성하는 순간의 간선을 반환한다.
			if (doubleParent) {
				// 전체 간선을 거꾸로 살피며
				for (let i = edges.length - 1; i >= 0; i--) {
					// '방문한, 사이클을 이루는 부모'에 자식은 두 부모의 공통 자식인 간선을 발견하면, 그것이 곧 공통간선임. (반드시 하나가 존재함)
					const [a, b] = edges[i];
					if (visited.has(a) && b === doubleParent[1]) {
						covalent = [a, b];
						return true;
					}
				}
			}
			return true;
		}
		
		if (visitedEdges[parent]) {
			let childNodes = visitedEdges[parent];
			// 현재 부모 parent의 자식 중 목표 자식 targetChild가 있으면 사이클 확정
			if (childNodes.has(targetChild)) {
				
			}
			for (let node of childNodes) {
				// 일단 내 지금 자식을 부모로 갖는 '방문한' 간선이 하나도 없으면 이 간선은 루트를 탐색하지 않는다. 
				// 지금 자식을 부모로 갖는 '방문한' 간선이 있을 시, 가능한 모든 루트를 탐색해 다시 '나(부모)'에 도달할 수 있는 길이 있는지 찾는다.
				// => targetChild = 최초 부모, 
				// => 시작점 = 최초 자식, o
				// => 1차 진행 = 최초 자식이 부모가 되는 '방문한' 간선을 찾은 경우, 가능한 손주 중 '나(targetChild)'가 있으면 사이클 확정. (나 -> 자식 -> 나 로 곧바로 돌아오는 루트가 없는 전제조건이므로 사용할 수 있는 방법이다)(나 -> 자식 -> 나 도 사이클인가 ?) 아니면 각 손주를 부모 삼아 깊이 탐색 진행
				if (!visited.has(node)) {
					if (searchCycleDfs(node, targetChild, visited)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	console.log('doubleParent, cycle: ', doubleParent, cycle);

	// 사이클을 찾다가 '공통 간선'을 찾거나 '사이클만'인 간선을 찾아 반환한 게 아니고 여기까지 왔다면, '두 부모'만 있는 케이스: 현재 두 부모 간선을 반환한다.
	return doubleParent;
}

// 위의 풀이4를 리팩토링:
function findRedundantDirectedConnection5(edges: number[][]): number[] {
	let covalent: number[] | null = null; // 동시에 '사이클'이고 '두 부모'인 경우, '공통 간선'을 찾아 저장해둘 변수

	// 두 부모를 찾는다:
	let doubleParent: number[] | null = null;
	const visitedChild: Set<number> = new Set();
	for (let [parent, child] of edges) {
		if (visitedChild.has(child)) doubleParent = [parent, child];
		visitedChild.add(child);
	}

	// 사이클을 찾는다:
	let relationsMap: { [key: number]: Set<number> } = {};
	for (let [parent, child] of edges) {
		// 현재 부모를 '목표 자식'으로, 자식을 '시작 부모'로 넣어 깊이 우선 탐색(BFS) 시작:
		// 조건에 맞으면, 사이클 할당하기
		if (isThisCycleDfs(child, parent, new Set())) {
			// 똑같이 true(=사이클 찾음)를 반환받았어도 dfs 도중 covalent가 할당되었다면 그걸 우선적으로 최종 반환하기
			if (covalent !== null) return covalent;
			// 그게 아니면 사이클은 있지만 두 부모는 없다는 의미이므로 현재 간선(=사이클을 이루는 마지막 간선)만 반환하기
			return [parent, child];
		}
		// 사이클을 완성하지 못하는 간선이라면, '관계 지도'에 넣기
		if (!relationsMap[parent]) relationsMap[parent] = new Set();
		relationsMap[parent].add(child);
	}

	// 최초의 '시작 부모'와 '목표 자식'을 기반으로 가능한 루트를 탐색, '목표 자식'에 도달할 수 있는 루트를 발견하면 true를 반환한다. 
	// 반환하기 전 doubleParent 여부에 따라 covalent(공통간선)을 추출해서 저장한다.
	function isThisCycleDfs(parent: number, targetChild: number, visited: Set<number>): boolean {
		visited.add(parent);
		if (parent === targetChild) {
			// 사이클을 완성하는 순간에, doubleParent가 있었으면 그와 같은 자식을 갖는 사이클 간선을 검색하여 반환, doublePArent가 없으면 완성하는 순간의 간선을 반환한다.
			if (doubleParent) {
				// 전체 간선을 거꾸로 살피며
				for (let i = edges.length - 1; i >= 0; i--) {
					// '방문한, 사이클을 이루는 부모'에 자식은 두 부모의 공통 자식인 간선을 발견하면, 그것이 곧 공통간선임. (반드시 하나가 존재함) 즉시 순회를 끝내준다. 
					const [a, b] = edges[i];
					if (visited.has(a) && b === doubleParent[1]) {
						covalent = [a, b];
						return true;
					}
				}
			}

			return true;
		}
		
		if (relationsMap[parent]) {
			let childNodes = relationsMap[parent];
			for (let node of childNodes) {
				// 일단 내 지금 자식을 부모로 갖는 '방문한' 간선이 하나도 없으면 이 간선은 루트를 탐색하지 않는다. 
				// 지금 자식을 부모로 갖는 '방문한' 간선이 있을 시, 가능한 모든 루트를 탐색해 다시 '나(부모)'에 도달할 수 있는 길이 있는지 찾는다.
				// => targetChild = 최초 부모, 
				// => 시작점 = 최초 자식, o
				// => 1차 진행 = 최초 자식이 부모가 되는 '방문한' 간선을 찾은 경우, 가능한 손주 중 '나(targetChild)'가 있으면 사이클 확정. (나 -> 자식 -> 나 로 곧바로 돌아오는 루트가 없는 전제조건이므로 사용할 수 있는 방법이다)(나 -> 자식 -> 나 도 사이클인가 ?) 아니면 각 손주를 부모 삼아 깊이 탐색 진행
				if (!visited.has(node)) {
					if (isThisCycleDfs(node, targetChild, visited)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	// 사이클을 찾다가 '공통 간선'을 찾거나 '사이클만'인 간선을 찾아 반환한 게 아니고 여기까지 왔다면, '두 부모'만 있는 케이스: 현재 두 부모 간선을 반환한다.
	return doubleParent;
}

// Union-Find 알고리즘을 이용한 풀이:
// 두 노드가 같은 '연결 집합'에 속하는지 확인하고, 두 연결 집합을 합치는 연산을 효율적으로 수행함.
function findRedundantDirectedConnection6(edges: number[][]): number[] {
	// 각 노드의 부모 노드를 저장하는 배열을 초기화한다.
	const n = edges.length;
	const parent = Array(n + 1).fill(0).map((value, index) => index);
	// => edges의 간선이 5개일 때 parent=[0,1,2,3,4,5]

	// Find 함수를 정의: 주어진 노드 x의 루트 노드를 찾는다. 
	const find = (x: number): number => {
		if (parent[x] !== x) {
			parent[x] = find(parent[x]);
		}
		return parent[x];
	}

	// Union 함수를 정의: 주어진 노드 x와 y의 루트 노드를 합친다. 
	const union = (x: number, y: number): boolean => {
		const rootX = find(x);
		return true;
	}
	// 각 간선을 순회하면서 두 노드를 합치는 union 연산을 수행한다. 
	// 만약 두 노드가 이미 같은 연결 요소(사이클)에 속해 있다면, 해당 간선은 불필요한 간선이므로 반환한다. 
	return [];
}


/** 
 * Union-Find 알고리즘 : 서로소 집합 자료구조를 유지하는 알고리즘. 
 * 핵심 함수: 
 * 1) Union: 두 개의 집합을 하나로 합친다.
 * 2) Find: 특정 원소가 어떤 집합에 속하는지를 확인한다.
 * 
 * 기본 아이디어: 
 * 집합을 서로소 부분집합으로 분할하는 것. 부분 집합은 보통 트리로 나타내고 루트 노드는 해답 집합의 대표가 됨.
 * 
 * 알고리즘 구현: 
 * 1) 초기화: 모든 원소가 각각의 집합에 속하도록 초기화한다.
 * 2) Union 연산: 두 집합의 대표를 찾아서, 두 집합의 대표가 다르면 두 집합을 합친다.
 * 3) Find 연산: 주어진 원소가 속한 집합의 대표를 찾는다. 경로 압축(Path Compression) 기법을 사용하면 효율성을 높일 수 있음.
 * 
 * 이용되는 곳: 
 * 그래프에서 사이클을 찾을 때
 * 그래프에서 두 노드가 같은 집합에 속하는지를 빠르게 확인할 때 
 */

export default {
	solution: findRedundantDirectedConnection6,
}