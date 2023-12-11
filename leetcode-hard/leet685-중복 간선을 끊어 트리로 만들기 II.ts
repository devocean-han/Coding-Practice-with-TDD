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

// solution2를 리팩토링: 
// => 수정한 규칙:
// 1: 두 부모 관계(만): 마지막 부모를 잇는 간선을 끊는다.
// 2: 하나의 사이클(만): 사이클을 이루는 마지막 간선을 끊는다.
// 3: 사이클과 두 부모 모두 존재: 사이클과 두 부모 모두에 해당하는 간선을 끊는다. <- new!
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

export default {
	solution: findRedundantDirectedConnection3,
}