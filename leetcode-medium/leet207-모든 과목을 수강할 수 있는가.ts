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

// (성공) DFS 풀이
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
	if (prerequisites.length < 2) return true;
	const relations: {[key: number]: Set<number>} = {}; // {과목넘버: Set(후수과목들)}
	for (let [a,b] of prerequisites) {
		// a->b, a->c : 선수 과목 a가 가지는 자식들 (b,c)
		if (!relations[a]) {
			relations[a] = new Set();
		}
		relations[a].add(b);
	}

	// 각 간선 [a,b]마다 a를 도착지점으로 하는 사이클이 있는지 검사
	for (let [a, b] of prerequisites) {
		// // 방법1: stack을 이용
		// const visited: Set<number> = new Set();
		// // b의 자식들(후보)을 넣고 시작하기?
		// const stack: number[][] = [[a,b]];
		// while (stack.length) {
		// 	const [parent, child] = stack.pop();
		// 	// childe의 자식 후보들이 뭐가 있나

		// }

		// 방법2: 재귀를 이용
		if (oneWayRouteExistsDfs(b, a, new Set()))
			return false;

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
				if (visited.has(child)) continue;
				if (oneWayRouteExistsDfs(child, targetChild, visited)) {
					return true;
				}
			}
			// 끝까지 targetChild에 도달하는 길을 발견하지 못하면 fasle 반환
			return false;
		}
	}
	// 끝까지 사이클을 발견하지 못함
	return true;
};

// Union-Find 풀이: 


export default {
	solution: canFinish,
}