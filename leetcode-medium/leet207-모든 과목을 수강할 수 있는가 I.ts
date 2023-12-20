/*
 * @lc app=leetcode id=207 lang=typescript
 *
 * [207] Course Schedule
 *
 * https://leetcode.com/problems/course-schedule/description/
 *
 * algorithms
 * Medium (46.26%)
 * Total Accepted:    1.4M
 * Total Submissions: 3M
 * Testcase Example:  '2\n[[1,0]]'
 *
 * There are a total of numCourses courses you have to take, labeled from 0 to
 * numCourses - 1. You are given an array prerequisites where prerequisites[i]
 * = [ai, bi] indicates that you must take course bi first if you want to take
 * course ai.
 * 
 * 
 * For example, the pair [0, 1], indicates that to take course 0 you have to
 * first take course 1.
 * 
 * 
 * Return true if you can finish all courses. Otherwise, return false.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: true
 * Explanation: There are a total of 2 courses to take. 
 * To take course 1 you should have finished course 0. So it is possible.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
 * Output: false
 * Explanation: There are a total of 2 courses to take. 
 * To take course 1 you should have finished course 0, and to take course 0 you
 * should also have finished course 1. So it is impossible.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= numCourses <= 2000
 * 0 <= prerequisites.length <= 5000
 * prerequisites[i].length == 2
 * 0 <= ai, bi < numCourses
 * All the pairs prerequisites[i] are unique.
 * 
 * 
 */

// numCourses = n = 수강해야할 과목 수(0번 ~ n-1번 과목)
// prerequisites[a,b] = a 과목의 선수 과목이 b 과목임
// => 0부터 n-1번 과목을 모두 수강할 수 있겠는지 여부를 판단하여 반환하기
// 규칙1: prerequisites의 모든 쌍은 유니크함(★★★)

// 예시:
// n=2, pre=[[1,0]]일 때: 0번과 1번 과목 모두 들을 수 있음 => true
// n=2, pre=[[1,0],[0,1]]: 0번과 1번 과목 중 어느것도 먼저 들을 수가 없음 => false
// => 규칙2: a->b와 b->a는 동시에 존재할 수 있어도 a->b가 또 등장하는 일은 없다.

// 패턴:
// a->b 순서가 나왔는데 또 b->a 순서가 나온다면 완강 불가능하다?
// a->b, b->a, c->b, d->a 처럼 다른 걸로 먼저 b와 a를 만족한다면? d와 c를 먼저 듣고 나면 b와 a를 들을 수 있음? 안됨. 그대로 a와 b를 들어야 서로를 바꿔 들을 수 있어서.
// => 규칙3: 한 과목이 여러 prerequisites를 가질 수 있다. 즉, 한 노드가 여러 부모를 가질 수 있다.
// => 규칙4: 서로를 향하는 양방향 간선이 완성된 경우, 어떻게 해도 완강은 불가능하다.
// => 규칙5: 한 방향 사이클이 완성되어도 완강이 불가능하다.
// (규칙6: 최소,최대 간선(prerequisites쌍) 수는 0 ~ n*2개다.)

// 결론:
// prerequisites를 간선 삼아 그린 방향 그래프에서 사이클이 있는가 여부를 파악하여 있으면 false를, 없으면 true를 반환하기. (간선으로 이어져있지 않은 노드가 있어도 괜찮음)
// (+추가: 다 풀고 보니 [a,b]쌍이 a 이후 b과목 수강이 아니라 반대를 의미하는 것이었음. 하지만 동일하게 풀리므로 그냥 넘어가도록 한다)

// (성공) DFS 풀이
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
	// prerequisites의 길이가 1개나 0개면 순서를 고려하지 않고 그냥 다 들으면 되므로 true를 반환
	if (prerequisites.length < 2) return true;

	// 각 과목과 그 후수 과목들을 매핑
	// ex) [[a,b], [a,c]] => 선수 과목 a가 가지는 자식들이 (b,c)임 => {a: Set(b, c)}
	const relations: {[key: number]: Set<number>} = {}; // {과목넘버: Set(후수 과목들)}
	for (let [a,b] of prerequisites) {
		if (!relations[a]) {
			relations[a] = new Set();
		}
		relations[a].add(b);
	}

	// 각 간선 [a,b]마다 a를 도착지점으로 하는 사이클이 있는지 검사
	for (let [a, b] of prerequisites) {
		// 방법1(중단): 스택을 이용
		// 방법2: 재귀를 이용
		if (oneWayRouteExistsDfs(b, a, new Set()))
			return false;
	}

	// parent를 시작지점으로 하여 targetChild에 도달하는 루트가 존재하면 true를 반환 
	function oneWayRouteExistsDfs(parent: number, targetChild: number, visited: Set<number>): boolean {
		// 현재 parent가 자식이 없는 노드인 경우, 곧바로 false로 탈출
		if (!relations[parent])
			return false;
		// 현재 parent의 자식들 중 targetChild가 존재하면 true로 탈출
		const children: Set<number> = relations[parent];
		if (children.has(targetChild))
			return true;

		// 현재 parent의 자식들 각각으로 루트를 확장하여 자식들의 자식들 중 targetChild가 존재하는지 검사
		visited.add(parent);
		for (const child of children) {
			if (visited.has(child)) continue; // 방문했던 자식이면 건너뜀 
			if (oneWayRouteExistsDfs(child, targetChild, visited)) {
				return true;
			}
		}

		// 끝까지 targetChild에 도달하는 길을 발견하지 못하면 fasle 반환
		return false;
	}
	
	// 모든 간선을 검사하도록 사이클을 발견하지 못함 = 모든 과목을 자유롭게 들을 수 있다
	return true;
};

// (실패) Union-Find 풀이: Union-Find 알고리즘은 방향 있는 사이클과 없는 사이클을 구분하지 못함
// cf) prerequisites=[[1,0],[1,4],[1,5],[1,7],[1,9],[8,9],[7,9],[7,0]]에서와 같이, 한 방향 사이클이 아니어도 연결되기만 하면 사이클로 취급
function canFinish2(numCourses: number, prerequisites: number[][]): boolean {
	const parent: number[] = Array.from({ length: numCourses + 1 }, (_,i) => i);
	
	// find 메소드 정의: 최상위 부모(시조)를 찾아 parent에 저장하고 반환한다
	const find = (node: number): number => {
		if (parent[node] !== node) {
			parent[node] = find(parent[node]);
		}
		return parent[node];
	}
	
	// union 메소드 정의: 두 노드가 다른 집합에 속해 있어서 합칠 수 있는지를 반환하고 합친다.
	const union = (node1: number, node2: number): boolean => {
		const root1: number = find(node1);
		const root2: number = find(node2);

		if (root1 === root2) {
			return false;
		}
		parent[node2] = root1;
		return true;
	}

	// 전체 간선을 순회하며 union을 수행하다 결과값이 false가 나오는 간선이 나오는 경우 최종 false 반환
	for (let [a, b] of prerequisites) {
		// 사이클을 발견하면 최종적으로 false를 반환하기
		if (!union(a, b))
			return false;
	}
	return true;
}

// 다른 풀이: Topological Sorting(위상 정렬) 알고리즘 사용
function canFinish3(numCourses: number, prerequisites: number[][]): boolean {
	const inDegree = new Array(numCourses).fill(0); // 각 과목의 진입 차수를 저장 => ex) inDgree[i] = 3이라면, i과목을 듣기 위해 3개의 선수 과목을 들어야 함을 뜻함)
	const graph: Map<number, number[]> = new Map(); // 각 과목의 후속 과목 리스트를 저장 => ex) map{1: [2,3]}

	for (let [a, b] of prerequisites) {
		inDegree[b]++;
		if (graph.has(a)) {
			graph.get(a).push(b);
		} else {
			graph.set(a, [b]);
		}
	}

	const queue = [];
	for (let i = 0; i < numCourses; i++) {
		// 진입 차수가 0인 과목(=선수 과목이 없는 것들)을 큐에 전부 추가
		if (inDegree[i] === 0) queue.push(i);
	}

	// BFS: 선행 과목이 필요하지 않은, "0레벨" 과목들을 시작점으로 하여 밟아나갈 수 있는 과목을 각각 탐색 
	while (queue.length) {
		// '0레벨' 과목 하나 뽑기
		const curCourse: number = queue.shift();
		// 이 과목 직후에 들을 수 있는 '후수 과목' 목록을 돌면서
		const nextCourses = graph.get(curCourse) || [];
		for (let next of nextCourses) {
			// '후수 과목'을 듣기 위한 과목 수(레벨)를 하나 차감
			inDegree[next]--;
			// 그렇게 이 '후수 과목'도 '0레벨'이 되었다면 큐에 추가함
			if (inDegree[next] === 0) queue.push(next); 
		}
	}

	// 모든 과목의 진입 차수가 0이 됐다면 사이클이 없는 것이므로 true를 반환 (사이클이 있다면 사이클을 이루는 모든 과목에 차수 1이 남겨짐)
	return inDegree.every(val => val === 0);
}
/*
 ^ 위상 정렬(Topological Sorting)
 : 방향 그래프에서, 순서가 정해져 있는 작업을 차례로 수행해야 할 때 그 순서를 결정해주는 알고리즘. 
 사이클이 없는 그래프(DAG, Directed Acyclic Graph)에 대해서만 작동하는 알고리즘이므로 이를 응용하면 '방향 그래프에서 사이클이 있는가 없는가'를 판단할 수 있다. (사이클을 이루는 노드들은 방문되지 않고 순서를 결정할 수 없음)

 * 알고리즘 순서: 
1. 진입 차수 계산: 각 노드의 진입 차수를 계산한다. (진입 차수란 한 노드로 들어오는 간선의 수를 의미)

2. 큐 초기화: 진입 차수가 0인 노드를 전부 찾아 큐에 넣는다. (진입 차수가 0인 노드란 선행 작업이 없는 작업을 의미)

3. BFS 실행: 큐에서 노드를 하나씩 꺼내면서 해당 노드와 연결된 간선을 제거(= 연결된 노드의 진입 차수를 1씩 차감)한다. 이 때, 간선을 제거함에 따라 진입 차수가 0이 된 노드를 찾아 큐에 넣는다.

4. 반복: 큐가 빌 때까지 위의 과정을 반복한다.

5. 결과 확인: 모든 노드를 방문했다면 그래프에는 사이클이 없으며, 방문하지 못한 노드가 있다면 그래프에는 사이클이 존재함을 뜻한다. (모든 노드를 방문한 순서가 바로 위상 정렬의 결과)
 */

export default {
	solution: canFinish3,
}